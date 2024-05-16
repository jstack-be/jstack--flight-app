"use client"
import React, {useEffect, useRef} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation'
import useFlights from "@/app/lib/useFlights";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {ArrowLeft} from 'lucide-react';

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

    //todo move outside the component
    if (!isOpen) return (<div className="z-0 absolute lg:fixed lg:m-3">
        <Button className="bg-button rounded-full" onClick={restartConversation}> <ArrowLeft/></Button>
    </div>);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form
        sendMessage(message);

    }

    return (<>
        <div className="bg-gray-200 h-dvh p-6 lg:w-4/12 md:relative overflow-y-auto">
            <div className="flex justify-between lg:hidden mb-1">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-y-auto h-[60dvh] md:h-4/6 border border-gray-300 p-2">
                {messages.map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-background-message text-primary mr-12" : "bg-primary text-black ml-12"} text-sm m-2 px-4 py-3 rounded`}>
                        <strong className="font-bold">{message.role.toUpperCase()}:</strong><br/>
                        <span className="block sm:inline">{message.content}</span>
                    </div>)}
                <div ref={messagesEndRef}/>
            </div>


            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <Textarea className="m-2 h-[17dvh] bg-white placeholder:text-textarea-placeholder resize-none"
                          id="message" name="message"
                          placeholder={"Ask some more questions to filter your result"} required/>
                {isLoading ?
                    <Button disabled className=" bg-button" type="submit">Loading ...</Button> :
                    <Button className="bg-button" type="submit">Search Routes</Button>
                }
            </form>
        </div>
        {/*//todo move outside the component 2*/}
        {isOpen && (
            <div className="relative">
                <div className="z-0 absolute lg:fixed lg:m-3">
                    <Button className="bg-button rounded-full" onClick={restartConversation}> <ArrowLeft/></Button>
                </div>
            </div>)}

    </>);
}