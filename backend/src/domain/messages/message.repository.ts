import {ChatCompletionMessageParam} from "openai/resources";

const messages = new Map<string, ChatCompletionMessageParam[]>; //todo add seperated repository

export function getConversationMessages(conversationId: string): ChatCompletionMessageParam[] {
    return messages.get(conversationId);
}

export function removeConversationMessages(conversationId: string): boolean {
    return messages.delete(conversationId)
}

export function addConversationMessage(conversationId: string, message: string) {
    const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: message
    }
    if (messages.has(conversationId)) {
        messages.get(conversationId)?.push(userMessage)
    } else {
        messages.set(conversationId, [userMessage])
    }
}