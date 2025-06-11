import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Nightlife.css"; 

function Nightlife() {
  const [nightlifeList, setNightlifeList] = useState([]);

  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const fetchNightlife = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/nightlife`);
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

  const getFilteredAndSortedList = () => {
    let list = [...nightlifeList];
  
    if (filterType !== "all") {
      list = list.filter((place) => place.type === filterType);
    }
  
    if (sortOption === "rating-desc") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "rating-asc") {
      list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortOption === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    return list;
  };

  return (
    <div className="nightlife-page">
      <h2>Nightlife in Pula</h2>

      <div className = "filter-sort-bar">
        <div className = "select-wrapper">
          <label>Filter by type:</label>
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="all">All Types</option>
          <option value="nightclub">Nightclub</option>
          <option value="caffebar">Caffebar</option>
          <option value="beachbar">Beachbar</option>
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

      <div className="nightlife-container">
      {getFilteredAndSortedList().map((place) => {
          const avgRating = calculateAverageRating(place.reviews);
          return (
            <div key={place._id} className="nightlife-card">
              <Link to={`/nightlife/${place._id}`}>
                <h3>{place.name}</h3>
              </Link>
              <p>{place.description}</p>

              {place.image && (
                <img
                  src={place.image}
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
