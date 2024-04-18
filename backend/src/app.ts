import express from 'express';
import axios from "axios";
import bodyParser from "body-parser";
import cors from 'cors';
import 'dotenv/config'
import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/resources";


const app = express();
const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY
});
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());

const jsonFormat: string = "{\"fly_from\": \"IATA\",\"fly_to\": \"IATA\",\"date_from\": \"\",\"date_to\": \"\"}"

const exampleJsonRespons: string = "{fly_from: \"ANR\",fly_to: \"LON\",date_from: \"17/06/2024\",date_to: \"19/06/2024\"}";

const exampleMessageHistory: string = "User: 'Show me the routes to London.' " +
    "assistant: 'From where do you which to depart ?'" +
    " User:'Antwerp.'" +
    " assistant: 'When do you wish to depart?'" +
    " User: 'Around 18 June'" +
    " assistant: 'In which year'"+
    " User: '2024'" +
    ` assistant: ${exampleJsonRespons}`

let messages: ChatCompletionMessageParam[] = [
    {
        role: "system",
        content: `You're a travel planner assistant, returning a JSON object in this format ${jsonFormat}.` +
            "If some values are empty or not provided, you should ask the user to provide them. Remember, you never provide code and text together." +
            "Your task is to search for the nearest airport to the given locations and add it to the 'fly_from' and 'fly_to' properties as IATA codes." +
            `For example: ${exampleMessageHistory}`
    },
];

app.delete('/messages', async (req, res) => {
    try {
        messages = messages.slice(0, 1)
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

app.post('/messages', async (req, res) => {
    messages.push({
        role: "user",
        content: req.body.user
    })

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
    });

    const response = completion.choices[0].message.content
    console.log(response)

    try {
        const regex = /^[a-zA-Z\s.,!?]+$/;
        if (regex.test(response)) {
            messages.push({
                role: "assistant",
                content: response
            })
            res.send(response)
        } else {
            const flights = await getTravelData(JSON.parse(response))
            res.send(flights);
        }
    } catch (e) {
        // console.error(e)
        res.sendStatus(500)
    }
});

interface FlightApiProps {
    fly_from: string,
    date_from: string,
    date_to: string
}

interface Flight {
    id: string;
    nightsInDest: null | number;
    duration: {
        departure: number;
        return: number;
        total: number;
    };
    // flyFrom: string;
    cityFrom: string;
    // cityCodeFrom: string;
    // countryFrom: {
    //     code: string;
    //     name: string;
    // };
    // flyTo: string;
    cityTo: string;
    cityCodeTo: string;
    // countryTo: {
    //     code: string;
    //     name: string;
    // };
    // distance: number;
    airlines: string[];
    pnr_count: number;
    has_airport_change: boolean;
    technical_stops: number;
    // throw_away_ticketing: boolean;
    // hidden_city_ticketing: boolean;
    price: number;
    bags_price: {
        [key: string]: number;
    };
    baglimit: {
        hand_width: number;
        hand_height: number;
        hand_length: number;
        hand_weight: number;
        hold_width: number;
        hold_height: number;
        hold_length: number;
        hold_dimensions_sum: number;
        hold_weight: number;
    };
    availability: {
        seats: number;
    };
    // facilitated_booking_available: boolean;
    conversion: {
        [key: string]: number;
    };
    quality: number; // Use it if you want to sort your flights according to quality. The lower the number the better.
    booking_token: string;
    fare: {
        adults: number;
        children: number;
        infants: number;
    };
    price_dropdown: {
        base_fare: number;
        fees: number;
    };
    virtual_interlining: boolean;
    route: Route[];
    local_arrival: string;
    utc_arrival: string;
    local_departure: string;
    utc_departure: string;
}

interface Route {
    // fare_basis: string;
    fare_category: string;
    // fare_classes: string;
    // fare_family: string;
    return: number;
    bags_recheck_required: boolean;
    vi_connection: boolean;
    guarantee: boolean;
    id: string;
    combination_id: string;
    cityTo: string;
    cityFrom: string;
    // cityCodeFrom: string;
    // cityCodeTo: string;
    // flyTo: string;
    // flyFrom: string;
    airline: string;
    operating_carrier: string;
    // equipment: string;
    flight_no: number;
    vehicle_type: string;
    operating_flight_no: string;
    local_arrival: string;
    utc_arrival: string;
    local_departure: string;
    utc_departure: string;
}

async function getTravelData(requestParameters: FlightApiProps): Promise<Flight[]> {
    const config = {
        headers: {
            apiKey: process.env.FLIGHT_API_KEY,
        },
        params: requestParameters
    }

    try {
        const response = await axios.get('https://api.tequila.kiwi.com/v2/search', config)
        return response.data.data
    } catch (e) {
        // console.error(e)
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});