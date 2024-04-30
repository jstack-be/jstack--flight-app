"use client"
import React, {useEffect, useRef, useState} from "react";
import {sendMessages} from "@/app/lib/actions";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation'
import {getAllMessages, removeAllMessages} from "@/app/lib/storage";

interface MessageBoxProps {
    onClose: () => void,
    isOpen: boolean
}

type Message = {
    source: 'user' | 'system',
    content: string
}

/**
 * MessageBox component to display the messages and send new messages
 * @param onClose - function to close the message box
 * @param isOpen - boolean to check if the message box is open
 */
export function MessageBox({onClose, isOpen}: MessageBoxProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    useEffect(() => {
        const messages = getAllMessages().map((message: string) => ({
            source: 'user', content: message
        }));
        setMessages(messages);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const restartConversation = async () => {
        setMessages([]);
        removeAllMessages()
        router.push('/')
    };

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form

        if (message?.trim() !== "") {
            const updatedMessages:Message[] = [...messages, {source: 'user', content: message}];
            const response = await sendMessages(formData);
            //if statement to check if the response is not a json object
            if (typeof response !== 'object') {
                updatedMessages.push({source: 'system', content: response});
            }
            setMessages(updatedMessages);
        }
    }

    return (
        <div className="bg-gray-200 w-full min-h-screen p-6 md:w-1/4 flex-none md:relative absolute">
            <div className="flex justify-between md:hidden my-3">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-auto w-full md:h-4/6 h-1/3 border border-gray-300 p-2">
                {messages.map((message: Message, index: number) =>
                    <div key={index} className={`${message.source == "user" ? "bg-black" : "bg-red-950"} text-sm text-white m-2 px-4 py-3 rounded`}>
                        <strong className="font-bold">{message.source.toUpperCase()}:</strong><br/>
                        <span className="block sm:inline">{message.content}</span>
                    </div>)}
                <div ref={messagesEndRef}/>
            </div>
            <div className="mb-4 flex flex-col items-center">
                <Button onClick={restartConversation}>Restart conversation</Button>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <Label className="m-2" htmlFor="message">Ask a filter question</Label>
                <Textarea className="m-2" id="message" name="message"
                          placeholder={"Ask some more questions to filter your result"} required/>
                <Button className="m-2" type="submit">Search Routes</Button>
            </form>
        </div>
    );
}