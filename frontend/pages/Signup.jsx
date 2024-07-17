import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Signup.css";
// import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  return (
    <div className="form-container">
      <form className="form">
        <div className="input-container">
          <input
            type="text"
            name="uname"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="pass"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="repeatPass"
            placeholder="Repeat Password"
            value={repass}
            onChange={(e) => setRepass(e.target.value)}
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
            value={""}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
