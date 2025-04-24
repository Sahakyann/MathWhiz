import { EditableMathField } from "react-mathquill";
import React from "react";

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