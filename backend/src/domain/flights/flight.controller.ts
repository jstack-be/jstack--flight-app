import {Request, Response} from "express";
import {generateFlightSearchParameters} from "../messages/message.service";
import {getTravelData} from "./flight.service";
import {clearContent, getContent, saveFlights} from "../messages/message.response";


/**
 * Handles flight queries by generating flight search parameters based on the user's conversation,
 * fetching travel data from the flight search API, and sending the flights as the response.
 * This function handles exceptions internally and returns a response based on whether the operation was successful or not.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A promise that resolves when the response has been sent.
 */
export async function queryFlights(req: Request, res: Response): Promise<void> {
    try {
        const messages: string[] = req.body.messages;
        if (!messages || messages.length === 0) {
            res.status(400).send("No message provided");
            return;
        }

        const jsonObject = await generateFlightSearchParameters(messages);
        const flights = await getTravelData(jsonObject);
        saveFlights(flights);

        const response = getContent();
        res.status(200).send(response);
        clearContent();

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
            res.status(400).send('Bad Request: ' + error.message);
        } else {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}