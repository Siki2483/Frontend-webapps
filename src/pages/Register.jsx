import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Registration complete!");
      navigate ("/");
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Error.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Ime" onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Lozinka" onChange={handleChange} required />
        <br />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
