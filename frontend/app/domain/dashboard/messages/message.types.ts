export interface ChatCompletionMessageParam {
    role: 'user' | 'assistant' | 'system',
    content: string
}