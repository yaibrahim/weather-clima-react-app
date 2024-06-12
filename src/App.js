import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
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

  return (
    <div>
      <h1>Get Geolocation</h1>
      {error && <p>Error: {error}</p>}
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
