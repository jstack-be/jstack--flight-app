"use client"
import {useMutation} from "@tanstack/react-query";
import {queryFlights} from "@/app/lib/actions";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {useLocalStorage, useSessionStorage} from "@uidotdev/usehooks";

export default function useFlights() {
    const [messages, saveMessages] = useLocalStorage<ChatCompletionMessageParam[]>("messages", []);
    const [flights, setFlights] = useSessionStorage<Flight[]>("flights", []);
    const mutation = useMutation({
        mutationFn: queryFlights,
        onSuccess: (data) => {
            setFlights(data.flights);
            saveMessages([...messages, {role: 'assistant', content: data.message}])
        },
        onError: (error) => {
            saveMessages([...messages, {role: 'assistant', content: error.message}])
        },
    })

    function sendMessage(content: string, restart = false) {
        if (!content.trim() || messages === undefined) return;
        let messageHistory: ChatCompletionMessageParam[]
        if (restart) {
            messageHistory = [{role: 'user', content}];
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