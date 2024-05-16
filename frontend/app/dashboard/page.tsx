"use client"
import Image from 'next/image'
import {MessageBox} from "@/app/domain/dashboard/messages/message.box";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";


import logo from "@/public/logo-sm.svg";
import {FlightCards} from "@/app/domain/dashboard/flights/flight.card";
import {ClientOnly} from "@/app/client.only";

export default function Page() {
    const {width, height} = useWindowSize();
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

    return (
        <main className="h-screen w-full fixed lg:flex z-10">
            <ClientOnly>
                <MessageBox isOpen={isOpen} onClose={closeModal}/>
                <div className="flex flex-col w-full h-full overflow-y-auto items-center p-6">
                    <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={"h-32 w-auto mb-6"}/>
                    <FlightCards/>
                </div>
                {!isOpen && <Button className="absolute bottom-0 w-full z-50 rounded-b-none" onClick={openModal}>Show message history </Button>}
            </ClientOnly>
        </main>
    );
}