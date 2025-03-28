import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Navbar.jsx";

function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="navbar">
  <div className="navbar-logo">Tourist Info Pula</div>
  <ul className="navbar-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/lokacije">Lokacije</Link></li>
    <li><Link to="/restorani">Restorani</Link></li>
    <li><Link to="/nightlife">Nightlife</Link></li>
    <li><Link to="/profil">Profil</Link></li>
  </ul>
</nav>

  );
}

export default Home;
