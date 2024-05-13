import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

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
      <body className={`${inter.className} h-screen bg-gradient-to-br from-background to-background-gradient overflow-hidden`}>
      <Providers>
          {children}
      </Providers>
      </body>
    </html>
  );
}

