import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import 'dotenv/config'
import { handleDeleteMessages, handlePostMessages } from './messageService';
import OpenAI from "openai";

const app = express();
const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY
});
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());

app.delete('/messages', handleDeleteMessages);
app.post('/messages', handlePostMessages);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
