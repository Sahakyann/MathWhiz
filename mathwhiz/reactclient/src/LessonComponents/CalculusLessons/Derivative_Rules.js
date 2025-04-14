import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { addStyles } from "react-mathquill";

addStyles();

export default function ChainRule() {
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
                    <li><a href="#chain-definition">Chain Rule</a></li>
                    <li><a href="#example1">Example</a></li>
                    <li><a href="#datapoints">Chain Rule and Data Points</a></li>
                </ul>
            </nav>

            <div>
                <section id="latex-content" className="latex-container">
                    <h1 id="chain-definition">Chain Rule</h1>

                    <p>If <InlineMath math="g" /> is differentiable at <InlineMath math="x" /> and <InlineMath math="f" /> is differentiable at <InlineMath math="g(x)" />, then the composite function <InlineMath math="h = f \circ g" /> (i.e., <InlineMath math="f(g(x))" />) is differentiable at <InlineMath math="x" /> and:</p>
                    <div className="math-container">
                        <BlockMath math={"h'(x) = f'(g(x)) \\cdot g'(x)"} />
                    </div>

                    <p>In Leibniz notation, this becomes:</p>
                    <div className="math-container">
                        <BlockMath math={"\\frac{df}{dx} = \\frac{df}{dg} \\cdot \\frac{dg}{dx}"} />
                    </div>

                    <h2 id="example1">Example 1</h2>
                    <p><strong>Compute the derivative of:</strong> <InlineMath math="\\sqrt{625 - x^2}" /></p>

                    <p><strong>Solution:</strong> Let <InlineMath math="f(x) = \\sqrt{x}" />, <InlineMath math="g(x) = 625 - x^2" />. Then:</p>
                    <BlockMath math={"f'(x) = \\frac{1}{2} x^{-1/2}, \\quad f'(g(x)) = \\frac{1}{2}(625 - x^2)^{-1/2}"} />
                    <p>Since <InlineMath math="g'(x) = -2x" />, then:</p>
                    <BlockMath math={"f'(g(x)) \\cdot g'(x) = \\frac{-x}{\\sqrt{625 - x^2}}"} />

                    <h2 id="datapoints">Chain Rule and Data Points</h2>
                    <p><strong>Given:</strong></p>
                    <BlockMath math={"f(2) = -1, \\quad f(-1) = 3, \\quad f'(2) = 4, \\quad f'(-1) = -5"} />
                    <BlockMath math={"g(2) = 2, \\quad g(-1) = -2, \\quad g'(-1) = 0"} />

                    <p><strong>Find the following (if possible):</strong></p>
                    <ul className="limit-list">
                        <li><BlockMath math={"(f \\circ g)'(2) = f'(g(2)) \\cdot g'(2) = f'(2) \\cdot 7 = 4 \\cdot 7 = 28"} /></li>
                        <li><BlockMath math={"(f \\circ f)'(2) = f'(f(2)) \\cdot f'(2) = f'(-1) \\cdot 4 = -5 \\cdot 4 = -20"} /></li>
                        <li><BlockMath math={"(g \\circ f)'(-1) = g'(f(-1)) \\cdot f'(-1) = g'(3) \\cdot (-5)"} /></li>
                    </ul>
                    <p>Cannot compute <InlineMath math="g'(3)" /> because it is unknown.</p>
                </section>
            </div>
        </div>
    );
}
