import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function CombinationSpanBasis() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showMore, setShowMore] = useState(false);
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
                    <li><a href="#linear-combinations">Linear Combinations</a></li>
                    <li><a href="#span-of-vectors">Span of Vectors</a></li>
                    <li><a href="#basis-vectors">Basis Vectors</a></li>
                    <li><a href="#dot-product">Dot Product</a></li>
                    <li><a href="#cross-product">Cross Product</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1 id="linear-combinations">Linear Combinations</h1>
                <p>
                    Linear combination involves combining a set of vectors by multiplying each vector by a scalar (a real number) and then adding the results together. For example, if you have vectors v1 and v2, and scalars a and b, the expression <InlineMath math="a * v1 + b * v2" /> is a linear combination of those vectors.
                </p>

                <h2>Definition of Linear Combination</h2>
                <p>
                    Given a set of vectors <InlineMath math="\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n" /> in a vector space, a linear combination of these vectors is an expression of the form:
                </p>
                <BlockMath math="\mathbf{w} = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_n \mathbf{v}_n" />
                <p>
                    Where <InlineMath math="c_1, c_2, \ldots, c_n" /> are scalars (real numbers, complex numbers, etc.).
                </p>

                <h3>Example</h3>
                <p>Consider two vectors in <InlineMath math="\mathbb{R}^2" />:</p>
                <BlockMath math="\mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}, \quad \mathbf{v}_2 = \begin{pmatrix} 3 \\ 4 \end{pmatrix}" />
                <p>A linear combination of <InlineMath math="\mathbf{v}_1" /> and <InlineMath math="\mathbf{v}_2" /> would be:</p>
                <BlockMath math="\mathbf{w} = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 = c_1 \begin{pmatrix} 1 \\ 2 \end{pmatrix} + c_2 \begin{pmatrix} 3 \\ 4 \end{pmatrix} = \begin{pmatrix} c_1 + 3c_2 \\ 2c_1 + 4c_2 \end{pmatrix}" />

                <h1 id="span-of-vectors">Span of Vectors</h1>
                <p>
                    In linear algebra, the concept of "span" is fundamental and helps us understand how sets of vectors can generate entire spaces. The span of a set of vectors is defined as the collection of all possible linear combinations of those vectors. Essentially, if you have a set of vectors, their span includes every vector that can be formed by scaling those vectors and adding them together.
                </p>
                <p>
                    For example, if you have two vectors in a two-dimensional space, the span of these vectors can cover the entire plane if the vectors are not collinear. If they are collinear, the span will only cover a line. Similarly, in three dimensions, the span of three vectors can cover the entire space if the vectors are not coplanar.
                </p>

                <h2>Definition of Span</h2>
                <p>If you have a set of vectors <InlineMath math="\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n\}" />, their span is the collection of vectors that can be expressed in the form:</p>
                <BlockMath math="\mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_n \mathbf{v}_n" />
                <p>Where <InlineMath math="c_1, c_2, \ldots, c_n" /> are scalars (real numbers). Essentially, the span of these vectors is the set of all vectors that can be formed by scaling and adding the original vectors.</p>

                <h3>Example</h3>
                <p>Consider two vectors <InlineMath math="\mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}" /> and <InlineMath math="\mathbf{v}_2 = \begin{pmatrix} 3 \\ 4 \end{pmatrix}" />.</p>
                <p>The span of <InlineMath math="\{\mathbf{v}_1, \mathbf{v}_2\}" /> is the set of all vectors that can be written as:</p>
                <BlockMath math="a\mathbf{v}_1 + b\mathbf{v}_2 = a \begin{pmatrix} 1 \\ 2 \end{pmatrix} + b \begin{pmatrix} 3 \\ 4 \end{pmatrix}" />
                <BlockMath math="\text{Span}\{\mathbf{v}_1, \mathbf{v}_2\} = \left\{ \begin{pmatrix} a + 3b \\ 2a + 4b \end{pmatrix} \,\middle|\, a, b \in \mathbb{R} \right\}" />
                <p>Since <InlineMath math="\mathbf{v}_1" /> and <InlineMath math="\mathbf{v}_2" /> are not collinear (they are not multiples of each other), they span the entire <InlineMath math="\mathbb{R}^2" /> plane.</p>

                <h1 id="basis-vectors">Basis Vectors</h1>
                <p>
                    In linear algebra, a basis vector refers to a vector that forms part of a basis for a vector space. A basis is a set of linearly independent vectors that can be used to represent any vector within that vector space. Basis vectors play a fundamental role in the description and analysis of vectors and vector spaces. The basis of a vector space provides a coordinate system that allows us to represent vectors using numerical coordinates.
                </p>
                <h2>Important Terminology</h2>
                <ul>
                    <li><strong>Vector Space (V):</strong> Vector Space (V) is a mathematical structure of a set of vectors that can do addition and scalar multiplication. A set of vectors and operations that are defined on those vectors make up a mathematical structure called a vector space. <em>Example:</em> <InlineMath math="V = \{(x, y) \mid x, y \in \mathbb{R}\}" /></li>
                    <li><strong>Field (F):</strong> Field is the name of the scalar field over which the vector space <InlineMath math="V" /> is defined. It offers the coefficients used in linear vector combinations. Common examples of fields are real numbers (<InlineMath math="\mathbb{R}" />), complex numbers (<InlineMath math="\mathbb{C}" />), and rational numbers (<InlineMath math="\mathbb{Q}" />).</li>
                    <li><strong>Basis (B):</strong> A collection of linearly independent vectors that span the entire vector space <InlineMath math="V" /> is referred to as a basis for vector space <InlineMath math="V" />. <strong>Example:</strong></li>
                </ul>
                <BlockMath math="B = \left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \end{bmatrix} \right\}" />
                <p>In a vector space, if a set of vectors can be used to express every vector in the space as a unique linear combination of those vectors, and those vectors are linearly independent (meaning that none of them can be expressed as a linear combination of the others), then we refer to them as basis vectors for that vector space.</p>

                <h1 id="dot-product">Dot Product Or Scalar Product of Vector</h1>
                <p>Consider two vectors <InlineMath math="\vec{A}" /> and <InlineMath math="\vec{B}" />. The scalar product of these two vectors is defined by the equation:</p>
                <BlockMath math="\vec{A} \cdot \vec{B} = |\vec{A}||\vec{B}|\cos(\theta)" />
                <p>Here, <InlineMath math="\theta" /> is the angle between two vectors.</p>
                <p>In case the vectors are given by their components, for example:</p>
                <BlockMath math="\mathbf{a} = a_1\hat{i} + a_2\hat{j} + a_3\hat{k}, \quad \mathbf{b} = b_1\hat{i} + b_2\hat{j} + b_3\hat{k}" />
                <p>In this case, the dot product is given by:</p>
                <BlockMath math="\mathbf{a} \cdot \mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3" />
                <h3>Example</h3>
                <BlockMath math="\mathbf{u} = \begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}, \quad \mathbf{v} = \begin{bmatrix} -1 \\ 0 \\ -4 \\ 3 \end{bmatrix}" />
                <p>Then</p>
                <BlockMath math="\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 + u_4 v_4 = (-1) + 0 + (-12) + 12 = -1." />
                <h3>Remarks</h3>
                <ul>
                    <li>The dot product of two vectors is defined if and only if the vectors have the same number of components.</li>
                    <li>The dot product of two vectors is a number (scalar), not a vector.</li>
                </ul>
                <h2>Properties of dot product</h2>
                <p><em>Let</em> <InlineMath math="\mathbf{u}, \mathbf{v}, \mathbf{w} \in \mathbb{R}^n" /> <em>be vectors and</em> <InlineMath math="c \in \mathbb{R}" /> <em>be a scalar. Then</em></p>
                <ol>
                    <li><strong><InlineMath math="\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}" /></strong></li>
                    <li><strong><InlineMath math="\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = (\mathbf{u} \cdot \mathbf{v}) + (\mathbf{u} \cdot \mathbf{w})" /></strong></li>
                    <li><strong><InlineMath math="c\mathbf{u} \cdot \mathbf{v} = c (\mathbf{u} \cdot \mathbf{v})" /></strong></li>
                    <li><strong><InlineMath math="\mathbf{u} \cdot \mathbf{u} \geq 0" /></strong>, and <InlineMath math="\mathbf{u} \cdot \mathbf{u} = 0" /> <em>if and only if</em> <InlineMath math="\mathbf{u} = 0" /></li>
                </ol>

                <h1 id="cross-product">Vector Product Or Cross Product of Vectors</h1>
                <p>Consider two vectors <InlineMath math="\bm{A}" /> and <InlineMath math="\bm{B}" />. The vector product of these two vectors is denoted by <InlineMath math="\bm{A} \times \bm{B}" />. The direction of this vector is perpendicular to both of the vectors. The magnitude of this vector is given by,</p>
                <BlockMath math="|\bm{A} \times \bm{B}| = |\bm{A}||\bm{B}|\sin(\theta)" />
                <p>Here, <InlineMath math="\theta" /> is the angle between two vectors.</p>
                <p>The right-hand rule is used to determine the direction of the resulting vector from the cross product. Note that unlike the addition and dot product, the vector product is not commutative.</p>
                <p>In case the vectors are given by their components. For example,</p>
                <BlockMath math="\bm{a} = a_1 \hat{\imath} + a_2 \hat{\jmath} + a_3 \hat{k}, \quad \bm{b} = b_1 \hat{\imath} + b_2 \hat{\jmath} + b_3 \hat{k}" />
                <p>In this case, the cross-product is given by:</p>
                <BlockMath math="\begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix} \times \begin{bmatrix} w_1 \\ w_2 \\ w_3 \end{bmatrix} = \det\begin{pmatrix} \hat{\imath} & v_1 & w_1 \\ \hat{\jmath} & v_2 & w_2 \\ \hat{k} & v_3 & w_3 \end{pmatrix}" />
                <BlockMath math="\bm{A} \times \bm{B} = \begin{vmatrix} \hat{\imath} & \hat{\jmath} & \hat{k} \\ 2 & 1 & 1 \\ 1 & 1 & 1 \end{vmatrix}" />
                <p>Expanding along the first row:</p>
                <BlockMath math="\bm{A} \times \bm{B} = \hat{\imath} \begin{vmatrix} 1 & 1 \\ 1 & 1 \end{vmatrix} - \hat{\jmath} \begin{vmatrix} 2 & 1 \\ 1 & 1 \end{vmatrix} + \hat{k} \begin{vmatrix} 2 & 1 \\ 1 & 1 \end{vmatrix}" />
                <p>Evaluating the determinants:</p>
                <BlockMath math="\bm{A} \times \bm{B} = \hat{\imath} (1\cdot1 - 1\cdot1) - \hat{\jmath} (2\cdot1 - 1\cdot1) + \hat{k} (2\cdot1 - 1\cdot1)" />
                <BlockMath math="\bm{A} \times \bm{B} = 0\hat{\imath} - \hat{\jmath} + \hat{k}" />
                <BlockMath math="\bm{A} \times \bm{B} = -\hat{\jmath} + \hat{k}" />

                <button onClick={() => setShowMore(!showMore)} className="toggle-button">
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
}
