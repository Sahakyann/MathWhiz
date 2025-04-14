import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { addStyles } from "react-mathquill";

addStyles();

export default function HigherDerivative() {
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
                    <li><a href="#plot">Graph & Interpretation</a></li>
                    <li><a href="#third-order">Third Order Derivative</a></li>
                </ul>
            </nav>

            <div>
                <section id="latex-content" className="latex-container">
                    <h1>Higher Order Derivatives</h1>

                    <p><strong>Higher order derivatives</strong> refer to derivatives of a function obtained by repeatedly differentiating the original function.</p>
                    <ul>
                        <li>The <strong>first derivative</strong>, <InlineMath math="f'(x)" />, represents the rate of change or slope.</li>
                        <li>The <strong>second derivative</strong>, <InlineMath math="f''(x)" />, describes curvature or concavity.</li>
                        <li>The <strong>third derivative</strong>, <InlineMath math="f'''(x)" />, is the derivative of the second derivative, and so on.</li>
                    </ul>
                    <p>The <InlineMath math="n^{\text{th}}" /> derivative of a function <InlineMath math="f(x)" /> is denoted as <InlineMath math="f^{(n)}(x)" />.</p>

                    <h2 id="plot">Graph & Interpretation</h2>
                    <p>The second derivative tells us how the slope is changing. When <InlineMath math="f''(x) > 0" />, the curve is concave up (slope is increasing). When <InlineMath math="f''(x) < 0" />, the curve is concave down (slope is decreasing).</p>
                    <p>The second derivative is also used to find maxima/minima and optimize functions.</p>
                    <img src="/Images/HigherOrderDerivativesGraph1.png" alt="Inflection point" style={{ maxWidth: '600px', display: 'block', margin: '2rem auto' }} />

                    <p>Let’s plot the derivative and second derivative alongside the original function to analyze slope behavior:</p>
                    <img src="/Images/HigherOrderDerivativesGraph2.png" alt="Higher order graph set" style={{ maxWidth: '600px', display: 'block', margin: '2rem auto' }} />

                    <h2 id="third-order">Third Order Derivative</h2>
                    <h3>Example 1</h3>
                    <p>Given <InlineMath math="y(x) = 3x^3 + 12x + 4" />, find the third derivative at <InlineMath math="x = 1" />.</p>
                    <p><strong>Solution:</strong></p>
                    <BlockMath math={"y'(x) = 9x^2 + 12"} />
                    <BlockMath math={"y''(x) = 18x"} />
                    <BlockMath math={"y'''(x) = 18"} />
                    <BlockMath math={"y'''(1) = 18"} />

                    <h3>Example 2</h3>
                    <p>Given <InlineMath math="f(x) = e^x + \sin(x)" />, find <InlineMath math="f'''(x)" /> at <InlineMath math="x = 0" />.</p>
                    <BlockMath math={"f'(x) = e^x + \cos(x)"} />
                    <BlockMath math={"f''(x) = e^x - \sin(x)"} />
                    <BlockMath math={"f'''(x) = e^x - \cos(x)"} />
                    <BlockMath math={"f'''(0) = 1 - 1 = 0"} />
                </section>
            </div>
        </div>
    );
}
