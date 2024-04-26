"use client"
import React from "react";
import {sendMessages} from "@/app/lib/actions";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"

export default function MessageForm() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message");

        if (message) {
            // get the existing messages from session storage
            const messageHistory = JSON.parse(sessionStorage.getItem('messages') || '[]');
            console.log(messageHistory)
            // add the new message to the array
            messageHistory.push(message);
            // store the updated array in session storage
            sessionStorage.setItem('messages', JSON.stringify(messageHistory));
            await sendMessages(messageHistory);
        }
    }

    return (
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
    );
}