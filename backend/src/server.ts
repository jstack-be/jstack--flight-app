import app from "./app";
import environment from "./enviroment";
import rateLimit from "express-rate-limit";
import {mountHandlers} from "./routes/routing";
import helmet from "helmet";
import cors from 'cors';

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
app.use(helmet())
app.use(cors());
mountHandlers(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendStatus(200)
});

