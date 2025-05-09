import { EditableMathFiel, StaticMathField } from "react-mathquill";
import Plot from "react-plotly.js";

export function LLNVisualizer({ llnData, currentLLNTrial, llnTrials, distributionTypeLLN, llnTargetMean, llnLambda, isDarkMode }) {
    if (!llnData.length) return null;

    const totalTrials = parseInt(llnTrials);
    const fullXValues = Array.from({ length: totalTrials }, (_, i) => i + 1);
    const visibleXValues = fullXValues.slice(0, currentLLNTrial);
    const visibleYValues = llnData.slice(0, currentLLNTrial);

    const trueMean = distributionTypeLLN === "exponential"
        ? (1 / parseFloat(llnLambda))
        : parseFloat(llnTargetMean);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0
            }}>
                <Plot
                    style={{ width: "100%", height: "100%" }}
                    data={[
                        {
                            x: visibleXValues,
                            y: visibleYValues,
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: 'cyan', width: 3 },
                            name: 'Sample Mean'
                        },
                        {
                            x: [1, totalTrials],
                            y: [trueMean, trueMean],
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: isDarkMode ? 'white' : 'black', width: 2, dash: 'dash' },
                            name: `Target Mean (${trueMean.toFixed(3)})`
                        }
                    ]}
                    layout={{
                        title: 'Law of Large Numbers - Sample Mean Convergence',
                        paper_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        plot_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        font: { color: isDarkMode ? "#ffffff" : "#111111" },
                        autosize: true,
                        xaxis: {
                            title: 'Number of Trials',
                            gridcolor: isDarkMode ? "#444444" : "#dddddd",
                            zerolinecolor: isDarkMode ? "#888888" : "#cccccc",
                            range: [1, totalTrials],
                        },
                        yaxis: {
                            title: 'Sample Mean',
                            gridcolor: isDarkMode ? "#444444" : "#dddddd",
                            zerolinecolor: isDarkMode ? "#888888" : "#cccccc",
                        },
                        showlegend: true,
                        legend: {
                            x: 0.75,
                            y: 0.95,
                            bgcolor: 'rgba(0,0,0,0)',
                        }
                    }}
                />
            </div>
        </div>
    );
}

export function LLNInput({ llnTrials, setLlnTrials, distributionTypeLLN, setDistributionTypeLLN, llnTargetMean, setLlnTargetMean, llnLambda, setLlnLambda, isDarkMode }) {
    return (
        <div className="side-input-container">
            <h4>Law of Large Numbers Settings</h4>
            <div className="range-inputs">
                <label>Number of Trials:</label>
                <input
                    type="number"
                    value={llnTrials}
                    onChange={(e) => setLlnTrials(e.target.value)}
                    min="1"

                />

                <label>Distribution:</label>
                <select
                    value={distributionTypeLLN}
                    onChange={(e) => setDistributionTypeLLN(e.target.value)}

                >
                    <option value="uniform">Uniform</option>
                    <option value="normal">Normal</option>
                    <option value="exponential">Exponential</option>
                </select>

                {distributionTypeLLN !== "exponential" && (
                    <>
                        <label>Target Mean:</label>
                        <input
                            type="number"
                            value={llnTargetMean}
                            onChange={(e) => setLlnTargetMean(e.target.value)}

                        />
                    </>
                )}

                {distributionTypeLLN === "exponential" && (
                    <>
                        <label>Lambda (Rate Parameter):</label>
                        <input
                            type="number"
                            value={llnLambda}
                            onChange={(e) => setLlnLambda(e.target.value)}
                            min="0.0001"
                            step="0.0001"

                        />
                    </>
                )}
            </div>
            <div>
                <h4>Distribution Formula</h4>
                <div
                    style={{
                        fontSize: "1.2rem",
                        backgroundColor: isDarkMode ? "#333" : "#f2f2f2",
                        color: isDarkMode ? "white" : "black",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >
                    {distributionTypeLLN === "uniform" && llnTargetMean && (
                        <StaticMathField>
                            {`X \\sim \\text{Uniform}(0, ${parseFloat(llnTargetMean * 2).toFixed(2)})`}
                        </StaticMathField>
                    )}
                    {distributionTypeLLN === "normal" && llnTargetMean && (
                        <StaticMathField>
                            {`X \\sim \\mathcal{N}\\left(${parseFloat(llnTargetMean).toFixed(2)},\\,1\\right)`}
                        </StaticMathField>
                    )}
                    {distributionTypeLLN === "exponential" && llnLambda && (
                        <StaticMathField>
                            {`X \\sim \\text{Exponential}\\left(\\lambda = ${parseFloat(llnLambda).toFixed(2)}\\right)`}
                        </StaticMathField>
                    )}
                </div>
            </div>
        </div>
    );
}