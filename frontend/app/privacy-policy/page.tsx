"use server"

import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default async function Page() {

    return (
        <main>
            <Link href="/">
                <Button className="bg-button rounded-full m-6">
                    <ArrowLeft/>
                </Button>
            </Link>
            <div className={"container md:w-4/6 mb-12"}>
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-6">Last Updated: 22/05/2024</p>

                <p className="mb-4">
                    Welcome to Planely. We are committed to protecting your privacy and ensuring the security of your
                    personal information. This Privacy Policy describes how we collect, use, and share information when
                    you use our application.
                </p>
                <p className="mb-4">
                    By using our Service, you agree to the collection and use of information in accordance with this
                    policy. If you do not agree with our policies and practices, please do not use our Service.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>

                <h3 className="text-xl font-semibold mt-4 mb-2">a. Information You Provide</h3>
                <p className="mb-4">
                    - <strong>Search Queries:</strong> When you use our Service, you provide search prompts to find
                    flights, such as destination, dates, and other travel preferences.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">b. Information Automatically Collected</h3>
                <p className="mb-4">
                    - <strong>Public IP Address:</strong> We automatically collect your public IP address when you
                    access our Service. This helps us assist you in filling in the departure location by identifying
                    your approximate geographical location.
                </p>
                <p className="mb-4">
                    - <strong>Usage Data:</strong> We may collect information about how you access and use our Service.
                    This may include your browser type, device type, pages visited, time spent on pages, and other
                    diagnostic data.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the collected information for the following purposes:</p>
                <p className="mb-4">
                    - <strong>To Provide and Improve Our Service:</strong> Using your public IP address to suggest
                    departure locations and refine search results.
                </p>
                <p className="mb-4">
                    - <strong>To Personalize Your Experience:</strong> Tailoring our Service to better meet your needs
                    and preferences.
                </p>
                <p className="mb-4">
                    - <strong>To Analyze Usage:</strong> Understanding how our Service is used to enhance its
                    functionality and user experience.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Sharing Your Information</h2>
                <p className="mb-4">We do not sell, trade, or otherwise transfer your personally identifiable
                    information to outside parties except as described below:</p>
                <p className="mb-4">
                    - <strong>Service Providers:</strong> We may share your information with third-party service
                    providers who assist us in operating our Service and conducting our business.
                </p>
                <p className="mb-4">
                    - <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law
                    or in response to valid requests by public authorities (e.g., a court or a government agency).
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Security of Your Information</h2>
                <p className="mb-4">
                    We implement reasonable security measures to protect your information from unauthorized access,
                    alteration, disclosure, or destruction. However, no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">5. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page. Changes are effective when they are posted on this page.
                </p>

                <p>
                    Thank you for using Planely. We value your privacy and are committed to protecting your personal
                    information.
                </p>
            </div>
        </main>
    );
}