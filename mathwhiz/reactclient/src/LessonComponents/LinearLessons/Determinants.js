import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function Determinants() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setSidebarVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="lesson-wrapper">
            <div className="top-page">
                <div className="button-container">
                    <button className="transparent-button" onClick={() => navigate('/linearalgebra')}>
                        Back to Linear Algebra
                    </button>
                </div>
            </div>

            <nav className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#two-by-two">Determinant of 2x2</a></li>
                    <li><a href="#three-by-three">3x3 Determinant</a></li>
                    <li><a href="#triangular">Triangular Matrices</a></li>
                    <li><a href="#row-operations">Row Operations</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1>Determinants</h1>
                <p>Let <InlineMath math="A" /> be an <InlineMath math="n \times n" /> matrix. That is, let <InlineMath math="A" /> be a square matrix. The <strong>determinant</strong> of <InlineMath math="A" />, denoted by <InlineMath math="\det(A)" />, is a very important number which we will explore throughout this section.</p>

                <h2 id="two-by-two">Determinant of a Two By Two Matrix</h2>
                <BlockMath math="A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}" />
                <BlockMath math="\det(A) = ad - cb" />
                <BlockMath math="\det\left( \begin{bmatrix} a & b \\ c & d \end{bmatrix} \right) = \left| \begin{array}{cc} a & b \\ c & d \end{array} \right| = ad - bc" />

                <h3>Example</h3>
                <BlockMath math="A = \begin{bmatrix} 2 & 4 \\ -1 & 6 \end{bmatrix}" />
                <BlockMath math="\det(A) = (2)(6) - (-1)(4) = 12 + 4 = 16" />

                <h2 id="three-by-three">Example of Finding the Determinant of a Three by Three Matrix</h2>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 3 & 2 \\ 3 & 2 & 1 \end{bmatrix}" />
                <p>Find <InlineMath math="\det(A)" /> using the method of Laplace Expansion.</p>

                <BlockMath math="\det(A) = 1(-1)^{1+1} \begin{vmatrix} 3 & 2 \\ 2 & 1 \end{vmatrix} + 4(-1)^{2+1} \begin{vmatrix} 2 & 3 \\ 2 & 1 \end{vmatrix} + 3(-1)^{3+1} \begin{vmatrix} 2 & 3 \\ 3 & 2 \end{vmatrix}" />
                <BlockMath math="= 1(1)(-1) + 4(-1)(-4) + 3(1)(-5) = -1 + 16 - 15 = 0" />

                <p>Now expanding along the second row:</p>
                <BlockMath math="\det(A) = 4(-1)^{2+1} \begin{vmatrix} 2 & 3 \\ 2 & 1 \end{vmatrix} + 3(-1)^{2+2} \begin{vmatrix} 1 & 3 \\ 3 & 1 \end{vmatrix} + 2(-1)^{2+3} \begin{vmatrix} 1 & 2 \\ 3 & 2 \end{vmatrix}" />
                <BlockMath math="\det(A) = 4(-1)(-2) + 3(1)(-8) + 2(-1)(-4) = 0" />

                <h2 id="triangular">Triangular Matrices</h2>
                <p>A matrix is upper triangular if all entries below the diagonal are 0.</p>
                <BlockMath math="\begin{bmatrix} * & * & \cdots & * \\ 0 & * & \cdots & \vdots \\ \vdots & \vdots & \ddots & * \\ 0 & \cdots & 0 & * \end{bmatrix}" />
                <p><strong>Theorem:</strong> Determinant of a triangular matrix is the product of its diagonal elements.</p>
                <h3>Example</h3>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 & 77 \\ 0 & 2 & 6 & 7 \\ 0 & 0 & 3 & 33.7 \\ 0 & 0 & 0 & -1 \end{bmatrix}" />
                <BlockMath math="\det(A) = 1 \times 2 \times 3 \times (-1) = -6" />

                <h2 id="row-operations">Row Operations</h2>
                <ol>
                    <li>Switch two rows</li>
                    <li>Multiply a row by a nonzero number</li>
                    <li>Replace a row by a multiple of another row added to itself</li>
                </ol>
                <p><strong>Theorem: Switching Rows</strong></p>
                <BlockMath math="\det(B) = -\det(A)" />

                <p><strong>Theorem: Multiplying a Row by a Scalar</strong></p>
                <BlockMath math="\det(B) = k \det(A)" />

                <p><strong>Theorem: Scalar Multiplication</strong></p>
                <BlockMath math="\det(B) = k^n \det(A)" />

                <h3>Example</h3>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}" />
                <BlockMath math="\det(A) = 1 \cdot 4 - 3 \cdot 2 = -2" />
                <BlockMath math="\det(B) = -\det(A) = -(-2) = 2" />
            </div>
        </div>
    );
}
