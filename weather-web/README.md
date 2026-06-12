# Weather App
## Overview

Weather App is a responsive weather forecasting application built with React and Vite. Users can search for any city and view current weather conditions along with forecast information. The application integrates with the OpenWeather API and provides a clean, user-friendly interface for checking weather data around the world.

## Features

* Search weather by city name
* Current weather conditions
* Multi-day weather forecast
* Temperature unit toggle (°C / °F)
* Loading states and error handling
* Empty state for first-time users
* Responsive design for desktop and mobile devices
* Weather condition icons and descriptions

## Technologies Used

* React
* JavaScript (ES6+)
* Vite
* CSS
* OpenWeather API
* React Hooks

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
```

Navigate to the project folder:

```bash
cd weather-web
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

## Project Structure

```text
WEATHER-APP/
└── weather-web/
    ├── src/
    │   ├── assets/
    │   │   ├── react.svg
    │   │   └── vite.svg
    │   │
    │   ├── components/
    │   │   ├── EmptyState.jsx
    │   │   ├── ErrorState.jsx
    │   │   ├── Forecast.jsx
    │   │   ├── LoadingState.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── UnitToggle.jsx
    │   │   └── WeatherCard.jsx
    │   │
    │   ├── hooks/
    │   │   └── useWeather.js
    │   │
    │   ├── services/
    │   │   └── weatherService.js
    │   │
    │   ├── utils/
    │   │   └── helpers.js
    │   │
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Helpers.js
    │   ├── index.css
    │   ├── index.js
    │   └── main.jsx
    │
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```

## Component Overview

### SearchBar.jsx

Handles user input and city searches.

### WeatherCard.jsx

Displays current weather information including temperature, conditions, humidity, and wind speed.

### Forecast.jsx

Displays upcoming weather forecast data.

### UnitToggle.jsx

Allows users to switch between Celsius and Fahrenheit.

### LoadingState.jsx

Displays loading feedback while weather data is being fetched.

### ErrorState.jsx

Displays user-friendly error messages.

### EmptyState.jsx

Provides a welcome screen before any weather search is performed.

## Custom Hook

### useWeather.js

A custom React Hook responsible for:

* Managing weather-related state
* Handling API requests
* Managing loading and error states
* Processing weather data

## Service Layer

### weatherService.js

Handles communication with the OpenWeather API and transforms raw API responses into application-friendly data structures.

## Utility Functions

### helpers.js

Contains reusable helper functions used throughout the application.

## Learning Objectives

This project was created to practice:

* React Components
* Props
* React Hooks
* Custom Hooks
* API Integration
* Asynchronous JavaScript
* Error Handling
* State Management
* Project Structure
* Environment Variables
* Responsive Design

## Future Improvements

* Hourly weather forecast
* Search history
* Favorite locations
* Dark mode
* Geolocation support
* Weather maps
* Air quality information
* Weather alerts and notifications

## API

This project uses the OpenWeather API to retrieve weather and forecast data.


## Author

Chea Soun

## License

This project is intended for educational and portfolio purposes.
