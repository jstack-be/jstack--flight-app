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
        // event: React.ChangeEvent<HTMLSelectElement>,
        newLocale: Locale
    ) => {
        // const newLocale = event.target.value as Locale;
        router.replace(pathname, {locale: newLocale});
    };

    return (
        <div className={"fixed z-50 top-4 right-4"}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost" size="icon">
                        {locale.toUpperCase()}<GlobeIcon className="ps-2 size-5"/>
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