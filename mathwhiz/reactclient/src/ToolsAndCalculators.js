import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ToolsAndCalculators({ isDarkMode }) {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };


  return (
    <div className={`${isExiting ? "slide-out-to-right" : "slide-in-from-right"}`}>
      <div className="back-arrow" onClick={handleBackClick}>
        &#8592; Back
      </div>
      <ToolsHome userId={userId} isDarkMode={isDarkMode}/>
    </div>
  );
}

const ToolsHome = ({userId, isDarkMode}) => {
  console.log(`User Id Received ${userId}`);
  return (
    <div className="box-grid">
      <Link to={`/TwoDGraphing/${userId}`} className="image-box">
        <img src={isDarkMode ? "/2DGraphingBackground.png" : "/TwoDGraphingBackground_ManimCE_v0.19.0_white.png"} alt="2D Graphing" className="full-image" />
        
        {/*<div className="overlay-text">2D Graphing</div>*/}
      </Link>
      <Link to={`/ThreeDGraphing/${userId}`} className="image-box">
        <img src={isDarkMode ? "/ToolsAndVisualCalculators3D_ManimCE_v0.19.0_dark.png": "/ToolsAndVisualCalculators3D_ManimCE_v0.19.0_white.png"} alt="Linear Algebra" className="full-image" />
        {/*<div className="overlay-text">3D Graphing</div>*/}
      </Link>
      <Link to={`/visualCalculators/${userId}`} className="image-box">
        <img src={isDarkMode ? "/VisualCalculatorsBackground_ManimCE_v0.19.0_dark.png" : "/VisualCalculatorsBackground_ManimCE_v0.19.0_white.png"} alt="Probability" className="full-image" />

        {/*<div className="overlay-text">Visual Tools</div>*/}
      </Link>
    </div>
  );
}
