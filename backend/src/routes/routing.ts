import {Express} from 'express';
import {deleteMessages} from '../domain/messages/message.controler';
import {queryFlights} from "../domain/flights/flight.controller";

export function mountHandlers(app: Express): void {
    app.delete('/messages', deleteMessages);
    app.get('/flights', queryFlights);
}