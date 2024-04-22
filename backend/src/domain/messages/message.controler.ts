import {Request, Response} from "express";
import {handleDeleteMessages, handlePostMessages} from "./message.service";
import {getTravelData} from "../flights/flight.service";

export async function deleteMessages(req: Request, res: Response): Promise<void> {
    await handleDeleteMessages();
}

export async function postMessages(req: Request, res: Response): Promise<void> {
    try {
        const message = req.body.message;
        if (!message) {
            res.status(400).send("No message provided");
            return;
        }

        const jsonObject = await handlePostMessages(message);
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
            res.status(500).send('Internal Server Error');
        } else {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}