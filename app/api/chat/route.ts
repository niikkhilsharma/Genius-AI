import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

// OpenWeatherMap API key - store this in environment variables in production
const OPENWEATHER_API_KEY =
  process.env.OPENWEATHER_API_KEY || "your_api_key_here";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    tools: {
      // server-side tool with real weather data from OpenWeatherMap
      getWeatherInformation: {
        description: "Get real weather information for a city",
        parameters: z.object({
          city: z.string().describe("The city name to get weather for"),
        }),
        execute: async ({ city }: { city: string }) => {
          try {
            // First get geocoding data to convert city name to coordinates
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();

            if (!geoData || !geoData.length) {
              return `Could not find location data for ${city}`;
            }

            const { lat, lon } = geoData[0];

            // Now fetch the actual weather data using coordinates
            // Using 2.5 API which matches your response format
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${OPENWEATHER_API_KEY}`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            if (weatherData.error) {
              return `Error fetching weather: ${weatherData.error}`;
            }

            // Format the weather data into a readable response
            const currentWeather = weatherData.current;

            // Check if weather data has the expected structure
            if (
              !currentWeather ||
              !currentWeather.weather ||
              !currentWeather.weather[0]
            ) {
              console.error("Unexpected weather data structure:", weatherData);
              return `Error: Unexpected weather data format`;
            }

            // Handle any potential alerts
            let alertInfo = "";
            if (weatherData.alerts && weatherData.alerts.length > 0) {
              const alert = weatherData.alerts[0];
              alertInfo = `⚠️ ${alert.event}: ${alert.description.split("...")[0]}`;
            }

            return {
              location: `${city} (${geoData[0].country})`,
              temperature: `${Math.round(currentWeather.temp)}°C`,
              feelsLike: `${Math.round(currentWeather.feels_like)}°C`,
              conditions: currentWeather.weather[0].description,
              humidity: `${currentWeather.humidity}%`,
              windSpeed: `${Math.round(currentWeather.wind_speed * 3.6)} km/h`, // Convert m/s to km/h
              timestamp: new Date(currentWeather.dt * 1000).toLocaleString(),
              alertInfo: alertInfo || null,
            };
          } catch (error) {
            console.error("Weather API error:", error);
            return `Error fetching weather data: ${error instanceof Error ? error.message : String(error)}`;
          }
        },
      },
      // client-side tool that starts user interaction
      askForConfirmation: {
        description: "Ask the user for confirmation.",
        parameters: z.object({
          message: z.string().describe("The message to ask for confirmation."),
        }),
      },
      // client-side tool that is automatically executed on the client
      getLocation: {
        description:
          "Get the user location. Always ask for confirmation before using this tool.",
        parameters: z.object({}),
      },
    },
  });

  return result.toDataStreamResponse();
}
