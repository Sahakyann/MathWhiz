import { EditableMathField } from "react-mathquill";
import React from "react";

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