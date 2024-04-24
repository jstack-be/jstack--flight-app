import request from 'supertest';
import {app} from '../src/server';
import {getDate} from "./utils/date.utils";
import {nockedFlightAPI, nockedOpenAiAPI} from "./utils/api.mocks";
import nock from "nock";

describe('POST /api/flights', () => {
    beforeEach(() => { nock.cleanAll(); });
    it('should return 400 if no messages are provided', async () => {
        const messages = [];

        const expectedParameters = {};

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send({messages: messages});

        expect(res.status).toBe(400);
        expect(res.text).toBe("No message provided");
    });

    it('should return 400 if no departure place is provided', async () => {
        const messages = [`I want to travel to New York on ${getDate()}`];

        const expectedParameters = {
            fly_from: 'NYC',
            date_from: getDate(),
            date_to: getDate()
        };

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send({messages: messages});

        expect(res.status).toBe(400);
    });

    it('should return 400 if no departure date is provided', async () => {

        const messages = ['I want to travel to London from Brussel'];

        const expectedParameters = {
            fly_from: 'BRU',
            fly_to: 'LCY'
        };

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send({messages: messages});

        expect(res.status).toBe(400);
    });

    it('should return 200 and flight data if messages are valid', async () => {
        const messages = [`I want to travel from London to Antwerp on ${getDate()}`];

        const expectedParameters = {
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: getDate(),
            date_to: getDate()
        };

        const mockResponse = {
            data: [{
                id: "0f6400094d9500000c29d3ec_0",
                flyFrom: "LHR",
                flyTo: "ANR",
                cityFrom: "London",
                cityCodeFrom: "LON",
                cityTo: "Brussels",
                cityCodeT: "BRU",
                //other fields
            }]
        };

        nockedFlightAPI(expectedParameters, mockResponse);

        nockedOpenAiAPI(expectedParameters)

        const res = await request(app)
            .post('/api/flights')
            .send({messages: messages}); // Assuming these messages are valid

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResponse.data);
    });
});