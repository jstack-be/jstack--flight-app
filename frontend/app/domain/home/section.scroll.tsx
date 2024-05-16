import {RefObject} from "react";
import styles from "./home.module.css";
import {ChevronDown, ChevronUp} from "lucide-react";

interface ScrollToSectionProps {
    children: React.ReactNode;
    goToSectionRef: React.RefObject<HTMLDivElement>;
    arrow: "up"| "down"| "none";
}

export default function ScrollToSection({children, goToSectionRef, arrow}: ScrollToSectionProps) {
    function scrollTo(section: RefObject<HTMLDivElement>) {
        section?.current?.scrollIntoView({behavior: "auto"});
    }

    return (
        <div className={styles.snapSection}>
            {children}

            {arrow !== "none" && (
                <button
                    className={`${arrow === "up" ? styles.upArrow : styles.downarrow} m-4 text-primary`}
                    onClick={() => scrollTo(goToSectionRef)}
                >

                    {arrow === "up" ? <ChevronUp className="w-30"/> : <ChevronDown className="w-30"/>}
                </button>
            )}
        </div>
    );
}