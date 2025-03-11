import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import axios from "axios";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { submitFunctionLimit } from "./VisualCalculators";
import { parseLatex } from "./LatexParsing/latexParser";
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
        fetch("/Squeezing_latex.txt")
            .then((response) => response.text())
            .then((text) => {
                setLatexContent(parseLatex(text));
            })
            .catch((error) => console.error("Error loading LaTeX:", error));
    }, []);

    return (
        <div className="limits-wrapper">
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


            <div className="limits-content">
                <div className="button-container">
                    <button className="transparent-button" onClick={() => navigate('/calculus')}>
                        Back to Calculus
                    </button>
                </div>
                <div className={`slider ${sliderOpen ? "open" : ""}`}>
                    <button className="slider-toggle" onClick={() => setSliderOpen(!sliderOpen)}>
                        {sliderOpen ? "▶ Hide" : "◀ Show"}
                    </button>
                    
                    {/*<h2>Enter a Function</h2>
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
                        )}
                        {videoUrl ? (
                            <img src={videoUrl} alt="Limit Visualization" width="350" height="250" />
                        ) : (
                            <p>No visualization yet.</p>
                        )}
                    </div>*/}


                </div>

                <div className="limits-content">
                    <section id="latex-content" className="latex-container">
                        {latexContent.split("\n").map((line, index) => {
                            line = line.trim();
                            if (!line) return null;

                            if (line.startsWith("## ")) {
                                const match = line.match(/## (.*?) \[#(.*?)\]/);
                                if (match) {
                                    return <h2 key={index} id={match[2]}>{match[1]}</h2>;
                                }
                            }

                            if (line.startsWith("$$")) {
                                return <div key={index} className="latex-block"><BlockMath math={line.replace(/\$\$/g, "").trim()} /></div>;
                            }

                            if (/\$.*?\$/.test(line)) {
                                const parts = line.split(/(\$.*?\$)/g);
                                return (
                                    <p key={index} className="latex-inline">
                                        {parts.map((part, i) =>
                                            part.startsWith("$") ? <InlineMath key={i} math={part.replace(/\$/g, "").trim()} /> : part
                                        )}
                                    </p>
                                );
                            }

                            if (line.startsWith("**")) {
                                return <p key={index} style={{ fontWeight: "bold" }}>{line.replace(/\*\*/g, "").trim()}</p>;
                            }

                            if (line.startsWith("!TOGGLE[")) {
                                const match = line.match(/!TOGGLE\[(.*?)\|(.*?)\]/);
                                if (match) {
                                    return <ToggleMedia key={index} imageSrc={match[1]} videoSrc={match[2]} />;
                                }
                            }

                            return <p key={index} className="latex-text">{line}</p>;
                        })}
                    </section>
                </div>
            </div>
        </div>
    );
}
