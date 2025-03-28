import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">🏠 Home</Link>
        <Link to="/lokacije">🌍 Locations</Link>
        <Link to="/restorani">🍽 Restaurants</Link>
        <Link to="/nightlife">🎉 Nightlife</Link>
      </div>

      <div className="navbar-right">
        {token ? (
          <div
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/profil">👤 My Profile</Link>


            {isAdmin && showDropdown && (
              <div className="dropdown-content">
                <Link to="/dodaj-lokaciju">➕ Lokacija</Link>
                <Link to="/dodaj-restoran">➕ Restoran</Link>
                <Link to="/dodaj-nightlife">➕ Nightlife</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Sign In</Link>
        )}

        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
