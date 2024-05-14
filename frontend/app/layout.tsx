import type {Metadata} from "next";
import {Inter, Jua} from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

// const inter = Inter({subsets: ["latin"]});
const jua = Jua({weight:"400", preload:false})

export const metadata: Metadata = {
    title: "Planely",
    description: "Find your flights Easy with Planely",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body
            className={`${jua.className} h-screen bg-gradient-to-br from-background to-background-gradient overflow-hidden`}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}

