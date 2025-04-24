import { EditableMathField } from "react-mathquill";
import React from "react";

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