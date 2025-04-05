import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "./Details.css";

function NightlifeDetails() {
  const { id } = useParams();
  const [nightlife, setNightlife] = useState(null);

  useEffect(() => {
    const fetchNightlife = async () => {
      try {
        const res = await axios.get(`/api/nightlife/${id}`);
        setNightlife(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchNightlife();
  }, [id]);

  if (!nightlife) return <p>Loading...</p>;

  return (
    <div className ="review-details-page">
      <div className ="review-card">
        <h2>{nightlife.name}</h2>
        <p>{nightlife.description}</p>
        <p><strong>Location:</strong> {nightlife.location}</p>
        <a href={nightlife.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
      </div>

      <div className = "review-card">
        <ReviewList reviews={nightlife.reviews} />
        <ReviewForm type="nightlife" id={id} />
      </div>
    </div>
  );
}

export default NightlifeDetails;
