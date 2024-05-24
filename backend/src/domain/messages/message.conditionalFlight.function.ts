import {ChatCompletionTool} from "openai/resources";

/**
 * Function definition for the OpenAI chat completion tool.
 * This function generates flight data based on the user's conversation.
 */
export const getFilterAndSortFunction = (): ChatCompletionTool => {
    return {
        type: 'function',
        function: {
            name: 'filterAndSortFlights',
            description: 'a function that generates an object containing an array of flights filtered and sorted based on the user request.',
            parameters: {
                type: 'object',
                properties: {
                    flights: {
                        type: 'array',
                        description: 'An array of flight data objects ordered and filtered based on a user\'s request.',
                        items: {
                            type: 'object',
                            properties: {
                                id: {type: 'string', description: 'Unique identifier for the flight.'},
                                duration: {
                                    type: 'object',
                                    properties: {
                                        departure: {
                                            type: 'number',
                                            description: 'Duration of the departure flight in seconds.'
                                        },
                                        return: {
                                            type: 'number',
                                            description: 'Duration of the return flight in seconds.'
                                        },
                                        total: {
                                            type: 'number',
                                            description: 'Total duration of the round trip in seconds.'
                                        },
                                    },
                                },
                                price_conversion: {
                                    type: 'object',
                                    additionalProperties: true,
                                    description: 'Currency conversion rates for the flight price.',
                                },
                                // booking_link: {type: 'string', description: 'Link to book the flight.'},
                                route: {
                                    type: 'object',
                                    description: 'Route information for the flight.',
                                    properties: {
                                        id: {type: 'string', description: 'Unique identifier for the flight.'},
                                        flyFrom: {type: 'string', description: 'Departure airport code.'},
                                        flyTo: {type: 'string', description: 'Arrival airport code.'},
                                        local_departure: {type: 'string', description: 'Local departure time.'},
                                        local_arrival: {type: 'string', description: 'Local arrival time.'},
                                        airlineLogoUrl: {type: 'string', description: 'URL to the airline logo.'},
                                        isReturnFlight: {
                                            type: 'number',
                                            description: 'Indicates if the flight is a return flight (1) or not (0).'
                                        }
                                    },
                                }
                            },
                        },
                    },
                },
                required: ['flights'],
            },
        },
    };
};