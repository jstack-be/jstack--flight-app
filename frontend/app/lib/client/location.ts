"use client";
import {getLocationURL} from "@/app/lib/server/environment";

export async function getUserLocation() {
    const res = await fetch(`${await getLocationURL()}&fields=city,country_name,languages,currency`);
    if (!res.ok) {
        throw new Error('Could not connect to the server');
    }
    return await res.json();
}