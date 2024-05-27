import request from 'supertest';
import {formatDate} from "../src/utils/date.utils";
import {nockedFlightAPI, nockedOpenAiAPI} from "./utils/api.mocks";
import {ChatCompletionMessageParam} from "openai/resources";
import app from "../src/app";
import nock from "nock";
import createMD5Hash from "../src/utils/hash.string";
import {environment} from "../src/enviroment";

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
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate),
            limit: 20
        };

        const flightResponse = {
            data:
                [
                    {
                        id: "0f6417884d9300009602ee61_0",
                        duration: {
                            departure: 16200,
                            return: 0,
                            total: 16200
                        },
                        price: 207,
                        deep_link: "https://www.kiwi.com/deep?",
                        route: [{
                            id: "0f6417884d9300009602ee61_0",
                            flyFrom: "LHR",
                            flyTo: "ANR",
                            local_departure: "2024-05-16T09:55:00.000Z",
                            local_arrival: "2024-05-16T12:50:00.000Z",
                            airline: "FR",
                            return: 0,
                        }],
                    }]
        };
        const md5apikey = createMD5Hash(`FR_50_50_s_${environment.airhexApiKey}`);
        const response = {
            data:
                [
                    {
                        id: "0f6417884d9300009602ee61_0",
                        duration: {
                            departure: 16200,
                            return: 0,
                            total: 16200
                        },
                        price: 207,
                        booking_link: "https://www.kiwi.com/deep?",
                        route: [{
                            id: "0f6417884d9300009602ee61_0",
                            flyFrom: "LHR",
                            flyTo: "ANR",
                            local_departure: "2024-05-16T09:55:00.000Z",
                            local_arrival: "2024-05-16T12:50:00.000Z",
                            airlineLogoUrl: `https://content.airhex.com/content/logos/airlines_FR_50_50_s.png?proportions=keep?md5apikey=${md5apikey}`,
                            isReturnFlight: 0
                        }],
                    }]
        };

        const expectedSearchParameters = {
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate),
            limit: 20
        };

        nockedFlightAPI(expectedSearchParameters, flightResponse);

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send([{role: 'user', content: messages}]);
        expect(res.status).toBe(200);
        expect(response.data).toEqual(res.body.flights);
    });
})
;