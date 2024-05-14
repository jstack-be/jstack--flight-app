"use client";
import React, {useEffect} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import useFlights from "@/app/lib/useFlights";
import {ArrowRight} from "lucide-react";

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
            <div className="flex justify-center relative m-2">
                <div className="relative w-full md:w-4/6">
                    <Textarea className="w-full h-48 md:h-60 bg-background-text resize-none rounded-lg" id="message"
                              name="message"
                              placeholder={"Simply type what you are looking for in this text field, " +
                                  "provide as much detail as possible to get the best result. " +
                                  "Here is an example: Show me the routes from London to Paris " +
                                  "on the 12th of December 2024" +
                                  " for 2 adults and 1 child returning between the 20th and 25th of December 2024."}
                              required/>
                    <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                        {isLoading ?
                            <Button disabled type="submit" className="">Loading...</Button> :
                            <Button type="submit" className="bg-amber-500 text-primary">Send <ArrowRight/></Button> //todo move to global css
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