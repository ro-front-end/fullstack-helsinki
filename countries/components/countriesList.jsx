import { useState } from "react";

import { getWeather } from "../services/weatherServices";

function CountriesList({ countries }) {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleShowCountry = async (id) => {
    setSelectedCountryId(id);

    const selectedCountry = countries.find((country) => country.cca2 === id);

    if (selectedCountry && selectedCountry.capital) {
      try {
        const weather = await getWeather(selectedCountry.capital[0]);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }
  };

  const handleCloseCountry = () => {
    setSelectedCountryId(null);
    setWeatherData(null);
  };

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>
            {selectedCountryId === country.cca2 ? (
              <div>
                <div className="img-container">
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                  />
                  <img
                    className="img-coat"
                    src={country.coatOfArms.png}
                    alt={`${country.name.common} coat of arms`}
                  />
                </div>
                <div className="info-container">
                  <h2>{`${country.name.common}`}</h2>
                  <h4>Capital: {country.capital}</h4>
                  <p>Continents: {country.continents}</p>

                  {weatherData && (
                    <div className="weather-info">
                      <h3>Weather in {country.capital}</h3>
                      <p>Temperature: {weatherData.temperature} °C</p>
                      <p>Weather: {weatherData.description}</p>
                      <p>Humidity: {weatherData.humidity}%</p>

                      <img
                        src={weatherData.iconUrl}
                        alt={weatherData.description}
                        className="weather-icon"
                      />
                    </div>
                  )}

                  <button onClick={handleCloseCountry} className="name-btn">
                    Close Country
                  </button>
                </div>
              </div>
            ) : (
              <div className="name-container">
                <h2>{`${country.name.common}`}</h2>
                <button
                  onClick={() => handleShowCountry(country.cca2)}
                  className="name-btn"
                >
                  Show Country
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountriesList;
