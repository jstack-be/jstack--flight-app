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
            <div className={"container md:w-4/6 mb-12 space-y-4"}>
                <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-gray-600 mb-6">Last Updated: 07/06/2024</p>

                <p>Welcome to Planenly, a travel search engine application that uses OpenAI technology to transform user
                    messages into flight searches. By accessing or using our service, you agree to comply with and be
                    bound by the following terms and conditions. Please review them carefully.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
                <p>By using Planenly, you accept and agree to these Terms and Conditions, as well as our Privacy Policy,
                    which is incorporated herein by reference. If you do not agree to these terms, please do not use our
                    services.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description of Service</h2>
                <p>Planenly is a travel search engine that leverages OpenAI technology to interpret user messages and
                    provide relevant flight search results. Our service aims to simplify the process of finding flights by understanding natural language queries.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Responsibilities</h2>
                <ul>
                    <li><strong>Prohibited Activities:</strong> You agree not to misuse our service, including but not
                        limited to engaging in fraudulent activities, sending spam, or attempting to disrupt our
                        service.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Use of OpenAI Technology</h2>
                <p>Planenly utilizes OpenAI&apos;s language model to transform user messages into flight search queries. By
                    using our service, you acknowledge and agree to the following:</p>
                <ul>
                    <li><strong>Data Processing:</strong> Your messages and queries will be processed by OpenAI&apos;s
                        technology to generate flight search results.
                    </li>
                    <li><strong>Accuracy:</strong> While we strive to provide accurate and relevant results, we cannot
                        guarantee the accuracy of the information provided by OpenAI.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">5. Privacy Policy</h2>
                <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                    and protect your information.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
                <p>All content, trademarks, and data on Planenly, including but not limited to text, graphics, logos,
                    and software, are the property of Planenly or its licensors and are protected by applicable
                    intellectual property laws.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
                <ul>
                    <li><strong>Service Availability:</strong> Planenly does not guarantee that our service will be
                        available at all times or free from errors.
                    </li>
                    <li><strong>Use of Information:</strong> Planenly is not responsible for any decisions you make
                        based on the information provided through our service.
                    </li>
                    <li><strong>Third-Party Services:</strong> Our service may include links to third-party websites or
                        services. We are not responsible for the content or practices of these third parties.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">8. Indemnification</h2>
                <p>You agree to indemnify, defend, and hold harmless Planenly, its affiliates, and its respective
                    officers, directors, employees, and agents from any claims, liabilities, damages, and expenses
                    arising out of your use of our service or your violation of these terms.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective
                    immediately upon posting on our website. Your continued use of our service after any such changes
                    constitutes your acceptance of the new terms.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Information</h2>
                <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                <p><strong>Email:</strong> support@planenly.com</p>

                <p>Thank you for choosing Planenly!</p>
            </div>
        </main>
    );
}

