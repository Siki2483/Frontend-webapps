import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`/api/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p><strong>Location:</strong> {restaurant.location}</p>
      <a href={restaurant.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>

      <hr />
      <ReviewList reviews={restaurant.reviews} />
      <ReviewForm type="restaurants" id={id} />
    </div>
  );
}

export default RestaurantDetails;
