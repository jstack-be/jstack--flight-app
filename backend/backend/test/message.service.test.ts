import {generateFlightSearchParameters} from '../src/domain/messages/message.service';
import {nockedOpenAiAPI} from "./utils/api.mocks";

describe('generateFlightSearchParameters', () => {
    it('should return flight search parameters when valid messages are provided', async () => {
        const messages = ['I want to travel from New York on 19/05/2024'];
        const expectedParameters = {
            fly_from: 'NYC',
            date_from: '19/05/2024',
            date_to: '19/05/2024'
        };

        nockedOpenAiAPI(expectedParameters);

        const result = await generateFlightSearchParameters(messages);

        expect(result).toEqual(expectedParameters);
    });

    it('should throw an error when no arguments are returned from the OpenAI API', async () => {
        const messages = ['how to cook pasta'];

        nockedOpenAiAPI({})

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow('Missing required attributes. Please provide the departure place and date.');
    });

    it('should throw an error when no departure place is provided', async () => {
        const messages = ['I want to travel to London on 19/05/2024'];
        const incompleteParameters = {
            fly_to: 'LON',
            date_from: '01/01/2023',
            date_to: '01/02/2023'
        };

        nockedOpenAiAPI(incompleteParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow('No departure place provided');
    });

    it('should throw an error when no departure date is provided', async () => {
        const messages = ['I want to travel from New York'];
        const incompleteParameters = {
            fly_from: 'NYC'
        };

        nockedOpenAiAPI(incompleteParameters);

        await expect(generateFlightSearchParameters(messages)).rejects.toThrow('No departure date provided');
    });
});