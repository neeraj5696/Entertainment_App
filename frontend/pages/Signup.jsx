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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("registered successfully!!");
    } catch (error) {
      console.log("error occurred");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form">
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
