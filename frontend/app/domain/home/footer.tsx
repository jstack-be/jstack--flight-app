import Image from "next/image";
import Link from "next/link";
import {Facebook, Mail, Twitter} from "lucide-react"; //TODO: Replace with UpdtoDate Icons
import logo from "@/public/logo-sm.svg";

export function Footer() {
    return (
        <footer className="flex-none md:h-48 bg-background-gradient flex sm:flex-row flex-col items-center md:justify-around text-primary">
            <Image src={logo} alt={"The logo of the application"} className="h-28 w-auto sm:hidden md:block"/>
            <div className="flex flex-col w-1/2 md:w-1/5 md:h-full md:mt-20 m-4">
                <p className="text-lg mb-1">Documents</p>
                <Link href="/privacy-policy" className="underline">Privacy policy </Link>
                <Link href="/terms-and-conditions" className="underline">Terms & Conditions</Link>
            </div>
            <div className="flex flex-col w-1/2 md:w-1/5 md:h-full md:mt-20 m-4">
                <p className="text-lg mb-1">Contact us</p>
                <div className="flex flex-col space-y-2">
                    <Link href="/" className="flex"><Facebook className="me-2"/> facebook.com/planely</Link>
                    <Link href="/" className="flex"><Twitter className="me-2"/> @Planely</Link>
                    <Link href="/" className="flex"><Mail className="me-2"/> info@planely.com</Link>
                </div>
            </div>
        </footer>
    );
}