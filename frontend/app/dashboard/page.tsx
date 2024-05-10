"use client"
import Image from 'next/image'
import {MessageBox} from "@/app/domain/dashboard/messages/message.box";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";


import logo from "@/public/logo.png";
import {FlightCards} from "@/app/domain/dashboard/flights/FlightCard";

export default function Page() {
    const {width} = useWindowSize();
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        if (width !== null) {
            setIsOpen(width >= 768);
        }
    }, [width]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    // const responseData = JSON.parse(localStorage.getItem('responseData') ?? 'null');

    const testData = require("@/app/domain/dashboard/flights/data.json")

    return (
        <main className="h-screen flex w-full fixed">
            <MessageBox isOpen={isOpen} onClose={closeModal}/>
            <div className="flex-grow flex flex-col">
                <div className="p-6 md:p-12 overflow-y-scroll">
                    <div className={"flex justify-center"}>
                        <Image src={logo} alt={"afbeelding van vliegtuig logo"} className={" h-28 w-auto "}/>
                        <h1 className="items-center justify-center text-primary text-6xl hidden sm:flex">
                            PLANELY
                        </h1>
                    </div>
                    {/*<FlightCards flights={responseData}/>*/}
                    <FlightCards flights={testData}/>
                </div>
                <Button className="top-10 left-10 md:hidden" onClick={openModal}>
                    Show messages
                </Button>

            </div>
        </main>
    );
}