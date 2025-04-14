import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await fetch("https://localhost:7160/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            console.log("Login Successful");
            onLogin(data.username, data.userID);
            console.log("User ID: " + data.userID)
            navigate("/")
        } else {
            setError(data.message || "Authentication failed");
        }
    } catch (err) {
        setError("Network error");
    }
};

 

  return (
    <div className="login-container">

      <div className="login-video">
        <video className="video-bg" autoPlay loop muted>
          <source src="Section_Transform.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

   
      <div className="login-box">
        <div className="login-content">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <Link to="/register">
            <button type="button">Sign Up</button>
            </Link>
             <button type="submit">Log in</button> 
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

const fetchProtectedData = async () => {
  try {
      const response = await fetch("https://localhost:7160/api/protected", {
          method: "GET",
          credentials: "include",
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      console.log("Protected Data:", data);
  } catch (error) {
      console.error("Error fetching protected data:", error);
  }
};