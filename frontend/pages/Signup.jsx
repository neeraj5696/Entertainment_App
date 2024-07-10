import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Signup.css";



function Signup() {
  const navigate = useNavigate();
  return (
    // JSX code for login form

    <div className="bg-gray-600">
      
      <form>
        <div className="input-container">
          <input type="text" name="uname" placeholder="Email Address" />
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="Password" />
          <input type="password" name="pass" placeholder="Repeat Password" />
        </div>
        <div className="b-6 button-container">
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
