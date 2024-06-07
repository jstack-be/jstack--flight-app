"use client"
import {useMutation} from "@tanstack/react-query";
import {queryFlights} from "@/app/lib/server/actions";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {useLocalStorage, useSessionStorage} from "@uidotdev/usehooks";
import {getUserLocation} from "@/app/lib/client/location";
import {useLocale} from "next-intl";

export default function useFlights() {
    const [messages, saveMessages] = useLocalStorage<ChatCompletionMessageParam[]>("messages", []);
    const [flights, setFlights] = useSessionStorage<Flight[]>("flights", []);
    const locale = useLocale()
    const mutation = useMutation({
        mutationFn: queryFlights
    });


    async function sendMessage(content: string, restart = false) {
        if (!content.trim() || messages === undefined) return;
        let messageHistory: ChatCompletionMessageParam[]
        if (restart) {
            const userLocation = await getUserLocation();
            messageHistory = [
                {
                    role: 'system',
                    content: `Use this data if not provided: current city to depart from is ${userLocation.city} in ${userLocation.country_name},
                    used currency is ${userLocation.currency.code} and languages are ${locale}`
                },
                {role: 'user', content}
            ];
            setFlights([]);
        } else {
            messageHistory = [...messages, {role: 'user', content}];
        }
        saveMessages([...messageHistory])
        mutation.mutate(messageHistory,{
            onSuccess: (data) => {
                if (data.error) {
                    saveMessages([...messageHistory, {role: 'assistant', content: data.error}])
                    return;
                } else {
                    setFlights(data.flights);
                    saveMessages([...messageHistory, {role: 'assistant', content: data.message}])
                }
            },
        });

    }

    function refreshData() {
        mutation.mutate(messages);
    }

    return {
        messages,
        flights,
        sendMessage,
        refreshData,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        errorMessage: mutation.error?.message
    }
}