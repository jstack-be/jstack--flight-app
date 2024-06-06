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
    const {sendMessage, refreshData, isLoading, messages} = useFlights()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("message") as string;
        await sendMessage(message, true);
        router.push('/dashboard')
    }

    function continueConversation() {
        refreshData()
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
                    placeholder={t("PlaceholderText", {date: new Date().toISOString().split('T')[0]})}
                    required/>

                {isLoading ?
                    <div
                        className={"absolute bottom-0 w-full h-full rounded-lg bg-white bg-opacity-75 flex justify-center items-center flex-grow"}>
                        <Image src={"/spinning-plane.gif"} alt={"plane spinner"} className={""} width={100}
                               height={100} unoptimized/>
                    </div> :
                    <div className="absolute bottom-0 right-3 p-2 focus:border-ring text-secondary">
                        <Button type="submit"
                                className="bg-gradient-to-br from-secondary-background to-secondary-background-gradient text-primary hover:bg-amber-300"> {/*todo move to global css*/}
                            {t("SendButton")} <ArrowRight/>
                        </Button>
                    </div>
                }
            </form>
            {!!messages.length && !isLoading && <>
                <p className="text-lg m-2 text-primary">- or -</p>
                <Button className="bg-amber-100 text-amber-600"
                        onClick={continueConversation}>{/*todo move to global css*/}
                    {t("ContinueButton")}
                </Button>
            </>}
        </div>
    );
}