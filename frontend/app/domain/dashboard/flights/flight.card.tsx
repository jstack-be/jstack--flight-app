"use client"

import {Button} from "@/components/ui/button";
import {Frown, Plane} from "lucide-react";
import {Flight, ProcessedFlightData} from "@/app/domain/dashboard/flights/flight.types";
import useFlights from "@/app/lib/useFlights";
import useRoutesData from "@/app/lib/useRoutesData";

export function FlightCards() {
    const {flights, isLoading, isError} = useFlights();

    if (isLoading) return <div>Loading...</div>
    if (!flights?.length || isError) {
        return (
            <p className={"flex text-primary items-center text-3xl text-justify"}>
                <Frown size={72} className="m-2"/> Sorry, no flights found.
            </p>
        );
    }
    return (
        <div className="space-y-4 md:w-4/5 flex flex-col items-center">
            {flights.map(flight => (
                <FlightCard key={flight.id} {...flight} />
            ))}
        </div>
    );
}

export function FlightCard(props: Flight) {
    const departureRoutes = useRoutesData(props.route, 'departure', props.duration.departure);
    const returnRoutes = useRoutesData(props.route, 'return', props.duration.return);

    return (
        <div className="bg-primary rounded-2xl w-full max-w-[800px]">
            <div className="flex flex-col md:flex-row md:justify-evenly justify-center items-center my-4 md:mx-4">
                <div className="w-full">
                    {departureRoutes && (
                        <FlightCardContend
                            formattedDate={departureRoutes.formattedDate}
                            formattedDepartureTime={departureRoutes.formattedDepartureTime}
                            flyFrom={departureRoutes.flyFrom}
                            formattedDepartureDuration={departureRoutes.formattedDepartureDuration}
                            formattedArrivalTime={departureRoutes.formattedArrivalTime}
                            flyTo={departureRoutes.flyTo}
                            flightSteps={departureRoutes.flightSteps}
                            flightLogos={departureRoutes.flightLogos}
                        />
                    )}
                    {returnRoutes && <hr className="border-dotted border-t-4 m-4 mx-6 "/>}
                    {returnRoutes && (
                        <FlightCardContend
                            formattedDate={returnRoutes.formattedDate}
                            formattedDepartureTime={returnRoutes.formattedDepartureTime}
                            flyFrom={returnRoutes.flyFrom}
                            formattedDepartureDuration={returnRoutes.formattedDepartureDuration}
                            formattedArrivalTime={returnRoutes.formattedArrivalTime}
                            flyTo={returnRoutes.flyTo}
                            flightSteps={returnRoutes.flightSteps}
                            flightLogos={returnRoutes.flightLogos}
                        />
                    )}
                </div>
                <div className="m-4 ms-6"> {/*todo change colors to global*/}
                    <div className="flex md:justify-end my-3 space-x-2 w-full">
                        <p className="text-gray-400">price </p>
                        <p className="flex text-blue-700 text-lg font-bold">€{props.price}</p>
                    </div>
                    <a href={props.booking_link} target="_blank" rel="noopener noreferrer">
                        <Button
                            className="bg-amber-500 hover:bg-amber-400 text-primary text-lg h-[37px] w-[300px] md:w-[132px]"> Select </Button>
                    </a>
                </div>
            </div>
        </div>);
}

export function FlightCardContend(flightData: ProcessedFlightData) {
    return (
        <div>
            <p className="mx-4">{flightData.formattedDate}</p>
            <div className="flex justify-between items-center w-full md:w-11/12 md:mx-4 mb-2">
                <div className="m-2 flex justify-center items-center flex-col md:flex-row w-1/6">
                    {/*todo change to next/image*/}
                    {flightData.flightLogos.map((logo, index) => (
                        <img className="m-2 w-10 h-10" key={index} src={logo} alt={"Logo from the flying airline"}/>
                    ))}

                </div>
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
                    <p>{flightData.flightSteps}</p>
                </div>
                <div className="m-2">
                    <p>{flightData.formattedArrivalTime}</p>
                    <p>{flightData.flyTo}</p>
                </div>
            </div>
        </div>
    );
}