"use client"
import Image from 'next/image'
import {MessageBox} from "@/app/domain/dashboard/messages/messageBox";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";


import logo from "@/public/logo-sm.svg";
import {FlightCards} from "@/app/domain/dashboard/flights/flightCard";
import {ArrowLeft} from "lucide-react";
import useFlights from "@/app/lib/client/useFlights";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n.config";

export default function Page() {
    const {width, height} = useWindowSize();
    const router = useRouter();
    const t = useTranslations('Dashboard')
    const [isOpen, setIsOpen] = useState(true)
    const {flights, messages, sendMessage, isLoading, isError} = useFlights();

    useEffect(() => {
        if (width !== null && height !== null) {
            setIsOpen(height <= width && width >= 1024);
        }
    }, [width, height]);

    return (
        <main className="h-screen w-full fixed lg:flex">
                <div className="flex absolute lg:relative w-full xl:1/5 lg:w-2/5 lg:space-x-4 z-20">
                    <MessageBox isOpen={isOpen} onClose={() => setIsOpen(false)}
                                messages={messages}
                                isLoading={isLoading}
                                sendMessage={sendMessage}/>
                    <div className="width: 0; height: 0">
                        <Button
                            className={`absolute bg-button rounded-full m-4 ${(isOpen && width !== null && width < 1024) ? 'hidden' : ''}`}
                            onClick={() => router.push('/')}> <ArrowLeft/></Button>
                    </div>
                </div>
                <div className="flex flex-col w-full xl:w-4/5 h-full overflow-y-auto items-center p-6 z-10">
                    <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={"h-32 w-auto mb-6"}/>
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