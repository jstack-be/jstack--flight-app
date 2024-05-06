"use client";
import React, {useState} from "react";
import {sendMessages} from "@/app/lib/actions";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {removeAllMessages} from "@/app/lib/storage";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function MessageForm() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;

        if (message?.trim() !== "") {
            const result = await sendMessages(formData);
            if (typeof result === 'object' && result !== null) {
                router.push('/dashboard')
            } else {
                removeAllMessages();
                setErrorMessage(result);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center m-2">
                <Label htmlFor="message">Where do you which to travel to?</Label>
            </div>

            <div className="flex justify-center relative m-2">
                <div className="relative w-8/12">
                    <Textarea className="w-full min-h-32 bg-background-text block resize-none" id="message"
                              name="message"
                              placeholder={"Please provide as much detail as possible"} required/>
                    <div className="absolute bottom-0 right-3 p-2 focus:border-ring">
                        <Button type="submit" className="">Search Routes</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center m-2">
                <p className="font-bold text-md text-center w-8/12">Example:
                </p>
                <p className="text-md text-center w-8/12">
                    &quot; Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1
                    child.
                    We plan to return between the 20th and 25th of December 2024. &quot;
                </p>
            </div>
            {errorMessage &&
                <div className="flex justify-center">
                    <Alert className="bg-red-400 text-white w-6/12">
                        <AlertTitle> An Error Occurred! </AlertTitle>
                        <AlertDescription>
                            {errorMessage}
                        </AlertDescription>
                    </Alert>
                </div>
            }
        </form>
    );
}