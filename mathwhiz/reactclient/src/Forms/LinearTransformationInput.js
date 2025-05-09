import { EditableMathField } from "react-mathquill";
import React from "react";

export function LinearTransformationInput({ selectedType, matrixA, setMatrixA, matrixB, setMatrixB, matrixC, setMatrixC, matrixD, setMatrixD, vectors, setVectors }) {
    const addVector = () => {
        setVectors([...vectors, [0, 0]]);
    };

    const removeVector = (index) => {
        setVectors(vectors.filter((_, i) => i !== index));
    };

    const updateVector = (index, axis, value) => {
        const updatedVectors = [...vectors];
        updatedVectors[index][axis] = parseFloat(value) || 0;
        setVectors(updatedVectors);
    };

    return (
        <div className="side-input-container">

            <h2>
                {selectedType === "eigenvector-visualizer"
                    ? "Eigenvector Visualization"
                    : "Linear Transformation Visualization"}
            </h2>


            <h3>Transformation Matrix</h3>
            <div className="matrix-container">
                <div>
                    <input type="number" value={matrixA} onChange={(e) => setMatrixA(e.target.value)} className="matrix-input" />
                    <input type="number" value={matrixB} onChange={(e) => setMatrixB(e.target.value)} className="matrix-input" />
                </div>
                <div>
                    <input type="number" value={matrixC} onChange={(e) => setMatrixC(e.target.value)} className="matrix-input" />
                    <input type="number" value={matrixD} onChange={(e) => setMatrixD(e.target.value)} className="matrix-input" />
                </div>
            </div>

            <h3>Sample Vectors</h3>
            <button onClick={addVector} className="vector-add-btn">+ Add Vector</button>
            <div className="vector-container">

                {vectors.map((vector, index) => (
                    <div key={index} className="vector-input">
                        <label>X</label>
                        <input type="number" value={vector[0]} onChange={(e) => updateVector(index, 0, e.target.value)} className="vector-field" />
                        <label>Y</label>
                        <input type="number" value={vector[1]} onChange={(e) => updateVector(index, 1, e.target.value)} className="vector-field" />
                        {vectors.length > 1 && <button onClick={() => removeVector(index)} className="vector-remove-btn">-</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}