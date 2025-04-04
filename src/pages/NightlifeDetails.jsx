import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

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
    <div>
      <h2>{nightlife.name}</h2>
      <p>{nightlife.description}</p>
      <p><strong>Location:</strong> {nightlife.location}</p>
      <a href={nightlife.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>

      <hr />
      <ReviewList reviews={nightlife.reviews} />
      <ReviewForm type="nightlife" id={id} />
    </div>
  );
}

export default NightlifeDetails;
