import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {mountHandlers} from "./routes/routing";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())

mountHandlers(app)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export default app;
