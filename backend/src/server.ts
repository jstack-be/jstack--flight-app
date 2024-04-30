import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {mountHandlers} from "./routes/routing";
import helmet from "helmet";
import {environment} from "./enviroment";

const app = express();

const port: number = environment.serverPort;

if (isNaN(port)) {
    console.error('PORT is not a valid number.');
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
    // Gracefully close the server
    server.close(() => {
        console.log('Server closed due to error');
        process.exit(1); // Exit the process with failure
    });
});

mountHandlers(app)

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export {app};