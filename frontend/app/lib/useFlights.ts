"use client"
import {useMutation} from "@tanstack/react-query";
import {queryFlights} from "@/app/lib/actions";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {useLocalStorage} from "@uidotdev/usehooks";

export default function useFlights() {
    const [messages, saveMessages] = useLocalStorage<ChatCompletionMessageParam[]>("messages", []);
    const [flights, setFlights] = useLocalStorage<Flight[]>("flights", []);
    const mutation = useMutation({
        mutationFn: queryFlights,
        onSuccess: (data) => {
            // Invalidate and refetch
            setFlights(data.flights);
            saveMessages([...messages, {role: 'assistant', content: data.message}])
        },
        onError: (error) => {
            saveMessages([...messages, {role: 'assistant', content: error.message}])
        },
    })

    function sendMessage(content: string) {
        if (!content.trim() || messages === undefined) return;
        const messageHistory: ChatCompletionMessageParam[] = [...messages, {role: 'user', content}];
        saveMessages(messageHistory)
        try {
            mutation.mutate(messageHistory);
        } catch (error) {
            // console.error('Error:', error);
        }
    }

    function removeAllMessages() {
        window.localStorage.clear();
    }

    return {
        messages,
        flights,
        sendMessage,
        removeAllMessages,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        errorMessage: mutation.error?.message
    }
}