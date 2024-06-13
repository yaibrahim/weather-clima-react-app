import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./componant/NavBar";
import cloudy from "../src/assets/cloudy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunny from "../src/assets/sunny.jpg";
import windy from "../src/assets/windy.jpg";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      getUser(searchTerm);
    }
  }, [searchTerm]);

  async function getUser(city) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=f00c38e0279b7bc85480c3fe775d518c&q=${city}`);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
    } else {
      return cloudy;
    }
  };

  const backgroundImage = weatherData ? getBackgroundImage(weatherData.weather[0].description.toLowerCase()) : cloudy;

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  return (
    <>
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h2 className="text-3xl text-center text-gray-900 p-10">Today's Weather</h2>
        {searchTerm && (
          <p className="text-xl text-center text-gray-900">
            Search term: {searchTerm}
          </p>
        )}
        {weatherData && (
          <div className="text-center text-gray-900">
            <p>City Name: {weatherData.name}</p>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
            <p>Feels like Temperature: {kelvinToCelsius(weatherData.main.feels_like)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
