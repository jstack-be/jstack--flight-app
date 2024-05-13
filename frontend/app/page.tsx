"use client";

import Image from "next/image";
import MessageForm from "@/app/domain/home/message.form";

import logo from '../public/logo.png'
import styles from "./domain/home/home.module.css";
import ScrollToSection from "@/app/domain/home/section.scroll";
import {useRef} from "react";
import {ClientOnly} from "@/app/client.only";

export default function Home() {
    const home = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    return (
        <main className={styles.homeContainer}>
            <div className="h-screen" ref={home}>
                <ScrollToSection goToSectionRef={about} showArrow={true}>
                    <div className={"flex-col flex items-center justify-between"}>
                        <Image src={logo} alt={"afbeelding van vliegtuig logo"} className="h-72 w-auto "/>
                        <h1 className="items-center justify-center text-primary text-6xl flex">
                            PLANELY
                        </h1>
                    </div>
                    <ClientOnly>
                    <MessageForm/>
                    </ClientOnly>
                </ScrollToSection>
            </div>
            <div ref={about} className="h-screen">
                <ScrollToSection goToSectionRef={home} showArrow={false}>
                    <h2 className="text-2xl text-primary">About</h2>
                    <p className="text-secondary">
                        Planelly is a flight booking assistant that helps you find the best flights for your travel
                        needs.
                        Simply provide as much detail as possible about your travel plans and we will provide you with
                        the
                        best options available.
                    </p>
                </ScrollToSection>
            </div>
        </main>
    );
}
