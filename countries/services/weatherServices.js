import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

console.log(API_KEY);

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const weatherData = response.data;

    // Process the data to include the icon URL
    const processedWeatherData = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    };

    console.log("Processed Weather Data:", processedWeatherData); // Debugging
    return processedWeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};
