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
    } catch (error) {
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
                  <div className="backdrop-blur-lg p-4 m-2 rounded-2xl border inline-block text-5xl ">
                    <p className="text-base"> {weatherData.name}{", "} {weatherData.sys.country}  </p>
                    <p className="font-bold p-2">{kelvinToCelsius(weatherData.main.temp)}°</p>
                    <p className="text-sm">Min {kelvinToCelsius(weatherData.main.temp_min)}° {" / "} Max {kelvinToCelsius(weatherData.main.temp_max)}°</p>
                    <p className="text-sm"> {weatherData.weather[0].main}{" / "}{kelvinToCelsius(weatherData.main.feels_like)}° {" - "} {weatherData.weather[0].description}  </p>
                    <p className="text-sm"> Humidity {": "} {weatherData.main.humidity} {" , "} Pressure {": "} {weatherData.main.pressure}  </p>
                  </div>
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
