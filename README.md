# Atmos — Weather Intelligence Dashboard

A full-stack upgrade of the original Weather Forecast project. The browser UI is built with HTML, CSS and vanilla JavaScript. Node.js/Express provides the backend API, MongoDB stores saved places and recent searches, and OpenWeatherMap supplies live weather data.

## Features
- City search and current-location weather
- Current conditions: temperature, feels-like, humidity, wind, pressure and visibility
- Next 8 forecast intervals (3-hour intervals from provider)
- 5-day forecast derived from forecast records
- Save/remove favourite cities
- Recent search history and clear-history option
- API key kept on the server in `.env`
- Request validation, centralized API errors, Helmet headers and rate limiting
- Responsive desktop/mobile interface

## Stack
HTML5, CSS3, JavaScript, Node.js 20+, Express 5, MongoDB, Mongoose, OpenWeatherMap API.

## Setup (Windows PowerShell)
1. Install Node.js 20+ and MongoDB Community Server, or create a MongoDB Atlas database.
2. Open this folder in VS Code.
3. Check versions: `node --version` and `npm --version`.
4. Install packages: `npm install`
5. Create local configuration: `Copy-Item .env.example .env`
6. Edit `.env` and set your own OpenWeatherMap API key and MongoDB URI:

```env
PORT=3000
NODE_ENV=development
OPENWEATHER_API_KEY=your_real_key
MONGODB_URI=mongodb://127.0.0.1:27017/weather_intelligence
```

For Atlas, replace the MongoDB URI with the connection string from your own cluster. Do not commit or share `.env`.
7. Start MongoDB if using a local database.
8. Run `npm run dev` (or `npm start`).
9. Open http://localhost:3000

## API routes
| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/weather?city=Hyderabad` | City weather and forecast |
| GET | `/api/weather/coordinates?lat=17.38&lon=78.48` | Weather by coordinates |
| GET | `/api/saved-cities` | List saved cities |
| POST | `/api/saved-cities` | Save city |
| DELETE | `/api/saved-cities/:id` | Remove city |
| GET | `/api/history` | Recent searches |
| DELETE | `/api/history` | Clear history |

POST body example: `{"name":"Hyderabad","country":"IN","lat":17.385,"lon":78.4867}`

## Structure
```text
public/              frontend assets
src/config/          MongoDB connection
src/models/          Mongoose models
src/routes/           API routes and handlers
src/services/         OpenWeather API integration
server.js             Express entry point
.env.example          environment template
```

## Troubleshooting
- `OPENWEATHER_API_KEY` error: add a valid key to `.env` and restart the server.
- MongoDB connection error: confirm MongoDB is running or verify Atlas URI/network access.
- API 401: verify the API key and its activation/plan access.
- City not found: check spelling.
- Geolocation: use localhost or HTTPS and allow browser location permission.
- Check `http://localhost:3000/api/health` to verify the API server.

## Important notes
This starter version has no user authentication; saved cities and search history are shared by anyone using the same deployment. Add login and per-user data ownership before making it a multi-user public service. Weather API access and quotas depend on your provider account. The 5-day view is derived from provider forecast data, not an ML prediction. Automated integration tests and production deployment hardening remain future improvements.

Weather source: OpenWeatherMap.
