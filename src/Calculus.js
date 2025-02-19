import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Calculus() {
  const [showVideo, setShowVideo] = useState(true);
  const location = useLocation();
  const [fadeOut, setFadeOut] = useState(false);

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

  

  return (
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

      {!showVideo && (
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
const [input, setInput] = useState('x^2');
  const [integralVideoUrl, setVideoIntegralUrl] = useState(null);
  {showForm && (
        <div>
          <nav className="navbar">
            <h1 className="logo">MathWhiz</h1>
          </nav>
          <div className="center-box">
            <div className="mathquill-container">
              <MathQuill
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
              />
            </div>
            <button onClick={submitFunction}>Submit</button>
          </div>
          {integralVideoUrl && (
            <video width="1000" height="1080" autoPlay muted>
              <source src={integralVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

        const submitFunction = async () => {
          try {
            const response = await axios.post("https://localhost:7160/api/post-function", { function: input }, {
              responseType: 'blob'
            });
      
            if (integralVideoUrl) {
              URL.revokeObjectURL(integralVideoUrl);
            }
      
            const url = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
      
            setVideoIntegralUrl(null);
            setTimeout(() => setVideoIntegralUrl(url), 0);
          } catch (error) {
            console.error("Error submitting function:", error);
          }
        };
        */