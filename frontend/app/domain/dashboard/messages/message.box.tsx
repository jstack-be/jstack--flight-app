"use client"
import React, {useEffect, useRef} from "react";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";

interface MessageBoxProps {
    onClose: () => void,
    isOpen: boolean,
    messages: ChatCompletionMessageParam[],
    isLoading: boolean,
    sendMessage: (content: string, restart?: boolean) => Promise<void>
}

/**
 * MessageBox component to display the messages and send new messages
 * @param onClose - function to close the message box
 * @param isOpen - boolean to check if the message box is open
 * @param messages - array of messages to display
 * @param isLoading - boolean to check a message response is loading
 * @param sendMessage - function to send a new message
 */
export function MessageBox({onClose, isOpen, messages, isLoading, sendMessage}: MessageBoxProps) {
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

    return (
        <div className="bg-white h-screen w-full overflow-y-auto flex flex-col">
            <div className="flex justify-between lg:hidden mb-1">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div> {/* h-[60dvh] */}
            <div className="overflow-y-auto h-[70dvh] md:h-4/6 lg:h-[75dvh] p-2 flex flex-col">
                {messages.filter(message => message.role !== 'system').map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-textarea-user text-textarea-usertext self-start w-4/5" : "bg-textarea-system text-textarea-systemtext self-end w-4/5"} text-sm m-2 px-4 py-3 rounded`}>
                        {message.content}
                    </div>)}
                {isLoading && <Image src="/loading-message.gif"
                                     alt="loading image" className="bg-primary rounded self-end m-2" width={80}
                                     height={80}/>}
                <div ref={messagesEndRef}/>
            </div>
            <div className="flex-grow flex flex-col m-2 ">
                <form className="relative flex flex-col flex-grow items-center" onSubmit={handleSubmit}>


                    <Textarea className="flex-grow bg-textarea-system placeholder:text-textarea-input resize-none pb-6"
                              id="message" name="message"
                              placeholder={"Ask some more questions to filter your result"} required/>
                    <div className="absolute bottom-3.5 right-3 text-secondary">
                        <Button className="bg-inherit text-textarea-sendButtonText" disabled={isLoading}
                                type="submit">Search Routes</Button>
                    </div>

                </form>
            </div>
        </div>
    )
        ;
}