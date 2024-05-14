"use client";
import React, {useEffect} from "react";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import useFlights from "@/app/lib/useFlights";

export default function MessageForm() {
    const router = useRouter()
    const {removeAllMessages, sendMessage, isError, errorMessage, isSuccess, isLoading} = useFlights()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;

        sendMessage(message);
    }


    useEffect(() => {
        if (isError) {
            removeAllMessages();
        }
    }, [isError, errorMessage, removeAllMessages]);

    useEffect(() => {
        if (isSuccess) {
            router.push('/dashboard')
            return;
        }
    }, [isSuccess, router]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 text-secondary">
                <Label htmlFor="message">Where do you which to travel to?</Label>
            </div>

            <div className="flex justify-center relative m-2">
                <div className="relative w-8/12">
                    <Textarea
                        className="w-full min-h-40 bg-background-text block resize-none text-xl pb-10 overflow-hidden"//TODO Text-xl afchecken
                        id="message"
                        name="message"
                        placeholder={"\"Show me the routes from London to Paris on the 12th of December 2024 for " +
                            "2 adults and 1 child. We plan to return between the 20th and 25th of December 2024.\""}
                        required/>
                    <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                        {isLoading ?
                            <Button disabled type="submit" className="">Loading...</Button> :
                            <Button type="submit" className="">Search Routes</Button>
                        }
                    </div>
                </div>
            </div>
            {isError &&
                <div className="flex justify-center">
                    <Alert className="bg-red-400 text-white w-6/12">
                        <AlertTitle> Planely could not resolve your request: </AlertTitle>
                        <AlertDescription>
                            {errorMessage}
                        </AlertDescription>
                    </Alert>
                </div>
            }
        </form>
    );
}