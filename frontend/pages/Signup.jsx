import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utility/firebase";
import "../pages/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rpassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Registered successfully! Redirecting...");
      
      // Redirect to dashboard after a short delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.log("Error occurred", error);
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
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
