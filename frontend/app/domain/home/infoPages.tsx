import Image from "next/image";
import logo from "@/public/logo-big.svg";
import {useTranslations} from "next-intl";

interface ContentBlockProps {
    titel: string;
    children: React.ReactNode;
    className?: string; // Add this line
}

function ContentBlock({titel, children, className}: ContentBlockProps) {
    return (
        <div className={`flex flex-col lg:flex-row justify-around items-center ${className}`}>
            <div className="flex flex-col lg:w-3/6 p-6">
                <h2 className="text-5xl md:text-7xl text-primary font-sans">
                    {titel}
                </h2>
                <div className="text-background-dark py-3">
                    {children}
                </div>
            </div>
            <Image src={logo} alt={"The logo of the application"}
                   className="max-h-[40vh] md:max-h-[60vh] w-auto mb-14 hidden lg:block"/>
        </div>
    );
}


export function AboutPlanely() {
    const t = useTranslations("About");
    return (
        <ContentBlock titel={t("Title")} className={"h-full text-lg text-background-dark"}>
            <p className="pb-3">
                {t("Description")}
            </p>
            <p>
                {t("Example")}
            </p>
        </ContentBlock>
    );
}


export function HowToUse() {
    const t = useTranslations("Usage");

    return (
        <ContentBlock titel={t("Title")} className={"h-full"}>
            <p className="font-bold leading-relaxed text-xl">
                {t("Subtitle")}
            </p>

            <ol className="my-3 text-lg space-y-1 list-decimal list-inside">
                <li>{t("Step1")}</li>
                <li>{t("Step2")}</li>
                <li>{t("Step3")}</li>
            </ol>
        </ContentBlock>
    );
}

export function Examples() {
    const t = useTranslations("Examples");

    return (
        <ContentBlock titel={t("Title")} className={"mt-10"}>
            <p className="text-background-dark pb-3 font-bold text-xl">
                {t("Description")}
            </p>
            <ol className="text-background-dark leading-relaxed text-lg space-y-1 list-decimal list-inside">
                <li>{t("Example1")}</li>
                <li>{t("Example2")}</li>
                <li>{t("Example3")}</li>
            </ol>
        </ContentBlock>
    )
}
