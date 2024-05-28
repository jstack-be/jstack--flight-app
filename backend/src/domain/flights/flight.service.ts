import {Flight, FlightsResponse} from "./flight.types";
import axios from "axios";
import environment from "../../enviroment";
import {FlightSearchParameters} from "../messages/message.types";
import {formatFlights} from "./flight.formater";
import {ChatCompletionMessageParam} from "openai/resources";
import openai from "../../openai";

/**
 * Fetches travel data from the flight search API.
 *
 * @param {FlightSearchParameters} requestParameters - The parameters for the flight search.
 * @returns {Promise<Flight[]>} The flights that match the search parameters.
 * @throws {AxiosError} If the request to the flight search API fails.
 */
export async function getFlights(requestParameters: FlightSearchParameters): Promise<FlightsResponse[]> {
    requestParameters.limit = 20;

    const config = {
        headers: {
            apiKey: environment.tequilaKiwiApiKey,
        },
        params: requestParameters
    }

    const response = await axios.get(environment.flightSearchUrl, config)
    return formatFlights(response.data.data);
}

/**
 * Function to validate the response from the Tequila API with OpenAI
 * @param {ChatCompletionMessageParam[]} messages - The messages to send to the OpenAI API
 * @param {FlightsResponse[]} flights - The flights to validate
 * @returns {Promise<FlightsResponse[]>} A list of flights that match the user's request
 */
export async function validateFlights(messages: ChatCompletionMessageParam[], flights: FlightsResponse[]): Promise<FlightsResponse[]> {
    if (!flights?.length) return flights;

    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content:
            'You only return a list of flight id\'s ordered and filtered based on the user\'s request. ' +
            'You can not change the fight objects and need to include all items that are requested' +
            'You return the id\'s in a json object' +
            'The route objects in the provided data are the different stops the user will need to make. ' +
            'the isReturnFlight property from the route indicates if it is a return(1) flight or a departure(0) flight. ' +
            'Example: When a user asks for the cheapest flight from New York to London for the the current week, then return that ONE flight id from the cheapest flight. ' +
            'Here is an data example: These are flights from ANR to NRT [\n' +
            '  {\n' +
            '    "id": "179f192e4d9f0000214f7d1e_0|192e1f5b4da000004470b527_0|1f5b209f4da000006bed2a3c_0|1f5b209f4da000006bed2a3c_1",\n' +
            '    "price_conversion": {\n' +
            '      "EUR": 643\n' +
            '    },\n' +
            '  },\n' +
            '  {\n' +
            '    "id": "179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6924_0|170f209f4da00000deb56a76_0|170f209f4da00000deb56a76_1",\n' +
            '    "price_conversion": {\n' +
            '      "EUR": 777\n' +
            '    },\n' +
            '  }\n' +
            ']' +
            'if I want to have the most expensive flight from the list, then I would return this:' +
            '{flight_ids:[ "179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6924_0|170f209f4da00000deb56a76_0|170f209f4da00000deb56a76_1"]} because it is the most expensive flight from the list. ' +
            'Example 2: When a user asks for to order the flights based on duration from high to low from New York to London for the the current week, then return a the ENTIRE list ordered as specified' +
            'Data example 2: These are flights from ANR to NRT [\n' +
            '  {\n' +
            '    "id": "179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6922_4|170f209f4da00000deb56a35_0|170f209f4da00000deb56a33_1",\n' +
            '    "duration": {\n' +
            '      "departure": 201600,\n' +
            '      "return": 0,\n' +
            '      "total": 201600\n' +
            '    },\n' +
            '  {\n' +
            '    "id": "179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6924_0|170f209f4da00000deb56a76_0|170f209f4da00000deb56a76_1",\n' +
            '    "duration": {\n' +
            '      "departure": 171600,\n' +
            '      "return": 0,\n' +
            '      "total": 171600\n' +
            '    },\n' +
            '  {\n' +
            '    "id": "179f192e4d9f0000214f7d1e_0|192e1f5b4da000004470b527_0|1f5b209f4da000006bed2a3c_0|1f5b209f4da000006bed2a3c_1",\n' +
            '    "duration": {\n' +
            '      "departure": 185100,\n' +
            '      "return": 0,\n' +
            '      "total": 185100\n' +
            '    },\n' +
            '  },\n' +
            '  }\n' +
            ']' +
            'if I want to have the list of flights ordered in descending order on duration, then I would return this:' +
            '{flight_ids:[ "179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6922_4|170f209f4da00000deb56a35_0|170f209f4da00000deb56a33_1",' +
            '"179f192e4d9f0000214f7d1e_0|192e1f5b4da000004470b527_0|1f5b209f4da000006bed2a3c_0|1f5b209f4da000006bed2a3c_1",' +
            '"179f192e4d9f0000214f7d1e_0|192e170f4da00000dd2c6924_0|170f209f4da00000deb56a76_0|170f209f4da00000deb56a76_1"]}. '
    };
    messages.unshift(systemMessage);

    // Remove booking_link and airlineLogoUrl's from each flight to reduce amount of tokens
    const shortenedFlights = flights.map(flight => {
        delete flight.booking_link;
        flight.route.forEach(route => {
            delete route.airlineLogoUrl;
        });
        return flight;
    });

    messages.push({
        role: "user",
        content: `give me a list of flight id's ordered and filtered based on my previous request:\n ${JSON.stringify(shortenedFlights)}`
    })

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo-0125",
        response_format: {"type": "json_object"},
    });

    const args: string = completion?.choices?.[0]?.message?.content;
    if (!!args) {
        return orderAndFilterFlightsByIds(JSON.parse(args)?.flight_ids, flights);
    }
    return flights;
}

/**
 * Function to order and filter flights by their IDs
 * @param {string[]} flightIds - The IDs of the flights to order and filter
 * @param {FlightsResponse[]} flights - The flights to be ordered and filtered
 * @returns {FlightsResponse[]} The ordered and filtered flights
 */
function orderAndFilterFlightsByIds(flightIds: string[], flights: FlightsResponse[]): FlightsResponse[] {
    let orderedFlights = [];
    for (let id of flightIds) {
        let flight = flights.find(flight => flight.id === id);
        if (flight) {
            orderedFlights.push(flight);
        }
    }
    return orderedFlights;
}