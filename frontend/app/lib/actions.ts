"use server";

import {environment} from "@/app/lib/environment";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

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
        // console.log(res.body);
        console.log("Success");
    }

    revalidatePath('/')
    redirect('/dashboard')
}



