import express from 'express';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

mountHandlers(app)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export default app;
