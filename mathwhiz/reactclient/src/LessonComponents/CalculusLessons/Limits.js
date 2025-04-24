import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import axios from "axios";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { submitFunctionLimit } from "../../VisualCalculators";
import ToggleMedia from "../ToggleMedia";
import { parseLatex } from "../../Archived/LatexParsing/latexParser";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import '../../Styles-CSS/lessons.css';
import QuizComponent from "../QuizComponent";
addStyles();


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

    const [epsilon, setEpsilon] = useState(0.5);
    const [delta, setDelta] = useState(null);

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
            question: "Understanding Limit Behavior: what does this mean?",
            equation: "\\lim_{x \\to 2} f(x) = 5",
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
                            <li><a href="#introduction">Introduction</a></li>
                            <li><a href="#formal-definition-of-a-limit">Formal Definition</a></li>
                            <li><a href="#limit-examples">Examples</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#limits-at-infinity">Limits at Infinity</a>
                        <ul>
                            <li><a href="#formal-definition-of-an-inf-limit">Formal Definition</a></li>
                            <li><a href="#inf-limit-examples">Examples</a></li>
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

            {/*<div className={`slider ${sliderOpen ? "open" : ""}`}>
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


                    {videoUrl ? (
                            <video width="350" height="250" controls autoPlay muted>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p>No visualization yet.</p>
                        )}
                    {videoUrl ? (
                        <img src={videoUrl} alt="Limit Visualization" width="350" height="250" />
                    ) : (
                        <p>No visualization yet.</p>
                    )}
                </div>


            </div>*/}

            <div className="latex-container">

                <img
                    src={"/LimitThumbnail_ManimCE_v0.19.0.png"}
                    alt="Media Toggle"
                    style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                    id="introduction"
                />
                <p>
                    Imagine you're walking toward a cliff. As you get closer, you might slow down, measuring your steps more carefully.
                    Even if you never step off the edge, your behavior as you approach it tells an important story.
                    In mathematics, we capture this idea through <strong>limits</strong> — a tool for describing how things behave near a point, even if they never actually reach it.
                </p>
                <br></br>
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
                <p>
                    Let's visualize what's happening! Graphing the function can give us a clearer intuition
                    about how the values of <InlineMath math={"f(x)"} /> behave as we approach <InlineMath math={"x = 2"} />.
                </p>
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
                <p>
                    But not every limit behaves nicely. Some functions are wild and unpredictable as we get close to a point.
                    Let's take a look at an example that challenges our expectations.
                </p>
                <br></br>
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
                <p>
                    Although our calculated points suggested the limit might be 0, the wild oscillations of the sine function become more intense as x gets closer to zero.
                    It's a reminder that behavior at a few sample points doesn't always tell the full story — we must carefully examine how a function acts across all nearby values.
                </p>
                <h2 id="formal-definition-of-a-limit">Formal Definition of a Limit</h2>
                <p>
                    Until now, we've talked about limits using intuition: how a function behaves as we get closer and closer to a point.
                    But if we want to be absolutely precise — and mathematics demands precision — we need something more rigorous.
                </p>

                <p>
                    Imagine you have a friend who's a bit skeptical. They don't just want to hear, "trust me, it gets close to L."
                    They want guarantees. They want you to tell them, "No matter how small of a target you give me around L,
                    I can find a tight enough window around a so that the function stays inside your target."
                </p>
                <br></br>
                <p>
                    In other words, the definition of a limit is a kind of <strong>challenge-response game</strong>:
                </p>

                <ul>
                    <li><strong>Challenge:</strong> Your friend picks a tiny number <InlineMath math={"\\varepsilon"} /> ("epsilon") — the maximum distance they're willing to tolerate between <InlineMath math={"f(x)"} /> and <InlineMath math={"L"} />.</li>
                    <li><strong>Response:</strong> You must find a corresponding tiny number <InlineMath math={"\\delta"} /> ("delta") — a distance around <InlineMath math={"a"} /> — so that whenever <InlineMath math={"x"} /> is within <InlineMath math={"\\delta"} /> of <InlineMath math={"a"} /> (but not exactly at <InlineMath math={"a"} />),
                        <InlineMath math={"f(x)"} /> stays within <InlineMath math={"\\varepsilon"} /> of <InlineMath math={"L"} />.</li>
                </ul>
                <p>
                    If you can always win this game, no matter how small your friend's <InlineMath math={"\\varepsilon"} /> is,
                    then the limit exists and equals <InlineMath math={"L"} />.
                </p>

                <p>And that, formally, is what we mean when we write:</p>

                <BlockMath math={"\\lim_{x \\to a} f(x) = L"} />

                <p>
                    Mathematically, the precise definition reads:
                </p>

                <BlockMath math={"\\text{For every } \\varepsilon > 0, \\text{ there exists a } \\delta > 0 \\text{ such that whenever } 0 < |x - a| < \\delta,\\\\ \\text{ it follows that } |f(x) - L| < \\varepsilon."} />



                <BlockMath math={"0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon"} />

                <div className="game-container" style={{ marginTop: '50px', textAlign: 'center' }}>
                    <h3>Epsilon-Delta: <InlineMath math={"f(x) = 2x"} /></h3>

                    <p>
                        Let's try to prove that <BlockMath math={"\\lim_{x \\to 3} 2x = 6"} />
                        <br />
                        You pick how close you want <InlineMath math={"f(x)"} /> to be to 6 (your <InlineMath math={"\\varepsilon"} />),
                        and we'll figure out how close <InlineMath math={"x"} /> must be to 3 (the <InlineMath math={"\\delta"} />)!
                    </p>

                    <div style={{ margin: '20px 0' }}>
                        <label style={{ marginRight: '10px' }}>
                            Choose your <InlineMath math={"\\varepsilon"} />:
                        </label>
                        <select
                            onChange={(e) => {
                                const selectedEpsilon = parseFloat(e.target.value);
                                setEpsilon(selectedEpsilon);
                                setDelta(selectedEpsilon / 2);
                            }}
                            value={epsilon}
                            style={{ padding: '5px 10px', fontSize: '16px' }}
                        >
                            <option value="0.5">0.5</option>
                            <option value="0.1">0.1</option>
                            <option value="0.01">0.01</option>
                            <option value="0.001">0.001</option>
                        </select>
                    </div>

                    {delta !== null && (
                        <div style={{ marginTop: '20px' }}>
                            <p>
                                For your chosen <InlineMath math={`\\varepsilon = ${epsilon}`} />,
                                we can safely pick <InlineMath math={`\\delta = ${delta}`} />.
                            </p>
                            <p>
                                That is, if <InlineMath math={`0 < |x - 3| < ${delta}`} />,
                                then <InlineMath math={`|2x - 6| < ${epsilon}`} />.
                            </p>
                        </div>
                    )}
                </div>
                <br></br>
                <p>
                    See the animation of the mini-game for more clarity:
                </p>
                <br></br>
                <ToggleMedia imageSrc="/EpsilonDeltaShrinking_ManimCE_v0.19.0.png" videoSrc="/EpsilonDeltaShrinking.mp4" />
                <div id="limit-examples"></div>
                <QuizComponent quizzes={quizzes1} title="Examples" />
                <p>
                    So far, we've focused on what happens as x approaches a finite value.
                    But what about when x becomes larger and larger without bound?
                    Limits can help us understand behavior at infinity too.
                </p>
                <h2 id="limits-at-infinity">Limits at Infinity</h2>

                <p>
                    Up until now, we've been thinking about what happens when <InlineMath math={"x"} /> approaches a specific number.
                    But what if <InlineMath math={"x"} /> doesn't stop — what if it keeps growing forever?
                </p>

                <p>
                    Imagine launching a spaceship straight up from Earth. As it flies higher and higher, we might ask:
                    <em>What happens to its velocity? Does it level off? Keep increasing? Oscillate? </em>
                    In mathematics, asking what happens to a function as <InlineMath math={"x"} /> grows without bound
                    is captured by the idea of a <strong>limit at infinity</strong>.
                </p>

                <br></br>

                <p>
                    We write:
                </p>

                <BlockMath math={"\\lim_{x \\to \\infty} f(x) = L"} />

                <p id="formal-definition-of-an-inf-limit">
                    This means that as <InlineMath math={"x"} /> becomes larger and larger,
                    the function <InlineMath math={"f(x)"} /> gets closer and closer to some number <InlineMath math={"L"} />.
                </p>

                <p>
                    Formally, just like before with regular limits, we use an epsilon-based definition:
                </p>

                <BlockMath math={"\\text{For every } \\varepsilon > 0, \\text{ there exists a } \\Delta > 0 \\text{ such that whenever } \\\\x > \\Delta, \\text{ it follows that } |f(x) - L| < \\varepsilon."} />

                <br></br>

                <p><strong>Three possibilities when considering limits at infinity:</strong></p>

                <ul>
                    <li><strong>1. Approaching a finite number:</strong> Like a spaceship reaching cruising speed, <InlineMath math={"f(x)"} /> settles toward a single value <InlineMath math={"L"} />.</li>
                    <li><strong>2. Growing without bound:</strong> <InlineMath math={"f(x) \\to \\infty"} /> — it just keeps getting bigger and bigger!</li>
                    <li><strong>3. Oscillating wildly:</strong> No limit exists — the function keeps swinging back and forth even as <InlineMath math={"x"} /> grows large.</li>
                </ul>

                <br></br>

                <ToggleMedia imageSrc="/LimitAtInfinity_ManimCE_v0.19.0.png" videoSrc="/LimitAtInfinity.mp4" />

                <p>
                    What would happen to the limit of <InlineMath math={"f(x) = \\frac{5x^2 + 1}{2x^2 + 3}"} /> as <InlineMath math={"x \\to \\infty"} />?
                </p>

                <ul>
                    <li>Will it approach a finite number?</li>
                    <li>Will it grow without bound?</li>
                    <li>Or will it oscillate wildly?</li>
                </ul>

                <p><em>Think about it! We'll tackle more examples next.</em></p>
                <h2 id="inf-limit-examples">Example: Approaching Infinity</h2>

                <p>
                    Let's compute an example:
                </p>

                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^5 - 1}{3x^3 + 7}"} />

                <p><strong>Step 1:</strong> Find the dominant terms — the highest powers of <InlineMath math={"x"} /> matter most as <InlineMath math={"x \\to \\infty"} />.</p>
                <p>In the numerator, that's <InlineMath math={"4x^5"} />. In the denominator, that's <InlineMath math={"3x^3"} />.</p>

                <p><strong>Step 2:</strong> Divide everything by the highest power in the denominator:</p>

                <BlockMath math={"\\frac{4x^5 - 1}{3x^3 + 7} = \\frac{4x^2 - 1/x^3}{3 + 7/x^3}"} />

                <p><strong>Step 3:</strong> Simplify — as <InlineMath math={"x"} /> becomes very large, tiny terms like <InlineMath math={"1/x^3"} /> and <InlineMath math={"7/x^3"} /> become negligible.</p>

                <p>Thus:</p>

                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^2}{3} = \\infty"} />

                <p>
                    The function grows larger and larger without bound. We say the limit is <InlineMath math={"\\infty"} />.
                </p>


                <h2 id="inf-limit-examples">Another Example at Infinity</h2>
                <p>Compute:</p>
                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^5 - 1}{3x^3 + 7}"} />
                <p>Since both numerator and denominator approach infinity, we divide by the highest power of <InlineMath math={"x"} />:</p>
                <BlockMath math={"\\lim_{x \\to \\infty} \\frac{4x^2 - 1/x^3}{3 + 7/x^3}"} />
                <p>Since <InlineMath math={"4x^2 \\to \\infty"} />, the limit is <InlineMath math={"\\infty"} />.</p>
                <p>
                    Sometimes, it matters whether we approach a point from the left or the right.
                    Imagine merging onto a highway: traffic behavior from one side might be very different than from the other.
                    In mathematics, one-sided limits help us capture this nuanced behavior.
                </p>
                <QuizComponent quizzes={quizzes2} title="Limits at Infinity Quiz" />
                <h2 id="one-sided-limits">One-Sided Limits</h2>

                <p>
                    So far, when we talked about limits, we assumed that we were approaching a point from both sides — left and right — at the same time.
                    But what if you only care about what happens as you approach from one specific direction?
                </p>

                <p>
                    Imagine you're walking toward a cliff again, but this time, there's a wall blocking the left side.
                    You can only approach the edge from the right side.
                    How you experience the edge will depend on the path you're allowed to take.
                </p>

                <p>
                    In mathematics, we capture this idea using <strong>one-sided limits</strong>.
                    There are two types:
                </p>

                <ul>
                    <li><strong>Left-Hand Limit:</strong> approaching from values smaller than the point (from the left side), denoted <BlockMath math={"\\lim_{x \\to a^-} f(x)"} /></li>
                    <li><strong>Right-Hand Limit:</strong> approaching from values greater than the point (from the right side), denoted <BlockMath math={"\\lim_{x \\to a^+} f(x)"} /></li>
                </ul>

                <p>
                    A full (two-sided) limit at a point exists if — and only if — the left-hand and right-hand limits both exist and are equal.
                </p>

                <p>
                    To see this in action, consider the following simple function:
                </p>

                <BlockMath math={"H(t) = \\begin{cases} 0, & \\text{if } t < 0 \\\\ 1, & \\text{if } t \\geq 0 \\end{cases}"} />

                <p>
                    This function jumps from 0 to 1 exactly at <InlineMath math={"t = 0"} />.
                    If you approach 0 from the left (values less than 0), you experience height 0.
                    If you approach from the right (values greater than 0), you experience height 1.
                </p>
                <ToggleMedia imageSrc="/OneSidedLimitJump_ManimCE_v0.19.0.png" videoSrc="/OneSidedLimitJump.mp4" />

                <p>
                    Since the left-hand limit and the right-hand limit are different, the overall two-sided limit <strong>does not exist</strong> at <InlineMath math={"t = 0"} />.
                </p>

                <h2 id="one-sided-limit-examples">Investigating a Special Limit</h2>

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
                <ToggleMedia imageSrc="/OneOverXBehavior_ManimCE_v0.19.0.png" videoSrc="/OneOverXBehavior.mp4" />
                <p>
                    Since the behavior from the left and right are so dramatically different, the regular <BlockMath math={"\\lim_{x \\to 0} \\frac{1}{x}"} /> two-sided limit at 0 does not exist.
                </p>
                <br></br>
                <br></br>
                <h3>Another Example: Piecewise Function</h3>

                <p>
                    Let's check a case that's less dramatic but still interesting.
                </p>

                <p>Consider:</p>

                <BlockMath math={"f(x) = \\begin{cases} x + 2, & \\text{if } x < 1 \\\\ 3x - 1, & \\text{if } x \\geq 1 \\end{cases}"} />

                <p>
                    What's happening as we approach <InlineMath math={"x = 1"} />?
                </p>

                <ul>
                    <li>From the left (<InlineMath math={"x \\to 1^-"} />), we use <InlineMath math={"x+2"} />. Substituting gives <InlineMath math={"1+2=3"} />.</li>
                    <li>From the right (<InlineMath math={"x \\to 1^+"} />), we use <InlineMath math={"3x-1"} />. Substituting gives <InlineMath math={"3(1)-1=2"} />.</li>
                </ul>

                <p>
                    The two sides approach different values (3 vs 2). Therefore:
                </p>

                <BlockMath math={"\\lim_{x \\to 1} f(x) \\text{ does not exist}"} />
                <div id="one-sided-limit-quiz"></div>
                <QuizComponent quizzes={quizzes3} title="One-Sided Limits Quiz" />

            </div>

        </div>
    );
}
