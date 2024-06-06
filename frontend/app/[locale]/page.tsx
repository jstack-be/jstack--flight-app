"use client"
import MainContent from "@/app/domain/home/mainContent";
import {ClientOnly} from "@/app/client.only";
import styles from "../domain/home/home.module.css";
import ScrollToSection from "@/app/domain/home/sectionScroll";
import {useRef} from "react";
import {Footer} from "@/app/domain/home/footer";
import {AboutPlanely, Examples, HowToUse} from "@/app/domain/home/infoPages";


type Props = {
    params: { locale: string };
};

export default function Home({params: {locale}}: Props) {

    const home = useRef<HTMLDivElement | null>(null);
    const about = useRef<HTMLDivElement | null>(null);
    const usage = useRef<HTMLDivElement | null>(null);
    const example = useRef<HTMLDivElement | null>(null);

    return (
        <main className={styles.homeContainer}>
            <section className="h-screen" ref={home}>
                <ScrollToSection goToSectionDownRef={about}>
                    <ClientOnly>
                        <MainContent/>
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
                        <div className="flex-grow content-center">
                            <Examples/>
                        </div>

                        <Footer/>
                    </div>
                </ScrollToSection>
            </div>
        </main>
    );
}
