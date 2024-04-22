import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {mountHandlers} from "./routes/routing";

const app = express();

const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());

mountHandlers(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
