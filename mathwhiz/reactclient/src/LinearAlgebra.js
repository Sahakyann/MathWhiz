import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LinearAlgebra() {
  return (
    <div className="linear-algebra-page">
      <LinearAlgebraHome />
    </div>
  );
}

const LinearAlgebraHome = () => {
  const [isDetailView, setIsDetailView] = useState(true);

  const toggleView = () => {
    setIsDetailView(!isDetailView);
  };
  const navigate = useNavigate();

  return (
    <div className="linear-algebra-page">
      <div className="button-container">
        <button className="transparent-button" onClick={() => navigate("/")}>Back to Home</button>
        <button className="transparent-button" onClick={toggleView}>{isDetailView ? "Card View" : "Detail View"}</button>
      </div>
      {isDetailView ? (
        <div className="detail-view">
          <Link to="/linear-algebra/vectors" className="lesson">
            <img src="/vectors.jpg" alt="Vectors" />
            <div className="lesson-content">
              <h3>Vectors and Their Operations</h3>
              <p>Understanding vectors, addition, scalar multiplication, and their geometric interpretations.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/span-basis" className="lesson">
            <img src="/span.jpg" alt="Span and Basis" />
            <div className="lesson-content">
              <h3>Linear Combinations, Span, and Basis</h3>
              <p>How vectors form spaces, and the concepts of basis and linear independence.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/linear-transformations" className="lesson">
            <img src="/transformations.jpg" alt="Linear Transformations" />
            <div className="lesson-content">
              <h3>Linear Transformations</h3>
              <p>Understanding how linear transformations affect vector spaces.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/matrix-multiplication" className="lesson">
            <img src="/matrices.jpg" alt="Matrix Multiplication" />
            <div className="lesson-content">
              <h3>Matrix Multiplication</h3>
              <p>Learn how matrices interact and their importance in linear algebra.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/determinants" className="lesson">
            <img src="/determinants.jpg" alt="Determinants" />
            <div className="lesson-content">
              <h3>Determinants</h3>
              <p>What determinants tell us about transformations and matrix properties.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/inverse-null-rank" className="lesson">
            <img src="/inverse.jpg" alt="Inverse Matrices" />
            <div className="lesson-content">
              <h3>Inverse Matrices, Null Space, and Rank</h3>
              <p>Understanding invertibility, null space, and rank of matrices.</p>
            </div>
          </Link>

          <Link to="/linear-algebra/eigenvectors" className="lesson">
            <img src="/eigenvectors.jpg" alt="Eigenvectors and Eigenvalues" />
            <div className="lesson-content">
              <h3>Eigenvectors and Eigenvalues</h3>
              <p>The role of eigenvectors and eigenvalues in transformations and applications.</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="section-grid">
          <Link to="/linear-algebra/vectors" className="grid-box">
            <img src="/vectors.jpg" alt="Vectors" className="grid-image" />
            <div className="grid-text">Vectors and Operations</div>
          </Link>

          <Link to="/linear-algebra/span-basis" className="grid-box">
            <img src="/span.jpg" alt="Span" className="grid-image" />
            <div className="grid-text">Span and Basis</div>
          </Link>

          <Link to="/linear-algebra/linear-transformations" className="grid-box">
            <img src="/transformations.jpg" alt="Transformations" className="grid-image" />
            <div className="grid-text">Linear Transformations</div>
          </Link>

          <Link to="/linear-algebra/matrix-multiplication" className="grid-box">
            <img src="/matrices.jpg" alt="Matrix Multiplication" className="grid-image" />
            <div className="grid-text">Matrix Multiplication</div>
          </Link>

          <Link to="/linear-algebra/determinants" className="grid-box">
            <img src="/determinants.jpg" alt="Determinants" className="grid-image" />
            <div className="grid-text">Determinants</div>
          </Link>

          <Link to="/linear-algebra/inverse-null-rank" className="grid-box">
            <img src="/inverse.jpg" alt="Inverse Matrices" className="grid-image" />
            <div className="grid-text">Inverse Matrices</div>
          </Link>

          <Link to="/linear-algebra/eigenvectors" className="grid-box">
            <img src="/eigenvectors.jpg" alt="Eigenvectors" className="grid-image" />
            <div className="grid-text">Eigenvectors and Eigenvalues</div>
          </Link>
        </div>
      )}
    </div>
  );
};