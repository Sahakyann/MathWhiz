import { EditableMathField } from "react-mathquill";
import React from "react";

export function GradientDescentInput({ ThreeDinput, setThreeDInput, learningRate, setLearningRate, initialX, setInitialX, initialY, setInitialY, iterations, setIterations }) {
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
                <label>Initial x:</label>
                <input type="number" value={initialX} onChange={(e) => setInitialX(e.target.value)} />

                <label>Initial y:</label>
                <input type="number" value={initialY} onChange={(e) => setInitialY(e.target.value)} />

                <label>Learning Rate:</label>
                <input type="number" value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />

                <label>Iterations:</label>
                <input type="number" value={iterations} onChange={(e) => setIterations(e.target.value)} />
            </div>
        </div>
    );
}