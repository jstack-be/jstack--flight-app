import {RefObject, useRef} from "react";
import styles from "./home.module.css";
import Image from "next/image";
import downarrow from "@/public/downarrow.svg";

interface ScrollToSectionProps {
    children: React.ReactNode;
    goToSectionRef: React.RefObject<HTMLDivElement>;
    showArrow: boolean;
}

export default function ScrollToSection({children, goToSectionRef, showArrow}: ScrollToSectionProps) {
    function scrollTo(section: RefObject<HTMLDivElement>) {
        section?.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <div className={styles.snapSection}>
            {children}
            {showArrow && (
                <button
                    className={styles.downarrow}
                    onClick={() => scrollTo(goToSectionRef)}
                >
                    <Image src={downarrow} alt={"pijl naar onder"}/>
                </button>
            )}
        </div>
    );
}