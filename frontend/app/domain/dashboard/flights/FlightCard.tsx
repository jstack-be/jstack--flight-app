"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Frown} from "lucide-react";

export interface FlightCardProps {
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


export function FlightCards({flights}: { flights: FlightCardProps[] }) {

    if (flights === null || flights === undefined || flights.length == 0) {
        return (
            <div className={"flex-grow flex text-primary items-center justify-center text-3xl w-auto sm:text-justify"}>
                <Frown size={72} className="m-2"/> Sorry, er zijn geen vluchten gevonden.
            </div>

            // // TODO: remove this mock*
            // <div>
            //     <FlightCard key={"1"} id={"1"}
            //                 cityTo={"Brussel"}
            //                 cityFrom={"New York City"}
            //                 has_airport_change={false}
            //                 cityCodeTo={"NYC"}
            //                 technical_stops={0}
            //                 price={1000}
            //                 availability={{seats: 100}}
            //                 pnr_count={100}
            //                 airlines={["BLA", "Delta"]}
            //     />
            // </div>
        );

    } else {
        return (
            <Pagination flights={flights}/>
        );
    }
}

export function FlightCard(props: FlightCardProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card >
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className=" flex items-center justify-around space-x-4 ">
                    <CardHeader className="flex">
                        <CardTitle>{props.cityFrom} to {props.cityTo}</CardTitle>

                    </CardHeader>

                    <div className="flex mx-3">
                        <div className="flex items-center mx-3 ">Price: {props.price}</div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="default" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4"/>
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>


                </div>


                <CollapsibleContent>
                    <CardContent className="flex-col">

                        <div className="sm:flex justify-between">
                            <div className="sm:m-2 ml-0">
                                <div>
                                    Availability: {props.availability.seats}
                                </div>
                                <div>
                                    PNR count: {props.pnr_count}
                                </div>
                            </div>
                            <div className="sm:m-2 ml-0">
                                <div>
                                    {props.has_airport_change ? "Has airport change" : "No airport change"}
                                </div>
                                <div>
                                    amount of technical stops: {props.technical_stops}
                                </div>
                            </div>


                            <div className="sm:m-2 ml-0">
                                City code: {props.cityCodeTo}
                            </div>
                        </div>

                        <div>
                            Airlines: {props.airlines.join(", ")}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>);
}

const Pagination = ({flights}: { flights: FlightCardProps[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage: number = 5;

    // Calculate index of the first and last flight of the current page
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-4 scroll-auto">
            {currentFlights.map(flight => (
                <FlightCard key={flight.id} {...flight} />
            ))}
            {/* Pagination controls */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${currentPage === 1 ? 'hidden' : ''} mr-2 px-4 py-2 bg-gray-200 rounded-md`}
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastFlight >= flights.length}
                    className={`${indexOfLastFlight >= flights.length ? 'hidden' : ''} ml-2 px-4 py-2 bg-gray-200 rounded-md`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};