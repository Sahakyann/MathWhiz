import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { addStyles } from "react-mathquill";

addStyles();

export default function Lhopital() {
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
                    <li><a href="#theorem">L'Hôpital's Rule</a></li>
                    <li><a href="#examples">Examples</a></li>
                </ul>
            </nav>

            <div>
                <section id="latex-content" className="latex-container">
                    <img
                        src={"/LHopitalsRuleThumbnail_ManimCE_v0.19.0.png"}
                        alt="Media Toggle"
                        style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                    />

                    <p><strong>Determinate and Indeterminate Forms.</strong> An undefined expression involving some operation between two quantities is called a <em>determinate form</em> if it evaluates to a single number value or infinity. An undefined expression involving some operation between two quantities is called an <em>indeterminate form</em> if it does not evaluate to a single number value or infinity.</p>

                    <div className="math-container">
                        <table className="limit-table">
                            <thead>
                                <tr>
                                    <th>Determinate Forms</th>
                                    <th>Indeterminate Forms</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><BlockMath math="0 + 0" /></td><td><BlockMath math="\infty - \infty" /></td></tr>
                                <tr><td><BlockMath math="0 - 0" /></td><td><BlockMath math="\frac{0}{0}" /></td></tr>
                                <tr><td><BlockMath math="0 \cdot 0" /></td><td><BlockMath math="\frac{\pm\infty}{\pm\infty}" /></td></tr>
                                <tr><td><BlockMath math="\pm\infty \cdot \pm\infty" /></td><td><BlockMath math="0 \cdot \infty" /></td></tr>
                                <tr><td><BlockMath math="\frac{0}{\infty}, \frac{n}{\infty}" /></td><td><BlockMath math="0^0" /></td></tr>
                                <tr><td><BlockMath math="\frac{\infty}{0}, \frac{\infty}{n}" /></td><td><BlockMath math="\infty^0" /></td></tr>
                                <tr><td><BlockMath math="n \cdot \infty \quad n \neq 0" /></td><td><BlockMath math="1^\infty" /></td></tr>
                                <tr><td><BlockMath math="0^\infty" /></td><td></td></tr>
                                <tr><td><BlockMath math="n^\infty \quad n \neq 1" /></td><td></td></tr>
                                <tr><td><BlockMath math="\infty^\infty" /></td><td></td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 id="theorem">Theorem: L'Hôpital's Rule</h2>
                    <p>For a limit <InlineMath math="\lim\limits_{x \to a} \frac{f(x)}{g(x)}" /> of the indeterminate form <InlineMath math="\frac{0}{0}" /> or <InlineMath math="\frac{\infty}{\infty}" />, we have</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}" />
                    </div>
                    <p>if <InlineMath math="\lim\limits_{x \to a} \frac{f'(x)}{g'(x)}" /> exists or equals <InlineMath math="\infty" /> or <InlineMath math="-\infty" />.</p>

                    <h2 id="examples">Example: Indeterminate Form \( 0/0 \)</h2>
                    <p><strong>Compute:</strong> <InlineMath math="\lim\limits_{x \to \pi} \frac{x^2 - \pi^2}{\sin x}" /></p>
                    <p><strong>Solution:</strong> Since both the numerator and denominator approach zero, we use L'Hôpital's Rule:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to \pi} \frac{x^2 - \pi^2}{\sin x} = \lim_{x \to \pi} \frac{2x}{\cos x}" />
                    </div>
                    <p>The denominator now approaches \(-1\), so:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to \pi} \frac{x^2 - \pi^2}{\sin x} = \frac{2\pi}{-1} = -2\pi" />
                    </div>

                    <h2>Example: Indeterminate Form \( \infty/\infty \)</h2>
                    <p><strong>Compute:</strong> <InlineMath math="\lim\limits_{x \to \infty} \frac{2x^2 - 3x + 7}{x^2 + 47x + 1}" /></p>
                    <p><strong>Solution:</strong> Apply L'Hôpital's Rule:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to \infty} \frac{4x - 3}{2x + 47}" />
                    </div>
                    <p>Apply L'Hôpital's Rule again:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to \infty} \frac{4}{2} = 2" />
                    </div>

                    <h2>Example: Indeterminate Form \( \infty - \infty \)</h2>
                    <p><strong>Compute:</strong> <InlineMath math="\lim\limits_{x \to 0^+} \left( \frac{1}{\sin x} - \frac{1}{x} \right)" /></p>
                    <p><strong>Solution:</strong></p>
                    <p>As <InlineMath math="x \to 0^+" />, we have <InlineMath math="\infty - \infty" />.</p>
                    <p>Combining the fractions:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to 0^+} \frac{x - \sin x}{x \sin x}" />
                    </div>
                    <p>Apply L'Hôpital's Rule twice:</p>
                    <div className="math-container">
                        <BlockMath math="\lim_{x \to 0^+} \frac{1 - \cos x}{\sin x + x \cos x} \overset{H}{=} \lim_{x \to 0^+} \frac{\sin x}{2 \cos x - x \sin x} = \frac{0}{2} = 0" />
                    </div>
                </section>
            </div>
        </div>
    );
}
