import React from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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
        <div>
          Don't have an account? 
          <button onClick={() => navigate("/signup")} type='text' value={""}>Signup</button>
        </div>
      </form>
    </div>
  )
}

export default Login