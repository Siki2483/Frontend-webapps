import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";


function Profile() {
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState({ locations: [], restaurants: [] });

  <LogoutButton />

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRes = await axios.get("/api/auth/user", {
          headers: { "x-auth-token": token },
        });
        setUser(userRes.data);

        const [locationsRes, restaurantsRes] = await Promise.all([
          axios.get("/api/locations"),
          axios.get("/api/restaurants"),
        ]);

        const userId = userRes.data._id;

        const locationReviews = locationsRes.data
          .filter((loc) =>
            loc.reviews.some((rev) => rev.user === userId || rev.user?._id === userId)
          )
          .map((loc) => ({
            name: loc.name,
            type: "Lokacija",
            reviews: loc.reviews.filter((rev) => rev.user === userId || rev.user?._id === userId),
          }));

        const restaurantReviews = restaurantsRes.data
          .filter((res) =>
            res.reviews.some((rev) => rev.user === userId || rev.user?._id === userId)
          )
          .map((res) => ({
            name: res.name,
            type: "Restaurant",
            reviews: res.reviews.filter((rev) => rev.user === userId || rev.user?._id === userId),
          }));

        setUserReviews({ locations: locationReviews, restaurants: restaurantReviews });
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <hr />
      <h3>My reviews:</h3>

      {userReviews.locations.length === 0 && userReviews.restaurants.length === 0 && (
        <p>There are no reviews.</p>
      )}

      {userReviews.locations.map((loc) => (
        <div key={loc.name}>
          <h4>📍 {loc.name}</h4>
          {loc.reviews.map((rev, idx) => (
            <div key={idx}>
              <p><strong>Rating:</strong> {rev.rating} / 5</p>
              <p>{rev.text}</p>
              <hr />
            </div>
          ))}
        </div>
      ))}

      {userReviews.restaurants.map((res) => (
        <div key={res.name}>
          <h4>🍽️ {res.name}</h4>
          {res.reviews.map((rev, idx) => (
            <div key={idx}>
              <p><strong>Rating:</strong> {rev.rating} / 5</p>
              <p>{rev.text}</p>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Profile;
