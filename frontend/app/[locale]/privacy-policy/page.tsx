import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n.config";
import {unstable_setRequestLocale} from "next-intl/server";

export default function Page({params: {locale},}: Readonly<{ params: { locale: string } }>) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("PrivacyPolicy");

    return (
        <main>
            <Link href="/">
                <Button className="bg-button rounded-full m-6">
                    <ArrowLeft/>
                </Button>
            </Link>
            <div className={"container md:w-4/6 mb-12"}>
                <h1 className="text-4xl font-bold mb-4">{t("Title")}</h1>
                <p className="text-gray-600 mb-6">{t("LastUpdated", {date: new Date("2024-05-22")})}</p>

                <p className="mb-4">
                    {t("Intro")}
                </p>
                <p className="mb-4">
                    {t("Agreement")}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("InformationWeCollect")}</h2>

                <h3 className="text-xl font-semibold mt-4 mb-2">{t("InformationYouProvide")}</h3>
                <p className="mb-4">
                    {t("SearchQueries")}
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">{t("InformationAutomaticallyCollected")}</h3>
                <p className="mb-4">
                    {t("PublicIPAddress")}
                </p>
                <p className="mb-4">
                    {t("UsageData")}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("HowWeUseYourInformation")}</h2>
                <p className="mb-4">{t("UseCollectedInfo")}</p>
                <p className="mb-4">
                    {t("ProvideImproveService")}
                </p>
                <p className="mb-4">
                    {t("PersonalizeExperience")}
                </p>
                <p className="mb-4">
                    {t("AnalyzeUsage")}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("SharingYourInformation")}</h2>
                <p className="mb-4">{t("DoNotSell")}</p>
                <p className="mb-4">
                    {t("ServiceProviders")}
                </p>
                <p className="mb-4">
                    {t("LegalRequirements")}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("SecurityOfYourInformation")}</h2>
                <p className="mb-4">
                    {t("ImplementSecurity")}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("ChangesToThisPrivacyPolicy")}</h2>
                <p className="mb-4">
                    {t("UpdatePolicy")}
                </p>

                <p>
                    {t("ThankYou")}
                </p>
            </div>
        </main>
    );
}