import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://localhost:7160/api/login";
    const userToCheck = {
      display_name: username,
      password: password
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToCheck)
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.username, data.userID);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">

      <div className="login-video">
        <video className="video-bg" autoPlay loop muted>
          <source src="CalculusBackground_loop.mp4" type="video/mp4" />
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
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
