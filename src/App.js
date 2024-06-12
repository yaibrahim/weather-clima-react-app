import React, { useEffect, useState } from "react";
import NavBar from "./componant/NavBar";
import cloudy from "../src/assets/cloudy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunny from "../src/assets/sunny.jpg";
import windy from "../src/assets/windy.jpg";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${cloudy})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h2 className="text-3xl text-center text-gray-900 p-10">Today's Weather</h2>
      </div>
    </>
  );
}

export default App;
