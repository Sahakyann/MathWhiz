import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";

export default function LinearTransformation() {
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
                    <li><a href="#definition">Definition</a></li>
                    <li><a href="#rotation-example">Rotation Example</a></li>
                    <li><a href="#matrix-example">Matrix Form</a></li>
                    <li><a href="#injectivity-surjectivity">Injectivity & Surjectivity</a></li>
                    <li><a href="#invertibility">Invertibility</a></li>
                    <li><a href="#linearity-check">Linearity Check</a></li>
                </ul>
            </nav>

            <div className="latex-container">
                <h1 id="definition">Linear Transformations</h1>
                <p>A linear transformation is a function from one vector space to another that respects the underlying (linear) structure of each vector space. A linear transformation is also known as a linear operator or map. The defining characteristic of a linear transformation <InlineMath math="T : V \rightarrow W" /> is that, for any vectors <InlineMath math="v_1" /> and <InlineMath math="v_2" /> in <InlineMath math="V" /> and scalars <InlineMath math="a" /> and <InlineMath math="b" /> of the underlying field,</p>
                <BlockMath math="T(av_1 + bv_2) = aT(v_1) + bT(v_2)" />
                <p>Linear transformations are useful because they preserve the structure of a vector space. So, many qualitative assessments of a vector space that is the domain of a linear transformation may, under certain conditions, automatically hold in the image of the linear transformation. For instance, the structure immediately gives that the kernel and image are both subspaces (not just subsets) of the range of the linear transformation.</p>
                <p>Most linear functions can probably be seen as linear transformations in the proper setting. Transformations in the change of basis formulas are linear, and most geometric operations, including rotations, reflections, and contractions/dilations, are linear transformations. Even more powerfully, linear algebra techniques could apply to certain very non-linear functions through either approximation by linear functions or reinterpretation as linear functions in unusual vector spaces. A comprehensive, grounded understanding of linear transformations reveals many connections between areas and objects of mathematics.</p>

                <h2 id="rotation-example">Example</h2>
                <p>A common transformation in Euclidean geometry is rotation in a plane, about the origin. By considering Euclidean points as vectors in the vector space <InlineMath math="\mathbb{R}^2" />, rotations can be viewed in a linear algebraic sense. A rotation of <InlineMath math="v" /> counterclockwise by angle <InlineMath math="\theta" /> is given by</p>
                <BlockMath math="\\text{Rotate}(v) = \begin{pmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{pmatrix}v" />
                <p>The linear transformation <code>Rotate</code> goes from <InlineMath math="\mathbb{R}^2" /> to <InlineMath math="\mathbb{R}^2" /> and is given by the matrix shown above. Because this matrix is invertible for any value <InlineMath math="\theta" />, it follows that this linear transformation is in fact an automorphism. Since rotations can be "undone" by rotating in the opposite direction, this makes sense.</p>

                <h2 id="matrix-example">Example</h2>
                <p>Linear transformations are most commonly written in terms of matrix multiplication. A transformation <InlineMath math="T : V \rightarrow W" /> from <InlineMath math="m" />-dimensional vector space <InlineMath math="V" /> to <InlineMath math="n" />-dimensional vector space <InlineMath math="W" /> is given by an <InlineMath math="n \times m" /> matrix <InlineMath math="M" />.</p>
                <p>The linear transformation from <InlineMath math="\mathbb{R}^3" /> to <InlineMath math="\mathbb{R}^2" /> defined by</p>
                <BlockMath math="T(x, y, z) = (x - y, \, y - z)" />
                <p>is given by the matrix</p>
                <BlockMath math="M = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{pmatrix}" />
                <p>So, <InlineMath math="T" /> can also be defined for vectors <InlineMath math="v = (v_1, v_2, v_3)" /> by the matrix product</p>
                <BlockMath math="T(v) = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}" />
                <p>Note that the <em>dimension</em> of the initial vector space is the number of <em>columns</em> in the matrix, while the dimension of the target vector space is the number of <em>rows</em> in the matrix.</p>

                <h2 id="injectivity-surjectivity">Injectivity & Surjectivity</h2>
                <p>A linear transformation is <strong>surjective</strong> if every vector in its range is in its image. Equivalently, at least one <InlineMath math="n \times n" /> minor of the <InlineMath math="n \times m" /> matrix is invertible. It is <strong>injective</strong> if every vector in its image is the image of only one vector in its domain. Equivalently, at least one <InlineMath math="m \times m" /> minor of the <InlineMath math="n \times m" /> matrix is invertible.</p>

                <h3>Example</h3>
                <p>Is the linear transformation</p>
                <BlockMath math="T(x, y, z) = (x - y, y - z), \quad \text{from } \mathbb{R}^3 \text{ to } \mathbb{R}^2," />
                <p>injective? Is it surjective?</p>
                <BlockMath math="T(\mathbf{v}) = M\mathbf{v} = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}" />
                <p><InlineMath math="M" /> is a <InlineMath math="2 \times 3" /> matrix, so <strong>it is surjective</strong> because the minor</p>
                <BlockMath math="\begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}" />
                <p>has determinant 1 and is therefore invertible.</p>
                <p>However, there are no <InlineMath math="3 \times 3" /> minors, so <strong>it is not injective</strong>.</p>

                <h2 id="invertibility">Invertibility</h2>
                <p>A linear transformation <InlineMath math="T : V \rightarrow W" /> between two vector spaces of equal dimension (finite or infinite) is <strong>invertible</strong> if there exists a linear transformation <InlineMath math="T^{-1}" /> such that</p>
                <BlockMath math="T(T^{-1}(v)) = v \quad \text{and} \quad T^{-1}(T(v)) = v \quad \text{for any vector } v \in V." />
                <p>For finite dimensional vector spaces, a linear transformation is invertible if and only if its matrix is invertible.</p>

                <h2 id="linearity-check">Definition & Linearity Check</h2>
                <p>Let <InlineMath math="V" /> and <InlineMath math="U" /> be vector spaces over the same field <InlineMath math="\mathbb{F}" />. A <em>linear transformation</em> from <InlineMath math="V" /> to <InlineMath math="U" /> is a function <InlineMath math="T : V \rightarrow U" /> such that</p>
                <ol>
                    <li><InlineMath math="T(\mathbf{v}_1 + \mathbf{v}_2) = T(\mathbf{v}_1) + T(\mathbf{v}_2)" />, for all <InlineMath math="\mathbf{v}_1, \mathbf{v}_2 \in V" /></li>
                    <li><InlineMath math="T(c\mathbf{v}) = cT(\mathbf{v})" />, for all <InlineMath math="\mathbf{v} \in V" /> and <InlineMath math="c \in \mathbb{F}" /></li>
                </ol>

                <h3>Example</h3>
                <p>Let <InlineMath math="T : \mathbb{R}^3 \rightarrow \mathbb{R}^2" /> be defined by</p>
                <BlockMath math="T\begin{bmatrix}x \\ y \\ z\end{bmatrix} = \begin{bmatrix}x + 2y \\ 2x - y + 3z\end{bmatrix}" />
                <p>Check whether <InlineMath math="T" /> is a linear transformation.</p>
                <h4>Solution</h4>
                <p><strong>1.</strong> Let</p>
                <BlockMath math="\begin{bmatrix} x_1 \\ y_1 \\ z_1 \end{bmatrix}, \quad \begin{bmatrix} x_2 \\ y_2 \\ z_2 \end{bmatrix} \in \mathbb{R}^3" />
                <p>Then</p>
                <BlockMath math="T\left( \begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \\ z_1 + z_2 \end{bmatrix} \right) = \begin{bmatrix} (x_1 + x_2) + 2(y_1 + y_2) \\ 2(x_1 + x_2) - (y_1 + y_2) + 3(z_1 + z_2) \end{bmatrix}" />
                <BlockMath math="= \begin{bmatrix} x_1 + 2y_1 \\ 2x_1 - y_1 + 3z_1 \end{bmatrix} + \begin{bmatrix} x_2 + 2y_2 \\ 2x_2 - y_2 + 3z_2 \end{bmatrix} = T\left(\begin{bmatrix} x_1 \\ y_1 \\ z_1 \end{bmatrix}\right) + T\left(\begin{bmatrix} x_2 \\ y_2 \\ z_2 \end{bmatrix}\right)" />

                <p><strong>2.</strong> Let</p>
                <BlockMath math="\begin{bmatrix} x \\ y \\ z \end{bmatrix} \in \mathbb{R}^3, \quad c \in \mathbb{R}" />
                <p>Then</p>
                <BlockMath math="T\left( \begin{bmatrix} cx \\ cy \\ cz \end{bmatrix} \right) = \begin{bmatrix} cx + 2cy \\ 2cx - cy + 3cz \end{bmatrix} = \begin{bmatrix} c(x + 2y) \\ c(2x - y + 3z) \end{bmatrix} = c \begin{bmatrix} x + 2y \\ 2x - y + 3z \end{bmatrix} = cT\left(\begin{bmatrix} x \\ y \\ z \end{bmatrix}\right)" />

                <p><strong>1., 2.</strong> <InlineMath math="\Rightarrow T" /> is a linear transformation.</p>
            </div>
        </div>
    );
}
