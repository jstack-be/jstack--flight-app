"use client"
import {MessageBox} from "@/app/ui/dashboard/message.box";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function Page() {
    const [isOpen, setIsOpen] = useState(true)

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
                <Button className="top-10 left-10 md:hidden" onClick={openModal}>
                    Show messages
                </Button>
            </div>
        </main>
    );
}