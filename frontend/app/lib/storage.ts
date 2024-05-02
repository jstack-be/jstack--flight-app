export interface ChatCompletionMessageParam {
    role: 'user' | 'assistant',
    content: string
}

export function addMessage(content: string, role: 'user' | 'assistant' = 'user') {
    // get the existing messages from session storage
    const messageHistory = getAllMessages()
    // add the new message to the array
    messageHistory.push({content, role});
    // store the updated array in session storage
    localStorage.setItem('messages', JSON.stringify(messageHistory));
    return messageHistory;
}

export function getAllMessages(): ChatCompletionMessageParam[] {
    return JSON.parse(localStorage.getItem('messages') || '[]');
}

export function removeAllMessages() {
    localStorage.removeItem('messages');
}