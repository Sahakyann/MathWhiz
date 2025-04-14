import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/visualCalculators.css";
import { useParams } from "react-router-dom";
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
    const [integral_dx, setDX] = useState("0.05");
    const [igFrom, setIgFrom] = useState("-1");
    const [igTo, setIgTo] = useState("1");
    const [derivFrom, setDerivFrom] = useState("-1");
    const [derivTo, setDerivTo] = useState("1");

    const [matrixA, setMatrixA] = useState("0");
    const [matrixB, setMatrixB] = useState("-1");
    const [matrixC, setMatrixC] = useState("-1");
    const [matrixD, setMatrixD] = useState("0");


    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const [expansionPoint, setExpansionPoint] = useState("0");
    const [degree, setDegree] = useState("5");

    const { userId } = useParams();

    const [initialGuess, setInitialGuess] = useState("1.5");
    const [maxIterations, setMaxIterations] = useState("6");

    const [showVideo, setShowVideo] = useState(true);
    const [showExplanation, setShowExplanation] = useState(false);

    const [vectors, setVectors] = useState([[2, 3]]);

    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [customFileName, setCustomFileName] = useState("");

    const handleSubmit = () => {
        if (selectedType === "limit") {
            submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl);
        } else if (selectedType === "integral") {
            submitFunctionIntegral(input, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, igFrom, igTo, setLoading, setVideoUrl, videoUrl, userId);
        } else if (selectedType === "derivative") {
            submitFunctionDerivative(input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo, setLoading, setVideoUrl, videoUrl, userId);
        } else if (selectedType === "linear-transformation") {
            submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId)
        } else if (selectedType === "eigenvector-visualizer") {
            submitEigenvalueVisualizer(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId);
        } else if (selectedType === "taylor-series") {
            submitFunctionTaylorSeries(input, expansionPoint, degree, xMin, xMax, setLoading, setVideoUrl, videoUrl, userId);
        } else if (selectedType === "newtons-method") {
            submitFunctionNewtonsMethod(input, initialGuess, xMin, xMax, maxIterations, setLoading, setVideoUrl, videoUrl, userId);

        }
    };

    //console.log(`User Id Received ${userId}`);

    const downloadVideo = () => {
        if (!videoUrl) {
            alert("No video available to download.");
            return;
        }

        const link = document.createElement("a");
        link.href = videoUrl;

        const fileName = `${selectedType.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())} Visualization.mp4`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (

        <div className="visualization-container">
            <div className="visualization-controls">
                <button
                    className={showVideo ? "active" : ""}
                    onClick={() => { setShowVideo(true); setShowExplanation(false); }}
                >
                    Show Video
                </button>
                <button
                    className={showExplanation ? "active" : ""}
                    onClick={() => { setShowVideo(false); setShowExplanation(true); }}
                >
                    Show Explanation
                </button>
                <button
                    onClick={() => setShowNamePrompt(true)}
                    disabled={!videoUrl || !showVideo}
                >
                    Save to Profile
                </button>
                <button
                    onClick={downloadVideo}
                    disabled={!videoUrl || !showVideo}
                >
                    Download
                </button>
            </div>
            <div className="sidebar-visualizer">
                <VisualizationSelector selectedType={selectedType} setSelectedType={setSelectedType} />

                {selectedType === "integral" && (
                    <IntegralInput
                        input={input} setInput={setInput}
                        igFrom={igFrom} setIgFrom={setIgFrom}
                        igTo={igTo} setIgTo={setIgTo}
                        xStep={xStep} setXStep={setXStep}
                        yStep={yStep} setYStep={setYStep}
                        integral_dx={integral_dx} setDX={setDX}
                        xMin={xMin} setXMin={setXMin}
                        xMax={xMax} setXMax={setXMax}
                        yMin={yMin} setYMin={setYMin}
                        yMax={yMax} setYMax={setYMax}
                    />
                )}

                {selectedType === "derivative" && (
                    <DerivativeInput
                        input={input} setInput={setInput}
                        derivFrom={derivFrom} setDerivFrom={setDerivFrom}
                        derivTo={derivTo} setDerivTo={setDerivTo}
                    />
                )}

                {(selectedType === "linear-transformation" || selectedType === "eigenvector-visualizer") && (
                    <LinearTransformationInput
                        matrixA={matrixA} setMatrixA={setMatrixA}
                        matrixB={matrixB} setMatrixB={setMatrixB}
                        matrixC={matrixC} setMatrixC={setMatrixC}
                        matrixD={matrixD} setMatrixD={setMatrixD}
                        vectors={vectors} setVectors={setVectors}
                    />
                )}

                {selectedType === "taylor-series" && (
                    <TaylorSeriesInput
                        input={input} setInput={setInput}
                        expansionPoint={expansionPoint} setExpansionPoint={setExpansionPoint}
                        degree={degree} setDegree={setDegree}
                        xMin={xMin} setXMin={setXMin}
                        xMax={xMax} setXMax={setXMax}
                    />
                )}

                {selectedType === "newtons-method" && (
                    <NewtonsMethodInput
                        input={input} setInput={setInput}
                        initialGuess={initialGuess} setInitialGuess={setInitialGuess}
                        maxIterations={maxIterations} setMaxIterations={setMaxIterations}
                    />
                )}

                <div>
                    <button onClick={handleSubmit} disabled={loading || !showVideo}>
                        {loading ? "Processing..." : "Generate"}
                    </button>
                </div>
                <button className="transparent-button" onClick={() => navigate(`/toolsHub/${userId}`)}>
                    Back to Tools
                </button>
            </div>

            <div className="visualizer">
                {showVideo && videoUrl && (
                    <video width="100%" height="100%" controls autoPlay muted>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {showExplanation && (
                    <div>
                        <h3>
                            {selectedType === "integral" && "Integral Visualization (Riemann Sums)"}
                            {selectedType === "derivative" && "This visualization illustrates the slope of the tangent line at different points along the curve, showing the derivative of the function."}
                            {selectedType === "linear-transformation" && "Linear Transformation"}
                            {selectedType === "taylor-series" && "Taylor Series"}
                            {selectedType === "newtons-method" && "Newton’s Method"}
                            {selectedType === "eigenvector-visualizer" && "Eigenvectors"}
                        </h3>
                        <p>
                            {selectedType === "integral" && "This visualization demonstrates the concept of definite integration by approximating the area under the curve using small rectangles (Riemann sums)."}
                            {selectedType === "derivative" && "This visualization illustrates the slope of the tangent line at different points along the curve, showing the derivative of the function."}
                            {selectedType === "linear-transformation" && "This shows how vectors are transformed under a 2×2 matrix transformation — stretching, rotating, or flipping them in space."}
                            {selectedType === "taylor-series" && "This shows how a function can be approximated using a polynomial expansion around a point using its derivatives (Taylor Series)."}
                            {selectedType === "newtons-method" && "This shows how Newton’s Method iteratively finds roots of a function using tangent lines from an initial guess."}
                        </p>
                    </div>
                )}

                {!videoUrl && !showExplanation && (
                    <p className="placeholder-text">No visualization yet.</p>
                )}

            </div>
            {showNamePrompt && (
                <div className="filename-prompt-slide-up">
                    <div className="filename-box">
                        <label>Name your file:</label>
                        <input
                            type="text"
                            value={customFileName}
                            onChange={(e) => setCustomFileName(e.target.value)}
                            placeholder="Enter file name..."
                        />
                        <button
                            onClick={() => {
                                if (!customFileName.trim()) {
                                    alert("Please enter a file name.");
                                    return;
                                }
                                saveVisualizationToProfile(userId, customFileName, setLoading);
                                setShowNamePrompt(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="cancel-button"
                            onClick={() => {
                                const prompt = document.querySelector(".filename-prompt-slide-up");
                                if (prompt) {
                                    prompt.classList.remove("slide-up");
                                    prompt.classList.add("slide-down");

                                    setTimeout(() => setShowNamePrompt(false), 200);
                                } else {
                                    setShowNamePrompt(false);
                                }
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}

export function VisualizationSelector({ selectedType, setSelectedType }) {
    return (
        <div>
            <h3>Select Visualization</h3>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="integral">Integral Visualization</option>
                <option value="derivative">Derivative Visualization</option>
                <option value="linear-transformation">Linear Transformation</option>
                <option value="eigenvector-visualizer">Eigenvectors</option>
                <option value="taylor-series">Taylor Series Approximation</option>
                <option value="newtons-method">Newton's Method</option>
            </select>
        </div>
    );
}

export function IntegralInput({
    input, setInput,
    igFrom, setIgFrom,
    igTo, setIgTo,
    xStep, setXStep,
    yStep, setYStep,
    integral_dx, setDX,
    xMin, setXMin,
    xMax, setXMax,
    yMin, setYMin,
    yMax, setYMax
}) {
    return (
        <div className="side-input-container">
            <h2>Integral Visualization</h2>

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

                <label>Integral dx:</label>
                <input type="number" value={integral_dx} onChange={(e) => setDX(e.target.value)} />
            </div>
        </div>
    );
}

export function DerivativeInput({ input, setInput, derivFrom, setDerivFrom, derivTo, setDerivTo }) {
    return (
        <div className="side-input-container">
            <h2>Derivative Visualization</h2>

            <div className="function-input">
                <EditableMathField
                    latex={input}
                    onChange={(mathField) => setInput(mathField.latex())}
                    className="math-input"
                />
            </div>


            <h3>Function Parameters</h3>
            <div className="range-inputs">
                <label>Derivative From:</label>
                <input type="number" value={derivFrom} onChange={(e) => setDerivFrom(e.target.value)} />

                <label>Derivative To:</label>
                <input type="number" value={derivTo} onChange={(e) => setDerivTo(e.target.value)} />
            </div>
        </div>
    );
}

export function LinearTransformationInput({ matrixA, setMatrixA, matrixB, setMatrixB, matrixC, setMatrixC, matrixD, setMatrixD, vectors, setVectors }) {
    const addVector = () => {
        setVectors([...vectors, [0, 0]]);
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
        <div className="side-input-container">
            <h2>Linear Transformation Visualization</h2>


            <h3>Transformation Matrix</h3>
            <div className="matrix-container">
                <div>
                    <input type="number" value={matrixA} onChange={(e) => setMatrixA(e.target.value)} className="matrix-input" />
                    <input type="number" value={matrixB} onChange={(e) => setMatrixB(e.target.value)} className="matrix-input" />
                </div>
                <div>
                    <input type="number" value={matrixC} onChange={(e) => setMatrixC(e.target.value)} className="matrix-input" />
                    <input type="number" value={matrixD} onChange={(e) => setMatrixD(e.target.value)} className="matrix-input" />
                </div>
            </div>

            <h3>Sample Vectors</h3>
            <button onClick={addVector} className="vector-add-btn">+ Add Vector</button>
            <div className="vector-container">

                {vectors.map((vector, index) => (
                    <div key={index} className="vector-input">
                        <label>X</label>
                        <input type="number" value={vector[0]} onChange={(e) => updateVector(index, 0, e.target.value)} className="vector-field" />
                        <label>Y</label>
                        <input type="number" value={vector[1]} onChange={(e) => updateVector(index, 1, e.target.value)} className="vector-field" />
                        {vectors.length > 1 && <button onClick={() => removeVector(index)} className="vector-remove-btn">-</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TaylorSeriesInput({ input, setInput, expansionPoint, setExpansionPoint, degree, setDegree, xMin, setXMin, xMax, setXMax }) {
    return (
        <div className="side-input-container">
            <h2>Taylor Series Approximation</h2>

            <label>Function f(x): </label>
            <EditableMathField
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
                className="math-input"
            />
            <div className="range-inputs">
                <label>Expansion Point a:</label>
                <input type="number" value={expansionPoint} onChange={(e) => setExpansionPoint(e.target.value)} />

                <label>Maximum Degree n:</label>
                <input type="number" value={degree} onChange={(e) => setDegree(e.target.value)} />


                <label>X Min:</label>
                <input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />

                <label>X Max:</label>
                <input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
            </div>
        </div>
    );
}


export function NewtonsMethodInput({ input, setInput, initialGuess, setInitialGuess, maxIterations, setMaxIterations }) {
    return (
        <div className="side-input-container">
            <h2>Newton's Method Visualization</h2>

            <label>Function f(x):</label>
            <EditableMathField
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
                className="math-input"
            />

            <div className="range-inputs">
                <label>Initial Guess:</label>
                <input
                    type="number"
                    value={initialGuess}
                    onChange={(e) => setInitialGuess(e.target.value)}
                />

                <label>Max Iterations:</label>
                <input
                    type="number"
                    value={maxIterations}
                    onChange={(e) => setMaxIterations(e.target.value)}
                />
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

async function submitEigenvalueVisualizer(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-eigenvector-visualizer/${userId}`,
            {
                matrix: [
                    [parseFloat(matrixA), parseFloat(matrixB)],
                    [parseFloat(matrixC), parseFloat(matrixD)]
                ],
                vectors
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting eigenvalue visualizer:", error);
        alert("Failed to generate Eigenvalue visualizer.");
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

export async function submitFunctionIntegral(latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-function-integral/${userId}`,
            { latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-linear-transformation/${userId}`,
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
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionNewtonsMethod(latex_function, initialGuess, xMin, xMax, maxIterations, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-newtons-method/${userId}`,
            {
                latex_function: latex_function,
                initialGuess: initialGuess,
                maxIterations: maxIterations,
                xMin: xMin,
                xMax: xMax
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate Newton's Method visualization. Please check your input.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionTaylorSeries(latex_function, expansionPoint, degree, xMin, xMax, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-taylor-series/${userId}`,
            {
                latex_function,
                expansionPoint,
                degree,
                xMin,
                xMax,
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate Taylor series visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function saveVisualizationToProfile(userId, fileName, setLoading) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/upload-user-asset/${userId}/${fileName}`,
            {},
            {
                withCredentials: true
            }
        );
        if (response.data.success) {
            alert("Visualization saved to your profile!");
        } else {
            alert("Failed to save visualization: " + response.data.message);
        }
    } catch (error) {
        console.error("Error saving visualization:", error);
        alert("An error occurred while saving the video.");
    } finally {
        setLoading(false);
    }
}

