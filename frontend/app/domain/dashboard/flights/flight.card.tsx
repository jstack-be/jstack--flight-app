"use client"

import {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Frown, Plane} from "lucide-react";
import {Flight, ProcessedFlightData} from "@/app/domain/dashboard/flights/flight.types";
import useFlights from "@/app/lib/useFlights";
import useRoutesData from "@/app/lib/useRoutesData";

export function FlightCards() {
    const {flights, isLoading, isError} = useFlights();

    if (isLoading) return <div>Loading...</div>
    if (!flights?.length || isError) {
        return (
            <div className={"flex-grow flex text-primary items-center justify-center text-3xl w-auto sm:text-justify"}>
                <Frown size={72} className="m-2"/> Sorry, no flights found.
            </div>
        );
    }
    return (
        <div className="space-y-4 overflow-auto flex flex-col justify-center items-center">
            {flights.map(flight => (
                <FlightCard key={flight.id} {...flight} />
            ))}
        </div>
    );
}

export function FlightCard(props: Flight) {
    const [isOpen, setIsOpen] = useState(false)
    const departureRoutes = useRoutesData(props.route, 'departure', props.duration.departure);
    const returnRoutes = useRoutesData(props.route, 'return', props.duration.return);

    return (
        <div className="bg-primary rounded-2xl w-full md:w-4/5 max-w-[800px]">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="flex flex-col md:flex-row md:justify-evenly items-center md:mx-4">
                    <div className="w-full">
                        {departureRoutes && <FlightCardContend
                            formattedDate={departureRoutes.formattedDate}
                            formattedDepartureTime={departureRoutes.formattedDepartureTime}
                            flyFrom={departureRoutes.flyFrom}
                            formattedDepartureDuration={departureRoutes.formattedDepartureDuration}
                            formattedArrivalTime={departureRoutes.formattedArrivalTime}
                            flyTo={departureRoutes.flyTo}
                        />}
                        {returnRoutes && (
                            <FlightCardContend
                                formattedDate={returnRoutes.formattedDate}
                                formattedDepartureTime={returnRoutes.formattedDepartureTime}
                                flyFrom={returnRoutes.flyFrom}
                                formattedDepartureDuration={returnRoutes.formattedDepartureDuration}
                                formattedArrivalTime={returnRoutes.formattedArrivalTime}
                                flyTo={returnRoutes.flyTo}
                            />
                        )}
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
                <CollapsibleTrigger>
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

export function FlightCardContend(flightData: ProcessedFlightData) {
    return (
        <div>
            <p className="mx-4 mt-4">{flightData.formattedDate}</p>
            <div className="flex justify-between items-center w-full">
                <div className="bg-gray-600 w-10 h-10 m-2"></div>
                <div className="m-2">
                    <p>{flightData.formattedDepartureTime}</p>
                    <p>{flightData.flyFrom}</p>
                </div>
                <div className="w-2/5 flex flex-col justify-center items-center">
                    <p>{flightData.formattedDepartureDuration}</p>
                    <div className="flex w-full items-center">
                        <hr className="w-5/6 border-2"/>
                        <Plane className="w-1/6"/>
                    </div>
                    <p>Direct</p>
                </div>
                <div className="m-2">
                    <p>{flightData.formattedArrivalTime}</p>
                    <p>{flightData.flyTo}</p>
                </div>
            </div>
        </div>
    );
}