"use client"
import React, {useEffect, useRef, useState} from "react";
import {sendMessages} from "@/app/lib/actions";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function MessageBox() {
    const [messages, setMessages] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement| null>(null);

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

    useEffect(() => {
        setMessages(JSON.parse(sessionStorage.getItem('messages') || '[]'));
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return (
        <div className="bg-gray-200 w-72 h-screen absolute left-0 top-0 p-6 sm:block hidden">
            {/* Content of the side box */}
            Side Box Content
            <div className="overflow-auto h-64 mb-4 border border-gray-300 p-2">
                {messages.map((message: string, index: number) => <p key={index}>{message}</p>)}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center m-2">
                    <Label htmlFor="message">Enter Task</Label>
                </div>
                <div className="flex justify-center m-2">
                    <Textarea className="w-8/12" id="message" name="message"
                              placeholder={"Please type your description here"} required/>
                </div>
                <div className="flex justify-center m-2">
                    <Button type="submit" className="">Add Task</Button>
                </div>
            </form>
        </div>
    );
}