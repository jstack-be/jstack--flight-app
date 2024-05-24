"use server";

import 'dotenv/config'

const environment = {
    flightApiUrl: process.env.FLIGHT_API_URL as string,
    locationApiUrl: process.env.LOCATION_API_URL as string,
} as const

if (!environment.flightApiUrl) throw new ReferenceError("FLIGHT_API_URL is not defined");

export async function getBackendURL() {
    return environment.flightApiUrl;
}

export async function getLocationURL() {
    return environment.locationApiUrl;
}