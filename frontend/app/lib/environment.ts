"use server";

import 'dotenv/config'

const environment = {
    flightApiUrl: process.env.FLIGHT_API_URL as string,
} as const

if (!environment.flightApiUrl) throw new ReferenceError("FLIGHT_API_URL is not defined");

export async function getURL() {
    return environment.flightApiUrl;
}