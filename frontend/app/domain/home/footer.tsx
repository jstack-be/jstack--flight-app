import Image from "next/image";
import Link from "next/link";
import {Facebook, Mail, Twitter} from "lucide-react"; //TODO: Replace with Up To Date Icons
import logo from "@/public/logo-sm.svg";
import {useTranslations} from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="flex-none md:h-48 bg-background-gradient flex sm:flex-row flex-col items-center md:justify-around text-primary">
            <Image src={logo} alt={"The logo of the application"} className="h-28 w-auto sm:hidden md:block"/>
            <div className="flex flex-col m-4 w-1/2 md:w-1/5">
                <p className="text-lg mb-1">{t("Documents")}</p>
                {/*todo add connections to the pages*/}
                <Link href="/privacy-policy" className="underline">{t("PrivacyPolicy")}</Link>
                <Link href="/" className="underline">{t("TermsConditions")}</Link>
                <Link href="/" className="underline">{t("TermsUse")}</Link>
            </div>
            <div className="flex flex-col m-4 w-1/2 md:w-1/5">
                <p className="text-lg mb-1">{t("ContactUs")}</p>
                <div className="flex flex-col space-y-2">{/*todo add contacts*/}
                    <Link href="/" className="flex"><Facebook className="me-2"/> facebook.com/planely</Link>
                    <Link href="/" className="flex"><Twitter className="me-2"/> @Planely</Link>
                    <Link href="/" className="flex"><Mail className="me-2"/> info@planely.com</Link>
                </div>
            </div>
        </footer>
    );
}