import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export default function Page({params: {locale},}: Readonly<{ params: { locale: string } }>) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("TermsAndConditions");

    return (
        <main>
            <Link href="/">
                <Button className="bg-button rounded-full m-6">
                    <ArrowLeft/>
                </Button>
            </Link>
            <div className={"container md:w-4/6 mb-12 space-y-4"}>
                <h1 className="text-4xl font-bold mb-4">{t("Title")}</h1>
                <p className="text-gray-600 mb-6">{t("LastUpdated")}</p>

                <p>{t("Intro")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("AcceptanceOfTerms.Title")}</h2>
                <p>{t("AcceptanceOfTerms.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("DescriptionOfService.Title")}</h2>
                <p>{t("DescriptionOfService.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("UserResponsibilities.Title")}</h2>
                <ul>
                    <li>{t("UserResponsibilities.ProhibitedActivities")}</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("UseOfOpenAITechnology.Title")}</h2>
                <p>{t("UseOfOpenAITechnology.DataProcessing")}</p>
                <p>{t("UseOfOpenAITechnology.Accuracy")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("PrivacyPolicy.Title")}</h2>
                <p>{t("PrivacyPolicy.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("IntellectualProperty.Title")}</h2>
                <p>{t("IntellectualProperty.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("LimitationOfLiability.Title")}</h2>
                <ul>
                    <li>{t("LimitationOfLiability.ServiceAvailability")}</li>
                    <li>{t("LimitationOfLiability.UseOfInformation")}</li>
                    <li>{t("LimitationOfLiability.ThirdPartyServices")}</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("Indemnification.Title")}</h2>
                <p>{t("Indemnification.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("ChangesToTerms.Title")}</h2>
                <p>{t("ChangesToTerms.Content")}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("ContactInformation.Title")}</h2>
                <p>{t("ContactInformation.Content")}</p>
                <p>{t("ContactInformation.Email")}</p>

                <p>{t("ThankYou")}</p>
            </div>
        </main>
    );
}

