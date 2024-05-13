export interface Flight {
    id: string;
    cityFrom: string;
    cityTo: string;
    cityCodeTo: string;
    airlines: string[];
    pnr_count: number;
    has_airport_change: boolean | false;
    technical_stops: number;
    price: number;
    availability: {
        seats: number;
    };
}