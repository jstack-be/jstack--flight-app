"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";

export interface FlightCardProps {
    id: string;
    cityFrom: string;
    cityTo: string;
    cityCodeTo: string;
    airlines: string[] ;
    pnr_count: number ;
    has_airport_change: boolean | false;
    technical_stops: number ;
    price: number ;
    availability: {
        seats: number ;
    };
}


export function FlightCards({ flights }: { flights: FlightCardProps[] }) {
    if (flights.length === 0) {
        return <div>No flights found</div>
    }else
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
                <div className=" flex items-center justify-between space-x-4 px-4">
                    <CardHeader>
                        <CardTitle>{props.cityFrom} to {props.cityTo}</CardTitle>
                    </CardHeader>

                    <div>
                        <CollapsibleTrigger asChild >
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4"/>
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>


                </div>


                <CollapsibleContent>
                    <CardContent className="space-y-2">

                        <div>
                            {props.has_airport_change ? "Has airport change" : "No airport change"}
                        </div>
                        <div>
                            City code: {props.cityCodeTo}
                        </div>
                        <div>
                            amount of technical stops {props.technical_stops}
                        </div>
                        <div>
                            Price: {props.price}
                        </div>
                        <div>
                            Availability: {props.availability.seats}
                        </div>
                        <div>
                            PNR count: {props.pnr_count}
                        </div>
                        <div>
                            Airlines: {props.airlines.join(", ")}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>);
}