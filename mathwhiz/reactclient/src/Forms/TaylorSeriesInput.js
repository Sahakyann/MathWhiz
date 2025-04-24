import { EditableMathField } from "react-mathquill";
import React from "react";

export function TaylorSeriesInput({ input, setInput, expansionPoint, setExpansionPoint, degree, setDegree, xMin, setXMin, xMax, setXMax }) {
    return (
        <div className="side-input-container">
            <h2>Taylor Series Approximation</h2>

            <label>Function f(x): </label>
            <EditableMathField
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
                className="math-input"
            />
            <div className="range-inputs">
                <label>Expansion Point a:</label>
                <input type="number" value={expansionPoint} onChange={(e) => setExpansionPoint(e.target.value)} />

                <label>Maximum Degree n:</label>
                <input type="number" value={degree} onChange={(e) => setDegree(e.target.value)} />


                <label>X Min:</label>
                <input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />

                <label>X Max:</label>
                <input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
            </div>
        </div>
    );
}