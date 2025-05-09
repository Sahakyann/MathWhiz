import { EditableMathField } from "react-mathquill";
import React from "react";
import Plot from "react-plotly.js";

export function GradientDescentVisualizer({ gradientDescentData, currentStep, autoRange, xRangeMin, xRangeMax, yRangeMin, yRangeMax, isDarkMode }) {
    if (!gradientDescentData) return null;

    const surfaceFunc = gradientDescentData.compiledSurfaceFunction;

    let xMin, xMax, yMin, yMax;

    if (autoRange) {
        const xs = gradientDescentData.xs;
        const ys = gradientDescentData.ys;

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const xPadding = (maxX - minX) * 0.75;
        const yPadding = (maxY - minY) * 0.75;
        xMin = minX - xPadding;
        xMax = maxX + xPadding;
        yMin = minY - yPadding;
        yMax = maxY + yPadding;
    } else {
        xMin = parseFloat(xRangeMin);
        xMax = parseFloat(xRangeMax);
        yMin = parseFloat(yRangeMin);
        yMax = parseFloat(yRangeMax);
    }

    const xValues = Array.from({ length: 100 }, (_, i) =>
        xMin + (i * (xMax - xMin)) / 99
    );

    const yValues = Array.from({ length: 100 }, (_, i) =>
        yMin + (i * (yMax - yMin)) / 99
    );

    const zSurface = yValues.map(y =>
        xValues.map(x => surfaceFunc.evaluate({ x, y }))
    );

    const maxBallZ = Math.max(...gradientDescentData.zs);
    const minBallZ = Math.min(...gradientDescentData.zs);

    const cappedZSurface = zSurface.map(row =>
        row.map(z => Math.max(Math.min(z, maxBallZ), minBallZ))
    );

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0
            }}>

                <Plot
                    style={{ width: "100%", height: "105%" }}
                    data={[
                        {
                            type: "surface",
                            x: xValues,
                            y: yValues,
                            z: cappedZSurface,
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
                        paper_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        plot_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        font: { color: isDarkMode ? "#ffffff" : "#111111" },
                        autosize: true,
                        title: {
                            text: "Gradient Descent on Surface",
                            font: { color: isDarkMode ? "#ffffff" : "#111111" }
                        },
                        scene: {
                            xaxis: {
                                title: "x",
                                backgroundcolor: isDarkMode ? "#111111" : "#ffffff",
                                gridcolor: isDarkMode ? "#444444" : "#dddddd",
                                zerolinecolor: isDarkMode ? "#888888" : "#cccccc",
                                color: isDarkMode ? "#ffffff" : "#111111",
                            },
                            yaxis: {
                                title: "y",
                                backgroundcolor: isDarkMode ? "#111111" : "#ffffff",
                                gridcolor: isDarkMode ? "#444444" : "#dddddd",
                                zerolinecolor: isDarkMode ? "#888888" : "#cccccc",
                                color: isDarkMode ? "#ffffff" : "#111111",
                            },
                            zaxis: {
                                title: "f(x, y)", backgroundcolor: isDarkMode ? "#111111" : "#ffffff",
                                gridcolor: isDarkMode ? "#444444" : "#dddddd",
                                zerolinecolor: isDarkMode ? "#888888" : "#cccccc",
                                range: [minBallZ, maxBallZ],
                                color: isDarkMode ? "#ffffff" : "#111111",
                            },
                        },
                        legend: {
                            x: -0.1,
                            y: 1,
                            font: { color: isDarkMode ? "#ffffff" : "#111111" }
                        }
                    }}
                />
            </div>
        </div>
    );
}


export function GradientDescentInput({ ThreeDinput, setThreeDInput,
    learningRate, setLearningRate,
    initialX, setInitialX,
    initialY, setInitialY,
    iterations, setIterations,
    xRangeMin, setXRangeMin,
    xRangeMax, setXRangeMax,
    yRangeMin, setYRangeMin,
    yRangeMax, setYRangeMax,
    autoRange, setAutoRange }) {
    return (
        <div className="side-input-container">
            <h2>Gradient Descent Visualizer (3D)</h2>

            <label>Function f(x, y):</label>
            <EditableMathField
                latex={ThreeDinput}
                onChange={(mathField) => setThreeDInput(mathField.latex())}
                className="math-input"
            />

            <div className="range-inputs">



                <label>Set Range Automatically</label>
                <input

                    type="checkbox"
                    checked={autoRange}
                    onChange={(e) => setAutoRange(e.target.checked)}
                    style={{ marginRight: "5px" }}
                />

                {!autoRange && (
                    <>
                        <label>X Min:</label>
                        <input type="number" value={xRangeMin} onChange={(e) => setXRangeMin(e.target.value)} />

                        <label>X Max:</label>
                        <input type="number" value={xRangeMax} onChange={(e) => setXRangeMax(e.target.value)} />

                        <label>Y Min:</label>
                        <input type="number" value={yRangeMin} onChange={(e) => setYRangeMin(e.target.value)} />

                        <label>Y Max:</label>
                        <input type="number" value={yRangeMax} onChange={(e) => setYRangeMax(e.target.value)} />
                    </>
                )}
                <label>Initial X (x₀):</label>
                <input type="number" value={initialX} onChange={(e) => setInitialX(e.target.value)} />

                <label>Initial Y (x₀):</label>
                <input type="number" value={initialY} onChange={(e) => setInitialY(e.target.value)} />

                <label>Learning Rate:</label>
                <input type="number" value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />

                <label>Iterations:</label>
                <input type="number" value={iterations} onChange={(e) => setIterations(e.target.value)} />
            </div>
        </div>
    );
}