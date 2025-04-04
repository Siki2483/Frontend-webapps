import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Nightlife.css"; 

function Nightlife() {
  const [nightlifeList, setNightlifeList] = useState([]);

  useEffect(() => {
    const fetchNightlife = async () => {
      try {
        const res = await axios.get("/api/nightlife");
        setNightlifeList(res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchNightlife();
  }, []);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  return (
    <div className="nightlife-page">
      <h2>Nightlife in Pula</h2>
      <div className="nightlife-container">
        {nightlifeList.map((place) => {
          const avgRating = calculateAverageRating(place.reviews);
          return (
            <div key={place._id} className="nightlife-card">
              <Link to={`/nightlife/${place._id}`}>
                <h3>{place.name}</h3>
              </Link>
              <p>{place.description}</p>

              {place.image && (
                <img
                  src={`http://localhost:5000${place.image}`}
                  alt={place.name}
                  className="nightlife-image"
                />
              )}

              {avgRating ? (
                <p>
                  {renderStars(Number(avgRating))} ({avgRating} / 5, {place.reviews.length} reviews)
                </p>
              ) : (
                <p>There are no reviews yet</p>
              )}

              {place.mapLink && (
                <a
                  href={place.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-button"
                >
                  Open in Google Maps
                </a>
              )}

              <Link to={`/nightlife/${place._id}`}>
                <button className="review-button">Leave a review</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Nightlife;
