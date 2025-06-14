import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Restaurants.css";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/restaurants`);
        let data = res.data;

       
        if (filterType !== "all") {
          data = data.filter((rest) => rest.type === filterType);
        }

        
        if (sortOption === "rating-desc") {
          data.sort((a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews));
        } else if (sortOption === "rating-asc") {
          data.sort((a, b) => calculateAverageRating(a.reviews) - calculateAverageRating(b.reviews));
        } else if (sortOption === "name") {
          data.sort((a, b) => a.name.localeCompare(b.name));
        }

        setRestaurants(data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchRestaurants();
  }, [filterType, sortOption]);

  return (
    <div className="restaurant-page">
      <h2>Restaurants</h2>

      <div className = "filter-sort-bar">
        <div className = "select-wrapper">
          <label>Filter by type:</label>
          <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
            <option value="all">All Types</option>
            <option value="Pizzeria">Pizzeria</option>
            <option value="BBQ">BBQ</option>
            <option value="Seafood">Seafood</option>
            <option value="Burger">Burger</option>
            <option value="Konoba">Konoba</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className = "select-wrapper">
          <label>Sort by:</label>
         <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="none">No Sorting</option>
            <option value="rating-desc">Top Rated</option>
           <option value="rating-asc">Lowest Rated</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      <div className="restaurant-container">
        {restaurants.map((rest) => {
          const avgRating = calculateAverageRating(rest.reviews);
          return (
            <div key={rest._id} className="restaurant-card">
              <Link to={`/restaurants/${rest._id}`}>
                <h3>{rest.name}</h3>
              </Link>

              <p>{rest.description}</p>

              {rest.image && (
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="restaurant-image"
                />
              )}

              {avgRating ? (
                <p>
                  {renderStars(avgRating)} ({avgRating.toFixed(1)} / 5, {rest.reviews.length} review)
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

              <Link to={`/restaurants/${rest._id}`}>
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
