"use client"
import React, {useEffect, useRef} from "react";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation'
import useFlights from "@/app/lib/useFlights";
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
    const {messages, sendMessage, removeAllMessages, isLoading} = useFlights();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const restartConversation = async () => {
        removeAllMessages()
        router.push('/')
    };

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form
        sendMessage(message);

    }

    return (
        <div className="bg-gray-200 max-h-max p-6 md:w-1/4 md:relative absolute">
            <div className="flex justify-between md:hidden my-3">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-auto w-full md:h-4/6 h-1/3 border border-gray-300 p-2">
                {messages?.map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-message text-primary" : "bg-primary text-black"} text-sm m-2 px-4 py-3 rounded`}>
                        <strong className="font-bold">{message.role.toUpperCase()}:</strong><br/>
                        <span className="block sm:inline">{message.content}</span>
                    </div>)}
                <div ref={messagesEndRef}/>
            </div>
            <div className="mb-4 flex flex-col items-center">
                <Button className="bg-button" onClick={restartConversation}>Restart conversation</Button>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <Label className="m-2" htmlFor="message">Ask a filter question</Label>
                <Textarea className="m-2 bg-background-text" id="message" name="message"
                          placeholder={"Ask some more questions to filter your result"} required/>
                {isLoading ?
                    <Button disabled className="m-2 bg-button" type="submit">Loading ...</Button> :
                    <Button className="m-2 bg-button" type="submit">Search Routes</Button>
                }
            </form>
        </div>
    );
}