"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


export const addForm = async (formdata : FormData) => {
    const message = formdata.get("message");
    console.log(message)
    const res = await fetch("http://localhost:4000/api/flights", {
        method: 'POST',
        body: JSON.stringify({messages:[message]}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the response is ok (status in the range 200-299)
    if (!res.ok) {
        throw new Error("HTTP error " + res.status);
    }

    // Read the body of the response
    const body = await res.json(); // use .text() for plain text

    console.log(body);

    revalidatePath('/messages')
    redirect('/dashboard')
}



