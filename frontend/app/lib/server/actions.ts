"use server";

import {getBackendURL, getLocationURL} from "./environment";
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

//todo check if it gives the current location or the location from the frontend server
// change to client side
export async function getUserLocation() {
    const res = await fetch(`${await getLocationURL()}&fields=city,country_name,languages,currency`);
    if (!res.ok) {
        throw new Error('Could not connect to the server');
    }
    return await res.json();
}