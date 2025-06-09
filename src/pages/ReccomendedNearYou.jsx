import { useEffect, useState } from "react";
import axios from "axios";

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
          setLocations(res.data.locations);
          setRestaurants(res.data.restaurants);
          setNightlife(res.data.nightlife);
        } catch (err) {
          console.error(err);
          setError("Unable to fetch nearby places.");
        }
      },
      () => setError("Location access denied.")
    );
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  if (!locations.length && !restaurants.length && !nightlife.length) {
    return <p>Loading nearby recommendations...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Recommended Near You</h2>

      {locations.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-4 mb-2">🌍 Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <div key={loc._id} className="p-4 rounded shadow bg-white">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-bold">{loc.name}</h4>
                <p>{loc.description}</p>
                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on map
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {restaurants.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-6 mb-2">🍽 Restaurants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((res) => (
              <div key={res._id} className="p-4 rounded shadow bg-white">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-bold">{res.name}</h4>
                <p>{res.description}</p>
                <a
                  href={res.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on map
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {nightlife.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-6 mb-2">🎉 Nightlife</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nightlife.map((nl) => (
              <div key={nl._id} className="p-4 rounded shadow bg-white">
                <img
                  src={nl.image}
                  alt={nl.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-bold">{nl.name}</h4>
                <p>{nl.description}</p>
                <a
                  href={nl.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on map
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedNearYou;
