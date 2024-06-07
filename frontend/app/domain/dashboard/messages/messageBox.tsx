"use client"
import React, {useEffect, useRef} from "react";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {ArrowRight} from 'lucide-react';
import loading from "@/public/loading-message.gif";
import {useTranslations} from "next-intl";

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
    const t = useTranslations('MessageBox');
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
            <div className="flex justify-between lg:hidden m-4 mb-1">
                <h2 className="text-2xl">{t("Title")}</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            {/* h-[60dvh] */}
            <div className="overflow-y-auto h-[70dvh] md:h-4/6 lg:h-[75dvh] p-2 flex flex-col">
                {messages.filter(message => message.role !== 'system').map((message: ChatCompletionMessageParam, index: number) =>
                    <div key={index}
                         className={`${message.role == "user" ? "bg-textarea-user text-textarea-usertext self-start w-4/5" : "bg-textarea-system text-textarea-systemtext self-end "} text-sm m-2 mx-4 px-4 py-3 rounded w-3/5`}>
                        {message.content}
                    </div>)}
                {isLoading && <Image src={loading}
                                     alt="loading image" className="bg-textarea-system rounded self-end m-2 mx-4"
                                     height={40}/>}
                <div ref={messagesEndRef}/>
            </div>
            <form className="relative flex flex-col flex-grow items-center m-4 max-h-40 mt-auto"
                  onSubmit={handleSubmit}>
                <Textarea
                    className="flex-grow bg-textarea-system placeholder:text-textarea-input resize-none pb-6"
                    id="message" name="message"
                    placeholder={t("PlaceholderText")} required/>
                <Button
                    className="absolute bottom-3.5 right-3 text-secondary bg-inherit text-textarea-sendButtonText font-bold hover:bg-inherit"
                    disabled={isLoading}
                    type="submit">{t("SendButton")} <ArrowRight/></Button>
            </form>
        </div>
    )
}