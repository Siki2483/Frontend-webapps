import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import "./Profile.css";


function Profile() {
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState({ locations: [], restaurants: [], nightlife: [] });
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeMessage, setChangeMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRes = await axios.get("/api/auth/user", {
          headers: { "x-auth-token": token },
        });
        setUser(userRes.data);
        localStorage.setItem("isAdmin", userRes.data.isAdmin);

        const [locationsRes, restaurantsRes, nightlifeRes ] = await Promise.all([
          axios.get("/api/locations"),
          axios.get("/api/restaurants"),
          axios.get("/api/nightlife")
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

          const nightlifeReviews = nightlifeRes.data
            .filter((n) =>
              n.reviews.some((rev) => rev.user === userId || rev.user?._id === userId)
          )
           .map((n) => ({
              name: n.name,
              type: "Nightlife",
              reviews: n.reviews.filter((rev) => rev.user === userId || rev.user?._id === userId),
         }));

        setUserReviews({ locations: locationReviews, restaurants: restaurantReviews, nightlife: nightlifeReviews });
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>
  
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
  
        <hr />
  
        <div className="profile-reviews">
          <h3>My Reviews:</h3>
  
          {userReviews.locations.length === 0 &&
          userReviews.restaurants.length === 0 &&
          userReviews.nightlife.length === 0 && (
            <p>There are no reviews.</p>
          )}
  
          {userReviews.locations.map((loc) => (
            <div key={loc.name}>
              <h4>📍 {loc.name}</h4>
              {loc.reviews.map((rev, idx) => (
                <div key={idx} className="review-box">
                  <p><strong>Rating:</strong> {rev.rating} / 5</p>
                  <p>{rev.text}</p>
                </div>
              ))}
            </div>
          ))}
  
          {userReviews.restaurants.map((res) => (
            <div key={res.name}>
              <h4>🍽️ {res.name}</h4>
              {res.reviews.map((rev, idx) => (
                <div key={idx} className="review-box">
                  <p><strong>Rating:</strong> {rev.rating} / 5</p>
                  <p>{rev.text}</p>
                </div>
              ))}
            </div>
          ))}
  
          {userReviews.nightlife.map((bar) => (
            <div key={bar.name}>
              <h4>🌃 {bar.name}</h4>
              {bar.reviews.map((rev, idx) => (
                <div key={idx} className="review-box">
                  <p><strong>Rating:</strong> {rev.rating} / 5</p>
                  <p>{rev.text}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="change-password-section">
  <h3>Change Password</h3>
  <input
    type="password"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button
    onClick={async () => {
      if (newPassword !== confirmPassword) {
        setChangeMessage("New passwords do not match.");
        return;
      }

      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE}/api/auth/change-password`,        
          { currentPassword, newPassword },
          { headers: { "x-auth-token": localStorage.getItem("token") } }
        );
        setChangeMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err) {
        setChangeMessage(err.response?.data?.msg || "Error changing password.");
      }
    }}
    className="change-password-btn"
  >
    Change Password
  </button>
  {changeMessage && <p>{changeMessage}</p>}
</div>
        </div>
      </div>
      
    </div>
  );
}

export default Profile;
