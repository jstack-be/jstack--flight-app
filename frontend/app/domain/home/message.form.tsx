"use client";
import React, {useState} from "react";
import {sendMessages} from "@/app/lib/actions";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";

export default function MessageForm() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form

        if (message?.trim() !== "") {
            const result = await sendMessages(formData);
            if (typeof result === 'object' && result !== null) {
                localStorage.setItem('responseData', JSON.stringify(result));
                router.push('/dashboard')
            } else {
                setErrorMessage(result);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 text-secondary">
                <Label htmlFor="message">Where do you which to travel to?</Label>
            </div>

            <div className="flex justify-center relative m-2">
                <div className="relative w-8/12">
                    <Textarea  className="w-full min-h-32 bg-background-text block resize-none" id="message" name="message"
                              placeholder={"Please provide as much detail as possible"} required/>
                    <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                        <Button type="submit" className="">Search Routes</Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center m-2">
                {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-md text-center w-8/12 text-secondary">Example:
                </p>
                <p className="text-md text-center w-8/12 text-secondary">
                    &quot; Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1
                    child.
                    We plan to return between the 20th and 25th of December 2024. &quot;
                </p>
            </div>
        </form>
    );
}