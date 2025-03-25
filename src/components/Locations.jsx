import React, { useEffect, useState } from "react";
import axios from "axios";

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("/api/locations");
        setLocations(res.data);
      } catch (err) {
        console.error("Greška pri dohvaćanju lokacija:", err.response?.data || err.message);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <h2>Lokacije i Plaže</h2>
      {locations.map((loc) => (
        <div key={loc._id} style={{ marginBottom: "1rem" }}>
          <h3>{loc.name} ({loc.type})</h3>
          <p>{loc.description}</p>
          {loc.mapsLink && (
            <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer">Otvori u Google Maps</a>
          )}
        </div>
      ))}
    </div>
  );
}

export default Locations;
