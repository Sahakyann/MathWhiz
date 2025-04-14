import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://localhost:7160/api/register";
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
        navigate('/');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <button onClick={() => navigate('/login')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;