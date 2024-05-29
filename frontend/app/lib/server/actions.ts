"use server";

import {getBackendURL} from "./environment";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";

export async function queryFlights(messageHistory: ChatCompletionMessageParam[]) {
    if (messageHistory.length === 0) return Promise.resolve({flights: []});
    try {
        const res = await fetch(await getBackendURL(), {
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
    } catch (error) {
        if (error instanceof Error) {
            return {status: 200, error: error.message};
        } else {
            return {status: 200, error: 'An unknown error occurred'};
        }
    }
}