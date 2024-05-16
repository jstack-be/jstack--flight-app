import {RefObject} from "react";
import styles from "./home.module.css";
import {ChevronDown, ChevronUp} from "lucide-react";

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
                    className={`${isArrowUp ? styles.upArrow : styles.downarrow} m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionRef)}
                >

                    {isArrowUp ? <ChevronUp className="w-30"/> : <ChevronDown className="w-30"/>}
                </button>
            )}
        </div>
    );
}