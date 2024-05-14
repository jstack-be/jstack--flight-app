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

                    {/*    <div className="relative w-full md:w-10/12 lg:w-8/12">*/}
                    {/*<Textarea*/}
                    {/*    className="w-full sm:min-h-40 bg-background-text block resize-none text-xl min-h-44 pb-10 overflow-hidden"//TODO Text-xl afchecken*/}
                    {/*    id="message"*/}
                    {/*    name="message"*/}
                    {/*    placeholder={"\"Show me the routes from London to Paris on the 12th of December 2024 for " +*/}
                    {/*        "2 adults and 1 child. We plan to return between the 20th and 25th of December 2024.\""}*/}
                    {/*    required/>*/}
                    {/*<div className="absolute bottom-0 right-3 p-2 focus:border-ring text-white">*/}



                        {isLoading ?
                            <Button disabled type="submit" className="">Loading...</Button> :
                            <Button type="submit" className="bg-amber-500 text-primary hover:bg-amber-300">Send <ArrowRight/></Button> //todo move to global css
                            // <Button disabled type="submit" className="bg-gradient-to-br from-background-secondary to-background-secondary-gradient text-white">Loading...</Button> :
                            // <Button type="submit" className="bg-gradient-to-br from-secondary-background to-secondary-background-gradient text-white">Search Routes</Button>
                        }
                    </div>
                </div>
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