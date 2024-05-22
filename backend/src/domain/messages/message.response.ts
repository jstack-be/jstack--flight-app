import {Flight, FlightsResponse} from "../flights/flight.types";

import createMD5Hash from "../../utils/hash.string";
import {environment} from "../../enviroment";

type MessageResponse = {
    message: string | null;
    flights: FlightsResponse[] | null;
}

// Holds the temporary message data
let message: string | null = null;

// Holds the temporary flight data
let flights: FlightsResponse[] = [];


/**
 * Saves a message into the temporary storage
 * @param {string} newMessage - The message to be saved
 */
export function saveMessage(newMessage: string): void {
    message = newMessage;
}

/**
 * Converts the airline IATA code to a logo URL
 * @param {string} airline_iata - The IATA code of the airline
 * @returns {string} The URL of the airline logo
 */
function convertToLogoUrl(airline_iata: string): string {
    const logoUrl = environment.logoSearchUrl;
    const searchParams = `${airline_iata}_50_50_s`
    const md5apikey = createMD5Hash(`${searchParams}_${environment.airhexApiKey}`);
    return `${logoUrl}${searchParams}.png?proportions=keep?md5apikey=${md5apikey}`;
}

/**
 * Saves a list of flights into the temporary storage
 * @param newFlights - The flights to be saved
 */
export function saveFlights(newFlights: Flight[]): void {
    flights = newFlights.map(newFlight => {
        const updatedRoutes = newFlight.route.map(route => ({
            id: route.id,
            flyFrom: route.flyFrom,
            flyTo: route.flyTo,
            local_departure: route.local_departure,
            local_arrival: route.local_arrival,
            airlineLogoUrl: convertToLogoUrl(route.airline),
            isReturnFlight: route.return
        }));

        return {
            id: newFlight.id,
            duration: newFlight.duration,
            price_conversion: newFlight.conversion,
            booking_link: newFlight.deep_link,
            route: updatedRoutes,
        };
    });
}

/**
 * Retrieves the content of the temporary storage
 * @returns {Object} An object containing the message and flight data
 */
export function getContent(): MessageResponse {
    return {message: message, flights: flights};
}

/**
 * Clears the content of the temporary storage
 */
export function clearContent(): void {
    message = null;
    flights = [];
}
