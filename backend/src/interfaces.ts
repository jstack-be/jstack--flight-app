export interface FlightApiProps {
    fly_from: string,
    date_from: string,
    date_to: string
}

export interface Flight {
    id: string;
    nightsInDest: null | number;
    duration: {
        departure: number;
        return: number;
        total: number;
    };
    // flyFrom: string;
    cityFrom: string;
    // cityCodeFrom: string;
    // countryFrom: {
    //     code: string;
    //     name: string;
    // };
    // flyTo: string;
    cityTo: string;
    cityCodeTo: string;
    // countryTo: {
    //     code: string;
    //     name: string;
    // };
    // distance: number;
    airlines: string[];
    pnr_count: number;
    has_airport_change: boolean;
    technical_stops: number;
    // throw_away_ticketing: boolean;
    // hidden_city_ticketing: boolean;
    price: number;
    bags_price: {
        [key: string]: number;
    };
    baglimit: {
        hand_width: number;
        hand_height: number;
        hand_length: number;
        hand_weight: number;
        hold_width: number;
        hold_height: number;
        hold_length: number;
        hold_dimensions_sum: number;
        hold_weight: number;
    };
    availability: {
        seats: number;
    };
    // facilitated_booking_available: boolean;
    conversion: {
        [key: string]: number;
    };
    quality: number; // Use it if you want to sort your flights according to quality. The lower the number the better.
    booking_token: string;
    fare: {
        adults: number;
        children: number;
        infants: number;
    };
    price_dropdown: {
        base_fare: number;
        fees: number;
    };
    virtual_interlining: boolean;
    route: Route[];
    local_arrival: string;
    utc_arrival: string;
    local_departure: string;
    utc_departure: string;
}

interface Route {
    // fare_basis: string;
    fare_category: string;
    // fare_classes: string;
    // fare_family: string;
    return: number;
    bags_recheck_required: boolean;
    vi_connection: boolean;
    guarantee: boolean;
    id: string;
    combination_id: string;
    cityTo: string;
    cityFrom: string;
    // cityCodeFrom: string;
    // cityCodeTo: string;
    // flyTo: string;
    // flyFrom: string;
    airline: string;
    operating_carrier: string;
    // equipment: string;
    flight_no: number;
    vehicle_type: string;
    operating_flight_no: string;
    local_arrival: string;
    utc_arrival: string;
    local_departure: string;
    utc_departure: string;
}