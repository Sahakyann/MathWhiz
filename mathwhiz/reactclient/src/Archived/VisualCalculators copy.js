import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/visualCalculators.css"
import API_BASE_URL from './constants';

addStyles();

export default function VisualCalculators() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("integral");
    const [input, setInput] = useState("");
    const [xMin, setXMin] = useState("-10");
    const [xMax, setXMax] = useState("10");
    const [yMin, setYMin] = useState("-10");
    const [yMax, setYMax] = useState("10");
    const [xStep, setXStep] = useState("0.1");
    const [yStep, setYStep] = useState("0.1");
    const [dx, setDX] = useState("0.1");
    const [igFrom, setIgFrom] = useState("-5");
    const [igTo, setIgTo] = useState("5");
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const handleSubmit = () => {
        if (selectedType === "limit") {
            submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl);
        } else {
            submitFunctionIntegral(input, xMin, xMax, yMin, yMax, xStep, yStep, dx, igFrom, igTo, setLoading, setVideoUrl, videoUrl);
        }
    };

    return (
        <div className="visualization-container">
        <div className="sidebar-visualizer">
            <h3>Select Visualization</h3>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="integral">Integral Visualization</option>
                <option value="limit">Limit Visualization</option>
            </select>

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

                    {selectedType === "integral" && (
                        <>
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
                        </>
                    )}
                </div>

                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Processing..." : "Generate"}
                </button>
            </div>
        </div>

        <div className="visualizer">
            {videoUrl ? (
                <video width="100%" height="100%" controls autoPlay muted>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p className="placeholder-text">No visualization yet.</p>
            )}
        </div>
    </div>
    );
}

export async function submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            `${API_BASE_URL}/api/get-function-limit`,
            { function: input, xMin, xMax, yMin, yMax },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 0);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionIntegral(latex_function, xMin, xMax, yMin, yMax, xStep,yStep,integral_dx,integral_from,integral_to, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            `${API_BASE_URL}/api/get-function-integral`,
            { latex_function, xMin, xMax, yMin, yMax, xStep,yStep,integral_dx,integral_from,integral_to},
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 0);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}


