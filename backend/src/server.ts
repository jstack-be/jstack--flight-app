import {app} from "./app";
import {environment} from "./enviroment";

const port: number = environment.serverPort;

if (isNaN(port)) {
    console.error('PORT is not a valid number.');
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

