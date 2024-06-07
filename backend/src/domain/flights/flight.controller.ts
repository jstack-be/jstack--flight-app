import {Request, Response} from "express";
import {generateFlightSearchParameters} from "../messages/message.service";
import {getFlights} from "./flight.service";
import {ChatCompletionMessageParam} from "openai/resources";
import InvalidDateError from "../../errors/InvalidDateError";
import ResponseError from "../../errors/ResponseError";
import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ]
});
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
        logger.info('commence Querying flights');

        const messages: ChatCompletionMessageParam[] = req.body;
        if (!messages || messages.length === 0 || messages[0].content.length === 0) {
            res.status(400).send("No message provided");
            return;
        }

        const {message, searchParameters} = await generateFlightSearchParameters(messages);
        let flights = await getFlights(searchParameters);

        res.status(200).send({message, flights});
    } catch (error) {
        if (error instanceof ResponseError || error instanceof InvalidDateError) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send("An error occurred while processing the request. " +
                "Please change your request and try again.");
        }
    }
}