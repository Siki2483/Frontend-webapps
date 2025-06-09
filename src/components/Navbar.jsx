import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); 

  
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">🏠 Home</Link>
        <Link to="/lokacije">🌍 Locations</Link>
        <Link to="/restaurants">🍽 Restaurants</Link>
        <Link to="/nightlife">🎉 Nightlife</Link>
        <Link to="/recommendednearyou">Recommended Near You</Link>
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
