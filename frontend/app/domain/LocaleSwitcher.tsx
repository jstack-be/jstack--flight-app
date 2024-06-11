"use client";

import {type Locale, localeNames, locales, usePathname, useRouter,} from "@/i18n.config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {GlobeIcon} from "lucide-react";


export default function LocaleSwitcher({
                                           locale,
                                       }: {
    locale: Locale;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const changeLocale = (
        newLocale: Locale
    ) => {
        // router.replace() will prefix the pathname
        // with this `newLocale`, effectively changing
        // languages by navigating to the new url.
        router.replace(pathname, {locale: newLocale});
    };

    return (
        <div className={"fixed top-4 right-4"}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost" size="icon"
                            className={"bg-secondary-background-hover ring ring-transparent " +
                                "hover:ring-secondary-background " +
                                "hover:bg-secondary-background-hover text-secondary-text px-10"}>
                        <div className={"flex"} >{locale.toUpperCase()}<GlobeIcon className="ps-2 size-5"/></div>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Language</DropdownMenuLabel>
                    <DropdownMenuSeparator/>

                    {locales.map((loc) => (
                        <DropdownMenuItem key={loc} onClick={() => changeLocale(loc)}>
                            {localeNames[loc]}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}