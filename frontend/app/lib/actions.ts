"use server";

import {environment} from "@/app/lib/environment";
import {redirect} from "next/navigation";

//todo catch errors
export const sendMessages = async (messages: string[]) => {
    const url = environment.flightApiUrl;
    if (!url) throw new ReferenceError("FLIGHT_API_URL is not defined");

    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({messages: messages}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        const errorData = await res.text();
        console.error(errorData);
    } else {
        const responseBody = await res.json(); // Read the response body as JSON
        console.log(responseBody);
    }

    // revalidatePath('')
    redirect('/dashboard')
}



