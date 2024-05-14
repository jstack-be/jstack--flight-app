import type {Metadata} from "next";
import {Inter,Jua} from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";



const jua = Jua({weight:"400", preload:false, variable:'--font-jua'})
const inter = Inter({subsets: ["latin"], variable:'--font-jua'});


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
            className={`${inter.className} ${jua.variable} h-screen bg-gradient-to-br from-background to-background-gradient overflow-hidden`}>
        {/*bg-gradient-to-br from-background to-background-gradient min-h-screen flex-col`}>*/}
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}

