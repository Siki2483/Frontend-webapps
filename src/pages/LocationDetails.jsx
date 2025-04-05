import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "./Details.css";

function LocationDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(`/api/locations/${id}`);
        setLocation(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchLocation();
  }, [id]);

  if (!location) return <p>Loading...</p>;

  return (
    <div className="review-details-page">
      <div className="review-card">
        <h2>{location.name}</h2>
        <p>{location.description}</p>
        <p><strong>Tip:</strong> {location.type}</p>
        <a href={location.mapsLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
      </div>

      <div className="review-card">
        <h3>Reviews: </h3>
        <ReviewList reviews={location.reviews} />
        <ReviewForm type="locations" id={id} />
      </div>
    </div>
  );
}

export default LocationDetails;
