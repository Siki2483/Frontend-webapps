import React from "react";
import "./ReviewForm.css";

function ReviewList({reviews}) {
    if (!reviews || reviews.lenght === 0) {
        return <p>There are no reviews yet</p>;
    }

    return (
        <div>
          {reviews.map((review) => (
            <div key={review._id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
              <strong>{review.user?.name || "Unknown user"}</strong>
              <p>Review: {review.rating} / 5</p>
              <p>{review.text}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      );
    }
    
    export default ReviewList;