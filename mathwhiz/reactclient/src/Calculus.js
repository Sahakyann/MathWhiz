import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";

export default function Calculus({ }) {

  return (
    <div className="calculus-page">
      <CalculusHome />
    </div>
  );
}

const CalculusHome = () => {
  const [isDetailView, setIsDetailView] = useState(true);

  const toggleView = () => {
    setIsDetailView(!isDetailView);
  };
  const navigate = useNavigate();


  return (
    <div className="calculus-page">
      <div className="button-container">
        <button className="transparent-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button className="transparent-button" onClick={toggleView}>
          {isDetailView ? "Card View" : "Detail View"}
        </button>
      </div>
      {isDetailView ? (

        <div className="detail-view">

          <Link to="/calculus/limits" className="lesson">
            <img src="/calculus.jpg" alt="Limits" />
            <div className="lesson-content">
              <h3>Limits Introduction and Visualization</h3>
              <p>Brief introduction to the concept of limits and a visual tool to understand them</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/linearalgebra" className="lesson">
            <img src="/calculus.jpg" alt="Squeezing_theorem" />
            <div className="lesson-content">
              <h3>The squeezing theorem</h3>
              <p>Understanding the squeezing theorem.</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/probability" className="lesson">
            <img src="/calculus.jpg" alt="Lhopitals_rule" />
            <div className="lesson-content">
              <h3>L'Hôpital's rule</h3>
              <p>This rule seems like magic, but it has an intuitive background</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/statistics" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Derivative of a function and Tangent lines</h3>
              <p>Rate of change of a function, and how is it related to tangent lines</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/statistics" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Differentiation rules</h3>
              <p>How to differntiate functions withiout finding the limit every time</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/statistics" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>The Chain Rule</h3>
              <p>How to differentiate a function within a function with visuals</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/statistics" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Higher Order derivatives</h3>
              <p>The first derviative is rate of change of the function, but what if we differentiate again?</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/integration" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Integration and The Fundamental Theorem of Calculus</h3>
              <p>If we have derivatives, we also will need the reverse operation</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/statistics" className="lesson">
            <img src="/calculus.jpg" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Definite integrals and The area under the curve</h3>
              <p>Integrals is the antiderivative, how is it related to the area under the curve?</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="section-grid">
          <Link to="/calculus/limits" className="grid-box">
            <img src="/calculus.jpg" alt="Limits" className="grid-image" />
            <div className="grid-text">Limits Introduction</div>
          </Link>

          <Link to="/calculus/derivatives" className="grid-box">
            <img src="/calculus.jpg" alt="Derivatives" className="grid-image" />
            <div className="grid-text">The squeezing theorem</div>
          </Link>

          <Link to="/calculus/integration" className="grid-box">
            <img src="/calculus.jpg" alt="Integration" className="grid-image" />
            <div className="grid-text">L'Hôpital's rule</div>
          </Link>

          <Link to="/calculus/chainrule" className="grid-box">
            <img src="/calculus.jpg" alt="Chain Rule" className="grid-image" />
            <div className="grid-text">Derivatives</div>
          </Link>

          <Link to="/calculus/fundamentaltheorem" className="grid-box">
            <img src="/calculus.jpg" alt="Fundamental Theorem" className="grid-image" />
            <div className="grid-text">Differentiation rules</div>
          </Link>

          <Link to="/calculus/inversefunctions" className="grid-box">
            <img src="/calculus.jpg" alt="Inverse Functions" className="grid-image" />
            <div className="grid-text">The Chain Rule</div>
          </Link>
          <Link to="/calculus/limits" className="grid-box">
            <img src="/calculus.jpg" alt="Limits" className="grid-image" />
            <div className="grid-text">Higher Order derivatives</div>
          </Link>

          <Link to="/calculus/derivatives" className="grid-box">
            <img src="/calculus.jpg" alt="Derivatives" className="grid-image" />
            <div className="grid-text">Derivatives</div>
          </Link>

          <Link to="/calculus/integration" className="grid-box">
            <img src="/calculus.jpg" alt="Integration" className="grid-image" />
            <div className="grid-text">Integration</div>
          </Link>

          <Link to="/calculus/chainrule" className="grid-box">
            <img src="/calculus.jpg" alt="Chain Rule" className="grid-image" />
            <div className="grid-text">Chain Rule</div>
          </Link>

          <Link to="/calculus/fundamentaltheorem" className="grid-box">
            <img src="/calculus.jpg" alt="Fundamental Theorem" className="grid-image" />
            <div className="grid-text">Integration</div>
          </Link>

          <Link to="/calculus/inversefunctions" className="grid-box">
            <img src="/calculus.jpg" alt="Inverse Functions" className="grid-image" />
            <div className="grid-text">Definite Integrals</div>
          </Link>
        </div>
      )}
    </div>
  );
}
