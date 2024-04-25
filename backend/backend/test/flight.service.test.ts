import {getTravelData} from '../src/domain/flights/flight.service';
import {FlightSearchParameters} from "../src/domain/messages/message.types";
import {nockedFlightAPI} from "./utils/api.mocks";
import {getDate} from "./utils/date.utils";

describe('getTravelData', () => {
    it('should return flight data when valid parameters are provided', async () => {
        const requestParameters: FlightSearchParameters = {
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: getDate(),
            date_to: getDate(),
            return_from: getDate(20),
            return_to: getDate(20),
            adults: 2,
            children: 2
        }

        const mockResponse = {
            data: [{
                id: "0f6400094d9500000c29d3ec_0|0f6400094d9500000c29d3ec_1|0009179f4d970000dbf5caa7_0|179f1a0a4db20000d1094c3a_0|1a0a0a7c4db3000015b09638_0|0a7c0f644db300001bf20663_0",
                flyFrom: "LHR",
                flyTo: "ANR",
                cityFrom: "London",
                cityCodeFrom: "LON",
                cityTo: "Brussels",
                cityCodeT: "BRU",
                //other fields
            }]
        };

        nockedFlightAPI(requestParameters, mockResponse);

        const result = await getTravelData(requestParameters);

        expect(result).toEqual(mockResponse.data);
    });
});