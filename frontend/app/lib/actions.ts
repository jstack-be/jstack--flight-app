"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {environment} from "@/app/lib/environment";

//todo catch errors
export const addForm = async (formdata: FormData) => {
    const message = formdata.get("message");
    console.log(message)

    const url = environment.flightApiUrl;
    if (!url) throw new ReferenceError("FLIGHT_API_URL is not defined");

    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({messages: [message]}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) throw new Error("HTTP error " + res.status);

    console.log(await res.json());

    revalidatePath('')
    redirect('/dashboard')
}



