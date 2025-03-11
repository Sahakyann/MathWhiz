import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/visualCalculators.css";

addStyles();

export default function VisualCalculators() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("integral");
    const [input, setInput] = useState("-x^2+1");
    const [xMin, setXMin] = useState("-2");
    const [xMax, setXMax] = useState("2");
    const [yMin, setYMin] = useState("-2");
    const [yMax, setYMax] = useState("2");
    const [xStep, setXStep] = useState("1");
    const [yStep, setYStep] = useState("1");
    const [dx, setDX] = useState("0.05");
    const [igFrom, setIgFrom] = useState("-1");
    const [igTo, setIgTo] = useState("1");
    const [derivFrom, setDerivFrom] = useState("-1");
    const [derivTo, setDerivTo] = useState("1");

    const [matrixA, setMatrixA] = useState("1.5");
    const [matrixB, setMatrixB] = useState("0.5");
    const [matrixC, setMatrixC] = useState("-0.5");
    const [matrixD, setMatrixD] = useState("1");

    const [vectorX, setVectorX] = useState("2");
    const [vectorY, setVectorY] = useState("3");

    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const [vectors, setVectors] = useState([[2, 3]]);

    const handleSubmit = () => {
        if (selectedType === "limit") {
            submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl);
        } else if (selectedType === "integral") {
            submitFunctionIntegral(input, xMin, xMax, yMin, yMax, xStep, yStep, dx, igFrom, igTo, setLoading, setVideoUrl, videoUrl);
        } else if (selectedType === "derivative") {
            submitFunctionDerivative(input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo, setLoading, setVideoUrl, videoUrl);
        } else if (selectedType === "linear-transformation") {
            submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors,setLoading,setVideoUrl,videoUrl)
        }
    };

    const addVector = () => {
        setVectors([...vectors, [0, 0]]); // Add a new vector [0,0] by default
    };

    const removeVector = (index) => {
        setVectors(vectors.filter((_, i) => i !== index));
    };

    const updateVector = (index, axis, value) => {
        const updatedVectors = [...vectors];
        updatedVectors[index][axis] = parseFloat(value) || 0;
        setVectors(updatedVectors);
    };

    return (
        <div className="visualization-container">
            <div className="sidebar-visualizer">
                <h3>Select Visualization</h3>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="integral">Integral Visualization</option>
                    <option value="limit">Limit Visualization</option>
                    <option value="derivative">Derivative Visualization</option>
                    <option value="linear-transformation">Linear Transformation</option>
                </select>

                {selectedType !== "linear-transformation" && selectedType !== "integral" && (
                    <>
                        <h2>Enter a Function</h2>
                        <div className="input-container">
                            <EditableMathField
                                latex={input}
                                onChange={(mathField) => setInput(mathField.latex())}
                                className="math-input"
                            />
                        </div>
                    </>
                )}
                {selectedType == "integral" && (
                    <>
                        <div className="integral-function-container">
                            <div className="integral-group">
                                <input type="number" value={igTo} onChange={(e) => setIgTo(e.target.value)} className="integral-upper" />
                                <img src="/integral_symbol_transparent.png" alt="Integral Symbol" className="integral-symbol" />
                                <input type="number" value={igFrom} onChange={(e) => setIgFrom(e.target.value)} className="integral-lower" />
                            </div>
                            <div className="function-input">
                                <EditableMathField
                                    latex={input}
                                    onChange={(mathField) => setInput(mathField.latex())}
                                    className="math-input"
                                />
                            </div>
                        </div>
                    </>
                )}
                <div className="input-container">

                    <h3>Function Parameters</h3>
                    <div className="range-inputs">
                        {selectedType !== "linear-transformation" && (
                            <>
                                <label>X Axis From:</label>
                                <input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />

                                <label>X Axis To:</label>
                                <input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />

                                <label>Y Axis From:</label>
                                <input type="number" value={yMin} onChange={(e) => setYMin(e.target.value)} />

                                <label>Y Axis To:</label>
                                <input type="number" value={yMax} onChange={(e) => setYMax(e.target.value)} />
                            </>
                        )}

                        {selectedType === "integral" && (
                            <>
                                <label>X Step Size:</label>
                                <input type="number" value={xStep} onChange={(e) => setXStep(e.target.value)} />

                                <label>Y Step Size:</label>
                                <input type="number" value={yStep} onChange={(e) => setYStep(e.target.value)} />

                                <label>Integral dx:</label>
                                <input type="number" value={dx} onChange={(e) => setDX(e.target.value)} />




                            </>
                        )}
                        {selectedType === "derivative" && (
                            <>
                                <label>X Step Size:</label>
                                <input type="number" value={xStep} onChange={(e) => setXStep(e.target.value)} />

                                <label>Y Step Size:</label>
                                <input type="number" value={yStep} onChange={(e) => setYStep(e.target.value)} />

                                <label>Derivative From:</label>
                                <input type="number" value={derivFrom} onChange={(e) => setDerivFrom(e.target.value)} />

                                <label>Derivative To:</label>
                                <input type="number" value={derivTo} onChange={(e) => setDerivTo(e.target.value)} />
                            </>
                        )}
                        {selectedType === "linear-transformation" && (
                            <>
                                <h3>Transformation Matrix</h3>
                                <div className="matrix-container">
                                    <div>
                                        <input type="number" value={matrixA} onChange={(e) => setMatrixA(e.target.value)} />
                                        <input type="number" value={matrixB} onChange={(e) => setMatrixB(e.target.value)} />
                                    </div>
                                    <div>
                                        <input type="number" value={matrixC} onChange={(e) => setMatrixC(e.target.value)} />
                                        <input type="number" value={matrixD} onChange={(e) => setMatrixD(e.target.value)} />
                                    </div>
                                </div>
                                <h3>Sample Vectors</h3>
                                <button onClick={addVector}>+ Add Vector</button>
                                {vectors.map((vector, index) => (
                                    <div key={index} className="vector-input">
                                        <label>X:</label>
                                        <input
                                            type="number"
                                            value={vector[0]}
                                            onChange={(e) => updateVector(index, 0, e.target.value)}
                                        />
                                        <label>Y:</label>
                                        <input
                                            type="number"
                                            value={vector[1]}
                                            onChange={(e) => updateVector(index, 1, e.target.value)}
                                        />
                                        {vectors.length > 1 && (
                                            <button onClick={() => removeVector(index)}>-</button>
                                        )}
                                    </div>
                                ))}

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

export async function submitFunctionDerivative(input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-derivative",
            { input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-limit",
            { function: input, xMin, xMax, yMin, yMax },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionIntegral(latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-integral",
            { latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-linear-transformation",
            {
                matrix: [
                    [parseFloat(matrixA), parseFloat(matrixB)],
                    [parseFloat(matrixC), parseFloat(matrixD)]
                ],
                vectors: vectors
            },
            { responseType: "blob" }
        );
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

