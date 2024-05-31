import {FlightSearchParameters} from "../src/domain/messages/message.types";
import {nockedFlightAPI} from "./utils/api.mocks";
import {addDays, formatDate} from "../src/utils/date.utils";
import nock from "nock";
import {getFlights} from "../src/domain/flights/flight.service";
import {Flight} from "../src/domain/flights/flight.types";
import {formatFlights} from "../src/domain/flights/flight.formater";

describe('getTravelData', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('should return flight data when valid parameters are provided', async () => {
        const currentDate = new Date();
        const requestParameters: FlightSearchParameters = {
            fly_from: 'LHR',
            fly_to: 'ANR',
            date_from: formatDate(currentDate),
            date_to: formatDate(currentDate),
            return_from: addDays(currentDate, 20),
            return_to: addDays(currentDate, 20),
            adults: 2,
            children: 2,
            limit: 20
        }

        const flights = [{
            id: "0f6400094d9500000c29d3ec_0|0f6400094d9500000c29d3ec_1|0009179f4d970000dbf5caa7_0|179f1a0a4db20000d1094c3a_0|1a0a0a7c4db3000015b09638_0|0a7c0f644db300001bf20663_0",
            flyFrom: "LHR",
            flyTo: "ANR",
            cityFrom: "London",
            cityCodeFrom: "LON",
            cityTo: "Brussels",
            cityCodeTo: "BRU",
            booking_token: "https://www.kiwi.com/deep?from=LHR&to=ANR&flightsId=0f6400094d9500000c29d3ec_0|0f6400094d9500000c29d3ec_1|0009179f4d970000dbf5caa7_0|179f1a0a4db20000d1094c3a_0|1a0a0a7c4db3000015b09638_0|0a7c0f644db300001bf20663_0&price=0&passengers=2&affilid=picky&lang=en&currency=USD&booking_token=0f6400094d9500000c29d3ec_0",
            duration: {
                departure: 16200,
                return: 0,
                total: 16200
            },
            conversion: {
                EUR: 207
            },
            route: []
        }];

        nockedFlightAPI(requestParameters, {
            data: flights
        });

        const result = await getFlights(requestParameters);

        expect(result).toEqual(formatFlights(flights as unknown as Flight[]));
    });
});