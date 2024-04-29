"use client"
import React, {useEffect, useRef, useState} from "react";
import {sendMessages} from "@/app/lib/actions";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface MessageBoxProps {
    onClose: () => void,
    isOpen: boolean
}

export function MessageBox({onClose, isOpen}: MessageBoxProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMessages(JSON.parse(sessionStorage.getItem('messages') || '[]'));
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        event.currentTarget.reset(); // Clear the form

        if (message?.trim() !== "") {
            const updatedMessages = [...messages, message];
            setMessages(updatedMessages);
            sessionStorage.setItem('messages', JSON.stringify(updatedMessages));
            await sendMessages(updatedMessages);
        }
    }

    return (
        <div className="bg-gray-200 w-full h-screen absolute left-0 top-0 p-6">
            <div className="flex justify-between md:hidden my-3">
                <h2 className="text-2xl">Message History</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <div className="overflow-auto h-4/6 mb-4 border border-gray-300 p-2">
                {messages.map((message: string, index: number) => <div key={index}
                                                                       className="bg-black text-sm text-gray-400 m-2 px-4 py-3 rounded relative"
                                                                       role="alert">
                    <strong className="font-bold">Message {index + 1}</strong><br/>
                    <span className="block sm:inline">{message}</span>
                </div>)}
                <div ref={messagesEndRef}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center m-2">
                    <Label htmlFor="message">Ask a filter question</Label>
                </div>
                <div className="flex justify-center m-2">
                    <Textarea className="" id="message" name="message"
                              placeholder={"Ask some more questions to filter your result"} required/>
                </div>
                <div className="flex justify-center m-2">
                    <Button type="submit" className="">Search Routes</Button>
                </div>
            </form>
        </div>
    );
}