import { Request, Response } from "express";
import {ChatCompletionMessageParam, ChatCompletionTool} from "openai/resources";
import OpenAI from "openai";
import axios from "axios";
import { Flight, FlightApiProps } from "./interfaces";

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY
});

let messages: ChatCompletionMessageParam[] = [];

const myFunc: ChatCompletionTool = {
    type: 'function',
    function: {
        name: 'flightDataFinder',
        description: "Get the data for the Flight API",
        parameters: {
            type: 'object',
            properties: {
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
                    description: 'The start date of the departure date range in dd/mm/yyyy format',
                },
                date_to: {
                    type: 'string',
                    description: 'The end date of the departure date range in dd/mm/yyyy format',
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
                price_from:{
                    type: 'integer',
                    description: 'result filter, minimal price',
                },
                price_to:{
                    type: 'integer',
                    description: 'result filter, maximal price',
                },
                //todo depart/arrival time filters
                //todo airlines filter
                vehicle_type:{
                    type: 'string',
                    description: 'this parameter allows you to specify the vehicle type. The options are aircraft (default), bus, train.',
                },
                sort:{
                    type: 'string',
                    description: 'sorts the results by quality, price, date or duration. Price is the default value.',
                },
                limit:{
                    type: 'integer',
                    description: 'limit number of results; max is 1000',
                }
            },
        },
    },
};

export async function handleDeleteMessages(res: Response): Promise<void> {
    try {
        messages = [];
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

export async function handlePostMessages(req: Request, res: Response): Promise<void> {
    try {
        const message = req.body.message;
        if (!message) {
            res.status(400).send("No message provided");
            return;
        }

        messages.push({
            role: "user",
            content: message
        });

        const completion = await openai.chat.completions.create({
            messages: messages,
            tools: [myFunc],
            tool_choice: {
                type: 'function',
                function: {
                    name: 'flightDataFinder'
                }
            },
            model: "gpt-3.5-turbo",
        });

        const args = completion?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;

        console.log('Args:');
        if (!!args) {
            const jsonObject = JSON.parse(args);
            console.log(jsonObject);

            if (!jsonObject.fly_from) {
                res.status(400).send("No departure place provided");
            } else if (!jsonObject.date_from || !jsonObject.date_to)
                res.status(400).send("No departure date provided");
            else {
                const flights = await getTravelData(jsonObject);
                res.status(200).send(flights);
            }
        } else {
            console.log('No args in response');
        }
        console.log('----');

    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status code
            console.error('Server responded with an error:', error.response.status, error.response.data.error);
            res.status(error.response.status).send(error.response.data.error);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
            res.status(500).send('Internal Server Error');
        } else {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}

async function getTravelData(requestParameters: FlightApiProps): Promise<Flight[]> {
    const config = {
        headers: {
            apiKey: process.env.FLIGHT_API_KEY,
        },
        params: requestParameters
    }

    const response = await axios.get('https://api.tequila.kiwi.com/v2/search', config)
    return response.data.data
}
