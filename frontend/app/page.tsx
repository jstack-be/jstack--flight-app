"use client"
import MessageForm from "@/app/domain/home/message.form";
import Image from "next/image";
import logo from '../public/logo-big.svg'
import {ClientOnly} from "@/app/client.only";
import styles from "./domain/home/home.module.css";
import ScrollToSection from "@/app/domain/home/section.scroll";
import {useRef} from "react";
import {Footer} from "@/app/domain/home/footer";
import About from "@/app/domain/home/About";

export default function Home() {
    const home = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    return (
        <main className={styles.homeContainer}>
            <section className="h-screen" ref={home}>
                <ScrollToSection goToSectionRef={about} showArrow={true}>
                    <div className="flex justify-center items-end h-1/2">
                        <Image src={logo} alt={"The logo of the application"}
                               className="max-h-[40vh] md:max-h-[45vh] w-auto mb-14"/>
                    </div>
                    <ClientOnly>
                        <MessageForm/>
                    </ClientOnly>
                </ScrollToSection>
            </section>
            <section ref={about} >
                <ScrollToSection goToSectionRef={home} showArrow={true} isArrowUp={true}>
                    <div className="flex flex-col justify-between">
                       <About/>
                        <Footer/>
                    </div>


                </ScrollToSection>
            </section>
        </main>
    );
}
