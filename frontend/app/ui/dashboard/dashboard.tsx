"use client"

import {MessageBox} from "@/app/ui/dashboard/message.box";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (<div className="relative">
            <div>
                Main Content
            </div>
            <Button className="top-10 left-10 md:hidden" onClick={openModal}>
                Show messages
            </Button>
            <MessageBox isOpen={isOpen} onClose={closeModal}/>
        </div>
    );
};