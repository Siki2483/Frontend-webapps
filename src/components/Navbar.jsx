import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <nav style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f2f2f2", borderBottom: "1px solid #ccc" }}>
      <Link to="/">🏠 Početna</Link> |{" "}
      <Link to="/lokacije">🌍 Locations</Link> |{" "}
      <Link to="/restorani">🍽️ Restaurants</Link> |{" "}

      {isLoggedIn && (
        <>
          <Link to="/profil">👤 Profile</Link> |{" "}
        </>
      )}

      {isAdmin && (
        <>
          <Link to="/dodaj-lokaciju">➕ Lokacija</Link> |{" "}
          <Link to="/dodaj-restoran">➕ Restoran</Link> |{" "}
        </>
      )}

      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
