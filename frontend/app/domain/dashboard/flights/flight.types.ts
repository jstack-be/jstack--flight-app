export interface Route {
    id: string;
    flyFrom: string;
    flyTo: string;
    local_departure: string;
    local_arrival: string;
    airlineLogoUrl: string;
    isReturnFlight: number;
}

export interface Flight {
    id: string;
    duration: {departure: number; return: number; total: number},
    price: number;
    booking_link: string;
    route: Route[];
}

export interface ProcessedFlightData {
    formattedDate: string;
    formattedDepartureTime: string;
    flyFrom: string;
    formattedDepartureDuration: string;
    formattedArrivalTime: string;
    flyTo: string;
    flightSteps: string;
    flightLogos: string[];
}