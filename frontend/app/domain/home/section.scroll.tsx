import {RefObject} from "react";
import styles from "./home.module.css";
import {ChevronDown, ChevronUp} from "lucide-react";

interface ScrollToSectionProps {
    children: React.ReactNode,
    goToSectionUpRef?: React.RefObject<HTMLDivElement>,
    goToSectionDownRef?: React.RefObject<HTMLDivElement>,
}

export default function ScrollToSection({ children, goToSectionUpRef, goToSectionDownRef }: ScrollToSectionProps) {
    function scrollTo(section: RefObject<HTMLDivElement>) {
        section?.current?.scrollIntoView({behavior: "auto"});
    }

    return (
        <div className={styles.snapSection}>
            {children}

            {goToSectionUpRef && (
                <button
                    className={`${styles.upArrow} m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionUpRef)}
                >
                    <ChevronUp className="w-30"/>
                </button>
            )}

            {goToSectionDownRef && (
                <button
                    className={`${styles.downArrow} m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionDownRef)}
                >
                    <ChevronDown className="w-30"/>
                </button>
            )}
        </div>
    );
}