import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
export default function VectorBasics() {


    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSidebarVisible(true);
            } else {
                setSidebarVisible(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
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
                    <li>
                        <a href="">Limits Introduction</a>
                        <ul>
                            <li><a href="">Introduction</a></li>
                            <li><a href="#examples">Examples</a></li>
                            <li><a href="#formal-definition-of-a-limit">Formal Definition</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#limits-at-infinity">Limits at Infinity</a>
                        <ul>
                            <li><a href="#inf-limit-examples">Examples</a></li>
                            <li><a href="#inf-limit-quiz">Quiz</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#one-sided-limits">One-Sided Limits</a>
                        <ul>
                            <li><a href="#one-sided-limit-examples">Examples</a></li>
                            <li><a href="#one-sided-limit-quiz">Quiz</a></li>
                        </ul>
                    </li>
                </ul>

            </nav>
            
            <div className="latex-container">
                <h1>Vector Basics</h1>
                <p>
                    Vectors are fundamental quantities both in physics and in mathematics, that have both
                    magnitude and direction. So, performing mathematical operations on them directly is not
                    possible. So we have special operations that work only with vector quantities, and hence
                    the name, vector operations. There are several key operations: addition, subtraction,
                    multiplication of vector with scalar and product of vectors. Moreover, the product of
                    two vectors divides into two parts, a dot product and a cross product.
                </p>

                <h2>Addition of Vectors</h2>
                <p>
                    Vectors cannot be added by usual algebraic rules. While adding two vectors, the magnitude
                    and the direction of the vectors must be taken into account. <strong>Triangle law</strong> is
                    used to add two vectors. We translate vector <InlineMath math="b" /> until its tail coincides
                    with the head of <InlineMath math="a" />. Then the vector from the tail of <InlineMath math="a" />
                    to the head of <InlineMath math="b" /> is <InlineMath math="a + b" />.
                </p>
                <img src="/Vectors_TriangleLaw.png" alt="Triangle Law" className="centered-img" />

                <p>
                    <strong>Parallelogram law</strong> uses two vectors as adjacent sides of a parallelogram. Their
                    sum is represented by the diagonal of the parallelogram from the common point.
                </p>
                <img src="/Vectors_ParallelogramLaw.png" alt="Parallelogram Law" className="centered-img" />

                <p>If <InlineMath math="\\mathbf{u} = [u_1, u_2], \ \mathbf{v} = [v_1, v_2]" />, then:</p>
                <BlockMath math="\\mathbf{u} + \mathbf{v} = [u_1 + v_1, u_2 + v_2]" />
                <BlockMath math="\\mathbf{u} + \mathbf{v} = [1+2, 2+2] = [3,4]" />

                <h2>Subtraction of Vectors</h2>
                <p>
                    The negative of a vector <InlineMath math="\mathbf{v}" /> is <InlineMath math="-\mathbf{v}" />. Subtraction is defined as:
                </p>
                <BlockMath math="\mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v}) = [u_1 - v_1, u_2 - v_2]" />
                <BlockMath math="\mathbf{u} - \mathbf{v} = [1 - (-3), 2 - 1] = [4,1]" />
                <img src="/Vectors_Subtraction.png" alt="Vector Subtraction" className="centered-img" />

                <h2>Multiplication with a Scalar</h2>
                <p>
                    If <InlineMath math="\mathbf{v} = [v_1, v_2]" /> and <InlineMath math="c \in \mathbb{R}" />, then:
                </p>
                <BlockMath math="c\mathbf{v} = [cv_1, cv_2]" />
                <BlockMath math="2\mathbf{v} = [-4,8], \quad \frac{1}{2}\mathbf{v} = [-1,2], \quad -2\mathbf{v} = [4,-8]" />
                <img src="/Vectors_ScalarMultiplication.png" alt="Scalar Multiplication" className="centered-img" />

                <p><strong>Definition:</strong> Vectors are <em>parallel</em> if they are scalar multiples of each other.</p>

                <h2>Normalizing a Vector</h2>
                <p>
                    Normalizing a vector means finding a unit vector in the same direction:
                </p>
                <BlockMath math="\frac{1}{\|\mathbf{v}\|} \mathbf{v}" />
                <p>
                    For <InlineMath math="\mathbf{v} = [-4, 0, 3]" />:
                </p>
                <BlockMath math="\frac{1}{\sqrt{16 + 9}} \begin{bmatrix} -4 \\ 0 \\ 3 \end{bmatrix} = \begin{bmatrix} -\frac{4}{5} \\ 0 \\ \frac{3}{5} \end{bmatrix}" />

                <h2>Norm and Distance</h2>
                <p>
                    The norm of a vector <InlineMath math="\mathbf{v}" /> is:
                </p>
                <BlockMath math="\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}" />

                <p>
                    The distance between two vectors <InlineMath math="\mathbf{u}" /> and <InlineMath math="\mathbf{v}" /> is:
                </p>
                <BlockMath math="d(\mathbf{u}, \mathbf{v}) = \|\mathbf{u} - \mathbf{v}\|" />

                <p>
                    For <InlineMath math="\mathbf{u} = [1, 2, 3, 4], \ \mathbf{v} = [-1, 0, -4, 3]" />:
                </p>
                <BlockMath math="d(\mathbf{u}, \mathbf{v}) = \sqrt{4 + 4 + 49 + 1} = \sqrt{58}" />

                <button onClick={() => setShowMore(!showMore)} className="toggle-button">
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
}
