import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Restaurants.css"; 

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

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
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-container">
      <h2>Restaurants</h2>
      <div className="restaurant-grid">
        {restaurants.map((rest) => {
          const avgRating = calculateAverageRating(rest.reviews);
          return (
            <div key={rest._id} className="restaurant-card">
              <Link to={`/restorani/${rest._id}`}>
                <h3>{rest.name}</h3>
              </Link>

              <p>{rest.description}</p>

              {rest.image && (
                <img
                  src={`http://localhost:5000${rest.image}`}
                  alt={rest.name}
                  className="restaurant-image"
                />
              )}

              {avgRating ? (
                <p>
                  {renderStars(Number(avgRating))} ({avgRating} / 5, {rest.reviews.length} review)
                </p>
              ) : (
                <p>There are no reviews yet</p>
              )}

              {rest.mapLink && (
                <a
                  href={rest.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-button"
                >
                  Open in Google Maps
                </a>
              )}


              <Link to={`/restorani/${rest._id}`}>
                <button className="review-button">Leave a review</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Restaurants;
