import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Probability() {
  return (
    <div className="lesson-hub-page">
      <ProbabilityHome />
    </div>
  );
}

const ProbabilityHome = () => {
  const [isDetailView, setIsDetailView] = useState(true);

  const toggleView = () => {
    setIsDetailView(!isDetailView);
  };
  const navigate = useNavigate();

  return (

    
    <div className="lesson-hub-page">
      <div className="button-container">
       
        <button className="transparent-button" onClick={() => navigate("/")}>Back to Home</button>
        <button className="transparent-button" onClick={toggleView}>{isDetailView ? "Card View" : "Detail View"}</button>
      </div>
      {isDetailView ? (
        <div className="detail-view">
          <Link to="/probability/introProb" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Probability Basics" />
            <div className="lesson-content">
              <h3>Introduction to Probability</h3>
              <p>Understanding probability, dependence, independence, and conditional probability.</p>
            </div>
          </Link>

          <Link to="/probability/randomVar" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Random Variables" />
            <div className="lesson-content">
              <h3>Random Variables</h3>
              <p>Definition and properties of discrete and continuous random variables.</p>
            </div>
          </Link>

          <Link to="/probability/bayesFormula" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Bayes Formula" />
            <div className="lesson-content">
              <h3>Bayes' Formula</h3>
              <p>Understanding conditional probability and its application using Bayes' theorem.</p>
            </div>
          </Link>

          <Link to="/probability/probDist" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Distributions" />
            <div className="lesson-content">
              <h3>Probability Distributions</h3>
              <p>Exploring different probability distributions and their uses.</p>
            </div>
          </Link>

          <Link to="/probability/cdf-pdf-pmf" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="CDF, PDF, PMF" />
            <div className="lesson-content">
              <h3>CDF, PDF, and PMF</h3>
              <p>Understanding cumulative distribution functions, probability density, and mass functions.</p>
            </div>
          </Link>

          <Link to="/probability/expectation-variance" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Expectation and Variance" />
            <div className="lesson-content">
              <h3>Expectation and Variance</h3>
              <p>How to compute and interpret expectation and variance of a random variable.</p>
            </div>
          </Link>

          <Link to="/probability/covarianceCorrelation" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Covariance and Correlation" />
            <div className="lesson-content">
              <h3>Covariance and Correlation</h3>
              <p>Understanding relationships between two random variables.</p>
            </div>
          </Link>

          <Link to="/probability/lln" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Law of Large Numbers" />
            <div className="lesson-content">
              <h3>Law of Large Numbers</h3>
              <p>Exploring the weak and strong laws of large numbers.</p>
            </div>
          </Link>

          <Link to="/probability/clt" className="lesson">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Central Limit Theorem" />
            <div className="lesson-content">
              <h3>Central Limit Theorem</h3>
              <p>Why the normal distribution appears everywhere and its significance.</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="section-grid">
          <Link to="/probability/introProb" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Probability" className="grid-image" />
            <div className="grid-text">Probability Basics</div>
          </Link>

          <Link to="/probability/randomVar" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Random Variables" className="grid-image" />
            <div className="grid-text">Random Variables</div>
          </Link>

          <Link to="/probability/bayesFormula" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Bayes Formula" className="grid-image" />
            <div className="grid-text">Bayes' Theorem</div>
          </Link>

          <Link to="/probability/probDist" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Distributions" className="grid-image" />
            <div className="grid-text">Distributions</div>
          </Link>

          <Link to="/probability/cdf-pdf-pmf" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="CDF, PDF, PMF" className="grid-image" />
            <div className="grid-text">CDF, PDF, PMF</div>
          </Link>

          <Link to="/probability/expectation-variance" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Expectation and Variance" className="grid-image" />
            <div className="grid-text">Expectation & Variance</div>
          </Link>

          <Link to="/probability/covarianceCorrelation" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Covariance and Correlation" className="grid-image" />
            <div className="grid-text">Covariance & Correlation</div>
          </Link>

          <Link to="/probability/lln" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Law of Large Numbers" className="grid-image" />
            <div className="grid-text">Law of Large Numbers</div>
          </Link>

          <Link to="/probability/clt" className="grid-box">
            <img src="/ProbabilityThumbnail_ManimCE_v0.19.0.png" alt="Central Limit Theorem" className="grid-image" />
            <div className="grid-text">Central Limit Theorem</div>
          </Link>
        </div>
      )}
    </div>
  );
};
