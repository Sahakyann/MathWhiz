import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function MatrixMultiplication() {
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
                    <li><a href="#composition">Composition of Linear Transformations</a></li>
                    <li><a href="#matrices">Matrices</a></li>
                    <li><a href="#matrix-vector">Matrix-vector Multiplication</a></li>
                    <li><a href="#solution-space">Solution Space</a></li>
                    <li><a href="#matrix-multiplication">Matrix Multiplication</a></li>
                    <li><a href="#properties">Properties</a></li>
                    <li><a href="#summary">Summary</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1 id="composition">Composition of Linear Transformations</h1>
                <p>Composition means the same thing in linear algebra as it does in Calculus. Here is the definition.</p>
                <p><strong>Definition.</strong> Let <InlineMath math="T : \mathbb{R}^n \to \mathbb{R}^m" /> and <InlineMath math="U : \mathbb{R}^p \to \mathbb{R}^n" /> be transformations. Their <em>composition</em> is the transformation</p>
                <BlockMath math="T \circ U : \mathbb{R}^p \to \mathbb{R}^m" />
                <p>defined by</p>
                <BlockMath math="(T \circ U)(x) = T(U(x))" />
                <p>Composing two transformations means chaining them together: <InlineMath math="T \circ U" /> is the transformation that first applies <InlineMath math="U" />, then applies <InlineMath math="T" /> (note the order of operations). More precisely, to evaluate <InlineMath math="T \circ U" /> on an input vector <InlineMath math="x" />, first you evaluate <InlineMath math="U(x)" />, then you take this output vector of <InlineMath math="U" /> and use it as an input vector of <InlineMath math="T" />:</p>
                <BlockMath math="(T \circ U)(x) = T(U(x))" />
                <p>Of course, this only makes sense when the outputs of <InlineMath math="U" /> are valid inputs of <InlineMath math="T" />, that is, when the range of <InlineMath math="U" /> is contained in the domain of <InlineMath math="T" />.</p>

                <h1 id="matrices">Matrices</h1>
                <p>We first thought of a matrix as a rectangular array of numbers. When the number of rows is <InlineMath math="m" /> and columns is <InlineMath math="n" />, we say that the dimensions of the matrix are <InlineMath math="m \times n" />. For instance, the matrix below is a <InlineMath math="3 \times 4" /> matrix:</p>
                <BlockMath math="\begin{bmatrix} 0 & 4 & -3 & 1 \\ 3 & -1 & 2 & 0 \\ 2 & 0 & -1 & 1 \end{bmatrix}" />
                <p>We may also think of the columns of a matrix as a collection of vectors:</p>
                <BlockMath math="\begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3 & \mathbf{v}_4 \end{bmatrix}" />
                <p>where</p>
                <BlockMath math="\mathbf{v}_1 = \begin{bmatrix} 0 \\ 3 \\ 2 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 4 \\ -1 \\ 0 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} -3 \\ 2 \\ -1 \end{bmatrix}, \quad \mathbf{v}_4 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}" />
                <p>In this way, we see that our <InlineMath math="3 \times 4" /> matrix is the same as a collection of 4 vectors in <InlineMath math="\mathbb{R}^3" />.</p>
                <BlockMath math="a \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \dots & \mathbf{v}_n \end{bmatrix} = \begin{bmatrix} a\mathbf{v}_1 & a\mathbf{v}_2 & \dots & a\mathbf{v}_n \end{bmatrix}" />
                <BlockMath math="\begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \dots & \mathbf{v}_n \end{bmatrix} + \begin{bmatrix} \mathbf{w}_1 & \mathbf{w}_2 & \dots & \mathbf{w}_n \end{bmatrix} = \begin{bmatrix} \mathbf{v}_1 + \mathbf{w}_1 & \mathbf{v}_2 + \mathbf{w}_2 & \dots & \mathbf{v}_n + \mathbf{w}_n \end{bmatrix}" />

                <h1 id="matrix-vector">Matrix-vector multiplication and linear combinations</h1>
                <BlockMath math="A = \begin{bmatrix} -2 & 3 \\ 0 & 2 \\ 3 & 1 \end{bmatrix}, \quad \mathbf{x} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}" />
                <BlockMath math="A\mathbf{x} = 2\begin{bmatrix} -2 \\ 0 \\ 3 \end{bmatrix} + 3\begin{bmatrix} 3 \\ 2 \\ 1 \end{bmatrix} = \begin{bmatrix} -4 \\ 0 \\ 6 \end{bmatrix} + \begin{bmatrix} 9 \\ 6 \\ 3 \end{bmatrix} = \begin{bmatrix} 5 \\ 6 \\ 9 \end{bmatrix}" />
                <p>We then see that if <InlineMath math="A" /> is a <InlineMath math="3 \times 2" /> matrix, <InlineMath math="\mathbf{x}" /> must be a 2-dimensional vector and <InlineMath math="A\mathbf{x}" /> will be 3-dimensional.</p>

                <h1 id="solution-space">Proposition and Solution Space</h1>
                <BlockMath math="A = [ \mathbf{v}_1 \quad \mathbf{v}_2 \quad \dots \quad \mathbf{v}_n ], \quad \mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}" />
                <ul>
                    <li><InlineMath math="A\mathbf{x} = \mathbf{b}" /></li>
                    <li><InlineMath math="x_1 \mathbf{v}_1 + x_2 \mathbf{v}_2 + \dots + x_n \mathbf{v}_n = \mathbf{b}" /></li>
                    <li><InlineMath math="[ \mathbf{v}_1 \quad \mathbf{v}_2 \quad \dots \quad \mathbf{v}_n \,|\, \mathbf{b} ]" /></li>
                </ul>
                <p>Solving:</p>
                <BlockMath math="\left[\begin{array}{ccc|c} 2 & 0 & 2 & 0 \\ 4 & -1 & 6 & -5 \\ 1 & 3 & -5 & 15 \end{array}\right] \sim \left[\begin{array}{ccc|c} 1 & 0 & 1 & 0 \\ 0 & 1 & -2 & 5 \\ 0 & 0 & 0 & 0 \end{array}\right]" />
                <BlockMath math="x_1 = -x_3, \quad x_2 = 5 + 2x_3" />
                <BlockMath math="\mathbf{x} = \begin{bmatrix} -x_3 \\ 5 + 2x_3 \\ x_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 5 \\ 0 \end{bmatrix} + x_3 \begin{bmatrix} -1 \\ 2 \\ 1 \end{bmatrix}" />

                <h1 id="matrix-multiplication">Matrix Multiplication AB and CR</h1>
                <ol>
                    <li>To multiply <InlineMath math="AB" /> we need row length of <InlineMath math="A" /> = column length of <InlineMath math="B" /></li>
                    <li>Entry (i, j) of <InlineMath math="AB" /> = row i of A <InlineMath math="\cdot" /> column j of B</li>
                    <li>A times column j of B = column j of AB</li>
                    <li>Generally <InlineMath math="AB \neq BA" />, but <InlineMath math="(AB)C = A(BC)" /></li>
                    <li>If <InlineMath math="A = CR = (m \times r)(r \times n)" />, then <InlineMath math="A" /> has <InlineMath math="r" /> independent columns in <InlineMath math="C" /></li>
                </ol>
                <BlockMath math="A = \begin{bmatrix} 0 & 4 & -2 \\ -4 & -3 & 0 \end{bmatrix}, \quad B = \begin{bmatrix} 0 & 1 \\ 1 & -1 \\ 2 & 3 \end{bmatrix}" />
                <BlockMath math="AB = \begin{bmatrix} 0 & 4 & -2 \\ -4 & -3 & 0 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & -1 \\ 2 & 3 \end{bmatrix} = \begin{bmatrix} 0 & -10 \\ -3 & -1 \end{bmatrix}" />

                <h1 id="properties">Properties of Matrix-matrix Multiplication</h1>
                <p><strong>Associativity:</strong> <BlockMath math="A(BC) = (AB)C" /></p>
                <p><strong>Distributivity:</strong> <BlockMath math="A(B + C) = AB + AC" /> and <BlockMath math="(A + B)C = AC + BC" /></p>
                <h2>Things to be careful of</h2>
                <ul>
                    <li><strong>Commutativity:</strong> Generally <InlineMath math="AB \neq BA" /></li>
                    <li><strong>Cancellation:</strong> <InlineMath math="AB = AC \nRightarrow B = C" /> does not generally hold</li>
                    <li><strong>Zero divisors:</strong> <InlineMath math="AB = 0" /> does not imply <InlineMath math="A = 0" /> or <InlineMath math="B = 0" /></li>
                </ul>

                <h1 id="summary">Summary</h1>
                <ul>
                    <li><InlineMath math="A\mathbf{x}" /> is a linear combination of the columns of <InlineMath math="A" /></li>
                    <li>Solution space of <InlineMath math="A\mathbf{x} = \mathbf{b}" /> matches solution space of augmented matrix <InlineMath math="[A \,|\, \mathbf{b}]" /></li>
                    <li>If <InlineMath math="A\in\mathbb{R}^{m \times n}" />, <InlineMath math="B\in\mathbb{R}^{n \times p}" />, then <InlineMath math="AB\in\mathbb{R}^{m \times p}" /></li>
                </ul>
            </div>
        </div>
    );
}
