import {Express} from 'express';
import {queryFlights} from "../domain/flights/flight.controller";

export function mountHandlers(app: Express): void {
    app.get('/flights', queryFlights);
}