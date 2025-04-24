import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import './Styles-CSS/ThreeDGraphing.css';
import { useNavigate } from "react-router-dom";
import { evaluate, compile } from "mathjs";
import {parseLatexToMath, fixMultiplication} from "./LatexParserNew"


const UpdateBounds = ({ cameraRef, setXBounds, setYBounds }) => {
    useFrame(() => {
        if (!cameraRef.current) return;

        const distance = cameraRef.current.position.length();
        const span = distance * 0.4;
        setXBounds({ xMin: -span, xMax: span });
        setYBounds({ yMin: -span, yMax: span });
    });

    return null;
};



const generateSurface = (func, xMin, xMax, yMin, yMax) => {
    const spanX = xMax - xMin;
    const spanY = yMax - yMin;
    const baseDensity = 5;
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

const GraphSurface = ({ expression, xMin, xMax, yMin, yMax }) => {
    const meshRef = useRef();

    useEffect(() => {
        try {
            const mathFunc = new Function("x", "y", `return ${expression};`);
            const newGeometry = generateSurface(mathFunc, xMin, xMax, yMin, yMax);

            if (meshRef.current) {
                if (meshRef.current.geometry) {
                    meshRef.current.geometry.dispose();
                }
                meshRef.current.geometry = newGeometry;
            }
        } catch (error) {
            console.error("Invalid function input:", error);
        }
    }, [expression, xMin, xMax, yMin, yMax]);

    return (
        <mesh ref={meshRef}>
            <meshStandardMaterial color="red" roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
        </mesh>
    );
};

const GridAndAxes = ({ xMin, xMax, yMin, yMax }) => {
    const groupRef = useRef();
    const camera = useThree((state) => state.camera);

    const gridSize = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin));

    const tickSpacing = 2; // You can adjust spacing (e.g., 1, 2, 5)
    const xTicks = [];
    const yTicks = [];
    const zTicks = [];

    

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
                        child.scale.setScalar(scaleFactor * 0.6); // slightly smaller for tick numbers
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
        }
    });

    return (
        <group ref={groupRef}>
            {/* Axis lines */}
            {/* X Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[gridSize, 0.05, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>
            {/* Y Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[0.05, 0.05, gridSize]} />
                <meshBasicMaterial color="white" />
            </mesh>
            {/* Z Axis */}
            <mesh position={[0, 0, 0]} userData={{ axisLine: true }}>
                <boxGeometry args={[0.05, gridSize, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>

            {/* Arrowheads and labels */}
            {/* X Arrow */}
            <mesh position={[gridSize / 2 + 0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} userData={{ constantSize: true, axis: 'x' }}>
                <cylinderGeometry args={[0.2, 0, 0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[gridSize / 2 + 2, 0, 0]} fontSize={1} color="white" rotation={[0, 0, 0]} userData={{ constantSize: true, axis: 'xLabel' }}>X</Text>

            {/* Y Arrow */}
            <mesh position={[0, 0, gridSize / 2 + 0.3]} rotation={[Math.PI / 2, 0, 0]} userData={{ constantSize: true, axis: 'y' }}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[0, 0, gridSize / 2 + 2]} fontSize={1} color="white" rotation={[0, 0, 0]} userData={{ constantSize: true, axis: 'yLabel' }}>Y</Text>

            {/* Z Arrow */}
            <mesh position={[0, gridSize / 2 + 0.3, 0]} rotation={[0, Math.PI / 2, 0]} userData={{ constantSize: true, axis: 'z' }}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[0, gridSize / 2 + 2, 0]} fontSize={1} color="white" rotation={[0, 0, 0]} userData={{ constantSize: true, axis: 'zLabel' }}>Z</Text>

            {/* Tick Labels */}
            {xTicks.map((x) => (
                <Text
                    key={`x-${x}`}
                    position={[x, 0, -1]}
                    fontSize={0.8}
                    color="white"
                    rotation={[0, 0, 0]}
                    userData={{ constantSize: true, tickLabel: true }}
                >
                    {x}
                </Text>
            ))}
            {yTicks.map((y) => (
                <Text
                    key={`y-${y}`}
                    position={[-1, 0, y]}
                    fontSize={0.8}
                    color="white"
                    rotation={[0, 0, 0]}
                    userData={{ constantSize: true, tickLabel: true }}
                >
                    {y}
                </Text>
            ))}
            {zTicks.map((z) => (
                <Text
                    key={`z-${z}`}
                    position={[-1, z, 0]}
                    fontSize={0.8}
                    color="white"
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


const ThreeDGraph = () => {
    const [expression, setExpression] = useState("Math.sin(x) * Math.cos(y)");
    const [xMin, xMax] = [-10, 10];
    const [yMin, yMax] = [-10, 10];

    const cameraRef = useRef();
    const [xBounds, setXBounds] = useState({ xMin: -10, xMax: 10 });
    const [yBounds, setYBounds] = useState({ yMin: -10, yMax: 10 });

    const navigate = useNavigate();

    return (
        <div className="graph-container">
            <div className="sidebar-graph">
                <div className="input-group">
                    <label>Function:</label>
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="Enter function, e.g., Math.sin(x)*Math.cos(y)"
                    />
                </div>
                <button className="transparent-button" onClick={() => navigate('/toolsHub')}>
                    Back to Tools
                </button>
            </div>

            <div className="plot-area">
                <Canvas camera={{ position: [25, 25, 25], fov: 60 }} onCreated={({ camera }) => (cameraRef.current = camera)}>

                    <UpdateBounds
                        cameraRef={cameraRef}
                        setXBounds={setXBounds}
                        setYBounds={setYBounds}
                    />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={0.7} />
                    <GraphSurface
                        expression={expression}
                        xMin={xBounds.xMin}
                        xMax={xBounds.xMax}
                        yMin={yBounds.yMin}
                        yMax={yBounds.yMax}
                    />
                    <GridAndAxes
                        xMin={xBounds.xMin}
                        xMax={xBounds.xMax}
                        yMin={yBounds.yMin}
                        yMax={yBounds.yMax}
                    />
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
};

export default ThreeDGraph;
