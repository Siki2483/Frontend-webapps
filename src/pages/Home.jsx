import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="home-container">
      <div className="overlay">
        <h1>👋 Welcome to Tourist Info Pula (TIP)</h1>
        <p>
          Explore the most beautiful beaches, sights and restaurants in Pula. Leave a review and help others
        find the best locations!
        </p>

        <div className="home-buttons">
          <Link to="/lokacije" className="btn">🌍 Locationse and Beaches</Link>
          <Link to="/restorani" className="btn">🍽️ Restaurants</Link>
          <Link to="/Register" className="btn"> Register</Link>
          <Link to="/Login" className="btn">Login</Link>
          <Link to="/NightLife" className="btn">NightLife </Link>

          {isLoggedIn ? (
            <Link to="/profil" className="btn">👤 MyProfile</Link>
          ) : (
            <>
              <Link to="/login" className="btn">🔐 Login</Link>
              <Link to="/register" className="btn">🆕 Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
