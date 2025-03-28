import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

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

export default Navbar;
