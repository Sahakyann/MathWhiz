import { EditableMathField } from "react-mathquill";
import React from "react";
import { useEffect } from "react";

function generateTaylorSeriesPreview(input, expansionPoint, degree) {
    const a = parseFloat(expansionPoint);
    const terms = [];

    for (let n = 0; n <= degree; n++) {
        const deriv = n === 0 ? `f(${a})` : `f^{(${n})}(${a})`;
        const term = n === 0
            ? `${deriv}`
            : `\\frac{${deriv}}{${n}!}(x - ${a})^{${n}}`;
        terms.push(term);
    }

    if (terms.length <= 4) {
        return terms.join(" + ");
    } else {
        return [
            terms[0],
            terms[1],
            "\\dots",
            terms[degree - 1],
            terms[degree]
        ].join(" + ");
    }
}

export function TaylorSeriesInput({ input, setInput, expansionPoint, setExpansionPoint, degree, setDegree, xMin, setXMin, xMax, setXMax, taylorPreview, setTaylorPreview }) {

    useEffect(() => {
        if (input && expansionPoint !== "" && degree !== "") {
            const preview = generateTaylorSeriesPreview(input, expansionPoint, parseInt(degree));
            setTaylorPreview(preview);
        }
    }, [input, expansionPoint, degree]);

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
