import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import {Facebook, Mail, Twitter} from "lucide-react";

export function Footer() {
    return (
        <footer className="h-full md:h-2/6 bg-background-gradient flex md:flex-row flex-col items-center md:justify-around text-primary">
            <section className="flex flex-row">
                <Image src={logo} alt={"afbeelding van Planely logo"} className="h-2/3 w-1/3 md:h-full md:w-auto"/>
                <div className="flex flex-col justify-center">
                    <p className=" text-3xl">
                        PLANELY
                    </p>
                    <p className="text-sm">Fly Smarter, Plan Easier with Planely </p>
                </div>
            </section>
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