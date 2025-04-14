import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function InverseMatrices() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setSidebarVisible(window.scrollY > 100);
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
                    <li><a href="#inverse-definition">Definition</a></li>
                    <li><a href="#steps">Steps to Find Inverse</a></li>
                    <li><a href="#cofactor-example">Cofactor Example</a></li>
                    <li><a href="#adjoint">Adjoint</a></li>
                    <li><a href="#rank-nullity">Rank and Nullity</a></li>
                    <li><a href="#null-space">Null Space</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1 id="inverse-definition">Inverse Matrices</h1>
                <p>The inverse of a matrix <InlineMath math="A" />, denoted <InlineMath math="A^{-1}" />, satisfies:</p>
                <BlockMath math="A \cdot A^{-1} = A^{-1} \cdot A = I" />
                <p><strong>Note:</strong> Only non-singular square matrices (with <InlineMath math="\det(A) \neq 0" />) have an inverse.</p>
                <p>The inverse is computed as:</p>
                <BlockMath math="A^{-1} = \frac{\text{Adj } A}{|A|}" />
                <h2>Singular vs Non-Singular Matrices</h2>
                <p><strong>Singular:</strong> <InlineMath math="|A| = 0" /> &mdash; No inverse</p>
                <p><strong>Non-Singular:</strong> <InlineMath math="|A| \neq 0" /> &mdash; Inverse exists</p>

                <h2>Identity Matrix</h2>
                <BlockMath math="I_{3 \times 3} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}" />
                <BlockMath math="A \cdot I = A" />

                <h2>Inverse of a 2x2 Matrix</h2>
                <BlockMath math="A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}" />
                <BlockMath math="A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}" />

                <h2 id="steps">Steps to Find the Inverse</h2>
                <ol>
                    <li>Find minors</li>
                    <li>Calculate cofactors</li>
                    <li>Transpose cofactor matrix to get adjoint</li>
                    <li>Divide adjoint by determinant</li>
                </ol>

                <h2>Cofactor Formula</h2>
                <BlockMath math="\text{Cofactor}_{ij} = (-1)^{i+j} M_{ij}" />

                <h2 id="cofactor-example">Example: Cofactor of an Element</h2>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 \\ 7 & 4 & 5 \\ 6 & 8 & 9 \end{bmatrix}" />
                <p>Element: 3 (position (1,3))</p>
                <BlockMath math="\text{Minor} = \begin{vmatrix} 7 & 4 \\ 6 & 8 \end{vmatrix} = 32" />
                <BlockMath math="\text{Cofactor} = (-1)^{1+3} \cdot 32 = 32" />
                <BlockMath math="\text{Cofactor Matrix} = \begin{bmatrix} -4 & -33 & 32 \\ 6 & 9 & 4 \\ -2 & 16 & -10 \end{bmatrix}" />

                <h2 id="adjoint">Adjoint Examples</h2>
                <h3>2x2 Case</h3>
                <BlockMath math="A = \begin{bmatrix} 2 & 3 \\ 4 & 5 \end{bmatrix}" />
                <BlockMath math="\text{adj}(A) = \begin{bmatrix} 5 & -3 \\ -4 & 2 \end{bmatrix}" />
                <h3>3x3 Case</h3>
                <BlockMath math="\text{adj}(A) = \begin{bmatrix} -3 & 6 & -3 \\ 6 & -12 & 6 \\ -25 & 6 & -3 \end{bmatrix}" />

                <h2>Finding Inverse with Adjoint</h2>
                <ol>
                    <li>Find determinant</li>
                    <li>If <InlineMath math="\det = 0" />, no inverse</li>
                    <li>If <InlineMath math="\det \neq 0" />, compute adjoint</li>
                    <li>Divide adjoint by determinant</li>
                </ol>
                <p><strong>Example:</strong> Matrix with determinant = 0 → No inverse</p>

                <h2 id="rank-nullity">Rank and Nullity</h2>
                <p>Rank: Number of linearly independent rows or columns</p>
                <p>Nullity: Dimension of null space (solutions to <InlineMath math="Ax = 0" />)</p>
                <p>Total columns = Rank + Nullity</p>

                <h3>Using Minor Method</h3>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 7 \end{bmatrix}" />
                <BlockMath math="\det(A) = -13 + 28 - 9 = 6 \Rightarrow \text{rank} = 3" />

                <h3>Using Echelon Form</h3>
                <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{bmatrix} \Rightarrow \text{rank} = 2" />

                <h2 id="null-space">Null Space</h2>
                <p>The null space contains all vectors <InlineMath math="B" /> such that <InlineMath math="AB = 0" />.</p>
                <ul>
                    <li>Each vector represents a linear relation</li>
                    <li>Size of null space = number of such relations</li>
                </ul>
            </div>
        </div>
    );
}
