# Project overview

## Problem
Users need a straightforward dashboard for current weather and short-term forecasts across locations.

## Solution
A responsive browser interface calls an Express API. The backend calls OpenWeatherMap so the API key is not exposed in frontend code. MongoDB stores saved locations and recent search activity.

## Request flow
1. Browser sends a city or coordinate request to Express.
2. The weather service validates input and calls OpenWeatherMap.
3. The route shapes provider data into a consistent response.
4. Frontend renders current conditions, hourly intervals and daily forecast.
5. MongoDB persists saved places and recent searches.

## Future enhancements
User authentication and per-user saved cities, temperature unit toggle, weather alerts/air quality when supported by provider plan, automated integration tests, deployment and monitoring.
