import InvalidDateError from "../../errors/InvalidDateError";
import ResponseError from "../../errors/ResponseError";
import {parseDate} from "../../utils/date.utils";
import {environment} from "../../enviroment";
import {saveMessage} from "./message.response";
import {getFilterFunction} from "./message.function";
import {FlightSearchParameters} from "./message.types";
import {ChatCompletionMessageParam} from "openai/resources";
import OpenAI from "openai";

/**
 * Function to validate dates
 * @param {any} jsonObject - The object containing the dates to validate
 * @throws {InvalidDateError} If the dates are not within the valid range
 */
function validateDates(jsonObject: any) {
    const currentDate = new Date();
    const dateFrom = parseDate(jsonObject.date_from);
    const dateTo = parseDate(jsonObject.date_to);

    const fortyFiveDaysBeforeNow = new Date();
    fortyFiveDaysBeforeNow.setDate(currentDate.getDate() - 45);

    const threeYearsFromNow = new Date();
    threeYearsFromNow.setFullYear(currentDate.getFullYear() + 3);

    if (dateFrom < fortyFiveDaysBeforeNow) {
        throw new InvalidDateError("The departure date cannot be more than 45 days in the past.");
    } else if (dateTo < dateFrom) {
        throw new InvalidDateError("The end date of the departure date range cannot be before the start date.");
    } else if (dateFrom > threeYearsFromNow || dateTo > threeYearsFromNow) {
        throw new InvalidDateError("The dates can not be more than 3 years in the future.");
    }

    // Check if return dates are provided before parsing and validating them
    if (jsonObject.return_from && jsonObject.return_to) {
        const returnFrom = parseDate(jsonObject.return_from);
        const returnTo = parseDate(jsonObject.return_to);

        if (returnTo < dateTo) {
            throw new InvalidDateError("The return date cannot be before the the start date of the departure date range.");
        } else if (returnTo < returnFrom) {
            throw new InvalidDateError("The end date of the return date range cannot be before the return_from.");
        } else if (returnFrom > threeYearsFromNow || returnTo > threeYearsFromNow) {
            throw new InvalidDateError("The dates can not be more than 3 years in the future.");
        }
    }
}

/**
 * Function to validate IATA codes
 * @param {string} fly_from - The IATA code of the departure airport
 * @param {string} fly_to - The IATA code of the destination airport
 * @throws {ReferenceError} If the IATA codes are not valid
 */
function validateIataCodes(fly_from: string, fly_to: string) {
    const iata_code_regex = /^[A-Z]{3}$/;

    if (!fly_from) {
        throw new ResponseError("Could not find a provided departure cities or airports. Please change your request and try again.");
    }

    const fly_from_codes = fly_from?.split(',');
    const fly_to_codes = fly_to?.split(',');


    for (const code of fly_from_codes) {
        if (!iata_code_regex.test(code.trim())) {
            throw new ResponseError("Could not find all provided departure cities or airports. Please change your request and try again.");
        }
    }

    if (!!fly_to_codes && fly_to_codes?.length !== 0) {
        for (const code of fly_to_codes) {
            if (!iata_code_regex.test(code.trim())) {
                throw new ResponseError("Could not find all provided destination cities or airports. Please change your request and try again.");
            }
        }
    }
}

/**
 * Function to process the response from the OpenAI API
 * @param {any} completion - The response from the OpenAI API
 * @returns {any} The processed response
 * @throws {ReferenceError} If the response does not contain the function json object
 */
function processResponse(completion: any) {
    const responseMessage = completion?.choices?.[0]?.message;
    const args = responseMessage?.tool_calls?.[0]?.function?.arguments;
    if (!!args) {
        let jsonObject = JSON.parse(args);
        console.log(jsonObject);

        validateIataCodes(jsonObject.fly_from, jsonObject.fly_to);
        validateDates(jsonObject);

        saveMessage(jsonObject.message);
        delete jsonObject.message;

        return jsonObject;
    } else {
        throw new ResponseError(responseMessage.content);
    }
}

const openai = new OpenAI({
    organization: environment.openAiOrgKey,
    apiKey: environment.openAiApiKey
});

/**
 * Function to generate flight search parameters
 * @param {ChatCompletionMessageParam[]} messages - The messages to send to the OpenAI API
 * @returns {Promise<FlightSearchParameters>} The flight search parameters
 */
export async function generateFlightSearchParameters(messages: ChatCompletionMessageParam[]): Promise<FlightSearchParameters> {
    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: 'You are a helpful travel planner assistant that only checks if the user gave all required information to find flights. ' +
            ' Your answers should be short and to the point. ' +
            ' You should let the user know that you can only answer questions about travel routes and not any other information ' +
            ` The current date is ${new Date().toLocaleDateString()}.` +
            ' The given dates should not be more than 45 day before the current date and more than 3 years in the future. '
    };

    messages.unshift(systemMessage);

    const completion = await openai.chat.completions.create({
        messages: messages,
        tools: [getFilterFunction()],
        tool_choice: 'auto',
        model: "gpt-3.5-turbo",
    });

    return processResponse(completion);
}