import React from "react";
import Plot from "react-plotly.js";

export function CLTVisualizer({ cltData, isDarkMode }) {
    if (!cltData.length) return null;

    const mean = cltData.reduce((a, b) => a + b, 0) / cltData.length;
    const stddev = Math.sqrt(cltData.reduce((a, b) => a + (b - mean) ** 2, 0) / cltData.length);

    const xNormal = Array.from({ length: 200 }, (_, i) => {
        const min = Math.min(...cltData);
        const max = Math.max(...cltData);
        return min + (i * (max - min)) / 199;
    });

    const yNormal = xNormal.map(x => (1 / (stddev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / stddev) ** 2));

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
                            x: cltData,
                            type: 'histogram',
                            histnorm: 'probability density',
                            marker: { color: 'rgba(0, 191, 255, 0.7)' },
                            nbinsx: 50,
                            name: 'Sample Means'
                        },
                        {
                            x: xNormal,
                            y: yNormal,
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: isDarkMode ? 'white' : 'grey', width: 3 },
                            name: 'Normal Curve'
                        }
                    ]}
                    layout={{
                        title: 'Central Limit Theorem - Sampling Distribution of the Mean',
                        paper_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        plot_bgcolor: isDarkMode ? "#111111" : "#ffffff",
                        font: { color: isDarkMode ? "#ffffff" : "#111111" },
                        autosize: true,
                        xaxis: {
                            title: 'Sample Mean',
                            gridcolor: isDarkMode ? '#444444' : '#dddddd',
                        },
                        yaxis: {
                            title: 'Density',
                            gridcolor: isDarkMode ? '#444444' : '#dddddd',
                        },
                        showlegend: true,
                        legend: {
                            x: 0.7,
                            y: 0.95,
                            font: { color: isDarkMode ? 'white' : 'black' }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export function CentralLimitTheoremInput({
    numSamples, setNumSamples,
    startExperiments, setStartExperiments,
    endExperiments, setEndExperiments,
    currentExperiments, setCurrentExperiments,
    distributionType, setDistributionType
}) {
    return (
        <div>
            <h2>Central Limit Theorem Settings</h2>
            <div className="range-inputs">
                <label>Samples per Experiment:</label>
                <input type="number" value={numSamples} onChange={(e) => setNumSamples(e.target.value)} />

                <label>Start Number of Experiments:</label>
                <input type="number" value={startExperiments} onChange={(e) => setStartExperiments(e.target.value)} />

                <label>End Number of Experiments:</label>
                <input type="number" value={endExperiments} onChange={(e) => setEndExperiments(e.target.value)} />

                <label>Current Experiments: {currentExperiments}</label>
                <input
                    type="range"
                    min={startExperiments}
                    max={endExperiments}
                    value={currentExperiments}
                    onChange={(e) => setCurrentExperiments(e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>
            <label>Distribution Type:</label>
            <select value={distributionType} onChange={(e) => setDistributionType(e.target.value)}>
                <option value="uniform">Uniform</option>
                <option value="normal">Normal</option>
                <option value="exponential">Exponential</option>
            </select>
        </div>
    );
}


