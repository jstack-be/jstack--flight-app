import request from 'supertest';
import {app} from '../src/server';
import {formatDate} from "./utils/date.utils";
import {nockedFlightAPI, nockedOpenAiAPI} from "./utils/api.mocks";
import nock from "nock";
import {ChatCompletionMessageParam} from "openai/resources";

const currentDate = new Date();

describe('POST /api/flights', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('should return 400 if no messages are provided', async () => {
        const messages: ChatCompletionMessageParam[] = [{role: 'user', content: ""}];

        const expectedParameters = {
            message: "Please provide the departure place and date range for when you wish to depart",
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate)
        };

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send(messages);

        expect(res.status).toBe(400);
        expect(res.text).toBe("No message provided");
    });

    it('should return 400 if no departure place is provided', async () => {
        const messages = `I want to travel to New York on ${formatDate(currentDate)}`;

        const expectedParameters = {
            fly_to: 'NYC',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate)
        };

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send([{role: 'user', content: messages}]);

        expect(res.status).toBe(400);
    });

    it('should return 200 and flight data if messages are valid', async () => {
        const messages = `I want to travel from London to Antwerp on ${formatDate(currentDate)}`;

        const expectedParameters = {
            message: "Here are the flights from London to Antwerp on " + formatDate(currentDate),
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate)
        };

        const mockResponse = {
            data: {
                flights:
                    [
                        {
                            id: "0f6401af4d950000bb579950_0",
                            flyFrom: "LHR",
                            flyTo: "ANR",
                            cityFrom: "London",
                            cityCodeFrom: "LON",
                            cityTo: "Brussels",
                            cityCodeTo: "BRU",
                        }]
            }
        };

        const expectedSearchParameters = {
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate)
        };

        nockedFlightAPI(expectedSearchParameters, mockResponse);

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send([{role: 'user', content: messages}]);
        expect(res.status).toBe(200);
        expect(mockResponse.data.flights).toEqual(res.body.flights.flights);
    });
})
;