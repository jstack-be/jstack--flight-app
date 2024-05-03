"use client"
import React, {useEffect, useRef, useState} from "react";
import {sendMessages} from "@/app/lib/actions";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation'
import {addMessage, ChatCompletionMessageParam, getAllMessages, removeAllMessages} from "@/app/lib/storage";

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
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    const updateMessages = () => {
        const messages = getAllMessages()
        setMessages(messages);
    }

    useEffect(() => {
        updateMessages()
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const restartConversation = async () => {
        removeAllMessages()
        updateMessages()
        router.push('/')
    };

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form

        if (message?.trim() !== "") {
            const response = await sendMessages(formData);
            updateMessages()
        }
    }

    return (
        <div className="bg-gray-200 w-full min-h-screen p-6 md:w-1/3 flex-none md:relative absolute">
            <div className="flex justify-between md:hidden my-3">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-auto w-full md:h-4/6 h-1/3 border border-gray-300 p-2">
                {messages.map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-black" : "bg-red-950"} text-sm text-white m-2 px-4 py-3 rounded`}>
                        <strong className="font-bold">{message.role.toUpperCase()}:</strong><br/>
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