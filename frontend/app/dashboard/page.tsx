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
    const {width} = useWindowSize();
    const {height} = useWindowSize();
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
        <main className="h-screen w-full fixed lg:flex">
            <ClientOnly>
                <MessageBox isOpen={isOpen} onClose={closeModal}/>
                <div className="flex-grow flex flex-col">
                    <div className="p-6 md:p-12 overflow-y-auto">
                        <div className={"flex justify-center mb-6"}>
                            <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={" h-32 w-auto "}/>
                        </div>
                        <FlightCards/>
                    </div>
                </div>
                {!isOpen && <Button className=" m-8" onClick={openModal}>Show message history </Button>}
            </ClientOnly>
        </main>
    );
}