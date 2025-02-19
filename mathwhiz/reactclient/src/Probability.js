import React from "react";
import { Link } from "react-router-dom";

export default function Probability() {
  return (
    <div className="prob-page">
      <nav className="navbar">
        <h1 className="logo">MathWhiz</h1>
        <Link to="/" className="back-button">Back to Home</Link>
      </nav>
      <div className="content">
        <h2>Welcome to the Probability Learning Page</h2>
        <p>lorem ipsum</p>

        <h3>Introduction to lorem ipsum</h3>
        <p>A derivative represents the rate of change of a function...</p>

        <h3>Basic lorem ipsum</h3>
        <p>Integration is the reverse process of differentiation...</p>
      </div>
    </div>
  );
}