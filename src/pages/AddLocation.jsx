import React, { useState } from "react";
import axios from "axios";
import "./Add.css";

function AddLocation() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    mapLink: "",
    image: "",
  });

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
      },
      () => alert("Location access denied.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Please enter latitude and longitude or use your location.");
      return;
    }

    const payload = {
      ...formData,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/locations`, payload, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      alert("Location added!");
      setFormData({ name: "", type: "", description: "", mapLink: "", image: "" });
      setLatitude("");
      setLongitude("");
      setPreview("");
    } catch (err) {
      console.error("Error", err.response?.data || err.message);
    }
  };

  return (
    <div className="add-item-page">
      <form className="add-item-container" onSubmit={handleSubmit}>
        <h2>Add Location</h2>
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
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br />
        <button type="button" onClick={useMyLocation}>Use My Location</button>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddLocation;
