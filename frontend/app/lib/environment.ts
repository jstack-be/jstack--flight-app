"use server";

import 'dotenv/config'

const environment = {
    flightApiUrl: process.env.FLIGHT_API_URL,
}

export async function getURL() {
    const url = environment.flightApiUrl;
    if (!url) throw new ReferenceError("FLIGHT_API_URL is not defined");
    return url;
}