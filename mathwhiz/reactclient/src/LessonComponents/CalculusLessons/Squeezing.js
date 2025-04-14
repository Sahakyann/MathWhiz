import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import axios from "axios";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";
import '../../Styles-CSS/lessons.css';
import QuizComponent from "../QuizComponent";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";

addStyles();


const ToggleMedia = ({ imageSrc, videoSrc }) => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="toggle-container">
            <button
                onClick={() => setShowVideo(!showVideo)}
                className="toggle-button"
            >
                {showVideo ? "Show Image" : "Show Animation"}
            </button>

            {showVideo ? (
                <video controls width="600" style={{ display: "block", margin: "1rem auto" }}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img
                    src={imageSrc}
                    alt="Media Toggle"
                    style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                />
            )}
        </div>
    );
};

export default function Squeezing() {
    const navigate = useNavigate();

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


            <div>
                <section id="latex-content" className="latex-container">
                    <img
                    src={"/SqueezingTheoremClassic_ManimCE_v0.19.0.png"}
                    alt="Media Toggle"
                    style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                />
                    <p>
                        We learned that certain oscillating functions are considered discontinuous or undefined at the point of oscillation.
                        Therefore, we are unable to determine the limit of such functions. However, with the help of the squeeze theorem,
                        we can now determine the limit of an oscillating function.
                    </p>

                    <ToggleMedia
                        imageSrc="/Images/Squeeze Theorem.png"
                        videoSrc="/Squeeze_Theorem.mp4"
                    />

                    <p>
                        All this says is that if <InlineMath math="g(x)" /> is squeezed between <InlineMath math="f(x)" /> and <InlineMath math="h(x)" /> near <InlineMath math="a" />,
                        and if <InlineMath math="f(x)" /> and <InlineMath math="h(x)" /> have the same limit <InlineMath math="L" /> at <InlineMath math="a" />,
                        then <InlineMath math="g(x)" /> is trapped and will be forced to have the same limit <InlineMath math="L" /> at <InlineMath math="a" /> also.
                    </p>

                    <h2>Useful Limits for Functions</h2>
                    <div className="limit-list">
                        <div className="math-container"><BlockMath math={"\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1"} /></div>
                        <div className="math-container"><BlockMath math={"\\lim_{x \\to 0} \\frac{\\ln(x+1)}{x} = 1"} /></div>
                        <div className="math-container"><BlockMath math={"\\lim_{x \\to 0} \\frac{a^x - 1}{x} = \\ln a"} /></div>
                        <div className="math-container"><BlockMath math={"\\lim_{x \\to 0} \\frac{(1 + x)^\\alpha - 1}{x} = \\alpha"} /></div>
                        <div className="math-container"><BlockMath math={"\\lim_{x \\to 0} (1 + x)^{\\frac{1}{x}} = e"} /></div>
                    </div>


                    <h2>Example</h2>
                    <ToggleMedia
                        imageSrc="/Images/Squeezing Example.png"
                        videoSrc="/Squeezing_Example.mp4"
                    />

                    <p>Using the Squeezing Theorem, show that:</p>
                    <div className="math-container">
                        <BlockMath math={"\\lim_{t \\to 0} \\left( t^2 \\sin \\frac{1}{t} \\right) = 0"} />
                    </div>

                    <p>We use the inequality:</p>
                    <div className="math-container">
                        <BlockMath math={"-1 \\leq \\sin \\frac{1}{t} \\leq 1"} />
                    </div>

                    <p>which implies</p>
                    <div className="math-container">
                        <BlockMath math={"-t^2 \\leq t^2 \\sin \\frac{1}{t} \\leq t^2"} />
                    </div>

                    <p>Taking limits on both sides:</p>
                    <div className="math-container">
                        <BlockMath math={"\\lim_{t \\to 0} (-t^2) = 0 \\quad \\text{and} \\quad \\lim_{t \\to 0} (t^2) = 0"} />
                    </div>

                    <p><strong>Therefore,</strong></p>
                    <div className="math-container">
                        <BlockMath math={"\\lim_{t \\to 0} \\left( t^2 \\sin \\frac{1}{t} \\right) = 0"} />
                    </div>
                </section>
            </div>

        </div>
    );
}
