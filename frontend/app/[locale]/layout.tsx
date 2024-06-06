import type {Metadata} from "next";
import {Inter, Jua} from "next/font/google";
import "../globals.css";
import Providers from "@/app/providers";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import LocaleSwitcher from "@/app/domain/LocaleSwitcher";
import {Locale} from "@/i18n.config";


const jua = Jua({weight: "400", preload: false, variable: '--font-jua'})
const inter = Inter({subsets: ["latin"], variable: '--font-jua'});


export const metadata: Metadata = {
    title: "Planely",
    description: "Find your flights Easy with Planely",
};

export default async function RootLayout({
                                             children,
                                             params: {locale}
                                         }: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body
            className={`${inter.className} ${jua.variable} h-screen bg-gradient-to-br from-background to-background-gradient`}>
        <NextIntlClientProvider messages={messages}>
            <Providers>
                <LocaleSwitcher locale={locale}/>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}

