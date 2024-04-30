export function addMessage(message: string) {
    // get the existing messages from session storage
    const messageHistory = getAllMessages()
    // add the new message to the array
    messageHistory.push(message);
    // store the updated array in session storage
    sessionStorage.setItem('messages', JSON.stringify(messageHistory));
    console.log(sessionStorage?.getItem('messages'));
    return messageHistory;
}

export function getAllMessages() {
    return JSON.parse(sessionStorage.getItem('messages') || '[]');
}

export function removeAllMessages() {
    sessionStorage.removeItem('messages');
}