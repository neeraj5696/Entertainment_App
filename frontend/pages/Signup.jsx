import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  return (
    // JSX code for login form

    <div className="form">
      <form>
        <div className="input-container">
          <input type="text" name="uname" placeholder="Email Address" />
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="Password" />
          <input type="password" name="pass" placeholder="Repeat Password" />
        </div>
        <div className="button-container">
          <button type="submit">Create an account</button>
          <div>Already have an account?</div>
          <button onClick={() => navigate("/login")} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
