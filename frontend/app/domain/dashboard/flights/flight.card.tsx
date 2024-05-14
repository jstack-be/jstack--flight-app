"use client"

import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Frown, Plane} from "lucide-react";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import useFlights from "@/app/lib/useFlights";

export function FlightCards() {
    const {flights, isLoading, isError} = useFlights();

    if (isLoading) return <div>Loading...</div>
    if (flights === null || flights === undefined || flights.length == 0 || isError) {
        return (
            <div className={"flex-grow flex text-primary items-center justify-center text-3xl w-auto sm:text-justify"}>
                <Frown size={72} className="m-2"/> Sorry, no flights found.
            </div>
        );
    } else {
        return (
            <div className="space-y-4 overflow-auto flex flex-col justify-center items-center">
                {flights.map(flight => (
                    <FlightCard key={flight.id} {...flight} />
                ))}
            </div>
        );
    }
}

export function FlightCard(props: Flight) {
    const [isOpen, setIsOpen] = React.useState(false)
    // Create a Date object from the string
    const departureDateTime = new Date(props.local_departure);
    const arrivalDateTime = new Date(props.local_arrival);

    // Format the date as "Mon 17 June"
    const dateOptions: Intl.DateTimeFormatOptions = {weekday: 'short', day: 'numeric', month: 'short'};
    const formattedDate = departureDateTime.toLocaleDateString('en-US', dateOptions);

    // Format the time as "hh:mm"
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDepartureTime = departureDateTime.toLocaleTimeString('en-US', timeOptions);
    const formattedArrivalTime = arrivalDateTime.toLocaleTimeString('en-US', timeOptions);

    // The total seconds
    const flightDurationInSeconds = props.duration.departure;

    // Convert seconds to hours and minutes
    const hours = Math.floor(flightDurationInSeconds / 3600);
    const minutes = Math.floor((flightDurationInSeconds % 3600) / 60);

    // Create a string to hold the formatted duration
    let formattedDepartureDuration = '';

    // Only add hours to the string if they are greater than 0
    if (hours > 0) {
        formattedDepartureDuration += `${hours}h `;
    }

    // Only add minutes to the string if they are greater than 0
    if (minutes > 0) {
        formattedDepartureDuration += `${minutes}min`;
    }

    // Remove trailing space if there are no minutes
    formattedDepartureDuration = formattedDepartureDuration.trim();

    return (
        <div className="bg-primary rounded-2xl w-full md:w-4/5 max-w-[800px]">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <p className="mx-4 mt-4">{formattedDate}</p>
                <div className="flex flex-col md:flex-row md:justify-evenly items-center md:mx-4">
                    <div className="flex justify-between items-center md:w-4/5 w-full">
                        <div className="bg-gray-600 w-10 h-10 m-2">
                        </div>
                        <div className="m-2">
                            <p>{formattedDepartureTime}</p>
                            <p>{props.flyFrom}</p>
                        </div>
                        <div className="w-2/5 flex flex-col justify-center items-center">
                            <p>{formattedDepartureDuration}</p>
                            <div className="flex items-center justify-center w-full">
                                <hr className="w-5/6 border-2"/>
                                <Plane className="w-1/6"/>
                            </div>
                            <p>Direct</p>
                        </div>
                        <div className="m-2">
                            <p>{formattedArrivalTime}</p>
                            <p>{props.flyTo}</p>
                        </div>
                    </div>

                    <div className="m-4 ms-6"> {/*todo change colors to global*/}
                        <div className="flex md:justify-end my-3 space-x-2 w-full">
                            <p className="text-gray-400">price </p>
                            <p className="flex text-blue-700 text-lg">{props.price}</p>
                        </div>
                        <a href={props.booking_link} target="_blank" rel="noopener noreferrer">
                            <Button
                                className="bg-amber-500 hover:bg-amber-400 text-primary text-lg h-[37px] w-[300px] md:w-[132px]"> Select </Button>
                        </a>
                    </div>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="default" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4"/>
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex-col">
                        <div>
                            Airlines: {props.airlines.join(", ")}
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>);
}