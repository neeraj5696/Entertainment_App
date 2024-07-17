import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Signup.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
      <form>
        <div className="input-container">
          <input
            type="text"
            name="uname"
            required
            placeholder="Email Address"
          />
        </div>
        <div className="input-container">
          <input type="password" name="pass" required placeholder="Password" />
        </div>
        <div className="button-container">
          <button type="submit">Login to your account</button>
        </div>
        <div className="account-message" >
          Don't have an account?
          <button
            className="login_button"
            onClick={() => navigate("/signup")}
            type="button"
            value={""}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
