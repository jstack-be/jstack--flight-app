import {Flight, FlightApiProps} from "./flight.types";
import axios from "axios";
import {environment} from "../../enviroment";

export async function getTravelData(requestParameters: FlightApiProps): Promise<Flight[]> {
    const config = {
        headers: {
            apiKey: environment.tequilaKiwiApiKey,
        },
        params: requestParameters
    }

    const response = await axios.get(environment.flightSearchUrl, config)
    return response.data.data
}