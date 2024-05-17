"use client"
import Image from 'next/image'
import {MessageBox} from "@/app/domain/dashboard/messages/message.box";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";


import logo from "@/public/logo-sm.svg";
import {FlightCards} from "@/app/domain/dashboard/flights/flight.card";
import {ClientOnly} from "@/app/client.only";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

export default function Page() {
    const {width, height} = useWindowSize();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        if (width !== null && height !== null) {
            setIsOpen(height <= width && width > 1024);
        }
    }, [width, height]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const returnHome = async () => {
        router.push('/')
    };

    return (
        <main className="h-screen w-full fixed lg:flex">
            <ClientOnly>
                <div className="flex absolute lg:relative w-full md:w-1/5 lg:space-x-4">
                    <MessageBox isOpen={isOpen} onClose={closeModal}/>
                    {!isOpen && <Button className={`bg-button rounded-full m-4`} onClick={returnHome}> <ArrowLeft/></Button>}
                </div>
                <div className="flex flex-col w-full md:w-4/5 h-full overflow-y-auto items-center p-6">
                    <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={"h-32 w-auto mb-6"}/>
                    <FlightCards/>
                </div>
                {!isOpen &&
                    <Button className="absolute bottom-0 w-full rounded-b-none" onClick={openModal}>Show message
                        history </Button>}
            </ClientOnly>
        </main>
    );
}