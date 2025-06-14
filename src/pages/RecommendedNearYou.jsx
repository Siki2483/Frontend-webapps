import { useEffect, useState } from "react";
import axios from "axios";
import "./RecommendedNearYou.css";

const RecommendedNearYou = () => {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [nightlife, setNightlife] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
            `/api/recommended/nearby?lat=${latitude}&lng=${longitude}`
          );
          setLocations(res.data.locations || []);
          setRestaurants(res.data.restaurants || []);
          setNightlife(res.data.nightlife || []);
        } catch (err) {
          console.error("Nearby fetch failed, loading popular content instead.");
          loadFallback();
        }
      },
      (geoErr) => {
        console.error("Geolocation error:", geoErr.message);
        setError("Location unavailable.");
        loadFallback();
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  }, []);

  const loadFallback = async () => {
  try {
    const [locRes, restRes, nightRes] = await Promise.all([
      axios.get(`${process.env.REACT_APP_API_BASE}/api/locations`),
      axios.get(`${process.env.REACT_APP_API_BASE}/api/restaurants`),
      axios.get(`${process.env.REACT_APP_API_BASE}/api/nightlife`),
    ]);
    setLocations(locRes.data.slice(0, 3));
    setRestaurants(restRes.data.slice(0, 3));
    setNightlife(nightRes.data.slice(0, 3));
    setError("Showing popular places instead.");
  } catch (fallbackErr) {
    console.error("Fallback fetch failed:", fallbackErr);
    setError("Failed to load recommendations.");
  }
};

  return (
    <div className="recommended-container">
      <h2 className="recommended-title">📍 Recommended Near You
      </h2>
      {error && <p className="error-message">{error}</p>}

      {Array.isArray(locations) && locations.length > 0 && (
        <>
          <h3 className="recommended-section-title">🌍 Locations
          </h3>
          <div className="recommended-grid">
            {locations.map((loc) => (
              <div key={loc._id} className="recommended-card">
                <img src={loc.image} alt={loc.name} />
                <div className="recommended-card-content">
                  <h4>{loc.name}</h4>
                  <p>{loc.description}</p>
                  <a href={loc.mapLink} target="_blank" rel="noopener noreferrer">
                    View on map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {Array.isArray(restaurants) && restaurants.length > 0 && (
        <>
          <h3 className="recommended-section-title">🍽 Restaurants
          </h3>
          <div className="recommended-grid">
            {restaurants.map((res) => (
              <div key={res._id} className="recommended-card">
                <img src={res.image} alt={res.name} />
                <div className="recommended-card-content">
                  <h4>{res.name}</h4>
                  <p>{res.description}</p>
                  <a href={res.mapLink} target="_blank" rel="noopener noreferrer">
                    View on map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {Array.isArray(nightlife) && nightlife.length > 0 && (
        <>
          <h3 className="recommended-section-title">🎉 Nightlife
          </h3>
          <div className="recommended-grid">
            {nightlife.map((nl) => (
              <div key={nl._id} className="recommended-card">
                <img src={nl.image} alt={nl.name} />
                <div className="recommended-card-content">
                  <h4>{nl.name}</h4>
                  <p>{nl.description}</p>
                  <a href={nl.mapLink} target="_blank" rel="noopener noreferrer">
                    View on map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedNearYou;
