import nock, {DataMatcherMap} from "nock";
import environment from "../../src/enviroment";

/**
 * Mocks the flight API by intercepting HTTP requests and providing a predefined response.
 *
 * @param {object} requestParameters - The parameters that the API is expected to receive in the request.
 * @param {object} mockResponse - The response that the API should return.
 */
export function nockedFlightAPI(requestParameters: object, mockResponse: object) {
    nock(environment.flightSearchUrl)
        .get('')
        .query(requestParameters as DataMatcherMap)
        .reply(200, mockResponse);
}

/**
 * Mocks the OpenAI API by intercepting HTTP requests and providing a predefined response.
 *
 * @param {object} expectedParameters - The parameters that the API is expected to return in the request.
 */
export function nockedOpenAiAPI(expectedParameters: object) {
    nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(200, {
            choices: [{
                index: 0,
                message: {
                    tool_calls: [{
                        function: {
                            arguments: JSON.stringify(expectedParameters)
                        }
                    }]
                },
            }],
        });
}