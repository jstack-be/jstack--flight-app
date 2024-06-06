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
                    className={`hidden sm:block absolute top-5 left-0 right-0 mx-auto w-10 h-10 z-10 m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionUpRef)}
                >
                    <ChevronUp className="w-30"/>
                </button>
            )}

            {goToSectionDownRef && (
                <button
                    className={`hidden sm:block absolute bottom-5 left-0 right-0 mx-auto w-10 h-10 z-10 m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionDownRef)}
                >
                    <ChevronDown className="w-30"/>
                </button>
            )}
        </div>
    );
}