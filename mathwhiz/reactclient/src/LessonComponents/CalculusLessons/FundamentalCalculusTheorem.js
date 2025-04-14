import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { addStyles } from "react-mathquill";

export default function FundamentalCalculusTheorem() {

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
            <section id="latex-content" className="latex-container">
                <h1>Integral Notation</h1>
                <p>
                    Integration is the process of finding the area of the region under the curve. This is done by drawing as many small rectangles covering up the area and summing up their areas. The sum approaches a limit that is equal to the region under the curve of a function.
                    Integration is the process of finding the antiderivative of a function. If a function is integrable and if its integral over the domain is finite, with the limits specified, then it is the definite integration.
                </p>
                <p>If <InlineMath math="\\frac{d}{dx} F(x) = f(x)" />, then</p>
                <BlockMath math="\\int f(x) \,dx = F(x) + C." />

                <p>These are indefinite integrals. For example, let <InlineMath math="f(x) = x^3" />. The derivative is</p>
                <BlockMath math="f'(x) = 3x^2" />
                <p>and the antiderivative of <InlineMath math="3x^2" /> is</p>
                <BlockMath math="f(x) = x^3" />

                <p>
                    Thus, we find that the derivatives of <InlineMath math="F(x)" /> satisfy <InlineMath math="F'(x) = f(x)" />. However, the antiderivatives of <InlineMath math="f(x)" /> are not unique. The antiderivative of <InlineMath math="f(x)" /> is a family of infinitely many functions. For example:
                </p>
                <BlockMath math="\\int \\cos x \,dx = \\sin x + C." />

                <h2>Integration by Parts</h2>
                <BlockMath math="\\int f(x) g'(x) \,dx = f(x) g(x) - \\int g(x) f'(x) \,dx" />
                <BlockMath math="\\int u \, dv = uv - \\int v \, du" />

                <h3>Example 1</h3>
                <BlockMath math="\\int x \\sin x \,dx" />
                <p>
                    Let <InlineMath math="u = x" />, <InlineMath math="du = dx" />, <InlineMath math="dv = \\sin x \,dx" />, <InlineMath math="v = -\\cos x" />.
                </p>
                <BlockMath math="\\int u \, dv = uv - \\int v \, du = x(-\\cos x) - \\int (-\\cos x)dx = -x \\cos x + \\sin x + C." />

                <h3>Example 2</h3>
                <BlockMath math="\\int t^2 e^t dt" />
                <p>
                    Choose <InlineMath math="u = t^2" />, so <InlineMath math="du = 2t dt" />, <InlineMath math="dv = e^t dt" />, <InlineMath math="v = e^t" />
                </p>
                <BlockMath math="\\int u dv = uv - \\int v du = t^2 e^t - \\int e^t (2t)dt" />

                <p>
                    Second step of parts: Let <InlineMath math="w = 2t" />, <InlineMath math="dw = 2dt" />, <InlineMath math="dz = e^t" />, <InlineMath math="z = e^t" />.
                </p>
                <BlockMath math="\\int w dz = wz - \\int z dw = 2t e^t - 2e^t + C" />

                <p>Combining:</p>
                <BlockMath math="t^2 e^t - 2t e^t + 2e^t + C" />

                <h2>Integration by U-Substitution</h2>
                <BlockMath math="\\int f(g(x)) g'(x) dx = \\int f(u) du" />

                <h3>Example 1</h3>
                <BlockMath math="\\int \\sqrt{3x + 2} dx" />
                <p>Let <InlineMath math="u = 3x + 2" />, then <InlineMath math="dx = \\frac{1}{3} du" />.</p>
                <BlockMath math="\\int \\sqrt{u} \\cdot \\frac{1}{3} du = \\frac{1}{3} \\int \\sqrt{u} du = \\frac{2}{9} u^{3/2} + C" />
                <p>Back-substitute:</p>
                <BlockMath math="\\frac{2}{9} (3x + 2)^{3/2} + C" />

                <h3>Example 2</h3>
                <BlockMath math="\\int_{1}^{2} x^3 \\cos(x^4 + 3)dx" />
                <p>Let <InlineMath math="u = x^4 + 3" />, then <InlineMath math="du = 4x^3 dx" />, so <InlineMath math="x^3 dx = \\frac{1}{4} du" />.</p>

                <h4>Option 1</h4>
                <BlockMath math="\\int \\frac{1}{4} \\cos(u) du = \\frac{1}{4} \\sin(u) + C" />
                <BlockMath math="\\frac{1}{4} \\sin(x^4 + 3) \\Big|_1^2 = \\frac{1}{4} \\sin(19) - \\frac{1}{4} \\sin(4)" />

                <h4>Option 2</h4>
                <p>Change bounds: \( x = 1 \Rightarrow u = 4, x = 2 \Rightarrow u = 19 \)</p>
                <BlockMath math="\\int_4^{19} \\frac{1}{4} \\cos(u) du = \\frac{1}{4} \\sin(19) - \\frac{1}{4} \\sin(4)" />

                <h1>Fundamental Theorem of Calculus (FTC)</h1>
                <h2>Part 1</h2>
                <p>If <InlineMath math="f(x)" /> is continuous on <InlineMath math="[a, b]" />, and <InlineMath math="F(x) = \\int_a^x f(t) dt" />, then <InlineMath math="F'(x) = f(x)" />.</p>

                <h3>Example 1</h3>
                <BlockMath math="g(x) = \\int_1^x \\frac{1}{t^3 + 1} dt" />
                <p>Then <InlineMath math="g'(x) = \\frac{1}{x^3 + 1}" /></p>

                <h3>Example 2</h3>
                <BlockMath math="F(x) = \\int_1^{\\sqrt{x}} \\sin t dt" />
                <BlockMath math="F'(x) = \\frac{\\sin(\\sqrt{x})}{2\\sqrt{x}}" />

                <h3>Example 3</h3>
                <BlockMath math="F(x) = \\int_x^{2x} t^3 dt" />
                <p>
                    Split the integral:
                    <BlockMath math="F(x) = -\\int_0^x t^3 dt + \\int_0^{2x} t^3 dt" />
                </p>
                <p>
                    Derivatives:
                    <BlockMath math="\\frac{d}{dx} [-\\int_0^x t^3 dt] = -x^3" />
                    <BlockMath math="\\frac{d}{dx} [\\int_0^{2x} t^3 dt] = 16x^3" />
                </p>
                <BlockMath math="F'(x) = -x^3 + 16x^3 = 15x^3" />

                <h2>Part 2</h2>
                <p>
                    If <InlineMath math="f(x)" /> is continuous on <InlineMath math="[a, b]" />, and <InlineMath math="F(x)" /> is any antiderivative, then:
                </p>
                <BlockMath math="\\int_a^b f(x) dx = F(b) - F(a)" />

                <h3>Example 1</h3>
                <BlockMath math="\\int_{-2}^2 (t^2 - 4) dt = \\left( \\frac{t^3}{3} - 4t \\right) \\Big|_{-2}^{2}" />
                <BlockMath math="= \\left[ \\frac{8}{3} - 8 \\right] - \\left[ \\frac{-8}{3} + 8 \\right] = -\\frac{32}{3}" />

                <h3>Example 2</h3>
                <BlockMath math="\\int_{1}^{9} \\frac{x - 1}{\\sqrt{x}} dx" />
                <p>
                    Rewrite:
                    <BlockMath math="= \\int_1^9 (x^{1/2} - x^{-1/2}) dx" />
                    <BlockMath math="= \\left( \\frac{x^{3/2}}{3/2} - \\frac{x^{1/2}}{1/2} \\right) \\Big|_1^9" />
                    <BlockMath math="= \\frac{2}{3} (27) - 2(3) - \\left[ \\frac{2}{3} (1) - 2(1) \\right] = \\frac{40}{3}" />
                </p>
            </section>
        </div>
    );
}
