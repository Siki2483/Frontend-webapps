import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <h2>Pula Nightlife</h2>
      {nightlifeList.map((place) => (
        <div key={place._id} style={{ marginBottom: "1rem" }}>
          <Link to={`/nightlife/${place._id}`}>
            <h3>{place.name}</h3>
          </Link>
          {calculateAverageRating(place.reviews) ? (
            <p>
              {calculateAverageRating(place.reviews)} / 5 ({place.reviews.length} review)
            </p>
          ) : (
            <p>There are no reviews</p>
          )}
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Nightlife;
