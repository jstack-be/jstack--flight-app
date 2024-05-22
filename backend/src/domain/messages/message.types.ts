export interface FlightSearchParameters {
    fly_from: string;
    fly_to?: string;
    date_from: string;
    date_to: string;
    return_from?: string;
    return_to?: string;
    adults?: number;
    children?: number;
    infants?: number;
    selected_cabins?: number;
    price_from?: number;
    price_to?: number;
    vehicle_type?: string;
    sort?: string;
    limit?: number;
}

export interface ConditionalflightParameters {
    flights: [
        {
            id: number,
            fly_from: string,
            fly_to: string,
            duration: number,
            price: number,

        }
    ]
}