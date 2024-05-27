import InvalidDateError from "../../errors/InvalidDateError";
import ResponseError from "../../errors/ResponseError";
import {parseDate} from "../../utils/date.utils";
import {environment} from "../../enviroment";
import {saveMessage} from "./message.response";
import {getFilterFunction} from "./message.function";
import {ChatCompletionMessageParam} from "openai/resources";
import OpenAI from "openai";
import {FlightsResponse} from "../flights/flight.types";

/**
 * Function to validate dates
 * @param {any} jsonObject - The object containing the dates to validate
 * @throws {InvalidDateError} If the dates are not within the valid range
 */
function validateDates(jsonObject: any) {
    const currentDate = new Date();
    const dateFrom = parseDate(jsonObject.date_from);
    const dateTo = parseDate(jsonObject.date_to);

    const fortyFiveDaysBeforeNow = new Date();
    fortyFiveDaysBeforeNow.setDate(currentDate.getDate() - 45);

    const threeYearsFromNow = new Date();
    threeYearsFromNow.setFullYear(currentDate.getFullYear() + 3);

    if (dateFrom < fortyFiveDaysBeforeNow) {
        throw new InvalidDateError("The departure date cannot be more than 45 days in the past.");
    } else if (dateTo < dateFrom) {
        throw new InvalidDateError("The end date of the departure date range cannot be before the start date.");
    } else if (dateFrom > threeYearsFromNow || dateTo > threeYearsFromNow) {
        throw new InvalidDateError("The dates can not be more than 3 years in the future.");
    }

    // Check if return dates are provided before parsing and validating them
    if (jsonObject.return_from && jsonObject.return_to) {
        const returnFrom = parseDate(jsonObject.return_from);
        const returnTo = parseDate(jsonObject.return_to);

        if (returnFrom < dateFrom) {
            throw new InvalidDateError("The return date cannot be before the the start date of the departure date range.");
        } else if (returnTo < returnFrom) {
            throw new InvalidDateError("The end date of the return date range cannot be before the return_from.");
        } else if (returnFrom > threeYearsFromNow || returnTo > threeYearsFromNow) {
            throw new InvalidDateError("The dates can not be more than 3 years in the future.");
        }
    }
}

function validateBaggage(jsonObject: any) {
    const adults = jsonObject.adults;
    const children = jsonObject.children;
    const adultHandbags: string[] = jsonObject.adult_hand_bag?.split(',') || [];
    const adultHoldbags: string[] = jsonObject.adult_hold_bag?.split(',') || [];
    const childrenHandbags: string[] = jsonObject.child_hand_bag?.split(',') || [];
    const childrenHoldbags: string[] = jsonObject.child_hold_bag?.split(',') || [];

    if (adults && adults > 0) {
        if ((adultHandbags.length !== adults && adultHandbags.length !== 0) || (adultHoldbags.length !== adults && adultHoldbags.length !== 0)) {
            throw new ResponseError("The number of adult baggage does not match the number of adults. Please change your request and try again.");
        }
    }

    if (children && children > 0) {
        if ((childrenHandbags.length !== children && childrenHandbags.length !== 0) || (childrenHoldbags.length !== children && childrenHoldbags.length !== 0)) {
            throw new ResponseError("The number of children's baggage does not match the number of children. Please change your request and try again.");
        }
    }
}

/**
 * Function to validate IATA codes
 * @param {string} fly_from - The IATA code of the departure airport
 * @param {string} fly_to - The IATA code of the destination airport
 * @throws {ReferenceError} If the IATA codes are not valid
 */
function validateIataCodes(fly_from: string, fly_to: string) {
    //todo allow 2 letter country codes
    const iata_code_regex = /^[A-Z]{3}$/;

    if (!fly_from) {
        throw new ResponseError("Could not find a provided departure cities or airports. Please change your request and try again.");
    }

    const fly_from_codes = fly_from?.split(',');
    const fly_to_codes = fly_to?.split(',');


    for (const code of fly_from_codes) {
        if (!iata_code_regex.test(code.trim())) {
            throw new ResponseError("Could not find all provided departure cities or airports. Please change your request and try again.");
        }
    }

    if (!!fly_to_codes && fly_to_codes?.length !== 0) {
        for (const code of fly_to_codes) {
            if (!iata_code_regex.test(code.trim())) {
                throw new ResponseError("Could not find all provided destination cities or airports. Please change your request and try again.");
            }
        }
    }
}

/**
 * Function to process the response from the OpenAI API
 * @param {any} completion - The response from the OpenAI API
 * @returns {any} The processed response
 * @throws {ReferenceError} If the response does not contain the function json object
 */
function processResponse(completion: any) {
    const responseMessage = completion?.choices?.[0]?.message;
    const args = responseMessage?.tool_calls?.[0]?.function?.arguments;
    if (!!args) {
        let jsonObject = JSON.parse(args);
        jsonObject.limit = 5; //todo change to 20
        console.log(jsonObject);

        validateIataCodes(jsonObject.fly_from, jsonObject.fly_to);
        validateDates(jsonObject);
        validateBaggage(jsonObject);
        //todo add manual check to see if it is a valid sorting condition

        saveMessage(jsonObject.message);
        delete jsonObject.message;

        return jsonObject;
    } else {
        throw new ResponseError(responseMessage.content);
    }
}

const openai = new OpenAI({
    organization: environment.openAiOrgKey,
    apiKey: environment.openAiApiKey
});

/**
 * Function to generate flight search parameters
 * @param {ChatCompletionMessageParam[]} messages - The messages to send to the OpenAI API
 * @returns {Promise<FlightSearchParameters>} The flight search parameters
 */
export async function generateFlightSearchParameters(messages: ChatCompletionMessageParam[]) {
    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: 'You are a helpful travel planner assistant ' +
            ' Your answers should be short and to the point. ' +
            ' You should let the user know that you can only answer questions about travel routes and not any other information ' +
            ` The current date is ${new Date().toLocaleDateString()}.` +
            ' The given dates should not be more than 45 day before the current date and more than 3 years in the future. '
    };

    messages.unshift(systemMessage);

    const completion = await openai.chat.completions.create({
        messages: messages,
        tools: [getFilterFunction()],
        tool_choice: 'auto',
        model: "gpt-3.5-turbo",
    });

    return processResponse(completion);
}


/**
 * Function to apply conditional sorting
 * @param {ChatCompletionMessageParam[]} messages - The messages to send to the OpenAI API
 * @param {FlightsResponse[]} flights - The flights to sort
 * @returns {Promise<FlightSearchParameters>} The flight search parameters
 */
export async function applyConditionalSorting(messages: ChatCompletionMessageParam[], flights: FlightsResponse[]) {
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

    // Remove booking_link from each flight
    flights = flights.map(flight => { //todo save the links to add them back later
        delete flight.booking_link;
        return flight;
    });
    messages.push({
        role: "user",
        content: `give me a list of flight id's ordered and filtered based on my previous request:\n ${JSON.stringify(flights)}`
    })

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo-0125",
        response_format: { "type": "json_object" },
    });

    return processConditionalResponse(completion);
}

/**
 * Function to process the response from the OpenAI API
 * @param {any} completion - The response from the OpenAI API
 * @returns {any} The processed response
 */
function processConditionalResponse(completion: any) {
    const args: string = completion?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!!args) {
        return JSON.parse(args).flights;
    }
}