import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Locations() {
  const [locations, setLocations] = useState([]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("/api/locations");
        setLocations(res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <h2>Locations and Beaches</h2>
      {locations.map((loc) => (
        <div key={loc._id} style={{ marginBottom: "1rem" }}>
          <Link to={`/lokacije/${loc._id}`}>
            <h3>{loc.name} ({loc.type})</h3>
          </Link>

          {calculateAverageRating(loc.reviews) ? (
            <p>
              {renderStars(Number(calculateAverageRating(loc.reviews)))}{" "}
              ({calculateAverageRating(loc.reviews)} / 5, {loc.reviews.length} recenzija)
            </p>
          ) : (
            <p>No reviews yet</p>
          )}

          <p>{loc.description}</p>
          {loc.mapsLink && (
            <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer">Otvori u Google Maps</a>
          )}
        </div>
      ))}
    </div>
  );
}

export default Locations;
