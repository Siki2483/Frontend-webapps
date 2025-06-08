import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  
    if (name === "password") {
      setIsPasswordValid(value.length >= 8);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      const { name, email, password, confirmPassword } = formData;

      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/register`, {
        name,
        email,
        password,
        confirmPassword
      });

      localStorage.setItem("token", res.data.token);
      setMessage("Registration complete!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data.msg || "Error.");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        {!isPasswordValid && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            Password must be at least 8 characters long.
          </p>
        )}
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Create</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Register;
