import React, { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

function ReviewForm({ type, id }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  if (!localStorage.getItem("token")) {
    return <p style={{ color: "gray" }}>You need to login to leave a review.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/${type}/${id}/reviews`,
        { text, rating },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      setMessage("Review added!");
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Error while reviewing.");
    }
  };

  return (
    <div className="review-form-page">
      <form onSubmit={handleSubmit} className="review-form">
        <h4>Leave a Review</h4>

        <textarea
          className="review-textarea"
          placeholder="Your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
        />

        <label className="rating-label">Rating (1-5):</label>
        <input
          className="rating-input"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <button type="submit" className="submit-button">
          Submit Review
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default ReviewForm;
