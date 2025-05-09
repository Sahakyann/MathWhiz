import React, { useState, useEffect } from "react";
import MathQuill, { addStyles as addMathQuillStyles } from 'react-mathquill';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import debounce from "lodash/debounce";
import API_BASE_URL from './constants';



/* Calculus Imports */
import Calculus from "./Calculus";
import Limits from './LessonComponents/CalculusLessons/Limits.js';
import Lhopital from './LessonComponents/CalculusLessons/Lhopital.js';
import Squeezing from './LessonComponents/CalculusLessons/Squeezing.js';
import Integrals from './LessonComponents/CalculusLessons/Integrals.js';
import ChainRule from './LessonComponents/CalculusLessons/ChainRule.js';
import DerivativeRules from './LessonComponents/CalculusLessons/Derivative_Rules.js';
import Derivatives from './LessonComponents/CalculusLessons/Derivatives.js';
import FundamentalCalculusTheorem from './LessonComponents/CalculusLessons/FundamentalCalculusTheorem.js';
import HigherDerivative from './LessonComponents/CalculusLessons/HigherDerivative.js';

/* Linear Algebra Imports */
import LinearAlgebra from './LinearAlgebra';
import VectorBasics from './LessonComponents/LinearLessons/VectorBasics.js';
import CombinationSpanBasis from './LessonComponents/LinearLessons/CombinationSpanBasis.js';
import LinearTransformation from './LessonComponents/LinearLessons/LinearTransformation.js';
import MatrixMultiplication from './LessonComponents/LinearLessons/MatrixMultiplication.js';
import Determinants from './LessonComponents/LinearLessons/Determinants.js';
import InverseMatrices from './LessonComponents/LinearLessons/InverseMatrices.js';
import Eigenvectors from './LessonComponents/LinearLessons/Eigenvectors.js';


/* Probability Imports */
import Probability from './Probability';
import IntroToProbability from './LessonComponents/ProbabilityLessons/IntroToProbability.js';
import BayesFormula from './LessonComponents/ProbabilityLessons/BayesFormula.js';
import CentralLimitTheorem from './LessonComponents/ProbabilityLessons/CentralLimitTheorem.js';
import CovarianceCorrelation from './LessonComponents/ProbabilityLessons/CovarianceCorrelation.js';
import LawOfLargeNumbers from './LessonComponents/ProbabilityLessons/LawOfLargeNumbers.js';
import ProbabilityDistributions from './LessonComponents/ProbabilityLessons/ProbabilityDistributions.js';
import RandomVariables from "./LessonComponents/ProbabilityLessons/RandomVariables.js";

/* Statistics Imports */
import Statistics from './Statistics';
import IntroToStatistics from "./LessonComponents/StatisticsLessons/IntoToStatistics.js";
import DataVisualization from './LessonComponents/StatisticsLessons/DataVisualization.js';
import ConvergenceTypes from "./LessonComponents/StatisticsLessons/TypesOfConvergence.js";
import MSEBiasVariance from "./LessonComponents/StatisticsLessons/MSE_Bias.js";
import EstimationMethods from "./LessonComponents/StatisticsLessons/MLE_MOM.js";
import ConfidenceIntervals from "./LessonComponents/StatisticsLessons/ConfidenceIntevals.js";

/* Other Tools */
import ToolsAndCalculators from "./ToolsAndCalculators.js";
import VisualCalculators from './VisualCalculators.js';
import TwoDGraphing from './TwoDGraphing.js';
import ThreeDGraphing from './ThreeDGraphing.js';

/* User Registration and Login */
import Registration from './RegistrationForm';
import UserProfile from './UserProfile';
import Login from './LoginForm';

import './Styles-CSS/style.css';

addMathQuillStyles();



export default function App() {
  // State variables for auth, user profile, UI theme, and search
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("username") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userID") || "");
  const [profileImage, setProfileImage] = useState("/Koala.jpg");

  // UI toggles
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") return false;
    return true;
  });

  // Search state for lessons and users
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );
  const navigate = useNavigate();
  const [userSearch, setUserSearch] = useState("");
  const [userResults, setUserResults] = useState([]);




  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const searchItems = [
    // Calculus Lessons
    { label: "Limits", path: "/calculus/limits" },
    { label: "Squeezing Theorem", path: "/calculus/squeezing" },
    { label: "LHopital's Rule", path: "/calculus/lhopital" },
    { label: "Integration", path: "/calculus/integration" },
    { label: "Chain Rule", path: "/calculus/chainRule" },
    { label: "Derivatives", path: "/calculus/derivatives" },
    { label: "Derivative Rules", path: "/calculus/derivativeRules" },
    { label: "Fundamental Theorem", path: "/calculus/ftc" },
    { label: "Higher Derivatives", path: "/calculus/higherDerivative" },
    { label: "Calculus Overview", path: "/calculus" },

    //  Linear Algebra Lessons
    { label: "Vector Basics", path: "/linearalgebra/vectorBasics" },
    { label: "Combination, Span, Basis", path: "/linearalgebra/combinationSpanBasis" },
    { label: "Linear Transformation", path: "/linearalgebra/linearTransformation" },
    { label: "Matrix Multiplication", path: "/linearalgebra/matrixMultiplication" },
    { label: "Determinants", path: "/linearalgebra/determinants" },
    { label: "Inverse Matrices", path: "/linearalgebra/inverseMatrices" },
    { label: "Eigenvectors", path: "/linearalgebra/eigenvectors" },
    { label: "Linear Algebra Overview", path: "/linearalgebra" },

    //  Probability Lessons
    { label: "Intro to Probability", path: "/probability/introProb" },
    { label: "Probability Overview", path: "/probability" },

    // Statistics Lessons
    { label: "Intro to Statistics", path: "/statistics/introStat" },
    { label: "Data Visualization", path: "/statistics/dataVis" },
    { label: "Types of Convergence", path: "/statistics/convergenceTypes" },
    { label: "MSE and Bias-Variance", path: "/statistics/mse-bias" },
    { label: "Estimation Methods (MLE, MOM)", path: "/statistics/estimation-methods" },
    { label: "Confidence Intervals", path: "/statistics/confidence-intervals" },
    { label: "Statistics Overview", path: "/statistics" },

    // Tools and Graphing
    { label: "2D Graphing", path: "/twoDGraphing/:userId" },
    { label: "3D Graphing", path: "/threeDGraphing/:userId" },
    { label: "Visual Calculators", path: "/visualCalculators/:userId" },
    { label: "Tools Hub", path: "/toolsHub/:userId" }
  ];

  const debouncedUserSearch = debounce(async (value) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/get-users-by-query?query=${value}`, {
        withCredentials: true,
      });
      setUserResults(res.data);
      setShowUserDropdown(true);
    } catch (err) {
      console.error("User search failed", err);
    }
  }, 300);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownOpen && !event.target.closest(".user-menu") && !event.target.closest(".dropdown-menu")) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    return () => {
      debouncedUserSearch.cancel();
    };
  }, []);

  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/validate-token`, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.isValid) {
          console.log("User validated: " + response.data.username);
          setIsLoggedIn(true);
          setCurrentUser(response.data.username);
          setUserId(response.data.userID);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("userID", response.data.userID);
          console.log("UserID after refresh:", localStorage.getItem("userID"));
          console.log("Username after refresh:", localStorage.getItem("userID"));
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Auth validation failed", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    const fetchProfilePicture = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/get-profile-picture/${userId}`);
        const result = await response.json();

        if (result.success) {
          setProfileImage(`${API_BASE_URL}${result.filePath}`);
        } else {
          setProfileImage("/Koala.jpg"); // Default if user has no picture uploaded
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setProfileImage("/Koala.jpg");
      }
    }

    checkAuthStatus();
    fetchProfilePicture();
  }, []);


  const saveToRecentSearches = (label, path) => {
    const newEntry = { label, path };
    const updated = [newEntry, ...recentSearches.filter(item => item.label !== label)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
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
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem('username', username);
    localStorage.setItem('userID', userID);
    navigate("/")
  };
  if (loading) return <div>Loading...</div>;

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
          {/*<Link to={'/twoDGraphing'}><button>2D Graphing Calculator</button></Link>
          <Link to={'/threeDGraphing'}><button>3D Graphing Calculator</button></Link>*/}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search lessons or tools..."
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)} // short delay to allow clicking results
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const match = searchItems.find(item =>
                    item.label.toLowerCase() === searchQuery.toLowerCase()
                  );
                  if (match) {
                    saveToRecentSearches(match.label, match.path);
                    navigate(match.path);
                    setSearchQuery("");
                  }
                }
              }}
              className="search-input"
            />

            {searchFocused && (
              <>
                <div className="search-overlay" onClick={() => setSearchFocused(false)} />

                <div className="search-dropdown">
                  {searchQuery
                    ? searchItems
                      .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 5)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="search-item"
                          onClick={() => {
                            saveToRecentSearches(item.label, item.path);
                            navigate(item.path);
                            setSearchQuery("");
                          }}
                        >
                          {item.label}
                        </div>
                      ))
                    : recentSearches.length > 0 && (
                      <>
                        <div className="search-heading">
                          <span>Recent</span>
                          <button
                            className="clear-history-btn"
                            onClick={() => {
                              setRecentSearches([]);
                              localStorage.removeItem("recentSearches");
                            }}
                          >
                            Clear
                          </button>

                        </div>
                        {recentSearches.map((item, i) => (
                          <div
                            key={i}
                            className="search-item"
                            onClick={() => {
                              navigate(item.path);
                              setSearchQuery("");
                            }}
                          >
                            {item.label}
                          </div>
                        ))}
                      </>
                    )}
                </div>
              </>
            )}
          </div>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onFocus={() => setShowUserDropdown(true)}
              onBlur={() => setTimeout(() => setShowUserDropdown(false), 150)}
              onChange={(e) => {
                const value = e.target.value;
                setUserSearch(value);
                if (value.length > 1) {
                  debouncedUserSearch(value);
                } else {
                  setUserResults([]);
                  setShowUserDropdown(false);
                }
              }}
              className="search-input"
            />

            {showUserDropdown && (
              <>
                <div className="search-overlay" onClick={() => setShowUserDropdown(false)} />
                <div className="search-dropdown">

                  {userResults.length > 0 ? (
                    userResults.map((user) => (
                      <div
                        key={user.user_Id}
                        className="search-item"
                        onClick={() => {
                          navigate(`/user/profile/${user.user_Id}`);
                          setUserSearch("");
                          setShowUserDropdown(false);
                        }}
                      >
                        {user.display_Name ? (
                          <>
                            {user.display_Name}{" "}
                            <span style={{ color: "#aaa", fontSize: "0.85rem" }}>
                              ({user.username})
                            </span>
                          </>
                        ) : (
                          user.username
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="search-item">No users found</div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="navbar-right">
            <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={profileImage}
                alt="User Profile"
                className="user-icon"
                onError={(e) => (e.target.src = "/Koala.jpg")}
              />
              <span className="arrow">&#9662;</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to={`/user/profile/${userId}`}>
                  <button onClick={() => setDropdownOpen(false)}>Profile</button>
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/visualCalculators/${userId}`);
                  }}
                >
                  Visual Calculators
                </button>
                <button
                  style={{
                    backgroundColor: isDarkMode ? "#2c2c2c" : "#e0e0e0",
                    border: isDarkMode ? "1px solid white" : "1px solid #aaa",
                    color: isDarkMode ? "white" : "#111",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease, color 0.3s ease, border 0.3s ease",
                  }}
                  onClick={() => setIsDarkMode(prev => !prev)}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button
                  className="logout-btn"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </nav>
      )}

      <Routes>

        <Route path="/statistics" element={isLoggedIn ? <Statistics /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />

        {/* User Registration and Login Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={isLoggedIn ? <Home isDetailView={isDetailView} userId={userId} isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/user/profile/:userId" element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />


        {/* Calculus Routes */}
        <Route path="/calculus" element={isLoggedIn ? <Calculus isDetailView={isDetailView} /> : <Navigate to="/login" />} />
        <Route path="/calculus/limits" element={isLoggedIn ? <Limits /> : <Navigate to="/login" />} />
        <Route path="/calculus/squeezing" element={isLoggedIn ? <Squeezing /> : <Navigate to="/login" />} />
        <Route path="/calculus/integration" element={isLoggedIn ? <Integrals /> : <Navigate to="/login" />} />
        <Route path="/calculus/lhopital" element={isLoggedIn ? <Lhopital /> : <Navigate to="/login" />} />
        <Route path="/calculus/chainRule" element={isLoggedIn ? <ChainRule /> : <Navigate to="/login" />} />
        <Route path="/calculus/derivatives" element={isLoggedIn ? <Derivatives /> : <Navigate to="/login" />} />
        <Route path="/calculus/derivativeRules" element={isLoggedIn ? <DerivativeRules /> : <Navigate to="/login" />} />
        <Route path="/calculus/ftc" element={isLoggedIn ? <FundamentalCalculusTheorem /> : <Navigate to="/login" />} />
        <Route path="/calculus/higherDerivative" element={isLoggedIn ? <HigherDerivative /> : <Navigate to="/login" />} />



        {/* Linear Routes */}
        <Route path="/linearalgebra" element={isLoggedIn ? <LinearAlgebra /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/vectorBasics" element={isLoggedIn ? <VectorBasics /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/combinationSpanBasis" element={isLoggedIn ? <CombinationSpanBasis /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/linearTransformation" element={isLoggedIn ? <LinearTransformation /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/matrixMultiplication" element={isLoggedIn ? <MatrixMultiplication /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/determinants" element={isLoggedIn ? <Determinants /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/inverseMatrices" element={isLoggedIn ? <InverseMatrices /> : <Navigate to="/login" />} />
        <Route path="/linearalgebra/eigenvectors" element={isLoggedIn ? <Eigenvectors /> : <Navigate to="/login" />} />


        {/* Probability Routes */}
        <Route path="/probability" element={isLoggedIn ? <Probability /> : <Navigate to="/login" />} />
        <Route path="/probability/introProb" element={isLoggedIn ? <IntroToProbability /> : <Navigate to="/login" />} />
        <Route path="/probability/bayesFormula" element={isLoggedIn ? <BayesFormula /> : <Navigate to="/login" />} />
        <Route path="/probability/clt" element={isLoggedIn ? <CentralLimitTheorem /> : <Navigate to="/login" />} />
        <Route path="/probability/covarianceCorrelation" element={isLoggedIn ? <CovarianceCorrelation /> : <Navigate to="/login" />} />
        <Route path="/probability/lln" element={isLoggedIn ? <LawOfLargeNumbers /> : <Navigate to="/login" />} />
        <Route path="/probability/probDist" element={isLoggedIn ? <ProbabilityDistributions /> : <Navigate to="/login" />} />
        <Route path="/probability/randomVar" element={isLoggedIn ? <RandomVariables /> : <Navigate to="/login" />} />

        {/* Statistics Routes */}
        <Route path="/statistics" element={isLoggedIn ? <Statistics /> : <Navigate to="/login" />} />
        <Route path="/statistics/introStat" element={isLoggedIn ? <IntroToStatistics /> : <Navigate to="/login" />} />
        <Route path="/statistics/dataVis" element={isLoggedIn ? <DataVisualization /> : <Navigate to="/login" />} />
        <Route path="/statistics/convergenceTypes" element={isLoggedIn ? <ConvergenceTypes /> : <Navigate to="/login" />} />
        <Route path="/statistics/mse-bias" element={isLoggedIn ? <MSEBiasVariance /> : <Navigate to="/login" />} />
        <Route path="/statistics/estimation-methods" element={isLoggedIn ? <EstimationMethods /> : <Navigate to="/login" />} />
        <Route path="/statistics/confidence-intervals" element={isLoggedIn ? <ConfidenceIntervals /> : <Navigate to="/login" />} />

        { /* Graphing and Other Tool Routes */}
        {/*<Route path="/toolsHub" element={isLoggedIn ? <ToolsAndCalculators /> : <Navigate to="/login" />} />*/}
        <Route path="/toolsHub/:userId" element={isLoggedIn ? <ToolsAndCalculators isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/twoDGraphing/:userId" element={isLoggedIn ? <TwoDGraphing isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
        <Route path="/threeDGraphing/:userId" element={isLoggedIn ? <ThreeDGraphing isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
        {/*<Route path="/visualCalculators" element={isLoggedIn ? <VisualCalculators /> : <Navigate to="/login" />} />*/}
        <Route path="/visualCalculators/:userId" element={isLoggedIn ? <VisualCalculators isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

const Home = ({ userId, isDarkMode }) => {
  const [isEntering, setIsEntering] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);


  const handleNavigateWithAnimation = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

  return (
    <div className={`home-wrapper home-page ${isEntering ? "slide-in-from-left" : ""} ${isTransitioning ? "slide-out-left" : ""}`}>
      <div className="box-grid">
        <Link to="/calculus" className="image-box">
          <img src={isDarkMode ? "/CalculusBackground_ManimCE_v0.19.0.png" : "/CalculusBackground_ManimCE_v0.19.0_white.png"}
            alt="Calculus" className="full-image" />
        </Link>
        <Link to="/linearalgebra" className="image-box">
          <img src={isDarkMode ? "/LinearAlgebraBackground_ManimCE_v0.19.0.png" : "LinearAlgebraBackground_ManimCE_v0.19.0_white.png"} alt="Linear Algebra" className="full-image" />
        </Link>
        <Link to="/probability" className="image-box">
          <img src={isDarkMode ? "/ProbabilityBackground_ManimCE_v0.19.0.png" : "ProbabilityBackground_ManimCE_v0.19.0_white.png"} alt="Probability" className="full-image" />
        </Link>
        <Link to="/statistics" className="image-box">
          <img src={isDarkMode ? "/StatisticsBackground_ManimCE_v0.19.0.png" : "StatisticsBackground_ManimCE_v0.19.0_white.png"} alt="Statistics" className="full-image" />
        </Link>
        <Link className="image-box" onClick={() => handleNavigateWithAnimation(`/toolsHub/${userId}`)}>
          <img src={isDarkMode ? "/ToolsAndVisualCalculators_ManimCE_v0.19.0.png" : "ToolsAndVisualCalculators_ManimCE_v0.19.0_white.png"} alt="Other Tools" className="full-image" />

        </Link>
      </div>
    </div>
  );

};
