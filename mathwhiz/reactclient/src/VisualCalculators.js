import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/visualCalculators.css";
import { useParams } from "react-router-dom";
import Plot from "react-plotly.js";
import { evaluate, compile, derivative } from "mathjs";
import { parseLatexToMath, fixMultiplication, parseLatexToJsx } from "./LatexParserNew"

import { IntegralInput } from "./Forms/IntegralInput";
import { DerivativeInput } from "./Forms/DerivativeInput";
import { GradientDescentInput, GradientDescentVisualizer } from "./Forms/GradientDescentInput";
import { LinearTransformationInput } from "./Forms/LinearTransformationInput";
import { NewtonsMethodInput } from "./Forms/NewtonsMethodInput";
import { TaylorSeriesInput } from "./Forms/TaylorSeriesInput";
import { VisualizationSelector, SettingsSelector } from "./Forms/VisualizationSelector";
import { CentralLimitTheoremInput, CLTVisualizer } from "./Forms/CentralLimitTheoremInput";
import { LLNInput, LLNVisualizer } from "./Forms/LLNInput.js";
import { FractalVisualizer } from "./Forms/FractalVisualizer.js";
import { MatrixMultiplicationInput } from "./Forms/MatrixMultiplicationInput.js";

import {
    submitFunctionDerivative,
    submitFunctionIntegral,
    submitFunctionLimit,
    submitFunctionLinearTransformation,
    submitFunctionNewtonsMethod,
    submitFunctionTaylorSeries,
    submitEigenvalueVisualizer,
    submitMatrixMultiplication
} from './SubmitHandlers/SubmitFunctions.js';

import { BlockMath, InlineMath } from "react-katex";
import API_BASE_URL from './constants';

addStyles();

export default function VisualCalculators({ isDarkMode }) {


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
    const [integralValue, setIntegralValue] = useState("");

    const [matrixA, setMatrixA] = useState("0");
    const [matrixB, setMatrixB] = useState("-1");
    const [matrixC, setMatrixC] = useState("-1");
    const [matrixD, setMatrixD] = useState("0");

    const [ThreeDinput, setThreeDinput] = useState("x^2 + y^2");
    const [learningRate, setLearningRate] = useState("0.9");
    const [initialX, setInitialX] = useState("-4");
    const [initialY, setInitialY] = useState("3");
    const [iterations, setIterations] = useState("10");
    const [gradientDescentData, setGradientDescentData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [xRangeMin, setXRangeMin] = useState("-10");
    const [xRangeMax, setXRangeMax] = useState("10");
    const [yRangeMin, setYRangeMin] = useState("-10");
    const [yRangeMax, setYRangeMax] = useState("10");
    const [autoRange, setAutoRange] = useState(true);

    const [numSamples, setNumSamples] = useState("10");
    const [distributionType, setDistributionType] = useState("exponential");
    const [startExperiments, setStartExperiments] = useState("10");
    const [endExperiments, setEndExperiments] = useState("400");
    const [currentExperiments, setCurrentExperiments] = useState("10");
    const [cltData, setCltData] = useState([]);
    const [isCLTAnimating, setIsCLTAnimating] = useState(false);

    const [llnData, setLlnData] = useState([]);
    const [llnTrials, setLlnTrials] = useState("5000");
    const [distributionTypeLLN, setDistributionTypeLLN] = useState("uniform");
    const [llnLastGeneratedMean, setLlnLastGeneratedMean] = useState(null);
    const [llnLastGeneratedLambda, setLlnLastGeneratedLambda] = useState(null);
    const [llnLastGeneratedTrials, setLlnLastGeneratedTrials] = useState(null);
    const [isLLNAnimating, setIsLLNAnimating] = useState(false);
    const [currentLLNTrial, setCurrentLLNTrial] = useState(0);
    const [llnTargetMean, setLlnTargetMean] = useState("1");
    const [llnLambda, setLlnLambda] = useState("1");
    const [llnMilestoneIndices, setLlnMilestoneIndices] = useState([]);

    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const [expansionPoint, setExpansionPoint] = useState("0");
    const [degree, setDegree] = useState("5");

    const { userId } = useParams();

    const [initialGuess, setInitialGuess] = useState("1.5");
    const [maxIterations, setMaxIterations] = useState("6");

    const [showVideo, setShowVideo] = useState(true);
    const [showExplanation, setShowExplanation] = useState(false);
    const [minimizeAiExplanation, setMinimizeAiExplanation] = useState(true);
    const [aiExplanation, setAIExplanation] = useState("");

    const [vectors, setVectors] = useState([[2, 3]]);

    const [matrixA_mm, setMatrixA_mm] = useState([[1, 2], [3, 4]]);
    const [matrixB_mm, setMatrixB_mm] = useState([[5, 6], [7, 8]]);
    let resultMatrix = [];
    if (
        Array.isArray(matrixA_mm) &&
        Array.isArray(matrixB_mm) &&
        matrixA_mm.length > 0 &&
        matrixB_mm.length > 0 &&
        matrixA_mm[0].length === matrixB_mm.length
    ) {
        resultMatrix = matrixA_mm.map((row, i) =>
            matrixB_mm[0].map((_, j) =>
                row.reduce((sum, val, k) => sum + val * matrixB_mm[k][j], 0)
            )
        );
    }

    const [taylorPreview, setTaylorPreview] = useState("");

    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [customFileName, setCustomFileName] = useState("");

    const [showSettings, setShowSettings] = useState(false);
    const [aspectRatio, setAspectRatio] = useState("16:9");
    const [backgroundColor, setBackgroundColor] = useState("#111111");

    const [fractalDepth, setFractalDepth] = useState(4);

    const [screenshotOnly, setScreenshotOnly] = useState(false);
    const [renderType, setRenderType] = useState("video");

    useEffect(() => {
        const savedExplanation = localStorage.getItem("aiExplanationText");
        const savedMinimized = localStorage.getItem("aiExplanationMinimized");
        const everShown = localStorage.getItem("aiExplanationEverShown");

        if (savedExplanation) {
            setAIExplanation(savedExplanation);
        }

        if (everShown === "true") {
            setMinimizeAiExplanation(savedMinimized === "true");
        }
    }, []);

    const handleAIExplanation = async () => {
        try {

            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/api/get-ai-explanation`, {
                userId
            }, { withCredentials: true });

            setAIExplanation(response.data.explanation);

            localStorage.setItem("aiExplanationText", response.data.explanation);
            localStorage.setItem("aiExplanationEverShown", "true");
            localStorage.setItem("aiExplanationMinimized", "false");
        } catch (err) {
            console.error("Error getting explanation:", err);
            alert("Failed to get explanation.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLLNAnimating && llnData.length > 0) {
            const totalPoints = llnData.length;
            const totalDuration = 10000;
            const frameInterval = 20;

            const stepsNeeded = totalDuration / frameInterval;
            const pointsPerStep = totalPoints / stepsNeeded;

            let accumulatedPoints = 0;

            const interval = setInterval(() => {
                setCurrentLLNTrial(prev => {
                    if (prev < totalPoints) {
                        accumulatedPoints += (() => {
                            if (totalPoints <= 2000) {

                                return pointsPerStep;
                            } else {
                                const progress = prev / totalPoints;
                                const accelerationFactor = 1 + 1.5 * progress;
                                return pointsPerStep * accelerationFactor;
                            }
                        })();

                        const nextPoint = Math.min(totalPoints, Math.ceil(accumulatedPoints));
                        return nextPoint;
                    } else {
                        clearInterval(interval);
                        setIsLLNAnimating(false);
                        return prev;
                    }
                });
            }, frameInterval);

            return () => clearInterval(interval);
        }
    }, [isLLNAnimating, llnData]);

    useEffect(() => {
        if (selectedType === "central-limit-theorem") {
            generateCLTData();
        }
    }, [currentExperiments, numSamples, distributionType]);


    useEffect(() => {
        if (isCLTAnimating && selectedType === "central-limit-theorem") {
            const stepSize = Math.max(1, Math.floor((endExperiments - startExperiments) / 40));
            const interval = setInterval(() => {
                setCurrentExperiments(prev => {
                    const nextValue = parseInt(prev) + stepSize;
                    if (nextValue >= parseInt(endExperiments)) {
                        clearInterval(interval);
                        setIsCLTAnimating(false);
                        return endExperiments;
                    }
                    return nextValue;
                });
            }, 300);

            return () => clearInterval(interval);
        }
    }, [isCLTAnimating, endExperiments, selectedType]);

    useEffect(() => {
        if (isAnimating && gradientDescentData) {
            const totalSteps = gradientDescentData.xs.length;
            const frameInterval = 600;

            const interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < totalSteps - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        setIsAnimating(false);
                        return prev;
                    }
                });
            }, frameInterval);

            return () => clearInterval(interval);
        }
    }, [isAnimating, gradientDescentData]);



    function generateLLNData() {
        const totalTrials = parseInt(llnTrials);
        const milestoneIndices = Array.from({ length: 10 }, (_, i) => Math.floor(((i + 1) / 10) * totalTrials));
        setLlnMilestoneIndices(milestoneIndices);
        const dist = distributionTypeLLN;

        let cumulativeSum = 0;
        let means = [];

        const targetMean = parseFloat(llnTargetMean);
        const lambda = parseFloat(llnLambda);

        for (let i = 1; i <= totalTrials; i++) {
            let value = 0;

            if (dist === "uniform") {
                value = Math.random() * (2 * targetMean);
            } else if (dist === "normal") {
                value = randomNormal() + targetMean;
            } else if (dist === "exponential") {
                value = randomExponential(lambda);
            }

            cumulativeSum += value;
            means.push(cumulativeSum / i);
        }

        setLlnData(means);
        setCurrentLLNTrial(means.length);
        setLlnLastGeneratedMean(targetMean);
        setLlnLastGeneratedLambda(lambda);
        setLlnLastGeneratedTrials(totalTrials);
    }

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

    function generateCLTData() {
        const samples = parseInt(numSamples);
        const experiments = parseInt(currentExperiments);
        const dist = distributionType;
        let means = [];

        for (let i = 0; i < experiments; i++) {
            let sample = [];
            for (let j = 0; j < samples; j++) {
                if (dist === "uniform") {
                    sample.push(Math.random());
                } else if (dist === "normal") {
                    sample.push(randomNormal());
                } else if (dist === "exponential") {
                    sample.push(randomExponential());
                }
            }
            const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
            means.push(mean);
        }

        setCltData(means);
    }

    function randomNormal() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    function randomExponential(lambda = 1) {
        return -Math.log(1.0 - Math.random()) / lambda;
    }



    const handleSubmit = async () => {
        // Before submitting it to the server, pre-parse latex
        if (input) {
            fixMultiplication(parseLatexToMath(input));
        }
        if (selectedType === "limit") {
            submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl);
        } else if (selectedType === "integral") {
            const type = await submitFunctionIntegral(input, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, igFrom, igTo, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
        } else if (selectedType === "derivative") {
            submitFunctionDerivative(input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo, setLoading, setVideoUrl, videoUrl, userId);
        } else if (selectedType === "linear-transformation") {
            const type = await submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
        } else if (selectedType === "eigenvector-visualizer") {
            const type = await submitEigenvalueVisualizer(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
        } else if (selectedType === "taylor-series") {
            const type = await submitFunctionTaylorSeries(input, expansionPoint, degree, xMin, xMax, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
        } else if (selectedType === "newtons-method") {
            const type = await submitFunctionNewtonsMethod(input, initialGuess, xMin, xMax, maxIterations, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
        } else if (selectedType === "central-limit-theorem") {
            generateCLTData();
        } else if (selectedType === "gradient-descent") {
            generateGradientDescentPlot();
        } else if (selectedType === "law-of-large-numbers") {
            generateLLNData();
        } else if (selectedType === "matrix-multiplication") {
            const type = await submitMatrixMultiplication(matrixA_mm, matrixB_mm, setLoading, setVideoUrl, videoUrl, userId, screenshotOnly);
            setRenderType(type);
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
                <OnboardingOverlay />
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
                {!["geometric-fractal", "central-limit-theorem", "law-of-large-numbers", "gradient-descent"].includes(selectedType) && (
                    <button onClick={handleAIExplanation} disabled={loading}>
                        Explain with AI
                    </button>
                )}
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
                            screenshotOnly={screenshotOnly}
                            setScreenshotOnly={setScreenshotOnly}
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
                                selectedType={selectedType}
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
                                taylorPreview={taylorPreview} setTaylorPreview={setTaylorPreview}
                            />
                        )}

                        {selectedType === "central-limit-theorem" && (
                            <CentralLimitTheoremInput
                                numSamples={numSamples} setNumSamples={setNumSamples}
                                startExperiments={startExperiments} setStartExperiments={setStartExperiments}
                                endExperiments={endExperiments} setEndExperiments={setEndExperiments}
                                currentExperiments={currentExperiments} setCurrentExperiments={setCurrentExperiments}
                                distributionType={distributionType} setDistributionType={setDistributionType}
                            />
                        )}
                        {selectedType === "newtons-method" && (
                            <NewtonsMethodInput
                                input={input} setInput={setInput}
                                initialGuess={initialGuess} setInitialGuess={setInitialGuess}
                                maxIterations={maxIterations} setMaxIterations={setMaxIterations}
                            />
                        )}
                        {selectedType === "matrix-multiplication" && (
                            <MatrixMultiplicationInput
                                matrixA={matrixA_mm} setMatrixA={setMatrixA_mm}
                                matrixB={matrixB_mm} setMatrixB={setMatrixB_mm}
                            />
                        )}
                        {selectedType === "gradient-descent" && (
                            <GradientDescentInput
                                ThreeDinput={ThreeDinput} setThreeDInput={setThreeDinput}
                                learningRate={learningRate} setLearningRate={setLearningRate}
                                initialX={initialX} setInitialX={setInitialX}
                                initialY={initialY} setInitialY={setInitialY}
                                iterations={iterations} setIterations={setIterations}
                                xRangeMin={xRangeMin} setXRangeMin={setXRangeMin}
                                xRangeMax={xRangeMax} setXRangeMax={setXRangeMax}
                                yRangeMin={yRangeMin} setYRangeMin={setYRangeMin}
                                yRangeMax={yRangeMax} setYRangeMax={setYRangeMax}
                                autoRange={autoRange} setAutoRange={setAutoRange}
                            />
                        )}
                        {selectedType === "law-of-large-numbers" && (
                            <LLNInput
                                llnTrials={llnTrials} setLlnTrials={setLlnTrials}
                                distributionTypeLLN={distributionTypeLLN} setDistributionTypeLLN={setDistributionTypeLLN}
                                llnTargetMean={llnTargetMean} setLlnTargetMean={setLlnTargetMean}
                                llnLambda={llnLambda} setLlnLambda={setLlnLambda}
                                isDarkMode={isDarkMode}
                            />
                        )}
                        {selectedType === "geometric-fractal" && (
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ color: isDarkMode ? "white" : "#111" }}>Fractal Depth:</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="7"
                                    step="0.1"
                                    value={fractalDepth}
                                    onChange={(e) => setFractalDepth(parseFloat(e.target.value))}
                                />
                                <span style={{ color: isDarkMode ? "white" : "#111", marginLeft: "10px" }}>
                                    {fractalDepth.toFixed(1)}
                                </span>
                            </div>
                        )}

                        <div>


                            <button onClick={handleSubmit} disabled={loading || !showVideo}>
                                {loading ? "Processing..." : "Generate"}
                            </button>

                            {selectedType === "central-limit-theorem" && (
                                <button
                                    onClick={() => {
                                        if (!isCLTAnimating) {
                                            setCurrentExperiments(startExperiments);
                                            setIsCLTAnimating(true);
                                        }
                                    }}
                                    disabled={isCLTAnimating}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Play CLT Animation
                                </button>
                            )}

                            {selectedType === "gradient-descent" && (
                                <button
                                    onClick={() => {
                                        if (!gradientDescentData) {
                                            generateGradientDescentPlot();
                                            setTimeout(() => {
                                                setCurrentStep(0);
                                                setIsAnimating(true);
                                            }, 300);
                                        } else {
                                            setCurrentStep(0);
                                            setIsAnimating(true);
                                        }
                                    }}
                                    disabled={isAnimating}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Animate Ball
                                </button>
                            )}

                            {selectedType === "law-of-large-numbers" && (
                                <button
                                    onClick={() => {
                                        const targetMean = parseFloat(llnTargetMean);
                                        const lambda = parseFloat(llnLambda);
                                        const totalTrials = parseInt(llnTrials);

                                        const milestoneIndices = Array.from({ length: 10 }, (_, i) => Math.floor(((i + 1) / 10) * totalTrials));

                                        const needToRegenerate =
                                            llnData.length === 0 ||
                                            (distributionTypeLLN !== "exponential" && targetMean !== llnLastGeneratedMean) ||
                                            (distributionTypeLLN === "exponential" && lambda !== llnLastGeneratedLambda ||
                                                totalTrials !== llnLastGeneratedTrials);

                                        if (needToRegenerate) {
                                            generateLLNData();
                                        } else {
                                            setLlnMilestoneIndices(milestoneIndices);
                                            setCurrentLLNTrial(0);
                                            setIsLLNAnimating(true);
                                        }
                                    }}
                                    disabled={isLLNAnimating}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Play LLN Animation
                                </button>
                            )}
                        </div>



                        {selectedType === "gradient-descent" && gradientDescentData && (
                            <div style={{ marginTop: "20px", color: isDarkMode ? "white" : "#111", fontSize: "0.85rem", maxHeight: "250px", overflowY: "auto", background: isDarkMode ? "#222" : "#f2f2f2", padding: "10px", borderRadius: "8px" }}>
                                <h4 style={{ textAlign: "center" }}>Descent Path Points</h4>
                                {gradientDescentData.xs.map((xVal, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            marginBottom: "4px",
                                            color: idx === currentStep ? (isDarkMode ? "yellow" : "blue") : (isDarkMode ? "white" : "#111"),
                                            transition: "color 0.3s, font-weight 0.3s",
                                        }}
                                    >
                                        Step {idx}: (x: {xVal.toFixed(3)}, y: {gradientDescentData.ys[idx].toFixed(3)}, z: {gradientDescentData.zs[idx].toFixed(3)})
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedType === "law-of-large-numbers" && (
                            <>
                                <div style={{ marginTop: "20px", marginBottom: "10px", color: isDarkMode ? "skyblue" : "#007bff" }}>
                                    <strong>Expected Value:</strong>{" "}
                                    {distributionTypeLLN === "exponential"
                                        ? (1 / parseFloat(llnLambda)).toFixed(4)
                                        : parseFloat(llnTargetMean).toFixed(4)}
                                </div>

                                <div style={{
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    background: isDarkMode ? "#333" : "#f2f2f2",
                                    padding: "10px",
                                    borderRadius: "5px"
                                }}>
                                    <strong>Sample Means at Milestones:</strong>
                                    {llnData.length > 0 ? (
                                        llnMilestoneIndices.map((index, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    marginBottom: "4px",
                                                    color: index <= currentLLNTrial ? (isDarkMode ? "skyblue" : "#007bff") : (isDarkMode ? "white" : "#111"),
                                                    fontWeight: index <= currentLLNTrial ? "bold" : "normal",
                                                }}
                                            >
                                                Trial {index}: {llnData[index - 1]?.toFixed(4)}
                                            </div>
                                        ))
                                    ) : (
                                        <div>No data generated yet.</div>
                                    )}
                                </div>
                            </>
                        )}
                        {showVideo && selectedType === "matrix-multiplication" && (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <h3>Results Preview</h3>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px" }}>
                                    <table>
                                        <tbody>
                                            {matrixA_mm.map((row, i) => (
                                                <tr key={i}>
                                                    {row.map((val, j) => (
                                                        <td key={j} style={{ padding: "4px 8px", border: "1px solid #ccc" }}>{val}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <span style={{ fontSize: "1.5em" }}>×</span>
                                    <table>
                                        <tbody>
                                            {matrixB_mm.map((row, i) => (
                                                <tr key={i}>
                                                    {row.map((val, j) => (
                                                        <td key={j} style={{ padding: "4px 8px", border: "1px solid #ccc" }}>{val}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div>=</div>
                                    <div style={{ display: "inline-block" }}>
                                        <table>
                                            <tbody>
                                                {resultMatrix.map((row, i) => (
                                                    <tr key={i}>
                                                        {row.map((val, j) => (
                                                            <td key={j} style={{ padding: "4px 8px", border: "1px solid #ccc" }}>{val}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>




                            </div>
                        )}
                        {selectedType === "taylor-series" && taylorPreview && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    textAlign: "center",
                                    maxWidth: "600px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                    background: isDarkMode ? "#222" : "#f2f2f2",
                                    padding: "15px",
                                    borderRadius: "3px"
                                }}
                            >
                                <h4>Taylor Series Preview</h4>
                                <BlockMath math={`f(x) = ${input}`} />
                                <BlockMath math={`f(x) \\approx ${taylorPreview}`} />
                            </div>
                        )}
                        {selectedType === "integral" && integralValue && (
                            <div>
                                <label>integralValue:</label>
                                <p>{integralValue}</p>
                            </div>
                        )}
                        <button className="transparent-button" onClick={() => navigate(`/toolsHub/${userId}`)}>
                            Back to Tools
                        </button>
                    </>)}
            </div>

            <div className="visualizer">
                {showVideo && videoUrl && (
                    renderType === "image" ? (
                        <img src={videoUrl} alt="Final Screenshot" style={{ width: "100%", height: "auto" }} />
                    ) : (
                        <video width="100%" height="100%" controls autoPlay muted>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                )}
                {/*showVideo && videoUrl && (
                    <video width="100%" height="100%" controls autoPlay muted>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )*/}
                {showVideo && selectedType === "law-of-large-numbers" && (
                    <LLNVisualizer
                        llnData={llnData}
                        currentLLNTrial={currentLLNTrial}
                        llnTrials={llnTrials}
                        distributionTypeLLN={distributionTypeLLN}
                        llnTargetMean={llnTargetMean}
                        llnLambda={llnLambda}
                        isDarkMode={isDarkMode}
                    />
                )}

                {showVideo && selectedType === "central-limit-theorem" && (
                    <CLTVisualizer cltData={cltData} isDarkMode={isDarkMode} />
                )}

                {showVideo && selectedType === "gradient-descent" && (
                    <GradientDescentVisualizer
                        gradientDescentData={gradientDescentData}
                        currentStep={currentStep}
                        autoRange={autoRange}
                        xRangeMin={xRangeMin}
                        xRangeMax={xRangeMax}
                        yRangeMin={yRangeMin}
                        yRangeMax={yRangeMax}
                        isDarkMode={isDarkMode}
                    />
                )}
                {showVideo && selectedType === "geometric-fractal" && (
                    <FractalVisualizer isDarkMode={isDarkMode} depth={fractalDepth} />
                )}



                {showExplanation && (
                    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "justify" }}>
                        <h3>
                            {selectedType === "integral" && "Integral Visualization (Riemann Sums)"}
                            {selectedType === "derivative" && "Derivative Visualization (Tangent Slope)"}
                            {selectedType === "linear-transformation" && "Linear Transformation of Vectors"}
                            {selectedType === "taylor-series" && "Taylor Series Approximation"}
                            {selectedType === "newtons-method" && "Newton’s Method for Root Finding"}
                            {selectedType === "gradient-descent" && "Gradient Descent Optimization"}
                            {selectedType === "eigenvector-visualizer" && "Eigenvectors and Eigenvalues"}
                            {selectedType === "central-limit-theorem" && "Central Limit Theorem (CLT)"}
                        </h3>
                        <p>
                            {selectedType === "integral" && (
                                <>
                                    This visualization demonstrates <strong>definite integration</strong> by approximating the area under a curve using <strong>Riemann sums</strong>.
                                    Integration is fundamental in calculus for computing areas, volumes, and accumulated quantities.
                                    Study this topic:{" "}
                                    <a href="https://people.math.wisc.edu/~hkeisler/chapter_4.pdf" target="_blank" rel="noopener noreferrer">
                                        Definite Integrals
                                    </a>.
                                </>
                            )}
                            {selectedType === "derivative" && (
                                <>
                                    This shows the slope of the <strong>tangent line</strong> at various points, visualizing the <strong>derivative</strong> of a function.
                                    Derivatives describe rates of change and are key to motion and optimization problems.
                                    Learn more:{" "}
                                    <a href="https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/resources/part-a-unit-2-video-1-the-idea-of-the-derivative/" target="_blank" rel="noopener noreferrer">
                                        MIT OCW - The Idea of the Derivative
                                    </a>.
                                </>
                            )}
                            {selectedType === "linear-transformation" && (
                                <>
                                    This animation shows how a <strong>2×2 matrix</strong> can transform vectors — by stretching, rotating, or reflecting them.
                                    Linear transformations are essential in linear algebra and computer graphics.
                                    Visual Introduction here:{" "}
                                    <a href="https://www.youtube.com/watch?v=kYB8IZa5AuE" target="_blank" rel="noopener noreferrer">
                                        3Blue1Brown
                                    </a>.
                                </>
                            )}
                            {selectedType === "taylor-series" && (
                                <>
                                    This shows how a function can be approximated near a point using a <strong>Taylor polynomial</strong>.
                                    Taylor series are critical for approximations in science and engineering.
                                    Explore more:{" "}
                                    <a href="https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx" target="_blank" rel="noopener noreferrer">
                                        Paul's Online Math Notes - Taylor Series
                                    </a>.
                                </>
                            )}
                            {selectedType === "newtons-method" && (
                                <>
                                    This visualization demonstrates <strong>Newton’s Method</strong> — using tangent lines to iteratively find roots of functions.
                                    It is a powerful tool in numerical analysis.
                                    Learn about it here:{" "}
                                    <a href="https://personal.math.ubc.ca/~feldman/m120/newton.pdf" target="_blank" rel="noopener noreferrer">
                                        University of British Colombia - Newton's Method
                                    </a>.
                                </>
                            )}
                            {selectedType === "gradient-descent" && (
                                <>
                                    This shows how <strong>Gradient Descent</strong> iteratively minimizes a function by moving in the steepest descent direction.
                                    It is central in machine learning and optimization.
                                    Study it here:{" "}
                                    <a href="https://cs231n.github.io/optimization-1/" target="_blank" rel="noopener noreferrer">
                                        Stanford CS231n - Optimization: Gradient Descent
                                    </a>.
                                </>
                            )}
                            {selectedType === "eigenvector-visualizer" && (
                                <>
                                    This shows <strong>Eigenvectors</strong> and <strong>Eigenvalues</strong> — vectors that are only scaled (not rotated) during a linear transformation.
                                    These are fundamental in differential equations, physics, and data science (PCA).
                                    Explore further:{" "}
                                    <a href="https://math.mit.edu/~gs/linearalgebra/ila5/linearalgebra5_6-1.pdf" target="_blank" rel="noopener noreferrer">
                                        MIT Linear Algebra - Eigenvalues and Eigenvectors
                                    </a>.
                                </>
                            )}
                            {selectedType === "central-limit-theorem" && (
                                <>
                                    This explains the <strong>Central Limit Theorem (CLT)</strong> — which says that the sampling distribution of the mean becomes approximately normal for large sample sizes.
                                    It underpins statistical inference and confidence intervals.
                                    Study the CLT:{" "}
                                    <a href="https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class06-prep-b.pdf" target="_blank" rel="noopener noreferrer">
                                        MIT - Central Limit Theorem
                                    </a>.
                                </>
                            )}
                        </p>
                    </div>
                )}
                {!videoUrl && !showExplanation && selectedType !== "gradient-descent" && selectedType !== "central-limit-theorem" && selectedType !== "law-of-large-numbers" &&
                    selectedType !== "geometric-fractal" && (
                        <div
                            style={{
                                color: isDarkMode ? "white" : "black",
                            }}
                        >
                            <p className="placeholder-text">No visualization yet.</p>
                        </div>
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
            {!["geometric-fractal", "central-limit-theorem", "law-of-large-numbers", "gradient-descent"].includes(selectedType) && (
                <div className={`ai-explanation-popup ${isDarkMode ? "dark" : ""}`}>
                    <div className={`ai-explanation-header ${isDarkMode ? "dark" : "light"}`}>
                        <span style={{ fontWeight: "bold" }}>AI Explanation</span>
                        <button
                            onClick={() => {
                                const popup = document.querySelector(".ai-explanation-popup");
                                if (popup) {
                                    popup.classList.add("slideOutDown");
                                    setTimeout(() => {
                                        setMinimizeAiExplanation(!minimizeAiExplanation);
                                        popup.classList.remove("slideOutDown");
                                    }, 300);
                                } else {
                                    setMinimizeAiExplanation(!minimizeAiExplanation);
                                }
                                const savedMinimized = localStorage.getItem("aiExplanationMinimized");
                                if (savedMinimized !== null) {
                                    setMinimizeAiExplanation(savedMinimized === "true");
                                    localStorage.setItem("aiExplanationMinimized", !savedMinimized.toString());
                                }
                            }}
                        >
                            {minimizeAiExplanation ? "Show" : "Hide"}
                        </button>
                        {/*<button
                                onClick={() => setShowAiExplanation(false)}
                                style={{
                                    fontSize: "0.8rem",
                                    background: "transparent",
                                    border: "1px solid gray",
                                    borderRadius: "6px",
                                    padding: "4px 8px",
                                    cursor: "pointer"
                                }}
                            >
                                Close
                            </button>*/}
                    </div>



                    {!minimizeAiExplanation && (
                        <div className="ai-explanation-popup-content">
                            {loading ? (
                                <div className="ai-loading-spinner"></div>
                            ) : (
                                aiExplanation ? parseLatexToJsx(aiExplanation) : <p style={{ opacity: 0.7 }}>No explanation available.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}


export async function saveVisualizationToProfile(userId, fileName, setLoading) {
    try {
        setLoading(true);
        const response = await axios.post(
            `${API_BASE_URL}/api/upload-user-asset/${userId}/${fileName}`,
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

export function OnboardingOverlay() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('seenOnboarding');
        if (!seen) {
            setVisible(true);
        }
    }, []);

    const dismiss = () => {
        localStorage.setItem('seenOnboarding', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="onboarding-overlay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="onboarding-step" style={{ position: 'relative', marginBottom: '20px' }}>
                <strong>Select a Tool</strong><br />
                Use the "Select Visualization" menu to choose what type of visualization you want (e.g., Integral, Gradient Descent)
            </div>

            <div className="onboarding-step" style={{ position: 'relative', marginBottom: '20px' }}>
                <strong>Enter a Function</strong><br />
                Type your function in the input box, such as <code>-x^2+1</code>
            </div>

            <div className="onboarding-step" style={{ position: 'relative', marginBottom: '20px' }}>
                <strong>Generate Animation</strong><br />
                Click "Generate" to create your custom math animation
            </div>

            <button className="onboarding-dismiss" onClick={dismiss}>Got it!</button>
        </div>
    );
}


