// Function to validate dates
import InvalidDateError from "../../errors/InvalidDateError";
import {saveMessage} from "./message.response";
import {ChatCompletionMessageParam} from "openai/resources";
import {environment} from "../../enviroment";
import OpenAI from "openai";
import {getFilterFunction} from "./message.function";
import {FlightSearchParameters} from "./message.types";
import {parseDate} from "../../utils/date.utils";

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

        if (returnFrom < dateTo) {
            throw new InvalidDateError("The return date cannot be before the the end date of the departure date range.");
        } else if (returnTo < returnFrom) {
            throw new InvalidDateError("The end date of the return date range cannot be before the return_from.");
        } else if (returnFrom > threeYearsFromNow || returnTo > threeYearsFromNow) {
            throw new InvalidDateError("The dates can not be more than 3 years in the future.");
        }
    }
}

// Function to process the response from the OpenAI API
function processResponse(args: any) {
    if (!!args) {
        let jsonObject = JSON.parse(args);
        console.log(jsonObject);
        if (Object.keys(jsonObject).length === 0 || !jsonObject.fly_from) {
            throw new ReferenceError(jsonObject.message);
        }

        validateDates(jsonObject);

        saveMessage(jsonObject.message);
        delete jsonObject.message;

        return jsonObject;
    } else {
        console.log('No args in response');
    }
}

const openai = new OpenAI({
    organization: environment.openAiOrgKey,
    apiKey: environment.openAiApiKey
});

export async function generateFlightSearchParameters(messages: ChatCompletionMessageParam[]): Promise<FlightSearchParameters> {
    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: 'You are a helpful travel planner assistant that checks if the user gave all necessary information to find his flights. ' +
            ' You should check if the user provided an real departure location with an airport.' +
            ` The current date is ${new Date().toLocaleDateString()}.`,
    };

    messages.unshift(systemMessage);

    const completion = await openai.chat.completions.create({
        messages: messages,
        tools: [getFilterFunction()],
        tool_choice: {
            type: 'function',
            function: {
                name: 'generateFlightSearchParameters'
            }
        },
        model: "gpt-3.5-turbo",
    });

    const args = completion?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;

    return processResponse(args);
}