import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Locations.css";

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
    <div className="locations-page">
      <h2>Locations & Beaches</h2>
      <div className="location-container">
        {locations.map((loc) => {
          const avgRating = calculateAverageRating(loc.reviews);
          return (
            <div key={loc._id} className="location-card">
              <Link to={`/lokacije/${loc._id}`}>
                <h3>{loc.name}</h3>
              </Link>

              <p>{loc.description}</p>

              {loc.image && (
                <img
                  src={`http://localhost:5000${loc.image}`}
                  alt={loc.name}
                  className="location-image"
                />
              )}

              {avgRating ? (
                <p>
                  {renderStars(Number(avgRating))} ({avgRating} / 5, {loc.reviews.length} reviews)
                </p>
              ) : (
                <p>There are no reviews yet</p>
              )}

              <div className="location-buttons">
                {loc.mapLink && (
                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                  >
                    Open in Google Maps
                  </a>
                )}

                <Link to={`/lokacije/${loc._id}`}>
                  <button className="review-button">Leave a review</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Locations;
