import {Express} from 'express';
import {deleteMessages, postMessages} from '../domain/messages/message.controler';

export function mountHandlers(app: Express): void {
    app.delete('/messages', deleteMessages);
    app.post('/messages', postMessages);
}