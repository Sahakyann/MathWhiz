import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { addStyles } from "react-mathquill";

addStyles();

export default function Derivatives() {
    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisible] = useState(false);

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
                    <button className="transparent-button" onClick={() => navigate('/calculus')}>
                        Back to Calculus
                    </button>
                </div>
            </div>

            <nav className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#definition">Definition</a></li>
                    <li><a href="#geometry">Graphical Interpretation</a></li>
                    <li><a href="#rules">Differentiation Rules</a></li>
                    <li><a href="#tangent">Tangent Line Equation</a></li>
                </ul>
            </nav>

            <div>
                <section id="latex-content" className="latex-container">
                    <img
                        src={"/DerivativeOfFunctionThumbnail_ManimCE_v0.19.0.png"}
                        alt="Media Toggle"
                        style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                    />


                    <h2 id="definition">Definition of a Derivative</h2>
                    <p>The derivative of a function <InlineMath math="y = f(x)" /> with respect to <InlineMath math="x" /> is the function <InlineMath math="f'" /> defined by:</p>
                    <div className="math-container">
                        <BlockMath math={"f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}"} />
                    </div>
                    <p>Some textbooks use <InlineMath math="h" /> in place of <InlineMath math="\Delta x" />:</p>
                    <div className="math-container">
                        <BlockMath math={"f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}"} />
                    </div>

                    <h3>Example: Find the derivative of <InlineMath math="f(t) = t^2" /></h3>
                    <p><strong>Solution:</strong></p>
                    <div className="math-container">
                        <BlockMath math={"f'(t) = \\lim_{h \\to 0} \\frac{(t + h)^2 - t^2}{h} = \\lim_{h \\to 0} \\frac{2th + h^2}{h} = \\lim_{h \\to 0} (2t + h) = 2t"} />
                    </div>

                    <h2 id="geometry">Geometrical Interpretation of Derivative</h2>
                    <p>Consider the function <InlineMath math="f(x)" /> given by the graph below. Verify that the graph of <InlineMath math="f'(x)" /> is indeed the derivative of <InlineMath math="f(x)" /> by analyzing slopes of tangent lines to the graph at different points.</p>
                    <img src="/Images/Dervative_of_Function.png" alt="Graph of Derivative" style={{ maxWidth: '600px', margin: '2rem auto', display: 'block' }} />

                    <h2>Derivative of a Linear Function</h2>
                    <h3>Example: Let <InlineMath math="f(x) = mx + b" />.</h3>
                    <p><strong>Solution:</strong> Using the definition of derivative:</p>
                    <div className="math-container">
                        <BlockMath math={"f'(x) = \\lim_{h \\to 0} \\frac{m(x+h)+b - (mx + b)}{h} = \\lim_{h \\to 0} \\frac{mh}{h} = m"} />
                    </div>
                    <p>This matches our geometric interpretation: the slope of a straight line is constant and equals <InlineMath math="m" />.</p>

                    <h1 id="rules">Differentiation Rules</h1>
                    <p>If the functions <InlineMath math="f" /> and <InlineMath math="g" /> are differentiable at <InlineMath math="x_0" />, then:</p>
                    <ul className="limit-list">
                        <li><BlockMath math={"(f + g)'(x_0) = f'(x_0) + g'(x_0)"} /></li>
                        <li><BlockMath math={"(\\alpha f)'(x_0) = \\alpha f'(x_0)"} /></li>
                        <li><BlockMath math={"(fg)'(x_0) = f'(x_0)g(x_0) + f(x_0)g'(x_0)"} /></li>
                        <li><BlockMath math={"\\left( \\frac{f}{g} \\right)'(x_0) = \\frac{f'(x_0)g(x_0) - f(x_0)g'(x_0)}{g^2(x_0)}"} /></li>
                    </ul>

                    <h1 id="tangent">Tangent Line Equation</h1>
                    <p><strong>Definition:</strong> Given a function <InlineMath math="y = f(x)" />, the tangent line equation at <InlineMath math="x = a" /> is:</p>
                    <div className="math-container">
                        <BlockMath math={"y = f(a) + f'(a)(x - a)"} />
                    </div>

                    <h3>Example:</h3>
                    <p>Find the equation of the tangent line to:</p>
                    <BlockMath math={"f(x) = \\frac{x^3 - 4x + 1}{x^2 + 1}"} />
                    <p>at <InlineMath math="x = 1" /></p>

                    <h4>Step 1: Compute <InlineMath math="f(1)" /></h4>
                    <BlockMath math={"f(1) = \\frac{1 - 4 + 1}{1 + 1} = -1"} />

                    <h4>Step 2: Compute <InlineMath math="f'(x)" /></h4>
                    <p>Use the quotient rule:</p>
                    <BlockMath math={"\\left( \\frac{g}{h} \\right)' = \\frac{g'h - gh'}{h^2}"} />
                    <p>Let <InlineMath math="g(x) = x^3 - 4x + 1" /> and <InlineMath math="h(x) = x^2 + 1" />:</p>
                    <BlockMath math={"g'(x) = 3x^2 - 4, \\quad h'(x) = 2x"} />
                    <BlockMath math={"f'(x) = \\frac{(3x^2 - 4)(x^2 + 1) - (x^3 - 4x + 1)(2x)}{(x^2 + 1)^2}"} />

                    <h4>Step 3: Compute <InlineMath math="f'(1)" /></h4>
                    <BlockMath math={"f'(1) = \\frac{-2 + 4}{4} = \\frac{2}{4} = \\frac{1}{2}"} />

                    <h4>Step 4: Use Tangent Line Equation</h4>
                    <BlockMath math={"y - (-1) = \\frac{1}{2}(x - 1)"} />
                    <BlockMath math={"y + 1 = \\frac{1}{2}x - \\frac{1}{2}"} />
                    <BlockMath math={"y = \\frac{1}{2}x - \\frac{3}{2}"} />
                </section>
            </div>
        </div>
    );
}
