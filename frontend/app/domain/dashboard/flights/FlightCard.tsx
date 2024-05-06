"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
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
            // <div className={"flex-grow flex text-primary items-center justify-center text-3xl w-auto sm:text-justify"}>
            //     <Frown size={72} className="m-2"/> Sorry, er zijn geen vluchten gevonden.
            // </div>

            // TODO: remove this mock*
            <div>
                <FlightCard key={"1"} id={"1"}
                            cityTo={"Brussel"}
                            cityFrom={"New York City"}
                            has_airport_change={false}
                            cityCodeTo={"NYC"}
                            technical_stops={0}
                            price={1000}
                            availability={{seats: 100}}
                            pnr_count={100}
                            airlines={["BLA", "Delta"]}
                />
            </div>
        );

    } else
        return (

            <div className="space-y-4">
                {flights.map(flight => <FlightCard key={flight.id} {...flight}/>)}
            </div>
        );
}

export function FlightCard(props: FlightCardProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className=" flex items-center justify-between space-x-4 ">
                    <CardHeader className="flex">
                        <CardTitle>{props.cityFrom} to {props.cityTo}</CardTitle>

                    </CardHeader>

                    <div className="flex">
                        <div className="flex items-center mr-0">Price: {props.price}</div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
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