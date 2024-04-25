import {Express} from 'express';
import {queryFlights} from "../domain/flights/flight.controller";

/**
 * Mounts the flight query handler to the Express application.
 *
 * @param {Express} app - The Express application.
 */
export function mountHandlers(app: Express): void {
    app.post('/api/flights', queryFlights);
}