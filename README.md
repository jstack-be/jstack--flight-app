# jstack--flight-app

This is a flight search application developed using TypeScript, Next.js, React, and Node.js. The application allows users to search for flights based on various parameters such as departure location, destination, and travel dates.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is responsible for handling flight search requests and communicating with external flight APIs. It is developed using TypeScript and Node.js. The main files in the backend include:

- `flight.controller.ts`: This file handles incoming HTTP requests and sends responses based on the results from the flight service.
- `flight.service.ts`: This file communicates with the external flight API and returns the flight data.
- `message.service.ts`: This file generates flight search parameters based on user messages.

### Frontend

The frontend is developed using Next.js and Typescript. It provides a user interface for users to input their flight search parameters and view the search results.

## Running Tests

Tests are written using Jest and are located in the `test` directory. To run the tests, use the following command in the root directory of the project you want to test.

```bash
npm run test
```

## Running the Application

To start the application, first install the dependencies using the following command in both the `frontend` and `backend` directories:

```bash
npm install
```

Then, start the application using the following command in both the `frontend` and `backend` directories:

```bash
npm start
```

The application will be available at `http://localhost:3000`.