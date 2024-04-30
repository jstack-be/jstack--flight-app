"use client";

import {getURL} from "./environment";
import {addMessage, IMessage} from "@/app/lib/storage";

//todo catch errors
export const sendMessages = async (formData: FormData) => {
    const message = formData.get("message");
    if (!message) return 'No message provided';
    const messageHistory = addMessage({source: 'user', content: message.toString()});
    const messages = messageHistory.map((message:IMessage) => message.content);

    const res = await fetch(await getURL(), {
        method: 'POST',
        body: JSON.stringify({messages: messages}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const responseObject = await res.json()
        addMessage({source: 'system', content: responseObject.message});
        return responseObject.flights;
    }

    //todo catch errors and convert to human like string
    addMessage({source: 'system', content: await res.text()});
}



