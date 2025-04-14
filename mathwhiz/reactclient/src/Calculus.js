import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";

export default function Calculus({ }) {

  return (
    <div className="lesson-hub-page">
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
    <div className="lesson-hub-page">
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
            <img src="/LimitThumbnail_ManimCE_v0.19.0.png" alt="Limits" />
            <div className="lesson-content">
              <h3>Limits Introduction and Visualization</h3>
              <p>Brief introduction to the concept of limits and a visual tool to understand them</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/calculus/squeezing" className="lesson">
            <img src="/SqueezingTheoremClassic_ManimCE_v0.19.0.png" alt="Squeezing" />
            <div className="lesson-content">
              <h3>The Squeezing theorem</h3>
              <p>Understanding the squeezing theorem.</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/calculus/lhopital" className="lesson">
            <img src="/LHopitalsRuleThumbnail_ManimCE_v0.19.0.png" alt="Lhopital's" />
            <div className="lesson-content">
              <h3>L'Hôpital's rule</h3>
              <p>This rule seems like magic, but it has an intuitive background</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>

          <Link to="/calculus/derivatives" className="lesson">
            <img src="/DerivativeOfFunctionThumbnail_ManimCE_v0.19.0.png" alt="Derivatives" />
            <div className="lesson-content">
              <h3>Derivative of a function and Tangent lines</h3>
              <p>Rate of change of a function, and how is it related to tangent lines</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/derivativeRules" className="lesson">
            <img src="/calculus.jpg" alt="Derivative Rules" />
            <div className="lesson-content">
              <h3>Differentiation rules</h3>
              <p>How to differntiate functions withiout finding the limit every time</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/chainRule" className="lesson">
            <img src="/calculus.jpg" alt="Chain Rule" />
            <div className="lesson-content">
              <h3>The Chain Rule</h3>
              <p>How to differentiate a function within a function with visuals</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/higherDerivative" className="lesson">
            <img src="/calculus.jpg" alt="Higher Derivatives" />
            <div className="lesson-content">
              <h3>Higher Order derivatives</h3>
              <p>The first derviative is rate of change of the function, but what if we differentiate again?</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/ftc" className="lesson">
            <img src="/calculus.jpg" alt="Fundamental Theorem" />
            <div className="lesson-content">
              <h3>Integration and The Fundamental Theorem of Calculus</h3>
              <p>If we have derivatives, we also will need the reverse operation</p>
              <span>Feb 22, 2025</span>
            </div>
          </Link>
          <Link to="/calculus/integration" className="lesson">
            <img src="/calculus.jpg" alt="Definite Integrals" />
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
            <img src="/LimitThumbnail_ManimCE_v0.19.0.png" alt="Limits" className="grid-image" />
            <div className="grid-text">Limits Introduction</div>
          </Link>

          <Link to="/calculus/squeezing" className="grid-box">
            <img src="/SqueezingTheoremClassic_ManimCE_v0.19.0.png" alt="Squeezing" className="grid-image" />
            <div className="grid-text">The Squeezing theorem</div>
          </Link>

          <Link to="/calculus/lhopital" className="grid-box">
            <img src="/LHopitalsRuleThumbnail_ManimCE_v0.19.0.png" alt="Lhopital's" className="grid-image" />
            <div className="grid-text">L'Hôpital's rule</div>
          </Link>

          <Link to="/calculus/derivatives" className="grid-box">
            <img src="/DerivativeOfFunctionThumbnail_ManimCE_v0.19.0.png" alt="Derivatives" className="grid-image" />
            <div className="grid-text">Derivatives</div>
          </Link>

          <Link to="/calculus/derivativeRules" className="grid-box">
            <img src="/calculus.jpg" alt="Derivative Rules" className="grid-image" />
            <div className="grid-text">Differentiation rules</div>
          </Link>

          <Link to="/calculus/chainRule" className="grid-box">
            <img src="/calculus.jpg" alt="Chain Rule" className="grid-image" />
            <div className="grid-text">The Chain Rule</div>
          </Link>
          <Link to="/calculus/higherDerivative" className="grid-box">
            <img src="/calculus.jpg" alt="Higher Derivatives" className="grid-image" />
            <div className="grid-text">Higher Order derivatives</div>
          </Link>

          <Link to="/calculus/ftc" className="grid-box">
            <img src="/calculus.jpg" alt="Fundamental Theorem" className="grid-image" />
            <div className="grid-text">Fundamental Theorem of Calculus</div>
          </Link>

          <Link to="/calculus/integration" className="grid-box">
            <img src="/calculus.jpg" alt="Definite Integrals" className="grid-image" />
            <div className="grid-text">Definite Integrals</div>
          </Link>
        </div>
      )}
    </div>
  );
}
