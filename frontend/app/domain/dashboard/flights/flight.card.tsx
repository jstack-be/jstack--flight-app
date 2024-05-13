"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Frown} from "lucide-react";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import useFlights from "@/app/lib/useFlights";

export function FlightCards() {
    const {flights, isLoading,isError} = useFlights();

    if (isLoading) return <div>Loading...</div>
    if (flights === null || flights === undefined || flights.length == 0 || isError) {
        return (
            <div className={"flex-grow flex text-primary items-center justify-center text-3xl w-auto sm:text-justify"}>
                <Frown size={72} className="m-2"/> Sorry, no flights found.
            </div>
        );
    } else {
        return (
            <div className="space-y-4 overflow-auto">
                {flights.map(flight => (
                    <FlightCard key={flight.id} {...flight} />
                ))}
            </div>
        );
    }
}

export function FlightCard(props: Flight) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card>
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