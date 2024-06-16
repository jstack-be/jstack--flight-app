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

    async function restartConversation(content: string) {
        if (!content.trim() || messages === undefined) return;
        const userLocation = await getUserLocation();
        const messageHistory: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: `Use this data if not provided: current city to depart from is ${userLocation.city} in ${userLocation.country_name},
                    used currency is ${userLocation.currency.code} and languages are ${locale}`
            },
            {role: 'user', content}
        ];
        setFlights([]);
        saveMessages([...messageHistory])
    }

    function addMessage(content: string, role: ChatCompletionMessageParam['role'] = "user") {
        if (messages.length === 0 || messages[messages.length - 1].role !== role) {
            saveMessages([...messages, {role, content} as ChatCompletionMessageParam]);
        }
    }

    const continueConversation = (content: string) => {
        const messageHistory = [...messages, {role: "user", content} as ChatCompletionMessageParam];
        saveMessages(messageHistory);
        mutation.mutate(messageHistory, {
            onSuccess: (data) => {
                if (data.error) {
                    saveMessages([...messageHistory, {role:"assistant", content:data.error}])
                    return;
                } else {
                    setFlights(data.flights);
                    saveMessages([...messageHistory, {role:"assistant", content:data.message}])
                }
            },
        });
    }

    function fetchData() {
        if (!messages?.length) return;
        mutation.mutate(messages, {
            onSuccess: (data) => {
                if (data.error) {
                    addMessage(data.error, "assistant")
                    return;
                } else {
                    setFlights(data.flights);
                    addMessage(data.message, "assistant")
                }
            },
        });
    }

    return {
        messages,
        flights,
        restartConversation,
        addMessage,
        fetchData,
        continueConversation,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        errorMessage: mutation.error?.message
    }
}