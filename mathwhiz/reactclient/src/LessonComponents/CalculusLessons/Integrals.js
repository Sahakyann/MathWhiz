import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import axios from "axios";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { submitFunctionIntegral } from "../../VisualCalculators";

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

export default function Integrals() {
    const [input, setInput] = useState("f(x)=-x^2+1");
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [latexContent, setLatexContent] = useState("");

    const [xMin, setXMin] = useState("-3");
    const [xMax, setXMax] = useState("3");
    const [yMin, setYMin] = useState("-3");
    const [yMax, setYMax] = useState("3");
    const [xStep, setXStep] = useState("1");
    const [yStep, setYStep] = useState("1");
    const [dx, setDX] = useState("0.05");
    const [igFrom, setIgFrom] = useState("-1");
    const [igTo, setIgTo] = useState("1");  

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
        fetch("/Calculus_latex.txt")
            .then((response) => response.text())
            .then((text) => {
                let cleanedLatex = text
                    .replace(/\\documentclass{.*?}|\\usepackage{.*?}|\\begin{document}|\\end{document}|\\maketitle/gs, "")
                    .replace(/\\(centering|label|begin{flushleft}|end{flushleft}|raggedright)/g, "")
                    .trim();

                cleanedLatex = cleanedLatex.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
                cleanedLatex = cleanedLatex.replace(/\\\(/g, "$").replace(/\\\)/g, "$");
                cleanedLatex = cleanedLatex.replace(/\\section\*{(.*?)}/g, "## $1");
                cleanedLatex = cleanedLatex.replace(/\\begin{align\*}/g, "$$").replace(/\\end{align\*}/g, "$$");
                cleanedLatex = cleanedLatex.replace(/\\textbf{(.*?)}/g, "**$1**");
                cleanedLatex = cleanedLatex.replace(/\\includegraphics{(.*?),(.*?)}/g, "!TOGGLE[../$1|../$2]");

                setLatexContent(cleanedLatex);
            })
            .catch((error) => console.error("Error loading LaTeX:", error));
    }, []);

    return (
        <div className="limits-wrapper">
           <nav className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
                <h3>Integrals</h3>
                <ul>
                    <li>
                        <a href="">Integrals Introduction</a>
                        <ul>
                            <li><a href="">Introduction</a></li>
                            <li><a href="#examples">Examples</a></li>
                            <li><a href="#formal-definition-of-a-limit">Definition</a></li>
                        </ul>
                    </li>
                </ul>
               
            </nav>

        
            <div className="limits-content">

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
                            <label>X Axis From:</label>
                            <input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />

                            <label>X Axis To:</label>
                            <input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />

                            <label>Y Axis From:</label>
                            <input type="number" value={yMin} onChange={(e) => setYMin(e.target.value)} />

                            <label>Y Axis To:</label>
                            <input type="number" value={yMax} onChange={(e) => setYMax(e.target.value)} />

                            <label>X Step Size:</label>
                            <input type="number" value={xStep} onChange={(e) => setXStep(e.target.value)} />

                            <label>Y Step Size:</label>
                            <input type="number" value={yStep} onChange={(e) => setYStep(e.target.value)} />

                            <label>Integral dx</label>
                            <input type="number" value={dx} onChange={(e) => setDX(e.target.value)} />

                            <label>Integral From</label>
                            <input type="number" value={igFrom} onChange={(e) => setIgFrom(e.target.value)} />

                            <label>Integral To</label>
                            <input type="number" value={igTo} onChange={(e) => setIgTo(e.target.value)} />
                        </div>

                        <button
                            onClick={() => submitFunctionIntegral(input, xMin, xMax, yMin, yMax, xStep,yStep,dx,igFrom,igTo, setLoading, setVideoUrl, videoUrl)}
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
                        
                    </div>


                </div>

                <div className="limits-content">
                    <section id="latex-content" className="latex-container">
                        {latexContent.split("\n").map((line, index) => {
                            line = line.trim();
                            if (!line) return null;

                            if (line.startsWith("## ")) {
                                return <h2 key={index} id={line.replace("## ", "").toLowerCase().replace(/ /g, "-")}>{line.replace("## ", "").trim()}</h2>;
                            }

                            if (line.startsWith("$$")) {
                                return (
                                    <div key={index} className="latex-block">
                                        <BlockMath math={line.replace(/\$\$/g, "").trim()} />
                                    </div>
                                );
                            }

                            if (/\$.*?\$/.test(line)) {
                                const parts = line.split(/(\$.*?\$)/g);
                                return (
                                    <p key={index} className="latex-inline">
                                        {parts.map((part, i) =>
                                            part.startsWith("$") ? (
                                                <InlineMath key={i} math={part.replace(/\$/g, "").trim()} />
                                            ) : (
                                                part
                                            )
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