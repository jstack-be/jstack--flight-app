"use client";
import React from "react";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import useFlights from "@/app/lib/client/useFlights";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo-big.svg";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n.config";

export default function MainContent() {
    const router = useRouter()
    const t = useTranslations("MainContent");
    const {restartConversation, messages} = useFlights()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        await restartConversation(message);
        router.push('/dashboard')
    }

    return (
        <div className="flex flex-col items-center mx-6">
            <Image src={logo} alt={"The logo of the application"}
                   className="max-h-[40vh] md:max-h-[45vh] w-auto mb-14"/>
            <form onSubmit={handleSubmit} className="relative w-full md:w-8/12 flex flex-col">
                <Textarea
                    className="h-48 w-full bg-white placeholder:text-textarea-placeholder md:text-lg resize-none rounded-lg flex-grow"
                    id="message"
                    name="message"
                    placeholder={t("PlaceholderText")}
                    required/>
                <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                    <Button type="submit"
                            className="bg-secondary-background text-primary hover:bg-secondary-background-hover hover:text-secondary-text">
                        {t("SendButton")} <ArrowRight/>
                    </Button>
                </div>
            </form>
            {!!messages.length && <>
                <p className="text-lg m-2 text-primary">- or -</p>
                <Button className="bg-secondary-background-hover
                ring ring-transparent
                hover:ring-secondary-background
                hover:bg-secondary-background-hover
                text-secondary-text"
                        onClick={() => router.push('/dashboard')}>
                    {t("ContinueButton")}
                </Button>
            </>}
        </div>
    );
}