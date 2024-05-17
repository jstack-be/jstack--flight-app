"use client"
import MainContend from "@/app/domain/home/main.contend";
import {ClientOnly} from "@/app/client.only";
import styles from "./domain/home/home.module.css";
import ScrollToSection from "@/app/domain/home/section.scroll";
import {useRef} from "react";
import {Footer} from "@/app/domain/home/footer";
import {AboutPlanely, Examples, HowToUse} from "@/app/domain/home/About";

export default function Home() {
    const home = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    const usage = useRef<HTMLDivElement | null>(null);
    const example = useRef<HTMLDivElement | null>(null);

    return (
        <main className={styles.homeContainer}>
            <section className="h-screen" ref={home}>
                <ScrollToSection goToSectionDownRef={about}>
                    <ClientOnly>
                        <MainContend/>
                    </ClientOnly>
                </ScrollToSection>
            </section>
            <section ref={about}>
                <ScrollToSection goToSectionUpRef={home} goToSectionDownRef={usage}>
                    <AboutPlanely/>
                </ScrollToSection>
            </section>
            <div ref={usage}>
                <ScrollToSection goToSectionUpRef={about} goToSectionDownRef={example}>
                    <HowToUse/>
                </ScrollToSection>
            </div>
            <div ref={example}>
                <ScrollToSection goToSectionUpRef={usage}>
                    <div className="flex flex-col justify-between h-full">
                        <Examples/>
                        <Footer/>
                    </div>
                </ScrollToSection>
            </div>
        </main>
    );
}
