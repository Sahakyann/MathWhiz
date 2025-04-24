import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/visualCalculators.css";
import { useParams } from "react-router-dom";
import Plot from "react-plotly.js";
import { evaluate, compile, derivative } from "mathjs";
import { parseLatexToMath, fixMultiplication } from "./LatexParserNew"

import { IntegralInput } from "./Forms/IntegralInput";
import { DerivativeInput } from "./Forms/DerivativeInput";
import { GradientDescentInput } from "./Forms/GradientDescentInput";
import { LinearTransformationInput } from "./Forms/LinearTransformationInput";
import { NewtonsMethodInput } from "./Forms/NewtonsMethodInput";
import { TaylorSeriesInput } from "./Forms/TaylorSeriesInput";
import { VisualizationSelector, SettingsSelector } from "./Forms/VisualizationSelector";
import {
    submitFunctionDerivative,
    submitFunctionIntegral,
    submitFunctionLimit,
    submitFunctionLinearTransformation,
    submitFunctionNewtonsMethod,
    submitFunctionTaylorSeries,
    submitEigenvalueVisualizer
} from './SubmitHandlers/SubmitFunctions.js';

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

    const [ThreeDinput, setThreeDinput] = useState("x^2 + y^2");
    const [learningRate, setLearningRate] = useState("0.9");
    const [initialX, setInitialX] = useState("13");
    const [initialY, setInitialY] = useState("2");
    const [iterations, setIterations] = useState("10");
    const [gradientDescentData, setGradientDescentData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);


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

    const [showSettings, setShowSettings] = useState(false);
    const [aspectRatio, setAspectRatio] = useState("16:9");
    const [backgroundColor, setBackgroundColor] = useState("#111111");




    useEffect(() => {
        if (isAnimating && gradientDescentData) {
            const interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < gradientDescentData.xs.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        setIsAnimating(false);
                        return prev;
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        }
    }, [isAnimating, gradientDescentData]);

    function generateGradientDescentPlot() {
        try {
            let processedInput = parseLatexToMath(ThreeDinput);
            processedInput = fixMultiplication(processedInput);
            console.log("Converted Function Multiplication:", processedInput)
            const parsedFunction = compile(processedInput);


            let x = parseFloat(initialX);
            let y = parseFloat(initialY);
            const learning = parseFloat(learningRate);
            const iters = parseInt(iterations);

            const xs = [x];
            const ys = [y];
            const zs = [parsedFunction.evaluate({ x, y })];

            const dfdx = derivative(processedInput, 'x');
            const dfdy = derivative(processedInput, 'y');

            const dfdxCompiled = dfdx.compile();
            const dfdyCompiled = dfdy.compile();

            for (let i = 0; i < iters; i++) {
                const gradX = dfdxCompiled.evaluate({ x, y });
                const gradY = dfdyCompiled.evaluate({ x, y });

                x = x - learning * gradX;
                y = y - learning * gradY;

                xs.push(x);
                ys.push(y);
                zs.push(parsedFunction.evaluate({ x, y }));
            }

            setGradientDescentData({
                xs,
                ys,
                zs,
                functionPlot: ThreeDinput,
                compiledSurfaceFunction: parsedFunction,
            });

        } catch (error) {
            console.error(error);
            alert("Failed to generate 3D Gradient Descent. Please check your input function.");
        }
    }



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
        } else if (selectedType === "gradient-descent") {
            setVideoUrl(null);
            generateGradientDescentPlot();
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
                    disabled={!videoUrl || !showVideo || selectedType === "gradient-descent"}
                >
                    Save to Profile
                </button>
                <button
                    onClick={downloadVideo}
                    disabled={!videoUrl || !showVideo || selectedType === "gradient-descent"}
                >
                    Download
                </button>
                {selectedType === "gradient-descent" && <button
                    onClick={() => {
                        setCurrentStep(0);
                        setIsAnimating(true);
                    }}
                    disabled={!gradientDescentData || isAnimating || selectedType !== "gradient-descent"}
                >
                    Animate Ball
                </button>}
            </div>

            <div className="sidebar-visualizer">


                {showSettings ? (
                    <div className="settings-panel">
                    <SettingsSelector
                        aspectRatio={aspectRatio}
                        backgroundColor={backgroundColor}
                        setAspectRatio={setAspectRatio}
                        setBackgroundColor={setBackgroundColor}
                        setShowSettings={setShowSettings}
                    />
                    </div>
                ) : (
                    <>
                        <button
                            className="settings-toggle-button"
                            onClick={() => setShowSettings(true)}
                            style={{ alignSelf: "flex-end", marginBottom: "10px" }}
                        >
                            ⚙️ Settings
                        </button>
                        <VisualizationSelector selectedType={selectedType} setSelectedType={setSelectedType} setVideoUrl={setVideoUrl} />

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

                        {selectedType === "gradient-descent" && (
                            <GradientDescentInput
                                ThreeDinput={ThreeDinput} setThreeDInput={setThreeDinput}
                                learningRate={learningRate} setLearningRate={setLearningRate}
                                initialX={initialX} setInitialX={setInitialX}
                                initialY={initialY} setInitialY={setInitialY}
                                iterations={iterations} setIterations={setIterations}
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
                    </>)}
            </div>

            <div className="visualizer">

                {showVideo && videoUrl && (
                    <video width="100%" height="100%" controls autoPlay muted>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {showVideo && selectedType === "gradient-descent" && gradientDescentData && (() => {
                    const surfaceFunc = gradientDescentData.compiledSurfaceFunction;


                    const span = 40;

                    const xMin = -span;
                    const xMax = span;
                    const yMin = -span;
                    const yMax = span;

                    const xValues = Array.from({ length: 100 }, (_, i) =>
                        xMin + (i * (xMax - xMin)) / 99
                    );

                    const yValues = Array.from({ length: 100 }, (_, i) =>
                        yMin + (i * (yMax - yMin)) / 99
                    );

                    const zSurface = yValues.map(y =>
                        xValues.map(x => surfaceFunc.evaluate({ x, y }))
                    );

                    let zMin = Infinity;
                    let zMax = -Infinity;

                    for (const row of zSurface) {
                        for (const z of row) {
                            if (z < zMin) zMin = z;
                            if (z > zMax) zMax = z;
                        }
                    }

                    zMax = Math.min(zMax, 200);
                    zMin = Math.max(zMin, -200);

                    return (
                        <Plot
                            data={[
                                {
                                    type: "surface",
                                    x: xValues,
                                    y: yValues,
                                    z: zSurface,
                                    colorscale: "Viridis",
                                    opacity: 0.65,
                                },
                                {
                                    type: "scatter3d",
                                    mode: "lines+markers",
                                    x: gradientDescentData.xs,
                                    y: gradientDescentData.ys,
                                    z: gradientDescentData.zs,
                                    marker: { color: "red", size: 4 },
                                    line: { color: "red", width: 4 },
                                    name: "Descent Path"
                                },
                                {
                                    type: "scatter3d",
                                    mode: "markers",
                                    x: [gradientDescentData.xs[currentStep]],
                                    y: [gradientDescentData.ys[currentStep]],
                                    z: [gradientDescentData.zs[currentStep]],
                                    marker: { color: "yellow", size: 6 },
                                    name: "Ball",
                                }
                            ]}
                            layout={{
                                paper_bgcolor: "#111111",
                                plot_bgcolor: "#111111",
                                font: { color: "#FFFFFF" },
                                width: 1920,
                                height: 1080,
                                title: {
                                    text: "Gradient Descent on Surface",
                                    font: { color: "#FFFFFF" }
                                },
                                scene: {
                                    xaxis: { title: "x", backgroundcolor: "#111111", gridcolor: "#444444", zerolinecolor: "#888888" },
                                    yaxis: { title: "y", backgroundcolor: "#111111", gridcolor: "#444444", zerolinecolor: "#888888" },
                                    zaxis: { title: "f(x, y)", backgroundcolor: "#111111", gridcolor: "#444444", zerolinecolor: "#888888", range: [zMin, zMax], },
                                }
                            }}
                        />
                    );
                })()}



                {showExplanation && (
                    <div>
                        <h3>
                            {selectedType === "integral" && "Integral Visualization (Riemann Sums)"}
                            {selectedType === "derivative" && "This visualization illustrates the slope of the tangent line at different points along the curve, showing the derivative of the function."}
                            {selectedType === "linear-transformation" && "Linear Transformation"}
                            {selectedType === "taylor-series" && "Taylor Series"}
                            {selectedType === "newtons-method" && "Newton’s Method"}
                            {selectedType === "eigenvector-visualizer" && "Eigenvectors"}
                            {selectedType === "gradient-descent" && "Gradient Descent Visualizer"}
                        </h3>
                        <p>
                            {selectedType === "integral" && "This visualization demonstrates the concept of definite integration by approximating the area under the curve using small rectangles (Riemann sums)."}
                            {selectedType === "derivative" && "This visualization illustrates the slope of the tangent line at different points along the curve, showing the derivative of the function."}
                            {selectedType === "linear-transformation" && "This shows how vectors are transformed under a 2×2 matrix transformation — stretching, rotating, or flipping them in space."}
                            {selectedType === "taylor-series" && "This shows how a function can be approximated using a polynomial expansion around a point using its derivatives (Taylor Series)."}
                            {selectedType === "newtons-method" && "This shows how Newton’s Method iteratively finds roots of a function using tangent lines from an initial guess."}
                            {selectedType === "gradient-descent" && "Shows how gradient descent iteratively minimizes a function."}
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

