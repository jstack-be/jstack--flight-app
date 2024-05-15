import {ProcessedFlightData, Route} from "@/app/domain/dashboard/flights/flight.types";
import {useEffect, useState} from "react";

const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'min' : ''}`.trim();
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
});

const formatTime = (dateTime: Date) => dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

const formatStops = (stops: number) => stops === 0 ? 'Direct' : stops === 1 ? '1 stop' : `${stops} stops`;

export default function useRoutesData(routes: Route[], flightType: 'departure' | 'return', flightDuration: number): ProcessedFlightData | null {
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([])

    useEffect(() => {
        if (flightType === 'departure') {
            setFilteredRoutes(routes.filter(route => route.return === 0));
        } else if (flightType === 'return') {
            setFilteredRoutes(routes.filter(route => route.return === 1));
        }
    }, [routes, flightType]);
    if (!filteredRoutes[0]) return null;

    const departureDateTime = new Date(filteredRoutes[0].local_departure);
    const arrivalDateTime = new Date(filteredRoutes[filteredRoutes.length - 1].local_arrival);

    const formattedDate = formatDate(departureDateTime);
    const formattedDepartureTime = formatTime(departureDateTime);
    const formattedArrivalTime = formatTime(arrivalDateTime);

    return {
        formattedDate,
        formattedDepartureTime,
        formattedArrivalTime,
        flyFrom: filteredRoutes[0].flyFrom,
        flyTo: filteredRoutes[filteredRoutes.length - 1].flyTo,
        formattedDepartureDuration: formatDuration(flightDuration),
        flightSteps: formatStops(filteredRoutes.length - 1)
    };
}