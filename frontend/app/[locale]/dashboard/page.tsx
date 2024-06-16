"use client"
import Image from 'next/image'
import {MessageBox} from "@/app/domain/dashboard/messages/messageBox";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";


import logo from "@/public/logo-sm.svg";
import {FlightCards} from "@/app/domain/dashboard/flights/flightCard";
import {ArrowLeft, RefreshCw} from "lucide-react";
import useFlights from "@/app/lib/client/useFlights";
import {useTranslations} from "next-intl";
import {Locale, useRouter} from "@/i18n.config";
import LocaleSwitcher from "@/app/domain/LocaleSwitcher";
import {RefreshDialog} from "@/app/domain/dashboard/flights/refreshDialog";

export default function Page({params: {locale},}: Readonly<{ params: { locale: Locale }; }>) {
    const {width, height} = useWindowSize();
    const router = useRouter();
    const t = useTranslations('Dashboard');
    const [isOpen, setIsOpen] = useState(true);
    const {flights, messages, continueConversation, isLoading, isError, fetchData} = useFlights();

    useEffect(() => {
        if (width !== null && height !== null) {
            setIsOpen(height <= width && width >= 1024);
        }
    }, [width, height]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="h-screen w-full fixed lg:flex">
            <div className="flex absolute lg:relative w-full xl:1/5 lg:w-2/5 lg:space-x-4 z-40">
                <MessageBox isOpen={isOpen} onClose={() => setIsOpen(false)}
                            messages={messages}
                            isLoading={isLoading}
                            sendMessage={continueConversation}/>
            </div>
            <div className="flex flex-col w-full xl:w-4/5 h-full overflow-y-auto items-center p-6 z-10">
                <RefreshDialog flights={flights} fetchData={fetchData}/>
                <div
                    className={`fixed top-4 left-4 sm:ms-4 sm:left-1/3 z-20 space-x-4 ${(isOpen && width !== null && width < 1024) ? 'hidden' : ''}`}>
                    <Button
                        className={"bg-button rounded-full"}
                        onClick={() => router.push('/')}> <ArrowLeft/></Button>
                    <Button className="bg-button rounded-full" onClick={fetchData}
                            disabled={isLoading}><RefreshCw/></Button>
                    <LocaleSwitcher locale={locale}/>
                </div>
                <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={"h-32 w-auto my-6"}/>
                <FlightCards flights={flights} isLoading={isLoading} isError={isError}/>
            </div>
            {!isOpen &&
                <Button className="absolute bottom-0 w-full rounded-b-none"
                        onClick={() => setIsOpen(true)}>
                    {t('HistoryButton')}
                </Button>
            }
        </main>
    );
}