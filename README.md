# jstack--flight-app

This is a flight search application developed by Tristan Huygen and Axell using Next.js and an Express server.
The application allows users to search for flights based on various parameters such as departure location, destination, and travel dates
that they can pass along in a message to an AI assitant.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is responsible for handling flight search requests and communicating with external flight APIs. It is developed using TypeScript and Node.js. The main files in the backend include:

- `flight.controller.ts`: This file handles incoming HTTP requests and sends responses based on the results from the flight service.
- `flight.service.ts`: This file communicates with the external flight API and returns the flight data.
- `message.service.ts`: This file generates flight search parameters based on user messages.

For more information on how to run the application, please refer to the README file in the [backend](./backend/README.md)

### Frontend

The frontend is developed using Next.js and Typescript. It provides a user interface for users to input their flight search parameters and view the search results.

For more information on how to run the application, please refer to the README file in the [frontend](./frontend/README.md)