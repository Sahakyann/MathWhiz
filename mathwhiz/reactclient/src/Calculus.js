import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Calculus() {

  const location = useLocation();


 

  

  return (
    
    <div className="calculus-page">

      {(
        <div className="calculus-container">
          <div className="box-grid">
            <Link to="/calculus/limits" className="image-box">
              <img src="/Eiffel_Tower_Vertical.jfif" alt="Limits" className="full-image" />
              <div className="overlay-text">Limits</div>
            </Link>
            <Link to="/calculus/derivatives" className="image-box">
              <img src="/Eiffel_Tower_Vertical.jfif" alt="Derivatives" className="full-image" />
              <div className="overlay-text">Derivatives</div>
            </Link>
            <Link to="/calculus/integration" className="image-box">
              <img src="/Eiffel_Tower_Vertical.jfif" alt="Integration" className="full-image" />
              <div className="overlay-text">Integration</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/*
   useEffect(() => {
    if (location.state?.skipIntro) {
      setShowVideo(false);
    } else {
      const timer = setTimeout(() => setFadeOut(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => setShowVideo(false), 500);
  };

  <div className="calculus-page" onClick={handleSkip}>

  {showVideo && (
        <div className={`video-container ${fadeOut ? "fade-out" : ""}`}>
          <video
            autoPlay
            onEnded={handleSkip}
            width="100%"
            className="intro-video"
            onLoadedMetadata={(e) => (e.target.playbackRate = 2.0)} 
          >
            <source src="/CalculusOpening.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
        */