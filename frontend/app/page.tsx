"use client"
import MessageForm from "@/app/domain/home/message.form";
import Image from "next/image";
import logo from '../public/logo.png'
import {ClientOnly} from "@/app/client.only";
import styles from "./domain/home/home.module.css";
import ScrollToSection from "@/app/domain/home/section.scroll";
import {useRef} from "react";
import {Footer} from "@/app/domain/home/footer";

export default function Home() {
    const home = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    return (
        <main className={styles.homeContainer}>
            <section className="h-screen" ref={home}>
                <ScrollToSection goToSectionRef={about} showArrow={true}>
                    <div className={"flex-col text-primary flex items-center justify-between"}>
                        <Image src={logo} alt={"afbeelding van vliegtuig logo"} className="h-72 w-auto "/>
                        <h1 className="items-center justify-center text-primary text-6xl flex">
                            PLANELY
                        </h1>
                        <p className="h-[58px] text-2xl mb-6 mt-3">We will find your ideal flight</p>
                    </div>
                    <ClientOnly>
                        <MessageForm/>
                    </ClientOnly>
                </ScrollToSection>
            </section>
            <section ref={about} className="h-screen flex flex-col">
                <ScrollToSection goToSectionRef={home} showArrow={false}>
                    <div className="h-screen flex flex-col">
                        <div className="flex-grow pb-96">
                            <h2 className="text-2xl text-primary">About</h2>
                            <p className="text-secondary">
                                Planelly is a flight booking assistant that helps you find the best flights for your
                                travel
                                needs.
                                Simply provide as much detail as possible about your travel plans and we will provide
                                you
                                with the best options available.
                            </p>
                        </div>
                        <Footer/>
                    </div>
                </ScrollToSection>
            </section>
        </main>
    );
}
