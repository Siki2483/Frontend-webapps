import React, { useState } from "react";
import axios from "axios";

function AddNightlife() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Nightclub",
    coordinates: "",
    mapsLink: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/nightlife", formData, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      alert("Dodano!");
      setFormData({
        name: "",
        description: "",
        type: "Nightclub",
        coordinates: "",
        mapsLink: "",
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Add Nightlife location</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Naziv"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="coordinates"
          placeholder="Koordinate"
          value={formData.coordinates}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="mapsLink"
          placeholder="Google Maps link"
          value={formData.mapsLink}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddNightlife;
