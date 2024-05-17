"use client"
import MainContend from "@/app/domain/home/main.contend";
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
                <ScrollToSection goToSectionRef={about} arrow={"down"}>
                    <ClientOnly>
                        <MainContend/>
                    </ClientOnly>
                </ScrollToSection>
            </section>
            <section ref={about} >
                <ScrollToSection goToSectionRef={home} arrow={"up"}>
                    <div className="flex flex-col justify-between">
                       <About/>
                        <Footer/>
                    </div>


                </ScrollToSection>
            </section>
        </main>
    );
}
