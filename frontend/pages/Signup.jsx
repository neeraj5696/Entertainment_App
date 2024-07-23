import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../pages/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rpassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setMessage("Registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error occurred", error);
      setMessage("Failed to register. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form">
        {message && <div className="message">{message}</div>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Repeat Password"
            value={rpassword}
            onChange={(e) => setRpassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Create an account</button>
        </div>
        <div className="account-message">
          Already have an account?
          <button
            className="login-button"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
