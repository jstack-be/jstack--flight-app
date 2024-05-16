import {RefObject} from "react";
import styles from "./home.module.css";
import Image from "next/image";
import downArrow from "@/public/downarrow.svg";
import upArrow from "@/public/downarrow.svg";

interface ScrollToSectionProps {
    children: React.ReactNode;
    goToSectionRef: React.RefObject<HTMLDivElement>;
    showArrow: boolean;
    isArrowUp?: boolean;
}

export default function ScrollToSection({children, goToSectionRef, showArrow, isArrowUp}: ScrollToSectionProps) {
    function scrollTo(section: RefObject<HTMLDivElement>) {
        section?.current?.scrollIntoView({behavior: "auto"});
    }

    return (
        <div className={styles.snapSection}>
            {children}

            {showArrow && (
                <button
                    className={`${isArrowUp ? styles.upArrow : styles.downarrow} m-4`}
                    onClick={() => scrollTo(goToSectionRef)}
                >

                    <Image src={isArrowUp ? upArrow : downArrow} alt={"pijl naar onder"}/>
                </button>
            )}
        </div>
    );
}