import 'dotenv/config'

export const environment = {
    openAiOrgKey: process.env.OPENAI_ORGANISATION_KEY,
    openAiApiKey: process.env.OPENAI_API_KEY,
    tequilaKiwiApiKey: process.env.FLIGHT_API_KEY,
    serverPort: parseInt(process.env.SERVER_PORT),
    flightSearchUrl: process.env.FLIGHT_SEARCH_URL,
    logoSearchUrl: process.env.LOGO_SEARCH_URL,
    airhexApiKey: process.env.AIRHEX_API_KEY
} as const