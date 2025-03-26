import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ type, id }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/${type}/${id}/reviews`, {
        text,
        rating
      }, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      setMessage("Review added!");
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Error while revewing.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h4>Dodaj recenziju:</h4>
      <textarea
        placeholder="Your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows="3"
        style={{ width: "100%" }}
      />
      <br />
      <label>Ocjena (1-5): </label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <br />
      <button type="submit">Send review</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ReviewForm;
