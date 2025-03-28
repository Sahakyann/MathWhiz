import React, { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";
import { addStyles, EditableMathField } from "react-mathquill";
import "./Styles-CSS/2dGraphing.css";

addStyles();

const GraphingCalculator = () => {
    const [expressions, setExpressions] = useState(["x^2", "sin(x)"]);
    const [data, setData] = useState([]);
    const [dragMode, setDragMode] = useState("pan");
    const [xRange, setXRange] = useState([-10, 10]);
    const [yRange, setYRange] = useState([-10, 10]);
    const plotRef = useRef(null);

    const [isPanning, setIsPanning] = useState(false);
    const [lastMousePos, setLastMousePos] = useState(null);

    useEffect(() => {
        plotGraph();
    }, [expressions, xRange, yRange]);

    const convertMathQuillToJS = (latex) => {
        return latex
            .replace(/\\left/g, "")
            .replace(/\\right/g, "")
            .replace(/\\sin/g, "sin")
            .replace(/\\cos/g, "cos")
            .replace(/\\tan/g, "tan")
            .replace(/\\sqrt{([^}]*)}/g, "sqrt($1)")
            .replace(/\\ln/g, "ln")
            .replace(/\\log/g, "log")
            .replace(/\\pi/g, "pi")
            .replace(/\\theta/g, "theta")
            .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)")
            .replace(/([0-9a-zA-Z]+)\^{([^}]*)}/g, "($1^($2))")
            .replace(/^{([^}]*)}/g, "($1)");
    };

    const plotGraph = () => {
        try {
            let xValues = Array.from({ length: 200 }, (_, i) => xRange[0] + ((xRange[1] - xRange[0]) * i / 200));

            let graphData = expressions.map((expr, index) => {
                try {
                    let convertedExpr = convertMathQuillToJS(expr);
                    console.log("Converted Expression: " + convertedExpr)
                    let yValues = xValues.map(x => evaluate(convertedExpr, { x }));

                    return {
                        x: xValues,
                        y: yValues,
                        type: "scatter",
                        mode: "lines",
                        name: expr,
                        marker: { color: `hsl(${index * 60}, 100%, 70%)` }
                    };
                } catch (error) {
                    console.error(`Error parsing function: ${expr}`, error);
                    return null;
                }
            }).filter(item => item !== null);

            setData(graphData);
        } catch (error) {
            console.error("Invalid function(s)");
        }
    };


    const handleWheelZoom = (event) => {
        if (!plotRef.current || !plotRef.current.contains(event.target)) return;
        event.preventDefault();
        const zoomFactor = event.deltaY > 0 ? 1.2 : 0.8;
        setXRange([
            (xRange[0] + xRange[1]) / 2 - ((xRange[1] - xRange[0]) / 2) * zoomFactor,
            (xRange[0] + xRange[1]) / 2 + ((xRange[1] - xRange[0]) / 2) * zoomFactor
        ]);
        setYRange([
            (yRange[0] + yRange[1]) / 2 - ((yRange[1] - yRange[0]) / 2) * zoomFactor,
            (yRange[0] + yRange[1]) / 2 + ((yRange[1] - yRange[0]) / 2) * zoomFactor
        ]);
    };

    const handlePanStart = (event) => {
        setIsPanning(true);
        setLastMousePos({ x: event.clientX, y: event.clientY });
      };
      
      const handlePanMove = (event) => {
        if (!isPanning || !lastMousePos) return;
    
        const dx = (event.clientX - lastMousePos.x) * (xRange[1] - xRange[0]) / 2000;
        const dy = (event.clientY - lastMousePos.y) * (yRange[1] - yRange[0]) / 2000;
    
        setXRange((prevXRange) => [prevXRange[0] - dx, prevXRange[1] - dx]);
        setYRange((prevYRange) => [prevYRange[0] + dy, prevYRange[1] + dy]);
    
        setLastMousePos({ x: event.clientX, y: event.clientY });
        plotGraph();
      };
      
      const handlePanEnd = () => {
        setIsPanning(false);
        setLastMousePos(null);
      };

    useEffect(() => {
        document.addEventListener("wheel", handleWheelZoom, { passive: false });
        return () => document.removeEventListener("wheel", handleWheelZoom);
    }, [xRange, yRange]);

    useEffect(() => {
        document.addEventListener("mousedown", handlePanStart);
        document.addEventListener("mousemove", handlePanMove);
        document.addEventListener("mouseup", handlePanEnd);
      
        return () => {
          document.removeEventListener("mousedown", handlePanStart);
          document.removeEventListener("mousemove", handlePanMove);
          document.removeEventListener("mouseup", handlePanEnd);
        };
      }, [isPanning, lastMousePos, xRange, yRange]);


    return (
        <div className="graph-container">

            <div className="sidebar-graph">
                <h2>Functions</h2>
                {expressions.map((expr, i) => (
                    <div key={i} className="input-group">
                        <EditableMathField
                            latex={expr}
                            onChange={(mathField) => {
                                const newExpr = [...expressions];
                                newExpr[i] = mathField.latex();
                                setExpressions(newExpr);
                            }}
                            style={{ backgroundColor: "#333", color: "white", padding: "8px", borderRadius: "5px", width: "100%" }}
                        />
                        <button onClick={() => setExpressions(expressions.filter((_, index) => index !== i))}>
                            ❌
                        </button>
                    </div>
                ))}
                <button className="add-button" onClick={() => setExpressions([...expressions, ""])}>Add Function</button>

            </div>

    
            <div className="plot-area" ref={plotRef}>
                <Plot
                    data={data}
                    layout={{
                        title: "Graphing Calculator",
                        xaxis: { title: "x", range: xRange, zeroline: true, gridcolor: "#444", color: "#ffffff" },
                        yaxis: { title: "y", range: yRange, zeroline: true, gridcolor: "#444", color: "#ffffff" },
                        plot_bgcolor: "#121212",
                        paper_bgcolor: "#121212",
                        dragmode: dragMode,
                        autosize: true,
                        font: { color: "#ffffff" }
                    }}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
};

export default GraphingCalculator;
