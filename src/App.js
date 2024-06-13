import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./componant/NavBar";
import cloudy from "../src/assets/cloudy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunny from "../src/assets/sunny.jpg";
import windy from "../src/assets/windy.jpg";
import haze from "../src/assets/haze.jpg";
import dust from "../src/assets/dust.jpg";
import defaultImage from "../src/assets/default.jpg";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      getUser(searchTerm);
    }
  }, [searchTerm]);

  async function getUser(city) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=f00c38e0279b7bc85480c3fe775d518c&q=${city}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }

  const getBackgroundImage = (weather) => {
    if (weather.includes("rain")) {
      return rainy;
    } else if (weather.includes("cloud")) {
      return cloudy;
    } else if (weather.includes("sun") || weather.includes("clear")) {
      return sunny;
    } else if (weather.includes("wind")) {
      return windy;
    } else if (weather.includes("haze")) {
      return haze;
    } else if (weather.includes("dust")) {
      return dust;
    }else {
      return defaultImage;
    }
  };

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  const backgroundImage = weatherData
    ? getBackgroundImage(weatherData.weather[0].description.toLowerCase())
    : defaultImage;

  return (
    <div>
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-1">
        <div
          className="main-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="content text-white flex-col">
            <h2 className="text-3xl text-center p-10 font-bold">Today's Weather</h2>
            {searchTerm && (
              <p className="text-xl text-center">Search term: {searchTerm}</p>
            )}
            {loading ? (
              <div className="text-center">
                <p>Searching...</p>
              </div>
            ) : (
              weatherData && (
                <div className="text-center justify-center flex-col">
                  <div className="font-bold backdrop-blur p-5 rounded-lg border inline-block text-lg">
                    {kelvinToCelsius(weatherData.main.temp)}°C
                  </div>
                  <p>City Name: {weatherData.name}</p>
                  <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
                  <p>
                    Feels like Temperature:{" "}
                    {kelvinToCelsius(weatherData.main.feels_like)}°C
                  </p>
                  <p>Weather: {weatherData.weather[0].description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
