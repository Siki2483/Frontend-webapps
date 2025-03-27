import React, { useState } from "react";
import axios from "axios";

function AddRestaurant() {
  const [form, setForm] = useState({ name: "", location: "", description: "", mapLinks: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/restaurants", form, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setMessage("Restaurant successfully added !");
      setForm({ name: "", location: "", description: "", mapLinks: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Greška pri dodavanju.");
    }
  };

  return (
    <div>
      <h2>Add new restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Naziv" value={form.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Lokacija (mjesto)" value={form.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} />
        <input type="text" name="mapLinks" placeholder="Google Maps link" value={form.mapLinks} onChange={handleChange} />
        <button type="submit">Add restaurant</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddRestaurant;
