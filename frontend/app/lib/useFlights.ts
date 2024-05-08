"use client"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryFlights} from "@/app/lib/actions";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {ChatCompletionMessageParam} from "@/app/domain/dashboard/messages/message.types";
import {useLocalStorage} from "@uidotdev/usehooks";

export default function useFlights() {
    const [messages, saveMessages] = useLocalStorage<ChatCompletionMessageParam[]>("message", []);
    const [flights, setFlights] = useLocalStorage<Flight[]>("flights",[]); //todo remove from local storage
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: queryFlights,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['flights']})
        },
    })

    async function sendMessage(content: string) {
        if (!content.trim() || messages === undefined) return;
        try {
            const messageHistory: ChatCompletionMessageParam[] = [...messages, {role: 'user', content}];
            const respons = await mutation.mutateAsync(messageHistory);
            saveMessages([...messageHistory, {role: 'assistant', content: respons.message}]);
            setFlights(respons.flights);
        } catch (error) {
            console.error('Error:', error);
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