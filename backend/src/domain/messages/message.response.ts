import {Flight, FlightsResponse} from "../flights/flight.types";

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
 * Saves a list of flights into the temporary storage
 * @param newFlights - The flights to be saved
 */
export function saveFlights(newFlights: Flight[]): void {
    var responseFlights: FlightsResponse[] = [];

    for (const newFlight of newFlights) {

        const flightres: FlightsResponse = {
            id: newFlight.id,
            cityFrom: newFlight.cityFrom,
            cityTo: newFlight.cityTo,
            cityCodeTo: newFlight.cityCodeTo,
            airlines: newFlight.airlines,
            pnr_count: newFlight.pnr_count,
            has_airport_change: newFlight.has_airport_change,
            technical_stops: newFlight.technical_stops,
            price: newFlight.price,
            availability: {
                seats: newFlight.availability.seats,
            }
        }

        responseFlights.push(flightres)
        flights = responseFlights; //todo format flights in the required format
    }
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
