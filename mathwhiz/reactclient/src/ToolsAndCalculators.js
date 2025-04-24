import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ToolsAndCalculators({ }) {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 250);
  };


  return (
    <div className={`${isExiting ? "slide-out-to-right" : "slide-in-from-right"}`}>
      <div className="back-arrow" onClick={handleBackClick}>
        &#8592; Back
      </div>
      <ToolsHome userId={userId}/>
    </div>
  );
}

const ToolsHome = ({userId}) => {
  console.log(`User Id Received ${userId}`);
  return (
    <div className="box-grid">
      <Link to="/TwoDGraphing" className="image-box">
        <img src="/2DGraphingBackground.png" alt="Linear Algebra" className="full-image" />
        {/*<div className="overlay-text">2D Graphing</div>*/}
      </Link>
      <Link to="/ThreeDGraphing" className="image-box">
        <img src="/ToolsAndVisualCalculators3D_ManimCE_v0.19.0.png" alt="Linear Algebra" className="full-image" />
        {/*<div className="overlay-text">3D Graphing</div>*/}
      </Link>
      <Link to={`/visualCalculators/${userId}`} className="image-box">
        <img src="/Eiffel_Tower_Vertical.jfif" alt="Probability" className="full-image" />
        {<div className="overlay-text">Visual Tools</div>}
      </Link>
    </div>
  );
}
