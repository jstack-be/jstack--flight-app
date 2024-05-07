import {generateFlightSearchParameters} from '../src/domain/messages/message.service';
import {nockedOpenAiAPI} from "./utils/api.mocks";
import {ChatCompletionMessageParam} from "openai/resources";
import nock from "nock";
import InvalidDateError from "../src/errors/InvalidDateError";
import ResponseError from "../src/errors/ResponseError";
import {addDays, formatDate} from "../src/utils/date.utils";

const currentDate = formatDate(new Date());

describe('generateFlightSearchParameters', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('should return flight search parameters when valid messages are provided', async () => {

        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: `I want to travel from New York on ${currentDate}`
        }];
        const expectedParameters = {
            fly_from: 'NYC',
            date_from: currentDate,
            date_to: currentDate
        };

        nockedOpenAiAPI(expectedParameters);

        const result = await generateFlightSearchParameters(messages);

        expect(result).toEqual(expectedParameters);
    });

    it('should throw an error when no arguments are returned from the OpenAI API', async () => {
        const messages: ChatCompletionMessageParam[] = [{role: 'user', content: 'how to cook pasta'}];

        nockedOpenAiAPI({})

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow(ResponseError);
    });

    it('should throw an error when no departure place is provided', async () => {
        const messages:ChatCompletionMessageParam[] = [{role:'user',content:'I want to travel to London on 19/05/2024'}];
        const incompleteParameters = {
            fly_to: 'LON',
            date_from: '01/01/2023',
            date_to: '01/02/2023'
        };

        nockedOpenAiAPI(incompleteParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow('');
    });
    it('should throw an error when departure date is more than 45 days in the past', async () => {
        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: 'I want to travel from New York to London on 01/01/2022'
        }];
        const invalidParameters = {
            fly_from: 'NYC',
            fly_to: 'LON',
            date_from: '01/01/2022',
            date_to: '01/02/2022'
        };

        nockedOpenAiAPI(invalidParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow(InvalidDateError);
    });

    it('should throw an error when return date is before the departure date', async () => {
        const nextWeek = addDays(new Date(),7);

        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: `I want to travel from New York to London on ${nextWeek} and return on ${currentDate}`
        }];
        const invalidParameters = {
            fly_from: 'NYC',
            fly_to: 'LON',
            date_from: nextWeek,
            date_to: nextWeek,
            return_from: currentDate,
            return_to: currentDate
        };

        nockedOpenAiAPI(invalidParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow(InvalidDateError);
    });

    it('should throw an error when IATA code is not valid', async () => {
        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: 'I want to travel from NYC to London on 01/01/2024'
        }];
        const invalidParameters = {
            fly_from: 'NYC',
            fly_to: 'London',
            date_from: currentDate,
            date_to: currentDate
        };

        nockedOpenAiAPI(invalidParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow(ResponseError);
    });
    it('should throw an error when the number of adult baggage does not match the number of adults', () => {
        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: `I want to travel from Antwerp to London on ${currentDate} with 2 adults with handbags and 2 hold bags`
        }];
        const invalidParameters = {
            fly_from: 'NYC',
            fly_to: 'London',
            date_from: '01/01/2024',
            date_to: '01/02/2024',
            adults: 2,
            adult_hand_bag: '1,1',
            adult_hold_bag: '2'
        };

        nockedOpenAiAPI(invalidParameters);

        expect(() => generateFlightSearchParameters(messages)).toThrow(ResponseError);
    });

    it('should throw an error when the number of children baggage does not match the number of children', () => {
        const messages: ChatCompletionMessageParam[] = [{
            role: 'user',
            content: `I want to travel from Antwerp to London on ${currentDate} with 2 children with handbags and 2 hold bags`
        }];
        const invalidParameters = {
            fly_from: 'NYC',
            fly_to: 'London',
            date_from: '01/01/2024',
            date_to: '01/02/2024',
            children: 2,
            child_hand_bag: '1,1',
            child_hold_bag: '2'
        };

        nockedOpenAiAPI(invalidParameters);

        expect(() => generateFlightSearchParameters(messages)).toThrow(ResponseError);
    });
});