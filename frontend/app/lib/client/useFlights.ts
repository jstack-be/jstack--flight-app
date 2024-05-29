"use client"
import {useMutation} from "@tanstack/react-query";
import {getUserLocation, queryFlights} from "@/app/lib/server/actions";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {useLocalStorage, useSessionStorage} from "@uidotdev/usehooks";

export default function useFlights() {
    const [messages, saveMessages] = useLocalStorage<ChatCompletionMessageParam[]>("messages", []);
    const [flights, setFlights] = useSessionStorage<Flight[]>("flights", []);
    const mutation = useMutation({
        mutationFn: queryFlights,
        onSuccess: (data) => {
            if (data.error) {
                saveMessages([...messages, {role: 'assistant', content: data.error}])
                return;
            }
            else {
            setFlights(data.flights);
            saveMessages([...messages, {role: 'assistant', content: data.message}])
            }
        },
        onError: (error) => {

            saveMessages([...messages, {role: 'assistant', content: error.message}])
        },
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
                    used currency is ${userLocation.currency.code} and languages are ${userLocation.languages.substring(0, 2)}`
                },
                {role: 'user', content}
            ];
            setFlights([]);
        } else {
            messageHistory = [...messages, {role: 'user', content}];
        }



        saveMessages(messageHistory)
        mutation.mutate(messageHistory);
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