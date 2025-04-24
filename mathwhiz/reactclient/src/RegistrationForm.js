import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    e.preventDefault();
    const url = "https://localhost:7160/api/register";
    const userToCheck = {
      username: username,
      password: password,
      email: "user@example.com"
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
    <div className="register-container">
      <div className="dual-blurred-wrapper">
        <img src="/signup_background1.png" alt="background" className="dual-blurred" />
        <img src="/signup_background2.png" alt="background" className="dual-blurred" />
      </div>
      <div className="register-box">
        <div className="login-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Password:
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>
            <label>
              Repeat Password:
              <input
                type={showPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />

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