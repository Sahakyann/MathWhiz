import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function Eigenvectors() {
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
                    <li><a href="#eigenvalues-eigenvectors">Eigenvalues and Eigenvectors</a></li>
                    <li><a href="#definition">Definition</a></li>
                    <li><a href="#equation">Eigenvector Equation</a></li>
                    <li><a href="#example-2x2">2×2 Matrix Example</a></li>
                    <li><a href="#example-3x3">3×3 Matrix Example</a></li>
                    <li><a href="#eigenspace">Eigenspace</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1 id="eigenvalues-eigenvectors">Eigenvalues and Eigenvectors</h1>
                <p><strong>Eigenvectors</strong> are directions that remain unchanged during a transformation, while <strong>Eigenvalues</strong> indicate how much stretching or shrinking occurs. They are key in system stability analysis, quantum mechanics, and machine learning.</p>
                <BlockMath math="Av = \\lambda v" />

                <h2 id="definition">Definition</h2>
                <p>Eigenvectors are non-zero vectors that remain in the same direction after transformation by a square matrix <InlineMath math="A" />, scaled by an eigenvalue <InlineMath math="\\lambda" />.</p>
                <p>To find the eigenvectors, first determine the eigenvalues by solving:</p>
                <BlockMath math="|A - \\lambda I| = 0" />

                <h2 id="equation">Eigenvector Equation</h2>
                <BlockMath math="Av = \\lambda v" />
                <p>Where:</p>
                <ul>
                    <li><InlineMath math="A" /> is the matrix</li>
                    <li><InlineMath math="v" /> is the eigenvector</li>
                    <li><InlineMath math="\\lambda" /> is the eigenvalue</li>
                </ul>
                <BlockMath math="(A - \\lambda I)v = 0" />

                <h2>Eigenvector Form</h2>
                <BlockMath math="v = \\begin{bmatrix} v_1 \\ v_2 \\ v_3 \\ \vdots \\ v_n \\end{bmatrix}" />

                <h2 id="example-2x2">Eigenvector of a 2×2 Matrix</h2>
                <p><strong>Example:</strong> Find eigenvalues and eigenvectors of:</p>
                <BlockMath math="A = \\begin{bmatrix} 1 & 2 \\ 5 & 4 \\end{bmatrix}" />
                <BlockMath math="|A - \\lambda I| = 0" />
                <BlockMath math="(1 - \\lambda)(4 - \\lambda) - 10 = 0" />
                <BlockMath math="\\Rightarrow (\\lambda - 6)(\\lambda + 1) = 0" />
                <p>Eigenvalues: <InlineMath math="\\lambda = 6, -1" /></p>

                <p>For <InlineMath math="\\lambda = 6" />:</p>
                <BlockMath math="\\begin{bmatrix} -5 & 2 \\ 5 & -2 \\end{bmatrix} \cdot \\begin{bmatrix} a \\ b \\end{bmatrix} = 0" />
                <p>Eigenvector: <BlockMath math="\\begin{bmatrix} 2 \\ 5 \\end{bmatrix}" /></p>

                <p>For <InlineMath math="\\lambda = -1" />:</p>
                <BlockMath math="\\begin{bmatrix} 2 & 2 \\ 5 & 5 \\end{bmatrix} \cdot \\begin{bmatrix} a \\ b \\end{bmatrix} = 0" />
                <p>Eigenvector: <BlockMath math="\\begin{bmatrix} 1 \\ -1 \\end{bmatrix}" /></p>

                <h2 id="example-3x3">Eigenvector of a 3×3 Matrix</h2>
                <p><strong>Example:</strong> Find eigenvalues and eigenvectors of:</p>
                <BlockMath math="A = \\begin{bmatrix} 2 & 2 & 2 \\ 2 & 2 & 2 \\ 2 & 2 & 2 \\end{bmatrix}" />
                <BlockMath math="|A - \\lambda I| = 0 \Rightarrow -\\lambda^3 + 6\\lambda^2 = 0" />
                <BlockMath math="\\Rightarrow \\lambda = 0, 6" />

                <p>For <InlineMath math="\\lambda = 0" />:</p>
                <p>Eigenvectors:</p>
                <BlockMath math="\\begin{bmatrix} -1 \\ 1 \\ 0 \\end{bmatrix}, \\begin{bmatrix} -1 \\ 0 \\ 1 \\end{bmatrix}" />

                <p>For <InlineMath math="\\lambda = 6" />:</p>
                <p>Eigenvector:</p>
                <BlockMath math="\\begin{bmatrix} 1 \\ 1 \\ 1 \\end{bmatrix}" />

                <h2 id="eigenspace">Eigenspace</h2>
                <p>The eigenspace of a matrix is the set of all its linearly independent eigenvectors.</p>
                <p>Example Eigenspace:</p>
                <BlockMath math="\\left\\{ \\begin{bmatrix} -1 \\ 1 \\ 0 \\end{bmatrix}, \\begin{bmatrix} -1 \\ 0 \\ 1 \\end{bmatrix}, \\begin{bmatrix} 1 \\ 1 \\ 1 \\end{bmatrix} \\right\\}" />
            </div>
        </div>
    );
}
