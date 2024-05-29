import {Flight, FlightsResponse} from "./flight.types";
import axios from "axios";
import environment from "../../enviroment";
import {FlightSearchParameters} from "../messages/message.types";
import {formatFlights} from "./flight.formater";

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