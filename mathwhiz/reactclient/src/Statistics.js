import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  return (
    <div className="lesson-hub-page">
      <StatisticsHome />
    </div>
  );
}

const StatisticsHome = () => {
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
          <Link to="/statistics/introStat" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png"alt="Descriptive Statistics" />
            <div className="lesson-content">
              <h3>Descriptive Statistics</h3>
              <p>Median, Mode, Mean, Quartiles, IQR, Boxplot.</p>
            </div>
          </Link>

          <Link to="/statistics/dataVis" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png"alt="Data Visualization" />
            <div className="lesson-content">
              <h3>Data Visualization</h3>
              <p>Bar chart, pie chart, scatter plot, and misleading graphs.</p>
            </div>
          </Link>

          <Link to="/statistics/convergenceTypes" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Convergence" />
            <div className="lesson-content">
              <h3>Types of Convergence</h3>
              <p>Understanding different types of statistical convergence.</p>
            </div>
          </Link>

          <Link to="/statistics/mse-bias" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="MSE and Bias" />
            <div className="lesson-content">
              <h3>MSE, Bias, and Unbiasedness</h3>
              <p>Mean squared error, bias-variance tradeoff, and unbiasedness.</p>
            </div>
          </Link>

          {/*<Link to="/statistics/bias-variance" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Bias Variance Decomposition" />
            <div className="lesson-content">
              <h3>Bias-Variance Decomposition</h3>
              <p>Breaking down error in model predictions.</p>
            </div>
          </Link>*/}

          <Link to="/statistics/estimation-methods" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Estimators" />
            <div className="lesson-content">
              <h3>Method of Moments & Maximum Likelihood Estimator</h3>
              <p>Two fundamental estimation techniques.</p>
            </div>
          </Link>

          <Link to="/statistics/confidence-intervals" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Confidence Intervals" />
            <div className="lesson-content">
              <h3>Confidence Intervals</h3>
              <p>Understanding uncertainty in statistical estimates.</p>
            </div>
          </Link>

          <Link to="/statistics/hypothesis-testing" className="lesson">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Hypothesis Testing" />
            <div className="lesson-content">
              <h3>Hypothesis Testing</h3>
              <p>Z-test, t-test, Chi-squared test, and decision-making.</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="section-grid">
          <Link to="/statistics/introStat" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Descriptive" className="grid-image" />
            <div className="grid-text">Descriptive Statistics</div>
          </Link>

          <Link to="/statistics/dataVis" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png"alt="Visualization" className="grid-image" />
            <div className="grid-text">Data Visualization</div>
          </Link>

          <Link to="/statistics/convergenceTypes" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Convergence" className="grid-image" />
            <div className="grid-text">Convergence</div>
          </Link>

          <Link to="/statistics/mse-bias" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="MSE and Bias" className="grid-image" />
            <div className="grid-text">MSE & Bias</div>
          </Link>

          {/*<Link to="/statistics/bias-variance" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Bias Variance" className="grid-image" />
            <div className="grid-text">Bias-Variance</div>
          </Link>*/}

          <Link to="/statistics/estimation-methods" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Estimators" className="grid-image" />
            <div className="grid-text">Estimators</div>
          </Link>

          <Link to="/statistics/confidence-intervals" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Confidence Intervals" className="grid-image" />
            <div className="grid-text">Confidence Intervals</div>
          </Link>

          <Link to="/statistics/hypothesis-testing" className="grid-box">
            <img src="/StatisticsThumbnail_ManimCE_v0.19.0.png" alt="Hypothesis Testing" className="grid-image" />
            <div className="grid-text">Hypothesis Testing</div>
          </Link>
        </div>
      )}
    </div>
  );
};