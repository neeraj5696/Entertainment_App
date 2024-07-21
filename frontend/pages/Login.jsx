import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utility/firebase";
import "../pages/Signup.css";

// Create User Context
const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Navigate after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("User logged in successfully");
    } catch (error) {
      console.log("Error occurred", error);
      setSuccessMessage("Failed to log in. Please try again.");
    }
  };

  return (
    <UserContext.Provider value={{ currentUser }}>
      <div className="form">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="uname"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="pass"
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
    </UserContext.Provider>
  );
}

export default Login;
