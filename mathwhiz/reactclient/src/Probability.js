import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Probability() {
  return (
    <div className="probability-page">
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
    <div className="probability-page">
      <div className="button-container">
        <button className="transparent-button" onClick={() => navigate("/")}>Back to Home</button>
        <button className="transparent-button" onClick={toggleView}>{isDetailView ? "Card View" : "Detail View"}</button>
      </div>
      {isDetailView ? (
        <div className="detail-view">
          <Link to="/probability/intro" className="lesson">
            <img src="/probability.jpg" alt="Probability Basics" />
            <div className="lesson-content">
              <h3>Introduction to Probability</h3>
              <p>Understanding probability, dependence, independence, and conditional probability.</p>
            </div>
          </Link>

          <Link to="/probability/random-variables" className="lesson">
            <img src="/random_variables.jpg" alt="Random Variables" />
            <div className="lesson-content">
              <h3>Random Variables</h3>
              <p>Definition and properties of discrete and continuous random variables.</p>
            </div>
          </Link>

          <Link to="/probability/bayes" className="lesson">
            <img src="/bayes.jpg" alt="Bayes Formula" />
            <div className="lesson-content">
              <h3>Bayes' Formula</h3>
              <p>Understanding conditional probability and its application using Bayes' theorem.</p>
            </div>
          </Link>

          <Link to="/probability/distributions" className="lesson">
            <img src="/distributions.jpg" alt="Distributions" />
            <div className="lesson-content">
              <h3>Probability Distributions</h3>
              <p>Exploring different probability distributions and their uses.</p>
            </div>
          </Link>

          <Link to="/probability/cdf-pdf-pmf" className="lesson">
            <img src="/cdf.jpg" alt="CDF, PDF, PMF" />
            <div className="lesson-content">
              <h3>CDF, PDF, and PMF</h3>
              <p>Understanding cumulative distribution functions, probability density, and mass functions.</p>
            </div>
          </Link>

          <Link to="/probability/expectation-variance" className="lesson">
            <img src="/expectation.jpg" alt="Expectation and Variance" />
            <div className="lesson-content">
              <h3>Expectation and Variance</h3>
              <p>How to compute and interpret expectation and variance of a random variable.</p>
            </div>
          </Link>

          <Link to="/probability/covariance-correlation" className="lesson">
            <img src="/covariance.jpg" alt="Covariance and Correlation" />
            <div className="lesson-content">
              <h3>Covariance and Correlation</h3>
              <p>Understanding relationships between two random variables.</p>
            </div>
          </Link>

          <Link to="/probability/law-of-large-numbers" className="lesson">
            <img src="/wlln.jpg" alt="Law of Large Numbers" />
            <div className="lesson-content">
              <h3>Law of Large Numbers</h3>
              <p>Exploring the weak and strong laws of large numbers.</p>
            </div>
          </Link>

          <Link to="/probability/clt" className="lesson">
            <img src="/clt.jpg" alt="Central Limit Theorem" />
            <div className="lesson-content">
              <h3>Central Limit Theorem</h3>
              <p>Why the normal distribution appears everywhere and its significance.</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="section-grid">
          <Link to="/probability/intro" className="grid-box">
            <img src="/probability.jpg" alt="Probability" className="grid-image" />
            <div className="grid-text">Probability Basics</div>
          </Link>

          <Link to="/probability/random-variables" className="grid-box">
            <img src="/random_variables.jpg" alt="Random Variables" className="grid-image" />
            <div className="grid-text">Random Variables</div>
          </Link>

          <Link to="/probability/bayes" className="grid-box">
            <img src="/bayes.jpg" alt="Bayes Formula" className="grid-image" />
            <div className="grid-text">Bayes' Theorem</div>
          </Link>

          <Link to="/probability/distributions" className="grid-box">
            <img src="/distributions.jpg" alt="Distributions" className="grid-image" />
            <div className="grid-text">Distributions</div>
          </Link>

          <Link to="/probability/cdf-pdf-pmf" className="grid-box">
            <img src="/cdf.jpg" alt="CDF, PDF, PMF" className="grid-image" />
            <div className="grid-text">CDF, PDF, PMF</div>
          </Link>

          <Link to="/probability/expectation-variance" className="grid-box">
            <img src="/expectation.jpg" alt="Expectation and Variance" className="grid-image" />
            <div className="grid-text">Expectation & Variance</div>
          </Link>

          <Link to="/probability/covariance-correlation" className="grid-box">
            <img src="/covariance.jpg" alt="Covariance and Correlation" className="grid-image" />
            <div className="grid-text">Covariance & Correlation</div>
          </Link>

          <Link to="/probability/law-of-large-numbers" className="grid-box">
            <img src="/wlln.jpg" alt="Law of Large Numbers" className="grid-image" />
            <div className="grid-text">Law of Large Numbers</div>
          </Link>

          <Link to="/probability/clt" className="grid-box">
            <img src="/clt.jpg" alt="Central Limit Theorem" className="grid-image" />
            <div className="grid-text">Central Limit Theorem</div>
          </Link>
        </div>
      )}
    </div>
  );
};
