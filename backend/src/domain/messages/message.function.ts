import {ChatCompletionTool} from "openai/resources";
import {formatDate} from "../../utils/date.utils";

/**
 * Function definition for the OpenAI chat completion tool.
 * This function generates flight search parameters based on the user's conversation.
 */
export const getFilterFunction = (): ChatCompletionTool => {
    const currentDate = new Date();
    return {
        type: 'function',
        function: {
            name: 'generateFlightSearchParameters',
            description: "Get the data for the Flight API",
            parameters: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'returns a detailed response message about what flight date we are using.',
                    },
                    fly_from: {
                        type: 'string',
                        description: 'Always returns the IATA code from the departure metropolitan area. it accepts multiple values separated by a comma.',
                    },
                    fly_to: {
                        type: 'string',
                        description: 'Always returns the IATA code from the destination metropolitan area. it accepts multiple values separated by a comma.',
                    },
                    date_from: {
                        type: 'string',
                        description: 'The start date of the departure date range in dd/mm/yyyy format. The given date can not be before the current date' +
                            formatDate(currentDate),
                    },
                    date_to: {
                        type: 'string',
                        description: 'The end date of the departure date range in dd/mm/yyyy format. The given date can not be before the current date ' +
                            formatDate(currentDate),
                    },
                    return_from: {
                        type: 'string',
                        description: 'The start date of the return date range in dd/mm/yyyy format. The given date can not be before the departure the dates',
                    },
                    return_to: {
                        type: 'string',
                        description: 'The end date of the return date range in dd/mm/yyyy format. The given date can not be before the departure the dates',
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
                        description: 'returns the number of results that the user wants to be shown. If not provided by the user use default value 20. The max value is 1000',
                    }
                },
                ['required']: ['message', 'date_from', 'date_to'],
            },
        },
    };
}