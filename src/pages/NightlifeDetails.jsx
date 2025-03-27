import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NightlifeDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const fetchPlace = async () => {
    try {
      const res = await axios.get(`/api/nightlife/${id}`);
      setPlace(res.data);
    } catch (err) {
      console.error("Greška kod dohvaćanja nightlife lokacije:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/nightlife/${id}/reviews`, { text, rating }, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setText("");
      setRating(5);
      fetchPlace(); 
    } catch (err) {
      console.error("Greška kod slanja recenzije:", err.response?.data || err.message);
    }
  };

  if (!place) return <p>Loading...</p>;

  return (
    <div>
      <h2>{place.name}</h2>
      <p>{place.description}</p>
      {place.mapsLink && (
        <a href={place.mapsLink} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
      )}

      <h3>Reviews:</h3>
      {place.reviews.length === 0 ? (
        <p>There are no reviews yet</p>
      ) : (
        place.reviews.map((rev, idx) => (
          <div key={idx}>
            <p><strong>Review:</strong> {rev.rating} / 5</p>
            <p>{rev.text}</p>
            <hr />
          </div>
        ))
      )}

      <h4>Add review</h4>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          placeholder="Tvoja recenzija..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <br />
        <label>Review (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default NightlifeDetails;
