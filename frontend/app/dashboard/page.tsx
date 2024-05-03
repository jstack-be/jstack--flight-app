"use client"
import {MessageBox} from "@/app/domain/dashboard/messages/message.box";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";
import {FlightCards, FlightCard} from "@/app/domain/dashboard/flights/FlightCard";

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


    return (
        <main className="flex">
            <MessageBox isOpen={isOpen} onClose={closeModal}/>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <h1 className={`mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolor dolorem natus obcaecati
                    odit, tempore. Distinctio, necessitatibus, recusandae! Deleniti earum expedita neque quos saepe!
                    Accusantium facilis illo veritatis voluptatum. Commodi.
                </div>
                <FlightCard cityFrom={"Brussel"}
                             cityTo={"Madrid"}
                             cityCodeTo={"MAD"}
                             airlines={["Ryanair", "Vueling"]}
                             pnr_count={105}
                             has_airport_change={false}
                             technical_stops={0}
                             price={50.0}
                             availability={{seats: 9}}

                />
                <Button className="top-10 left-10 md:hidden" onClick={openModal}>
                    Show messages
                </Button>
            </div>
        </main>
    );
}