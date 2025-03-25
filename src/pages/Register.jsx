import React, { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Registracija uspješna!");
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Greška pri registraciji.");
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Ime" onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Lozinka" onChange={handleChange} required />
        <br />
        <button type="submit">Registriraj se</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
