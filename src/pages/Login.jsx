import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Signed In!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Error while singing in.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign in</button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
