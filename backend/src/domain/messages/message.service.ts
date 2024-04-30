import {ChatCompletionMessageParam, ChatCompletionTool} from "openai/resources";
import OpenAI from "openai";
import {environment} from "../../enviroment";
import {FlightSearchParameters} from "./message.types";
import {formatDate} from "../../../test/utils/date.utils";

const openai = new OpenAI({
    organization: environment.openAiOrgKey,
    apiKey: environment.openAiApiKey
});

/**
 * Function definition for the OpenAI chat completion tool.
 * This function generates flight search parameters based on the user's conversation.
 */
const getFilterFunction = (): ChatCompletionTool => {
    const currentDate = new Date();
    return {
        type: 'function',
        function: {
            name: 'generateFlightSearchParameters',
            description: "Get the data for the Flight API",
            parameters: {
                type: 'object',
                properties: {
                    message:{
                        type: 'string',
                        description: 'A response to the users messages that confirms if the found data is the requested data. You also tell the user what data is missing.' +
                            ' Write your response in a plain text format with no code in it.',
                    },
                    fly_from: {
                        type: 'string',
                        description: 'The IATA code from the departure metropolitan area. it accepts multiple values separated by a comma.',
                    },
                    fly_to: {
                        type: 'string',
                        description: 'The IATA code from the destination metropolitan area. it accepts multiple values separated by a comma.',
                    },
                    date_from: {
                        type: 'string',
                        description: 'The start date of the departure date range in dd/mm/yyyy format. if not specified use the current date ' +
                            formatDate(currentDate) + ' as default',
                    },
                    date_to: {
                        type: 'string',
                        description: 'The end date of the departure date range in dd/mm/yyyy format. if not specified use the current date ' +
                            formatDate(currentDate) + ' as default',
                    },
                    return_from: {
                        type: 'string',
                        description: 'The start date of the return date range in dd/mm/yyyy format',
                    },
                    return_to: {
                        type: 'string',
                        description: 'The end date of the return date range in dd/mm/yyyy format',
                    },
                    adults: {
                        type: 'integer',
                        description: 'Used to specify the number of adults. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    children: {
                        type: 'integer',
                        description: 'It specifies the number of children. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    infants: {
                        type: 'integer',
                        description: 'Used to specify the number of infants. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    selected_cabins: {
                        type: 'integer',
                        description: 'Specifies the preferred cabin class. ' +
                            'Cabins can be: M (economy), W (economy premium), C (business), or F (first class).' +
                            ' There can be only one selected cabin for one call. Cannot be used for ground (train, bus) content.',
                    },
                    //todo bags
                    price_from: {
                        type: 'integer',
                        description: 'result filter, minimal price',
                    },
                    price_to: {
                        type: 'integer',
                        description: 'result filter, maximal price',
                    },
                    //todo depart/arrival time filters
                    //todo airlines filter
                    vehicle_type: {
                        type: 'string',
                        description: 'this parameter allows you to specify the vehicle type. The options are aircraft, bus, train. Default all options are selected',
                    },
                    sort: {
                        type: 'string',
                        description: 'sorts the results by quality, price, date or duration. Price is the default value.',
                    },
                    limit: {
                        type: 'integer',
                        description: 'limit number of results; max is 1000',
                    }
                },
                ['required']: ['message', 'fly_from', 'date_from', 'date_to'],
            },
        },
    };
}

/**
 * Generates flight search parameters based on the user's conversation.
 *
 * @param {string[]} messages - The user's conversation.
 * @returns {Promise<FlightSearchParameters>} The flight search parameters.
 * @throws {ReferenceError} If required attributes are missing in the response from the OpenAI API.
 */
export async function generateFlightSearchParameters(messages: string[]): Promise<FlightSearchParameters> {
    const userConversation: ChatCompletionMessageParam[] = messages.map(message => ({
        role: "user",
        content: message
    }));

    const completion = await openai.chat.completions.create({
        messages: userConversation,
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

    console.log('Args:');
    if (!!args) {
        let jsonObject = JSON.parse(args);
        console.log("Json object:\n",jsonObject);
        delete jsonObject.message;

        if (Object.keys(jsonObject).length === 0) {
            throw new ReferenceError("Missing required attributes. Please provide the departure place and date.");
        } else if (!jsonObject.fly_from) {
            throw new ReferenceError("No departure place provided");
        } else if (!jsonObject.date_from || !jsonObject.date_to)
            throw new ReferenceError("No departure date provided");
        else {
            return jsonObject
        }
    } else {
        console.log('No args in response');
    }
    console.log('----');
}