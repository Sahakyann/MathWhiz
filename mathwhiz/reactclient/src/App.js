import React, { useState, useEffect } from "react";
import MathQuill, { addStyles as addMathQuillStyles } from 'react-mathquill';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import Login from './LoginForm';
import Calculus from "./Calculus";
import LinearAlgebra from './LinearAlgebra';
import Probability from './Probability';
import Statistics from './Statistics';
import Limits from './Limits';
import Integrals from './Integrals'
import Registration from './RegistrationForm';
import UserProfile from './UserProfile';
import './style.css';

addMathQuillStyles();



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userId, setUserId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("https://localhost:7160/api/validate-token", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.isValid) {
          console.log("User validated: " + response.data.username);
          setIsLoggedIn(true);
          setCurrentUser(response.data.username);
          navigate("/calculus/limits");
        } else {
          console.log("auth failed");
          setIsLoggedIn(false);
          navigate("/login");
        }
      } catch (error) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://localhost:7160/api/logout", {}, { withCredentials: true });
      document.cookie = "AuthCookieName=jwt; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      setCurrentUser("");
      setUserId("");
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogin = (username, userID) => {
    setCurrentUser(username);
    setUserId(userID);
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('userID', userID);
    navigate("/")
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

              {/*<button className="nav-link" onClick={() => navigate(-1)}>Previous Section</button>*/}
            </h2>
          </div>
          <div className="navbar-right">
            <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="user-icon"></div>
              <span className="arrow">&#9662;</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/user/profile/:userId"><button>Profile</button></Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/" element={isLoggedIn ? <Home isDetailView={isDetailView}/> : <Navigate to="/login" />} />
        <Route path="/user/profile/:userId" element={isLoggedIn ? <UserProfile/> : <Navigate to="/login" />} />
        <Route path="/calculus" element={isLoggedIn ? <Calculus isDetailView={isDetailView} /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra" element={isLoggedIn ? <LinearAlgebra /> : <Navigate to="/login" />} />
        <Route path="/probability" element={isLoggedIn ? <Probability /> : <Navigate to="/login" />} />
        <Route path="/statistics" element={isLoggedIn ? <Statistics /> : <Navigate to="/login" />} />
        <Route path="/calculus/limits" element={isLoggedIn ? <Limits /> : <Navigate to="/login" />} />
        <Route path="/calculus/integration" element={isLoggedIn ? <Integrals /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

const Home = () => {

    return (
      <div className="box-grid">
        <Link to="/calculus" className="image-box">
          <video className="hover-video" autoPlay loop muted>
            <source src="/Calculus_card.mp4" type="video/mp4" />
          </video>
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
        <Link to="/statistics" className="image-box">
          <img src="/Eiffel_Tower_Vertical.jfif" alt="Statistics" className="full-image" />
          <div className="overlay-text">Other Topics</div>
        </Link>
      </div>
    );
  
};
