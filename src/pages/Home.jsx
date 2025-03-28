import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content">
          <h1>Welcome to Tourist Info Pula</h1>
          <p>Explore the best locations, beaches, restaurants and nightlife in Pula</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
