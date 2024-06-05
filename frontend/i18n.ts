import {getRequestConfig} from 'next-intl/server';
import {Locale, locales} from "@/i18n.config";
import {notFound} from "next/navigation";


export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as Locale)) {
        return notFound();
    }

    return {
        messages: (await import(`@/locales/${locale}.json`))
            .default
    };
});