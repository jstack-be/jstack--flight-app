"use client";

import {getURL} from "./environment";
import {addMessage} from "@/app/lib/storage";

//todo catch errors
export const sendMessages = async (formData: FormData) => {
    const message = formData.get("message");
    console.info(message)
    if (!message) {return 'No message provided';}
    const messageHistory = addMessage(message.toString(), 'user');

    const res = await fetch( await getURL(), {
        method: 'POST',
        body: JSON.stringify(messageHistory),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const responseObject = await res.json()
        addMessage(responseObject.message, 'assistant');
        return responseObject.flights;
    }

    //todo catch errors and convert to human like string
    const errorMessage = await res.text();
    addMessage(errorMessage, 'assistant');
    return errorMessage;
}



