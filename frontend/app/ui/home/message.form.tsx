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
                <Label htmlFor="message">Where do you which to travel to?</Label>
            </div>
            <div className="flex justify-center m-2">
                <Textarea className="w-8/12 h-22" id="message" name="message"
                          placeholder={"Please provide as much detail as possible"} required/>
                <Button type="submit" className="h-22">Search Routes</Button>
            </div>
            <div className="flex justify-center m-2">
                <Label htmlFor="message" className="text-sm text-center text-slate-400 w-8/12">Example:<br/>
                    &quot; Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1 child.
                    We plan to return between the 20th and 25th of December 2024. &quot;
                </Label>
            </div>
        </form>
    );
}