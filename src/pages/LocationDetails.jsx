import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

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
    <div>
      <h2>{location.name}</h2>
      <p>{location.description}</p>
      <p><strong>Tip:</strong> {location.type}</p>
      <a href={location.mapsLink} target="_blank" rel="noreferrer">Open in Google Maps</a>

      <hr />
      <ReviewList reviews={location.reviews} />
      <ReviewForm type="locations" id={id} />
    </div>
  );
}

export default LocationDetails;
