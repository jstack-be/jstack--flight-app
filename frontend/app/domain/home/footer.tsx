import Image from "next/image";
import Link from "next/link";
import {Facebook, Mail, Twitter} from "lucide-react"; //TODO: Replace with UpdtoDate Icons
import logo from "@/public/logo-sm.svg";

export function Footer() {
    return (
        <footer className="flex-none md:h-52 bg-background-gradient flex md:flex-row flex-col items-center md:justify-around text-primary">
            <Image src={logo} alt={"The logo of the application"} className="h-1/2 w-auto"/>
            <div className="flex flex-col m-4 w-1/2 md:w-1/5">
                <p className="text-lg mb-1">Documents</p>
                {/*todo add connections to the pages*/}
                <Link href="/" className="underline">Privacy policy </Link>
                <Link href="/" className="underline">Terms & Conditions</Link>
                <Link href="/" className="underline">Terms of Use</Link>
            </div>
            <div className="flex flex-col m-4 w-1/2 md:w-1/5">
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