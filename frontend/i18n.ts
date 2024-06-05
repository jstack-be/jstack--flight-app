import {Formats} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {Locale, locales} from "@/i18n.config";
import {notFound} from "next/navigation";

function formatsFor(locale: Locale): Partial<Formats> {
    const localeFormats: Record<Locale, Partial<Formats>> = {
        "fr": {
            number: {
                temperature: {
                    style: "unit",
                    unit: "celsius",
                },
            },
            dateTime: {
                longDay: {
                    weekday: "long",
                },
            },
        },
        "en": {
            number: {
                temperature: {
                    style: "unit",
                    unit: "fahrenheit",
                },
            },
            dateTime: {
                longDay: {
                    weekday: "long",
                },
            },
        },
    };

    return localeFormats[locale];
}

export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as Locale)) {
        return notFound();
    }

    return {
        messages: (await import(`@/locales/${locale}.json`))
            .default,
        formats: {
            ...formatsFor(locale as Locale),
        },
    };
});