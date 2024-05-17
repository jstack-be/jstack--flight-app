"use client";
import React, {useEffect} from "react";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";
import useFlights from "@/app/lib/useFlights";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo-big.svg";

export default function MainContend() {
    const router = useRouter()
    const {removeAllMessages, sendMessage, isSuccess, isLoading} = useFlights()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;

        sendMessage(message);
    }

    useEffect(() => {
        if (isSuccess) {
            removeAllMessages()
            router.push('/dashboard')
        }
    }, [isSuccess, removeAllMessages, router]);


    function continueConversation() {
        router.push('/dashboard')
    }

    return (
        <div className="flex flex-col items-center mx-6">
            <Image src={logo} alt={"The logo of the application"}
                   className="max-h-[40vh] md:max-h-[45vh] w-auto mb-14"/>
            <form onSubmit={handleSubmit} className="relative w-full md:w-8/12">
                <Textarea
                    className="h-48 bg-white placeholder:text-textarea-placeholder md:text-lg resize-none rounded-lg"
                    id="message"
                    name="message"
                    placeholder={"Simply type what you are looking for in this text field, " +
                        "provide as much detail as possible to get the best result. " +
                        "Here is an example: Show me the routes from London to Paris " +
                        "on the 12th of December 2024" +
                        " for 2 adults and 1 child returning between the 20th and 25th of December 2024."}
                    required/>
                <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                    {isLoading ?
                        <Button disabled type="submit">Loading...</Button> :
                        <Button type="submit" className="bg-secondary-background text-primary hover:bg-amber-300"> {/*todo move to global css*/}
                            Send <ArrowRight/>
                        </Button>
                    }
                </div>
            </form>
            <p className="text-lg m-2 text-primary">- or -</p>
            <Button className="bg-amber-100 text-amber-600" onClick={continueConversation}>Continue with your previous
                search session</Button> {/*todo move to global css*/}
        </div>
    );
}