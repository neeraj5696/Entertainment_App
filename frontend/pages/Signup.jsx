import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Signup.css";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <form className="form">
        <div className="input-container">
          <input type="text" name="uname" placeholder="Email Address" />
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="Password" />
        </div>
        <div className="input-container">
          <input type="password" name="repeatPass" placeholder="Repeat Password" />
        </div>
        <div className="button-container">
          <button type="submit">Create an account</button>
        </div>
        <div className="account-message">
          Already have an account? 
          <button className="login-button" onClick={() => navigate("/login")} type="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
