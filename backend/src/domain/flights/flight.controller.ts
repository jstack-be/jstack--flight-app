import {Request, Response} from "express";
import {generateFlightSearchParameters} from "../messages/message.service";
import {getTravelData} from "./flight.service";

export async function queryFlights(req: Request, res: Response): Promise<void> {
    try {
        const messages: string[] = req.body.messages;
        if (!messages || messages.length === 0) {
            res.status(400).send("No message provided");
            return;
        }

        const jsonObject = await generateFlightSearchParameters(messages);
        const flights = await getTravelData(jsonObject);
        res.status(200).send(flights);
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status code
            console.error('Server responded with an error:', error.response.status, error.response.data.error);
            res.status(error.response.status).send(error.response.data.error);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
            res.status(500).send('No response received from server');
        } else if (error instanceof ReferenceError) {
            console.error('Bad Request: ' + error.message);
            res.status(400).send('Bad Request: ' + error.message);
        } else {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}