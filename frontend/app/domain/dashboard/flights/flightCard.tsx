"use client"

import {Button} from "@/components/ui/button";
import {Frown, Plane} from "lucide-react";
import {Flight, ProcessedFlightData} from "@/app/domain/dashboard/flights/flight.types";
import useRoutesData from "@/app/lib/client/useRoutesData";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import spinningPlane from "@/public/spinning-plane-white.gif";


interface FlightCardsProps {
    flights: Flight[],
    isLoading: boolean
    isError: boolean
}

/**
 * FlightCards component to display the flights
 * @param flights - array of flights to display
 * @param isLoading - boolean to check if the flights are loading
 * @param isError - boolean to check if there is an error
 */
export function FlightCards({flights, isLoading, isError}: FlightCardsProps) {
    const t = useTranslations('FlightCards');
    const [hasData, setHasData] = useState(false)
    useEffect(() => {
        if (!isLoading) {
            if (!flights?.length || isError) {
                setHasData(false)
            } else setHasData(true)
        }
    }, [flights, isError, isLoading]);
    //todo add refresh functionality

    return (
        <div className={`relative w-full sm:w-4/5 flex flex-col items-center ${isLoading && "overflow-hidden"}`}>
            {(!hasData) ?
                <div className={`${isLoading && "h-screen"}`}><p className={"flex text-primary items-center text-3xl"}>
                    <Frown size={72} className="m-2"/> {t("NoFlights")}
                </p></div>
                :
                <div className={`space-y-4 m-4 w-full flex flex-col items-center ${isLoading && "opacity-50"}`}>
                    {flights.map(flight => (
                        <FlightCard key={flight.id} {...flight} />
                    ))}
                </div>
            }
            {isLoading &&
                <div className="absolute inset-0 flex justify-center items-center">
                    <Image src={spinningPlane} alt={"plane spinner"} width={200}
                           height={200}/>
                </div>
            }
        </div>
    );
}

export function FlightCard(props: Flight) {
    const t = useTranslations('FlightCard');
    const departureRoutes = useRoutesData(props.route, 'departure', props.duration.departure);
    const returnRoutes = useRoutesData(props.route, 'return', props.duration.return);

    const formatCurrency = (currencyCode: string, amount: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);

    // Extract the currency code and the corresponding amount from the conversion object
    const prizes = Object.entries(props.price_conversion);
    const [currencyCode, amount] = prizes[prizes.length - 1];
    const priceInCurrency = formatCurrency(currencyCode, amount);

    return (
        <div className="bg-primary rounded-2xl w-full max-w-[850px]">
            <div className="flex flex-col md:flex-row md:justify-evenly justify-center items-center">
                <div className="w-full p-4 md:pb-4 pb-0">
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
                <div className="m-4">
                    <div className="flex md:justify-end my-3 space-x-2 w-full">
                        <p className="flex text-flightcard-price text-lg font-bold">{priceInCurrency}</p>
                    </div>
                    <a href={props.booking_link} target="_blank" rel="noopener noreferrer">
                        <Button
                            className="bg-gradient-to-br from-secondary-background to-secondary-background-gradient hover:bg-secondary-background-hover text-primary text-lg h-[37px] w-[300px] md:w-[132px]">
                            {t("Details")}
                        </Button>
                    </a>
                </div>
            </div>
        </div>);
}

export function FlightCardContend(flightData: ProcessedFlightData) {
    return (
        <div>
            <p className="mx-4">{flightData.formattedDate}</p>
            <div className="flex justify-between items-center w-full md:w-11/12 md:mx-4">
                <div className="m-2 flex justify-center items-center flex-col xl:flex-row w-1/6">
                    {/*todo change to next/image*/}
                    {flightData.flightLogos.map((logo, index) => (
                        <img className="m-2 w-7 h-7" key={index} src={logo} alt={"Logo from the airline"}/>
                    ))}

                </div>
                <div className="m-2">
                    <div className="text-flightcard-darkgrey text-xl">{flightData.formattedDepartureTime}</div>
                    <div className="text-flightcard-grey text-2xl">{flightData.flyFrom}</div>
                </div>
                <div className="w-2/5 flex flex-col justify-center items-center">
                    <div className="text-flightcard-grey">{flightData.formattedDepartureDuration}</div>
                    <div className="flex w-full items-center">
                        <hr className="w-5/6 border-2"/>
                        <Plane className="w-1/6"/>
                    </div>
                    <div className="text-flightcard-blue">{flightData.flightSteps}</div>
                </div>
                <div className="m-2">
                    <div className="text-flightcard-darkgrey text-xl">{flightData.formattedArrivalTime}</div>
                    <div className="text-flightcard-grey text-2xl">{flightData.flyTo}</div>
                </div>
            </div>
        </div>
    );
}
