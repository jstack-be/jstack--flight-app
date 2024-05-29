import {Flight, FlightsResponse} from "./flight.types";
import environment from "../../enviroment";
import createMD5Hash from "../../utils/hash.string";

/**
 * Converts an airline's IATA code to a logo URL.
 *
 * @param {string} airline_iata - The IATA code of the airline.
 * @returns {string} - The URL of the airline's logo.
 */
function convertToLogoUrl(airline_iata: string): string {
    const logoUrl = environment.logoSearchUrl;
    const searchParams = `${airline_iata}_50_50_s`
    const md5apikey = createMD5Hash(`${searchParams}_${environment.airhexApiKey}`);
    return `${logoUrl}${searchParams}.png?proportions=keep?md5apikey=${md5apikey}`;
}

/**
 * Formats an array of Flight objects into an array of FlightsResponse objects.
 *
 * @param {Flight[]} flights - An array of Flight objects.
 * @returns {FlightsResponse[]} - An array of FlightsResponse objects.
 */
export function formatFlights(flights: Flight[]): FlightsResponse[] {
    return flights.map(newFlight => {
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