import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Restaurants</h2>
      {restaurants.map((rest) => {
        const avgRating = calculateAverageRating(rest.reviews);
        return (
          <div key={rest._id} style={{ marginBottom: "1rem" }}>
            <Link to={`/restorani/${rest._id}`}>
              <h3>{rest.name}</h3>
            </Link>

            {avgRating ? (
              <p>
                {renderStars(Number(avgRating))} ({avgRating} / 5, {rest.reviews.length} recenzija)
              </p>
            ) : (
              <p>There are no reviews yet</p>
            )}

            <p>{rest.description}</p>
            {rest.mapLinks && (
              <a href={rest.mapLinks} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Restaurants;
