export interface Flight {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    local_departure: string;
    local_arrival: string;
    duration: {departure: number; return: number; total: number},
    airlines: string[];
    price: number;
    booking_link: string;
}