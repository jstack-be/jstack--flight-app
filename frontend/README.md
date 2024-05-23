# Online Travel-planner with OpenAI
made by Tristan Huygen and Axell Tielemans

## Table of Contents

- [Introduction](#introduction)
- [Used technologies](#used-technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

## Introduction

The Online Travel-planner is part of the internship project made
by [Tristan Huygen](https://www.linkedin.com/in/tristan-huygen-57786b2b0/)
and [Axell Tielemans](https://www.linkedin.com/in/axell-tielemans/). In this project they make use of
the [openAi API](https://platform.openai.com/docs) to
transform user input into a json object to search in
the [Tequila travel API from Kiwi](https://tequila.kiwi.com/portal/companies/hikeheaven).

## Used technologies
- Next.js App routing
- Airhex API
- IPgeolocation API
- useHooks library
- React
- Tailwind
- Lucide

## Installation
````shell
# download the project or clone it from github
git clone https://github.com/jstack-be/jstack--flight-app.git

#install the dependencies
npm install
````

## Usage
Create a `.env` file in the root of your project and add the required environmental variabels:
````dotenv
FLIGHT_API_KEY="your-api-key-from-tequila"
OPENAI_API_KEY="your-api-key-from-openai"
OPENAI_ORGANISATION_KEY="your-organisation-key-from-openai"

#The following enviromental variabels can be changed but should always be included
SERVER_PORT=3000
FLIGHT_SEARCH_URL="https://api.tequila.kiwi.com/v2/search"
````

Start in development mode
````shell
npm run dev
````
Start in production mode
````shell
npm run start
````

## Example

Enter the sentence "I want to travel with my wife and two children from London to Antwerp on 18/05/2024 and I am planning to return on 16/06/2024" in the textarea. This will generate flight cards or a message indicating something went wrong. The date can not be more than two months in the past, so be sure to update the sentence.
