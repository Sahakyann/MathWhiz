import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import axios from "axios";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { submitFunctionLimit } from "../VisualCalculators";
import { parseLatex } from "../LatexParsing/latexParser";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import '../Styles-CSS/lessons.css';
import QuizComponent from "./QuizComponent";
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
                <video autoPlay muted loop controls width="600" style={{ display: "block", margin: "1rem auto" }}>
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

export default function Limits() {
    const [input, setInput] = useState("");
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [latexContent, setLatexContent] = useState("");

    const [xMin, setXMin] = useState("-10");
    const [xMax, setXMax] = useState("10");
    const [yMin, setYMin] = useState("-10");
    const [yMax, setYMax] = useState("10");
    const [xStep, setXStep] = useState("0.1");
    const navigate = useNavigate();

    const [sliderOpen, setSliderOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [showMore, setShowMore] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isCorrect, setIsCorrect] = useState({});
    const [showSolutions, setShowSolutions] = useState({});

    const quizzes1 = [
        {
            id: "q1",
            question: "Understanding Limit Notation",
            equation: "\\lim_{x \\to a} f(x) = L",
            correctAnswer: "c",
            options: [
                { id: "a", label: "The function stops at x = a." },
                { id: "b", label: "We directly substitute x = a to find L." },
                { id: "c", label: "As x approaches a, f(x) gets closer to L." }, // Correct
                { id: "d", label: "The function must be defined at x = a for the limit to exist." },
            ],
            solution: (
                <div>
                    <p><strong>What does limit notation mean?</strong></p>
                    <p>
                        The expression <BlockMath math={"\\lim_{x \\to a} f(x) = L"} /> means that 
                        as <InlineMath math={"x"} /> gets closer and closer to <InlineMath math={"a"} />, 
                        the function <InlineMath math={"f(x)"} /> gets closer to <InlineMath math={"L"} />.
                    </p>
                    <p>
                        The limit does not require the function to be defined at <InlineMath math={"x = a"} />, 
                        but only that it approaches a specific value as <InlineMath math={"x"} /> gets arbitrarily close to <InlineMath math={"a"} />.
                    </p>
                    <p><strong>Final Answer:</strong> <InlineMath math={"\\text{As } x \\text{ approaches } a, f(x) \\text{ gets closer to } L."} /></p>
                </div>
            ),
        },
        {
            id: "q2",
            question: "Understanding Limit Behavior",
            equation: "If \\lim_{x \\to 2} f(x) = 5, what does this mean?",
            correctAnswer: "b",
            options: [
                { id: "a", label: "f(2) = 5" },
                { id: "b", label: "As x approaches 2, f(x) gets close to 5" }, // Correct
                { id: "c", label: "The function is not defined at x = 2" },
                { id: "d", label: "The function jumps to 5 at x = 2" },
            ],
            solution: (
                <div>
                    <p><strong>How should we interpret this notation?</strong></p>
                    <p>
                        The statement <BlockMath math={"\\lim_{x \\to 2} f(x) = 5"} /> 
                        means that as <InlineMath math={"x"} /> gets closer to 2, 
                        the function <InlineMath math={"f(x)"} /> approaches 5.
                    </p>
                    <p>It does NOT mean that <InlineMath math={"f(2) = 5"} /> must be true.</p>
                    <p><strong>Final Answer:</strong> <InlineMath math={"\\text{As } x \\text{ approaches } 2, f(x) \\text{ gets close to } 5."} /></p>
                </div>
            ),
        },
        {
            id: "q3",
            question: "Evaluate the limit:",
            equation: "\\lim_{x\\to 5} \\frac{x^2-25}{x-5}",
            correctAnswer: "b",
            options: [
                { id: "a", label: <BlockMath math={"5"} /> },
                { id: "b", label: <BlockMath math={"10"} /> }, // Correct
                { id: "c", label: <BlockMath math={"15"} /> },
                { id: "d", label: <BlockMath math={"20"} /> },
            ],
            solution: (
                <div>
                    <p><strong>Step 1: Direct Substitution</strong></p>
                    <p>Plugging in <InlineMath math={"x = 5"} />, we get:</p>
                    <BlockMath math={"\\frac{5^2 - 25}{5 - 5} = \\frac{25 - 25}{0} = \\frac{0}{0}"} />
                    <p>This is an indeterminate form, so we must simplify.</p>
    
                    <p><strong>Step 2: Factorization</strong></p>
                    <BlockMath math={"x^2 - 25 = (x - 5)(x + 5)"} />
                    <p>Rewriting the fraction:</p>
                    <BlockMath math={"\\frac{(x-5)(x+5)}{x-5}"} />
                    <p>Cancel the common factor <InlineMath math={"(x-5)"} />:</p>
                    <BlockMath math={"x + 5"} />
    
                    <p><strong>Step 3: Compute the Limit</strong></p>
                    <p>Now, we substitute <InlineMath math={"x = 5"} />:</p>
                    <BlockMath math={"5 + 5 = 10"} />
                    <p><strong>Final Answer:</strong> <InlineMath math={"10"} /></p>
                </div>
            ),
        },
        {
            id: "q4",
            question: "Find the limit:",
            equation: "\\lim_{u \\to 0} \\frac{5u^2 - 4}{u + 1}",
            correctAnswer: "a",
            options: [
                { id: "a", label: <BlockMath math={"-4"} /> }, // Correct
                { id: "b", label: <BlockMath math={"0"} /> },
                { id: "c", label: <BlockMath math={"4"} /> },
                { id: "d", label: <BlockMath math={"5"} /> },
            ],
            solution: (
                <div>
                    <p><strong>Step 1: Direct Substitution</strong></p>
                    <p>Since the function is continuous, we substitute <InlineMath math={"u = 0"} />:</p>
                    <BlockMath math={"\\frac{5(0)^2 - 4}{0 + 1} = \\frac{-4}{1} = -4"} />
                    <p><strong>Final Answer:</strong> <InlineMath math={"-4"} /></p>
                </div>
            ),
        }
    ];
    const quizzes2 = [
        {
            id: "q3",
            question: "Find the limit as x approaches infinity:",
            equation: "\\lim_{x \\to \\infty} \\frac{4x^5 - 1}{3x^3 + 7}",
            correctAnswer: "c",
            options: [
                { id: "a", label: <BlockMath math={"0"} /> },
                { id: "b", label: <BlockMath math={"4/3"} /> },
                { id: "c", label: <BlockMath math={"\\infty"} /> }, // Correct
                { id: "d", label: <BlockMath math={"1"} /> },
            ],
            solution: (
                <div>
                    <p><strong>Step 1: Identify Highest Power of x</strong></p>
                    <p>The dominant term in the numerator is <InlineMath math={"4x^5"} />, and in the denominator, it's <InlineMath math={"3x^3"} />.</p>

                    <p><strong>Step 2: Divide by Highest Power in the Denominator</strong></p>
                    <BlockMath math={"\\frac{4x^5 - 1}{3x^3 + 7} = \\frac{4x^5}{3x^3} - \\frac{1}{3x^3} + \\frac{7}{3x^3}"} />
                    <p>For large values of <InlineMath math={"x"} />, the fractions <InlineMath math={"\\frac{1}{3x^3}"} /> and <InlineMath math={"\\frac{7}{3x^3}"} /> approach <InlineMath math={"0"} />.</p>

                    <p><strong>Step 3: Compute the Limit</strong></p>
                    <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^2}{3} = \\infty"} />
                    <p><strong>Final Answer:</strong> <InlineMath math={"\\infty"} /></p>
                </div>
            ),
        }
    ];

    const quizzes3 = [
        {
            id: "q4",
            question: "Evaluate the one-sided limit:",
            equation: "\\lim_{x \\to 4^+} \\frac{3}{x - 4}",
            correctAnswer: "c",
            options: [
                { id: "a", label: <BlockMath math={"0"} /> },
                { id: "b", label: <BlockMath math={"-\\infty"} /> },
                { id: "c", label: <BlockMath math={"+\\infty"} /> }, // Correct
                { id: "d", label: <BlockMath math={"3"} /> },
            ],
            solution: (
                <div>
                    <p><strong>Step 1: Consider Values of x Close to 4 from the Right</strong></p>
                    <p>For <InlineMath math={"x > 4"} />, the denominator <InlineMath math={"(x - 4)"} /> is **small positive**.</p>

                    <p><strong>Step 2: Behavior of the Fraction</strong></p>
                    <p>Since **3 is positive**, the fraction <InlineMath math={"\\frac{3}{x-4}"} /> increases to **+∞** as <InlineMath math={"x \\to 4^+"} />.</p>

                    <p><strong>Final Answer:</strong> <InlineMath math={"+\\infty"} /></p>
                </div>
            ),
        }
    ];


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


    useEffect(() => {
        fetch("/Calculus_latex.txt")
            .then((response) => response.text())
            .then((text) => {
                setLatexContent(parseLatex(text));
            })
            .catch((error) => console.error("Error loading LaTeX:", error));
    }, []);

    const handleSelect = (quizId, optionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionId }));
    };

    const handleSubmit = (quizId, correctAnswer) => {
        setIsCorrect((prev) => ({ ...prev, [quizId]: selectedAnswers[quizId] === correctAnswer }));
    };

    return (
        <div className="lesson-wrapper">
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


            <div className="top-page">
                <div className="button-container">
                    <button className="transparent-button" onClick={() => navigate('/calculus')}>
                        Back to Calculus
                    </button>
                </div>
            </div>

            <div className={`slider ${sliderOpen ? "open" : ""}`}>
                <button className="slider-toggle" onClick={() => setSliderOpen(!sliderOpen)}>
                    {sliderOpen ? "▶ Hide" : "◀ Show"}
                </button>
                <h2>Enter a Function</h2>
                <div className="input-container">
                    <EditableMathField
                        latex={input}
                        onChange={(mathField) => setInput(mathField.latex())}
                        className="math-input"
                    />

                    <h3>Function Parameters</h3>
                    <div className="range-inputs">
                        <label>X Min:</label>
                        <input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />

                        <label>X Max:</label>
                        <input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />

                        <label>Y Min:</label>
                        <input type="number" value={yMin} onChange={(e) => setYMin(e.target.value)} />

                        <label>Y Max:</label>
                        <input type="number" value={yMax} onChange={(e) => setYMax(e.target.value)} />

                        <label>X Step Size:</label>
                        <input type="number" value={xStep} onChange={(e) => setXStep(e.target.value)} />
                    </div>

                    <button
                        onClick={() => submitFunctionLimit(input, xMin, xMax, yMin, yMax, xStep, setLoading, setVideoUrl, videoUrl)}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Generate"}
                    </button>


                    {/*videoUrl ? (
                            <video width="350" height="250" controls autoPlay muted>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p>No visualization yet.</p>
                        )*/}
                    {videoUrl ? (
                        <img src={videoUrl} alt="Limit Visualization" width="350" height="250" />
                    ) : (
                        <p>No visualization yet.</p>
                    )}
                </div>


            </div>

            <div className="latex-container">
                <h1 id="limits-intro">Limit of a Function</h1>
                <p>
                    The idea of a limit is nothing new. Think of the word <strong>"approaching"</strong>,
                    and if you know its meaning, then you already understand what a limit is. The rest of the concept is just
                    assigning fancy notation to this intuitive idea.
                </p>
                <p>
                    The limit of a function is one of the core ideas of calculus. It allows us to determine what a function will
                    eventually evaluate to, even without explicitly calculating its values.
                </p>
                <p>Let’s investigate the behavior of the function:</p>
                <BlockMath math={"f(x) = x^{2} - x + 2"} />
                <p>for values near <InlineMath math={"\ x = 2 \."} /></p>
                <br></br>
                <ToggleMedia imageSrc="/C_Limit_ManimCE_v0.19.0.png" videoSrc="/C_Limit.mp4" />
                <br></br>
                <p>
                    We can see that as <InlineMath math={"x"} /> approaches the value of <InlineMath math={"2"} />,
                    <InlineMath math={"f(x)"} /> approaches the value of <InlineMath math={"4"} />.
                </p>
                <p>
                    Now, you might ask, <strong>Why don't we simply plug in the value and see what it evaluates to? </strong>
                    You would be right to ask this question, but let's continue exploring examples to understand why limits are important.
                </p>
               

                    
                <h2 id="investigating-special-limit">Investigating a Special Limit</h2>
                <p>Consider the following limit:</p>
                <BlockMath math={"\\lim_{x \\to 0} \\frac{\\sin (\\pi/x)}{x}"} />

                <p>Let's examine some values:</p>
                <BlockMath math={"f(1) = \\sin (\\pi) = 0"} />
                <BlockMath math={"f\\left(\\frac{1}{2}\\right) = \\sin 2\\pi = 0"} />
                <BlockMath math={"f\\left(\\frac{1}{3}\\right) = \\sin 3\\pi = 0"} />
                <BlockMath math={"f\\left(\\frac{1}{4}\\right) = \\sin 4\\pi = 0"} />
                <BlockMath math={"f(0.1) = \\sin (10\\pi) = 0"} />
                <BlockMath math={"f(0.01) = \\sin 100\\pi = 0"} />
                <BlockMath math={"f(0.001) = \\sin 1000\\pi = 0"} />
                <BlockMath math={"f(0.0001) = \\sin 10000\\pi = 0"} />

                <p>Based on this, we might be tempted to conclude:</p>
                <BlockMath math={"\\lim_{x \\to 0} \\frac{\\sin \\frac{\\pi}{x}}{x} = 0"} />

                <p>However, this conclusion is incorrect. The function  <InlineMath math={"{\\sin (\\pi/x)}"} /> oscillates indefinitely as  <InlineMath math={"{x}"} /> approaches zero. </p>
                <p>To better understand this behavior, refer to the following graph:</p>
                <br></br>
                <ToggleMedia
                    imageSrc="/C_Limit2_ManimCE_v0.19.0.png"
                    videoSrc="/C_Limit2.mp4"
                />

                <h2 id="formal-definition">Formal Definition of a Limit</h2>
                <br></br>
                <p>Mathematically, a limit is defined as:</p>
                <BlockMath math={"\\lim_{x \\to a} f(x) = L"} />
                <p>
                    This means that for every <InlineMath math={"\\varepsilon > 0"} />, there exists <InlineMath math={"\\delta > 0"} /> such that:
                </p>

                
                <BlockMath math={"0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon"} />

                <QuizComponent quizzes={quizzes1} title="Examples" />
                <h2 id="limits-infinity">Limits at Infinity</h2>

                <p>We say:</p>
                <BlockMath math={"\\lim_{x \\to \\infty} f(x) = L"} />
                <p>if for every <InlineMath math={"\\varepsilon > 0"} />, there exists <InlineMath math={"\\Delta > 0"} /> such that:</p>
                <BlockMath math={"x > \\Delta \\Rightarrow |f(x) - L| < \\varepsilon"} />

                <h2 id="inf-limit-examples">Example at Infinity</h2>
                <p>Compute:</p>
                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^5 - 1}{3x^3 + 7}"} />
                <p>Since both numerator and denominator approach infinity, we divide by the highest power of <InlineMath math={"x"} />:</p>
                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^2 - 1/x^3}{3 + 7/x^3}"} />
                <p>Since <InlineMath math={"4x^2 \\to \\infty"} />, the limit is <InlineMath math={"\\infty"} />.</p>

                <h2 id="one-sided-limits">One-Sided Limits</h2>
                <p>The concept of one-sided limits helps analyze function behavior from either the left or right.</p>
                <BlockMath math={"H(t) = \\begin{cases} 0, & \\text{if } t < 0 \\\\ 1, & \\text{if } t \\geq 0 \\end{cases}"} />

                <ToggleMedia imageSrc="/Sided Limits.png" videoSrc="/Sided_Limits.mp4" />
                
                
                <h2 id="investigating-special-limit-1-over-x">Investigating a Special Limit</h2>
                
                <p>Consider the function:</p>
                <BlockMath math={"f(x) = \\frac{1}{x}"} />
                
                <p>Let’s examine its behavior as <InlineMath math={"x"} /> approaches <InlineMath math={"0"} /> from both sides.</p>

                <p>We evaluate the function at several points:</p>

                <BlockMath math={"f(1) = \\frac{1}{1} = 1"} />
                <BlockMath math={"f(0.5) = \\frac{1}{0.5} = 2"} />
                <BlockMath math={"f(0.1) = \\frac{1}{0.1} = 10"} />
                <BlockMath math={"f(0.01) = \\frac{1}{0.01} = 100"} />
                <BlockMath math={"f(0.001) = \\frac{1}{0.001} = 1000"} />

                <p>As <InlineMath math={"x"} /> gets closer to <InlineMath math={"0"} /> from the <strong>right</strong>, <InlineMath math={"f(x)"} /> increases indefinitely. This suggests:</p>
                <BlockMath math={"\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty"} />

                <p>Now, let’s evaluate the function as <InlineMath math={"x"} /> approaches <InlineMath math={"0"} /> from the <strong>left</strong>:</p>

                <BlockMath math={"f(-1) = \\frac{1}{-1} = -1"} />
                <BlockMath math={"f(-0.5) = \\frac{1}{-0.5} = -2"} />
                <BlockMath math={"f(-0.1) = \\frac{1}{-0.1} = -10"} />
                <BlockMath math={"f(-0.01) = \\frac{1}{-0.01} = -100"} />
                <BlockMath math={"f(-0.001) = \\frac{1}{-0.001} = -1000"} />

                <p>As <InlineMath math={"x"} /> gets closer to <InlineMath math={"0"} /> from the <strong>left</strong>, <InlineMath math={"f(x)"} /> decreases indefinitely. This suggests:</p>
                <BlockMath math={"\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty"} />

                <p>Since the left-hand limit and the right-hand limit are not equal, we conclude that:</p>
                <BlockMath math={"\\lim_{x \\to 0} \\frac{1}{x} \\text{ does not exist}"} />

                <p>To better understand this behavior, refer to the following graph:</p>
                <br></br>

                <ToggleMedia
                    imageSrc="/C_Limit_1_over_x.png"
                    videoSrc="/C_Limit_1_over_x.mp4"
                />

                <h3>Example 2:</h3>
                <p>Find the left- and right-hand limits as <InlineMath math={"x"} /> approaches 1.</p>
                <BlockMath math={"f(x) = \\begin{cases} x + 2, & \\text{if } x < 1 \\\\ 3x - 1, & \\text{if } x \\geq 1 \\end{cases}"} />

                <h3>Solution:</h3>
                <p>For <InlineMath math={"x \\to 1^-"} />:</p>
                <BlockMath math={"\\lim_{x \\to 1^-} f(x) = 1 + 2 = 3"} />
                <p>For <InlineMath math={"x \\to 1^+"} />:</p>
                <BlockMath math={"\\lim_{x \\to 1^+} f(x) = 3(1) - 1 = 2"} />
                <p>Since left-hand limit (3) and right-hand limit (2) differ, the two-sided limit does not exist at <InlineMath math={"x = 1"} />.</p>

                <button onClick={() => setShowMore(!showMore)} className="toggle-button">
                    {showMore ? "Show Less" : "Show More"}
                </button>

               
            </div>

        </div>
    );
}
