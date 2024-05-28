"use client"
import React, {useEffect, useRef} from "react";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import useFlights from "@/app/lib/client/useFlights";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";

interface MessageBoxProps {
    onClose: () => void,
    isOpen: boolean
}

/**
 * MessageBox component to display the messages and send new messages
 * @param onClose - function to close the message box
 * @param isOpen - boolean to check if the message box is open
 */
export function MessageBox({onClose, isOpen}: MessageBoxProps) {
    const {messages, sendMessage, isLoading} = useFlights();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form
        await sendMessage(message);
    }

    if (!isOpen) return;

    return (<>
        <div className="bg-gray-200 h-dvh p-6 w-full overflow-y-auto">
            <div className="flex justify-between lg:hidden mb-1">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-y-auto h-[60dvh] md:h-4/6 border border-gray-300 p-2 flex flex-col">
                {messages.filter(message => message.role !== 'system').map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-background-message text-primary self-start w-4/5" : "bg-primary text-black self-end w-4/5"} text-sm m-2 px-4 py-3 rounded`}>
                        {message.content}
                    </div>)}
                 <Image src="/loading-message.gif"
                      alt="loading image" className="bg-primary rounded self-end m-2" width={80} height={80}/>
                <div ref={messagesEndRef}/>
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <Textarea className="m-2 h-[17dvh] bg-white placeholder:text-textarea-placeholder resize-none"
                          id="message" name="message"
                          placeholder={"Ask some more questions to filter your result"} required/>
                {/*{isLoading ?*/}
                {/*    <Image src={"/spinning-plane.gif"} alt={"plane spinner"} className={""} width={60} height={60} unoptimized/> :*/}
                    <Button className="bg-button" disabled={isLoading} type="submit">Search Routes</Button>
                {/*}*/}
            </form>
        </div>
    </>);
}