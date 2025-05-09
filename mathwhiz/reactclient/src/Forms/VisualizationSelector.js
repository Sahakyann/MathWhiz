import "../Styles-CSS/visualCalculators.css";

export function VisualizationSelector({ selectedType, setSelectedType, setVideoUrl }) {
    return (
        <div>
            <h3>Select Visualization</h3>


            <select value={selectedType} onChange={(e) => {
                const newType = e.target.value;
                setSelectedType(newType);
                if (newType === "gradient-descent" || newType === "central-limit-theorem" ||
                    newType === "law-of-large-numbers"
                ) {
                    setVideoUrl(null);
                }
            }}>
                <option value="integral">Integral Visualization</option>
                <option value="linear-transformation">Linear Transformation</option>
                <option value="eigenvector-visualizer">Eigenvectors</option>
                <option value="taylor-series">Taylor Series Approximation</option>
                <option value="central-limit-theorem">Central Limit Theorem</option>
                <option value="newtons-method">Newton's Method</option>
                <option value="gradient-descent">Gradient Descent Visualizer</option>
                <option value="matrix-multiplication">Matrix Multiplication</option>
                <option value="law-of-large-numbers">Law of Large Numbers</option>
                <option value="geometric-fractal">Geometric Fractal</option>
            </select>
        </div >
    );
}

export function SettingsSelector({ aspectRatio, backgroundColor, setAspectRatio, setBackgroundColor, setShowSettings, screenshotOnly, setScreenshotOnly }) {
    return (
        <div>
            <h3>Settings</h3>

            <label>Aspect Ratio</label>
            <select onChange={(e) => setAspectRatio(e.target.value)} value={aspectRatio}>
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
                <option value="1:1">1:1</option>
                <option value="21:9">21:9</option>
                {/*<option value="custom">Custom (enter manually below)</option>*/}
            </select>

            {/*<input
                type="text"
                placeholder="Custom Aspect Ratio (e.g. 2:1)"
                onBlur={(e) => setAspectRatio(e.target.value)}
                style={{ marginTop: "5px", width: "100%" }}
            />*/}

            <label style={{ marginTop: "10px" }}>Background Color</label>
            <input
                value={backgroundColor}
                type="color"
                onChange={(e) => setBackgroundColor(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="checkbox-container" style={{ marginTop: "1rem" }}>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={screenshotOnly}
                        onChange={(e) => setScreenshotOnly(e.target.checked)}
                    />
                    <span className="checkbox-custom" />
                    Only Generate Screenshot of Final Result
                </label>
            </div>
            <div className="settings-back-button-wrapper">
                <button
                    onClick={() => setShowSettings(false)}
                >
                    Back to Inputs
                </button>
            </div>

        </div>
    );
}