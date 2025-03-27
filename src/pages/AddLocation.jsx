import React, { useState } from "react";
import axios from "axios";


function AddLocation() {
  const [form, setForm] = useState({ name: "", type: "", description: "", mapsLink: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/locations", form, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setMessage("Location added successfully!");
      setForm({ name: "", type: "", description: "", mapsLink: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error while adding .");
    }
    
  };

  return (
    <div>
      <h2>Add new location</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Naziv" value={form.name} onChange={handleChange} required />
        <input type="text" name="type" placeholder="Tip (npr. plaža, park...)" value={form.type} onChange={handleChange} required />
        <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} />
        <input type="text" name="mapsLink" placeholder="Google Maps link" value={form.mapsLink} onChange={handleChange} />
        <button type="submit">Add location</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddLocation;
