import {ChatCompletionTool} from "openai/resources";

/**
 * Function definition for the OpenAI chat completion tool.
 * This function generates flight search parameters based on the user's conversation.
 */
export const appliedFilterFunction = (): ChatCompletionTool => {
    return {
        type: 'function',
        function: {
            name: 'sortFlightsConditionally',
            description: 'This function sorts inputted flights based on the user\'s conversation.',
            parameters: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Returns a message that tells the user what flight data information is found in the response using the same language as the user.',
                    },
                    flights: {
                        id:{
                            type: 'number',
                            description: 'result id',
                        },
                        fly_from: {
                            type: 'string',
                            description: 'Always returns the IATA code from the departure metropolitan area. it accepts multiple values separated by a comma.',
                        },
                        fly_to: {
                            type: 'string',
                            description: 'Always returns the IATA code from the destination metropolitan area. it accepts multiple values separated by a comma.',
                        },
                        duration: {
                            type: 'number',
                            description: 'result duration minutes ',
                        },
                        price: {
                            type: 'integer',
                            description: 'result filter, minimal price',
                        }
                    }

                }
            },
        },


    }
}