import React, { useEffect } from "react";

export function MatrixMultiplicationInput({ matrixA, setMatrixA, matrixB, setMatrixB }) {
    const maxSize = 8;

    const resizeMatrix = (rows, cols) => {
        const resize = (matrix, r, c) =>
            Array.from({ length: r }, (_, i) =>
                Array.from({ length: c }, (_, j) => (matrix[i]?.[j] ?? 0))
            );
        setMatrixA(prev => resize(prev, rows, cols));
        setMatrixB(prev => resize(prev, cols, cols)); // B must be cols × output-cols
    };

    const handleResize = (rows, cols) => {
        const r = Math.min(maxSize, Math.max(1, parseInt(rows)));
        const c = Math.min(maxSize, Math.max(1, parseInt(cols)));
        resizeMatrix(r, c);
    };

    const updateMatrix = (matrix, setMatrix, i, j, value) => {
        const updated = matrix.map((row, ri) =>
            row.map((cell, ci) => (ri === i && ci === j ? parseFloat(value) || 0 : cell))
        );
        setMatrix(updated);
    };

    const renderMatrix = (matrix, setMatrix, label) => (
        <div style={{ marginBottom: "1.5rem" }}>
            <h3>{label}</h3>
            <div className="matrix-grid"
                style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, 50px)` }}>
                {matrix.map((row, i) => (
                    <div key={i}>
                        {row.map((cell, j) => (
                            <input
                                key={`${i}-${j}`}
                                type="number"
                                value={cell}
                                className="matrix-input"
                                onChange={(e) => updateMatrix(matrix, setMatrix, i, j, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="side-input-container">
            <h2>Matrix Multiplication Visualization</h2>

            <div className="matrix-multiplication-dimensions">
                <label>
                    Rows (A):
                    <input
                        type="number"
                        min="1"
                        max={maxSize}
                        defaultValue={matrixA.length}
                        onChange={(e) => handleResize(e.target.value, matrixA[0]?.length || 2)}
                    />
                </label>

                <label>
                    Columns (A) / Rows (B):
                    <input
                        type="number"
                        min="1"
                        max={maxSize}
                        defaultValue={matrixA[0]?.length || 2}
                        onChange={(e) => handleResize(matrixA.length, e.target.value)}
                    />
                </label>
            </div>
            <div className="matrix-multiplication-grid">
                {renderMatrix(matrixA, setMatrixA, "Matrix A")}
            </div>
            <div className="matrix-multiplication-grid">
                {renderMatrix(matrixB, setMatrixB, "Matrix B")}
            </div>
        </div>
    );
}
