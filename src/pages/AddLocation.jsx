import React, { useState } from "react";
import axios from "axios";
import "./Add.css";


function AddLocation() {
  const [formData, setFormData] = useState({ 
    name: "", 
    type: "", 
    description: "", 
    mapLink: "", 
    image: "" 
  });
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/upload`, data);
      setFormData({ ...formData, image: res.data.imagePath });
      setPreview(`${process.env.REACT_APP_API_BASE}${res.data.imagePath}`);
    } catch (err) {
      console.error("Uploading error", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/locations`, formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      alert("Location added!");
      setFormData({ name: "", type: "", description: "", mapLink: "", image: "" });
      setPreview("");
    } catch (err) {
      console.error("Error", err.response?.data || err.message);
    }
  };

  return (
    <div className="add-item-page">
      <form className="add-item-container" onSubmit={handleSubmit}>
      <h2>Add location</h2>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <br />
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
        <br />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <br />
        <input name="mapLink" placeholder="Google Maps link" value={formData.mapLink} onChange={handleChange} />
        <br />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && <img src={preview} alt="preview" style={{ width: "100%", marginTop: "10px" }} />}
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddLocation;
