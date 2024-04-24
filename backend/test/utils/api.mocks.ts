import nock, {DataMatcherMap} from "nock";
import {environment} from "../../src/enviroment";

export function nockedFlightAPI(requestParameters: object, mockResponse: object) {
    nock(environment.flightSearchUrl)
        .get('')
        .query(requestParameters as DataMatcherMap)
        .reply(200, mockResponse);
}

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