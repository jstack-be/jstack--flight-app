import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {mountHandlers} from "./routes/routing";
import helmet from "helmet";
import {environment} from "./enviroment";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())

const port: number = environment.serverPort;

if (isNaN(port)) {
    console.error('PORT is not a valid number.');
    process.exit(1);
}


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // Use `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the older `X-RateLimit-*` headers.
    message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

mountHandlers(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.sendStatus(200)
});

export default app;
