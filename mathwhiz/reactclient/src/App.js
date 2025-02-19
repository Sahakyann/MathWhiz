import React, { useState, useEffect } from "react";
import MathQuill, { addStyles as addMathQuillStyles } from 'react-mathquill';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from './LoginForm';
import Calculus from "./Calculus";
import LinearAlgebra from './LinearAlgebra';
import Probability from './Probability';
import Statistics from './Statistics';
import Limits from './Limits';
import Integrals from './Integrals'
import './style.css';

addMathQuillStyles();

export default function App() {
  ;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userId, setUserId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Is Logged In:", isLoggedIn);
    const savedUsername = localStorage.getItem('username');
    const savedUserID = localStorage.getItem('userID');

    if (savedUsername && savedUserID) {
      setCurrentUser(savedUsername);
      setUserId(savedUserID);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username, userID) => {
    setCurrentUser(username);
    setUserId(userID);
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('userID', userID);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
    setCurrentUser('');
    setUserId('');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn && (
        <nav className="navbar">
          <div className="navbar-left">
            <h2 style={{ fontFamily: "'Inter', sans-serif" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                MathWhiz
              </Link>
              
              <button className="nav-link" onClick={() => navigate(-1)}>Previous Section</button>
            </h2>
          </div>
          <div className="navbar-right">
            <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="user-icon"></div>
              <span className="arrow">&#9662;</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
      )}

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <div className="box-grid">
                <Link to="/calculus" className="image-box">
                  <img src="/Eiffel_Tower_Vertical.jfif" alt="Calculus" className="full-image" />
                  <div className="overlay-text">Calculus</div>
                </Link>
                <Link to="/linearalgebra" className="image-box">
                  <img src="/Eiffel_Tower_Vertical.jfif" alt="Linear Algebra" className="full-image" />
                  <div className="overlay-text">Linear Algebra</div>
                </Link>
                <Link to="/probability" className="image-box">
                  <img src="/Eiffel_Tower_Vertical.jfif" alt="Probability" className="full-image" />
                  <div className="overlay-text">Probability</div>
                </Link>
                <Link to="/statistics" className="image-box">
                  <img src="/Eiffel_Tower_Vertical.jfif" alt="Statistics" className="full-image" />
                  <div className="overlay-text">Statistics</div>
                </Link>
                <Link to="/other" className="image-box">
                  <img src="/Eiffel_Tower_Vertical.jfif" alt="Other" className="full-image" />
                  <div className="overlay-text">More Topics</div>
                </Link>
              </div>
            } />
            <Route path="/calculus" element={<Calculus />} />
            <Route path="/linearalgebra" element={<LinearAlgebra />} />
            <Route path="/probability" element={<Probability />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/calculus/limits" element={<Limits />} />
            <Route path="/calculus/derivatives" element={<h1>Derivatives Section</h1>} />
            <Route path="/calculus/integration" element={<Integrals />} />
          </Routes>
        </div>
      )}
    </div>
  );
}