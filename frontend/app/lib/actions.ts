"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


export const addForm = async (formdata : FormData) => {
    const message = formdata.get("message");
    console.log(message)
    const res = await fetch("http://localhost:3000/messages", {
        method: 'POST',
        body: JSON.stringify({message}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(res)
    revalidatePath('/messages')
    redirect('/dashboard')
}



