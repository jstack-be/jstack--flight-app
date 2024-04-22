import {Flight} from "./flight.types";
import axios from "axios";
import {environment} from "../../enviroment";
import {FlightSearchParameters} from "../messages/message.types";

export async function getTravelData(requestParameters: FlightSearchParameters): Promise<Flight[]> {
    const config = {
        headers: {
            apiKey: environment.tequilaKiwiApiKey,
        },
        params: requestParameters
    }

    const response = await axios.get(environment.flightSearchUrl, config)
    return response.data.data
}