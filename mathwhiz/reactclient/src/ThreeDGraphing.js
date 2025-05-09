import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import './Styles-CSS/ThreeDGraphing.css';
import { useNavigate, useParams } from "react-router-dom";
import { evaluate, compile } from "mathjs";
import { parseLatexToMath, fixMultiplication } from "./LatexParserNew"
import { addStyles, EditableMathField } from "react-mathquill";
addStyles();




const generateSurface = (func, xMin, xMax, yMin, yMax,baseDensity) => {
    const spanX = xMax - xMin;
    const spanY = yMax - yMin;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
 
    const resolutionX = clamp(Math.floor(spanX * baseDensity), 50, 300);
    const resolutionY = clamp(Math.floor(spanY * baseDensity), 50, 300);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const stepX = spanX / resolutionX;
    const stepY = spanY / resolutionY;

    for (let i = 0; i <= resolutionX; i++) {
        let x = xMin + i * stepX;
        for (let j = 0; j <= resolutionY; j++) {
            let y = yMin + j * stepY;
            let z = func(x, y);
            vertices.push(x, z, y);
        }
    }

    const w = resolutionY + 1;
    for (let i = 0; i < resolutionX; i++) {
        for (let j = 0; j < resolutionY; j++) {
            const a = i * w + j;
            const b = a + 1;
            const c = a + w;
            const d = c + 1;

            indices.push(a, b, d);
            indices.push(a, d, c);
        }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
};

function getColorForIndex(index) {
    const colors = ["red", "blue", "green", "yellow", "purple", "cyan", "orange"];
    return colors[index % colors.length];
}

const GraphSurface = ({ compiledExpr, xMin, xMax, yMin, yMax, color = "red",distance }) => {
    const meshRef = useRef();

    useEffect(() => {
        try {
            const lodFactor = Math.floor(Math.min(distance / 10, 4));
            const baseDensity = [8, 6, 4, 3, 2][lodFactor];

            const mathFunc = (x, y) => compiledExpr.evaluate({ x: x, y: y });
            const newGeometry = generateSurface(mathFunc, xMin, xMax, yMin, yMax, baseDensity);

            if (meshRef.current) {
                if (meshRef.current.geometry) {
                    meshRef.current.geometry.dispose();
                }
                meshRef.current.geometry = newGeometry;
            }
        } catch (error) {
            console.error("Error in GraphSurface:", error);
        }
    }, [compiledExpr, xMin, xMax, yMin, yMax,distance]);

    return (
        <mesh ref={meshRef}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
        </mesh>
    );
};

function calculateDynamicTickSpacing(distance) {
    if (distance < 20) return 0.5;
    if (distance < 40) return 1;
    if (distance < 80) return 2;
    if (distance < 150) return 5;
    if (distance < 300) return 10;
    return 20;
}

const GridAndAxes = ({ xMin, xMax, yMin, yMax, isDarkMode }) => {
    const groupRef = useRef();
    const camera = useThree((state) => state.camera);

    const gridSize = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin));
    const distance = camera.position.length();
    const tickSpacing = calculateDynamicTickSpacing(distance);
    const xTicks = [];
    const yTicks = [];
    const zTicks = [];

    const axisColor = isDarkMode ? "white" : "#888";
    const gridColor = isDarkMode ? "gray" : "#ccc";
    const labelColor = isDarkMode ? "white" : "#888";

    const xTickRefs = useRef([]);
    const yTickRefs = useRef([]);
    const zTickRefs = useRef([]);
    const xyzLabelRefs = useRef([]);

    for (let x = Math.ceil(xMin / tickSpacing) * tickSpacing; x <= xMax; x += tickSpacing) {
        xTicks.push(x);
    }
    for (let y = Math.ceil(yMin / tickSpacing) * tickSpacing; y <= yMax; y += tickSpacing) {
        yTicks.push(y);
    }
    for (let z = Math.ceil(yMin / tickSpacing) * tickSpacing; z <= yMax; z += tickSpacing) {
        zTicks.push(z);
    }

    useFrame(() => {
        if (groupRef.current) {
            const distance = camera.position.length();
            const scaleFactor = distance * 0.03;
            const thickness = distance * 0.003;
            const span = distance * 0.756;

            groupRef.current.children.forEach(child => {
                if (child.userData.constantSize) {
                    child.scale.setScalar(scaleFactor);

                    if (child.userData.axis === 'x') {
                        child.position.set(span / 2 + scaleFactor, 0, 0);
                    } else if (child.userData.axis === 'y') {
                        child.position.set(0, 0, span / 2 + scaleFactor);
                    } else if (child.userData.axis === 'z') {
                        child.position.set(0, span / 2 + scaleFactor, 0);
                    } else if (child.userData.axis === 'xLabel') {
                        child.position.set(span / 2 + 2 * scaleFactor, 0, 0);
                    } else if (child.userData.axis === 'yLabel') {
                        child.position.set(0, 0, span / 2 + 2 * scaleFactor);
                    } else if (child.userData.axis === 'zLabel') {
                        child.position.set(0, span / 2 + 2 * scaleFactor, 0);
                    } else if (child.userData.tickLabel) {
                        child.scale.setScalar(scaleFactor * 0.6);
                    }
                } else if (child.userData.axisLine) {
                    if (child.geometry?.parameters) {
                        const { width, height, depth } = child.geometry.parameters;
                        if (width > height && width > depth) {
                            child.scale.set(1, thickness / height, thickness / depth);
                        } else if (height > width && height > depth) {
                            child.scale.set(thickness / width, 1, thickness / depth);
                        } else if (depth > width && depth > height) {
                            child.scale.set(thickness / width, thickness / height, 1);
                        }
                    }
                }
            });

            xTickRefs.current.forEach(label => {
                if (label) label.quaternion.copy(camera.quaternion);
            });
            yTickRefs.current.forEach(label => {
                if (label) label.quaternion.copy(camera.quaternion);
            });
            zTickRefs.current.forEach(label => {
                if (label) label.quaternion.copy(camera.quaternion);
            });
            xyzLabelRefs.current.forEach(label => {
                if (label) label.quaternion.copy(camera.quaternion);
            });
        }
    });

    return (
        <group ref={groupRef}>
            {/* Axis lines */}
            {/* X Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[gridSize, 0.05, 0.05]} />
                <meshBasicMaterial color={axisColor} />
            </mesh>
            {/* Y Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[0.05, 0.05, gridSize]} />
                <meshBasicMaterial color={axisColor}  />
            </mesh>
            {/* Z Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[0.05, gridSize, 0.05]} />
                <meshBasicMaterial color={axisColor} />
            </mesh>

            {/* Arrowheads and labels */}
            {/* X Arrow */}
            <mesh position={[gridSize / 2 + 0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} userData={{ constantSize: true, axis: 'x' }}>
                <cylinderGeometry args={[0.2, 0, 0.5, 32]} />
                <meshBasicMaterial color={labelColor}  />
            </mesh>

            <Text
                ref={(el) => xyzLabelRefs.current[0] = el}
                position={[gridSize / 2 + 2, 0, 0]}
                fontSize={1} color={labelColor} 
                rotation={[0, 0, 0]}
                userData={{ constantSize: true, axis: 'xLabel' }}>
                X
            </Text>

            {/* Y Arrow */}
            <mesh position={[0, 0, gridSize / 2 + 0.3]} rotation={[Math.PI / 2, 0, 0]} userData={{ constantSize: true, axis: 'y' }}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color={labelColor}  />
            </mesh>
            <Text
                ref={(el) => xyzLabelRefs.current[1] = el}
                position={[0, 0, gridSize / 2 + 2]}
                fontSize={1} color={labelColor} 
                rotation={[0, 0, 0]}
                userData={{ constantSize: true, axis: 'yLabel' }}>
                Y
            </Text>

            {/* Z Arrow */}
            <mesh position={[0, gridSize / 2 + 0.3, 0]} rotation={[0, Math.PI / 2, 0]} userData={{ constantSize: true, axis: 'z' }}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color={labelColor}  />
            </mesh>
            <Text
                ref={(el) => xyzLabelRefs.current[2] = el}
                position={[0, gridSize / 2 + 2, 0]}
                fontSize={1} color={labelColor} 
                rotation={[0, 0, 0]}
                userData={{ constantSize: true, axis: 'zLabel' }}>
                Z
            </Text>

            {/* Tick Labels */}
            {xTicks.map((x, index) => (
                <Text
                    key={`x-${x}`}
                    ref={(el) => xTickRefs.current[index] = el}
                    position={[x, 0, -distance * 0.02]}
                    fontSize={0.8}
                    color={axisColor}
                    rotation={[0, 0, 0]}
                    userData={{ constantSize: true, tickLabel: true }}
                >
                    {x}
                </Text>
            ))}
            {yTicks.map((y, index) => (
                <Text
                    key={`y-${y}`}
                    ref={(el) => yTickRefs.current[index] = el}
                    position={[-distance * 0.02, 0, y]}
                    fontSize={0.8}
                    color={axisColor}
                    rotation={[0, 0, 0]}
                    userData={{ constantSize: true, tickLabel: true }}
                >
                    {y}
                </Text>
            ))}
            {zTicks.map((z, index) => (
                <Text
                    key={`z-${z}`}
                    ref={(el) => zTickRefs.current[index] = el}
                    position={[-distance * 0.02, z, 0]}
                    fontSize={0.8}
                    color={axisColor}
                    rotation={[0, 0, 0]}
                    userData={{ constantSize: true, tickLabel: true }}
                >
                    {z}
                </Text>
            ))}

            {/* Grid */}
            <gridHelper args={[gridSize, 20, "gray", "gray"]} rotation={[0, Math.PI / 2, 0]} />
        </group>
    );
};



const ThreeDGraph = ({ isDarkMode }) => {

    const UpdateBounds = ({ cameraRef, setXBounds, setYBounds }) => {
        useFrame(() => {
            if (!cameraRef.current) return;
    
            const distance = cameraRef.current.position.length();
            const span = distance * 0.4;
            setXBounds({ xMin: -span, xMax: span });
            setYBounds({ yMin: -span, yMax: span });
            setDistance(distance);
        });
    
        return null;
    };
    
    const [functions, setFunctions] = useState([
        { expression: "sin(x) * cos(y)", color: "#ff0000", compiledExpr: "sin(x) * cos(y)" }
    ]);
    const [xMin, xMax] = [-10, 10];
    const [yMin, yMax] = [-10, 10];

    const cameraRef = useRef();
    const [xBounds, setXBounds] = useState({ xMin: -10, xMax: 10 });
    const [yBounds, setYBounds] = useState({ yMin: -10, yMax: 10 });
    const [distance, setDistance] = useState(25);
    const navigate = useNavigate();

    const { userId } = useParams();
    function deleteFunction(index) {
        const newFunctions = [...functions];
        newFunctions.splice(index, 1);
        setFunctions(newFunctions);
    }
    return (
        <div className="graph-container">
            <div className="sidebar-graph">
                {functions.map((func, index) => (
                    <div key={index} className="input-group">

                        <input
                            type="color"
                            className="color-picker"
                            value={func.color}
                            onChange={(e) => {
                                const newFunctions = [...functions];
                                newFunctions[index].color = e.target.value;
                                setFunctions(newFunctions);
                            }}
                        />
                        <EditableMathField
                            latex={func.expression}
                            onChange={(mathField) => {
                                const newFunctions = [...functions];
                                const latex = mathField.latex();
                                const parsed = fixMultiplication(parseLatexToMath(latex));
                                try {
                                    const compiled = compile(parsed);
                                    newFunctions[index].expression = latex;
                                    newFunctions[index].compiledExpr = compiled;
                                    setFunctions(newFunctions);
                                } catch (e) {
                                    console.error("Invalid expression:", e);
                                }
                            }}
                            style={{
                                backgroundColor: isDarkMode ? "#333" : "#fff",
                                color: isDarkMode ? "white" : "#111", padding: "8px", borderRadius: "5px", border: isDarkMode ? "none" : "1px solid #ccc", width: "100%"
                            }}
                        />
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button
                                    onClick={() => deleteFunction(index)}
                                    className="delete-function-button"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="function-buttons">
                    <button onClick={() => setFunctions([...functions, { expression: "", color: "#ff0000" }])}>Add Function</button>
                    <button
                        onClick={() => setFunctions(functions.slice(0, -1))}
                        disabled={functions.length === 1}
                    >
                        Remove Last Function
                    </button>
                </div>
                <button className="transparent-button" onClick={() => navigate(`/toolsHub/${userId}`)}>
                    Back to Tools
                </button>
            </div>

            <div className="plot-area">
                <Canvas camera={{ position: [25, 25, 25], fov: 60 }} onCreated={({ camera }) => (cameraRef.current = camera)}>

                    <UpdateBounds
                        cameraRef={cameraRef}
                        setXBounds={setXBounds}
                        setYBounds={setYBounds}
                        setDistance={setDistance}
                    />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={0.7} />
                    {functions.map((func, index) => (
                        <GraphSurface
                            key={index}
                            compiledExpr={func.compiledExpr}
                            xMin={xBounds.xMin}
                            xMax={xBounds.xMax}
                            yMin={yBounds.yMin}
                            yMax={yBounds.yMax}
                            color={func.color}
                            distance={distance} 
                        />
                    ))}
                    <GridAndAxes
                        xMin={xBounds.xMin}
                        xMax={xBounds.xMax}
                        yMin={yBounds.yMin}
                        yMax={yBounds.yMax}
                        isDarkMode={isDarkMode}
                    />
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
};

export default ThreeDGraph;
