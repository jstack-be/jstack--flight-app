"use client";

import {getURL} from "./environment";
import {addMessage} from "@/app/lib/storage";

//todo catch errors
export const sendMessages = async (formData: FormData) => {
    const message = formData.get("message");
    if (!message) return 'No message provided';
    const messageHistory = addMessage(message as string);

    const res = await fetch(await getURL(), {
        method: 'POST',
        body: JSON.stringify({messages: messageHistory}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) return await res.json();

    return await res.text();
}



