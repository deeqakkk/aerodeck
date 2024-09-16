# AeroDeck Project

This project is a flight information system that allows you to view a list of available flights, search for flights by various parameters, and view detailed information about each flight. It also includes error handling and a custom hook for fetching data from APIs.

## Live link
[Live here](https://aerodeck.netlify.app/)

## Features

1. **Flight List**: Fetches and renders a list of all available flights.
2. **Flight Details**: On clicking each flight card, it opens a detailed view of the selected flight.
3. **Search**: A search field allows users to search using origin, destination, airplane name, airplane number, and status.
4. **Error Handling**: Custom error handling for all pages, including a custom error page if the URL is not correct.
5. **Custom Hook**: A custom hook, `useFlightData.ts`, is used to avoid repeating code when fetching data from APIs.
6. **Preloader**: A preloader is displayed on every page when data is being fetched from the APIs.
7. **Responsive Design**: The application is mobile-friendly and responsive.

## Local Setup

Follow these steps to set up the project locally:

1. Clone the repository from GitHub:

```sh
git clone https://github.com/deeqakkk/aerodeck.git
```

2. Navigate into the project directory:

```sh
cd aerodeck
```

3. Install the project dependencies:

```sh
npm install
```

4. Start the local development server:

```sh
npm run dev
```

Now, you can open your browser and navigate to `http://localhost:5173` to view the application.

## Running Tests

```sh
npm run test
```
