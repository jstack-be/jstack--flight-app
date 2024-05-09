"use server";

import {getURL} from "./environment";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";

export async function queryFlights(messageHistory: ChatCompletionMessageParam[]) {
    if (messageHistory.length === 0) return Promise.resolve({flights: []});
    const res = await fetch(await getURL(), {
        method: 'POST',
        body: JSON.stringify(messageHistory),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || 'Could not connect to the server');
    }
    return await res.json();
}

