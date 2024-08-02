import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../pages/MoviesAndTVSeries.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage("User logged in successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error occurred", error);
      setMessage("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="form">
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Login to your account</button>
        </div>
        <div className="account-message">
          Don't have an account?
          <button
            className="login_button"
            onClick={() => navigate("/signup")}
            type="button"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
