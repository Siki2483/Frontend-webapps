import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Locations.css";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/locations`);
        setLocations(res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchLocations();
  }, []);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  const getFilteredAndSortedList = () => {
    let list = [...locations];

    if (filterType !== "all") {
      list = list.filter((loc) => loc.type.toLowerCase() === filterType.toLowerCase());
    }

    if (sortOption === "rating-desc") {
      list.sort((a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews));
    } else if (sortOption === "rating-asc") {
      list.sort((a, b) => calculateAverageRating(a.reviews) - calculateAverageRating(b.reviews));
    } else if (sortOption === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  };

  return (
    <div className="locations-page">
      <h2>Locations & Beaches</h2>

      <div className="filter-sort-bar">
        <div className="select-wrapper">
          <label>Filter by type:</label>
          <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
            <option value="all">All Types</option>
            <option value="location">Location</option>
            <option value="beach">Beach</option>
          </select>
        </div>

        <div className="select-wrapper">
          <label>Sort by:</label>
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="none">No Sorting</option>
            <option value="rating-desc">Top Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      <div className="location-container">
        {getFilteredAndSortedList().map((loc) => {
          const avgRating = calculateAverageRating(loc.reviews);
          return (
            <div key={loc._id} className="location-card">
              <Link to={`/lokacije/${loc._id}`}>
                <h3>{loc.name}</h3>
              </Link>

              <p>{loc.description}</p>

              {loc.image && (
                <img
                  src={`https://backend-webapps.onrender.com${loc.image}`}
                  alt={loc.name}
                  className="location-image"
                />
              )}

              {avgRating ? (
                <p>
                  {renderStars(avgRating)} ({avgRating.toFixed(1)} / 5, {loc.reviews.length} reviews)
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
