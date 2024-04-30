export function addMessage(message: string) {
    // get the existing messages from session storage
    const messageHistory = getAllMessages()
    // add the new message to the array
    messageHistory.push(message);
    // store the updated array in session storage
    localStorage.setItem('messages', JSON.stringify(messageHistory));
    return messageHistory;
}

export function getAllMessages() {
    return JSON.parse(localStorage.getItem('messages') || '[]');
}

export function removeAllMessages() {
    localStorage.removeItem('messages');
}