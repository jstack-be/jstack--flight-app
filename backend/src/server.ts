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

mountHandlers(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
