import {Request, Response} from "express";
import {handleDeleteMessages} from "./message.service";

export async function deleteMessages(req: Request, res: Response): Promise<void> {
    const succes = await handleDeleteMessages(req.body.id);
    if (succes) {
        res.status(200).send("Successfully removed conversation")
    } else {
        res.status(500).send("Something went wrong while trying to remove the conversation")
    }
}