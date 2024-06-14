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
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationWeatherData, setLocationWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
          getWeatherByLocation(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );

      // Cleanup the watchPosition on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getUser(debouncedSearchTerm);
    } else if (location.latitude && location.longitude) {
      getWeatherByLocation(location.latitude, location.longitude);
    }
  }, [debouncedSearchTerm, location]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  async function getWeatherByLocation(lat, lon) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=f00c38e0279b7bc85480c3fe775d518c&lat=${lat}&lon=${lon}`
      );
      setLocationWeatherData(response.data);
    } catch (error) {
      setLocationWeatherData(null);
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
    } else {
      return defaultImage;
    }
  };

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  const dataToShow = searchTerm ? weatherData : locationWeatherData;

  const backgroundImage = dataToShow
    ? getBackgroundImage(dataToShow.weather[0].description.toLowerCase())
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
            {loading ? (
              <div className="text-center">
                <p>Loading...</p>
              </div>
            ) : dataToShow ? (
              <div className="text-center justify-center flex-col">
                <div className="backdrop-blur-lg p-4 m-2 rounded-2xl border inline-block text-5xl ">
                  <p className="text-base"> {dataToShow.name}{", "} {dataToShow.sys.country}  </p>
                  <p className="font-bold p-2">{kelvinToCelsius(dataToShow.main.temp)}°</p>
                  <p className="text-sm">Min {kelvinToCelsius(dataToShow.main.temp_min)}° {" / "} Max {kelvinToCelsius(dataToShow.main.temp_max)}°</p>
                  <p className="text-sm"> {dataToShow.weather[0].main}{" / "}{kelvinToCelsius(dataToShow.main.feels_like)}° {" - "} {dataToShow.weather[0].description}  </p>
                  <p className="text-sm"> Humidity {": "} {dataToShow.main.humidity} {" , "} Pressure {": "} {dataToShow.main.pressure}  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>No data available</p>
                {error && <p>Error: {error}</p>}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
