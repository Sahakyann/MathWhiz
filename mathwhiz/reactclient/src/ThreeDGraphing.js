import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import './Styles-CSS/ThreeDGraphing.css'; 

const generateSurface = (func, xMin, xMax, yMin, yMax, resolution = 100) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const stepX = (xMax - xMin) / resolution;
    const stepY = (yMax - yMin) / resolution;

    for (let x = xMin; x <= xMax; x += stepX) {
        for (let y = yMin; y <= yMax; y += stepY) {
            const z = func(x, y);
            vertices.push(x, z, y);
        }
    }

    const w = Math.floor((xMax - xMin) / stepX) + 1;
    for (let i = 0; i < w - 1; i++) {
        for (let j = 0; j < w - 1; j++) {
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
    const gridSize = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin));

    return (
        <>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[gridSize, 0.05, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[10.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0, 0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[gridSize / 2 + 1, 0, 0]} fontSize={1} color="white">X</Text>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.05, 0.05, gridSize]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 0, 10.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[0, 0, gridSize / 2 + 1]} fontSize={1} color="white">Y</Text>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.05, gridSize, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text position={[0, gridSize / 2 + 1, 0]} fontSize={1} color="white">Z</Text>

            <gridHelper args={[gridSize, 20, "gray", "gray"]} rotation={[0, Math.PI / 2, 0]} />
        </>
    );
};

const ThreeDGraph = () => {
    const [expression, setExpression] = useState("Math.sin(x) * Math.cos(y)");
    const [xMin, setXMin] = useState(-10);
    const [xMax, setXMax] = useState(10);
    const [yMin, setYMin] = useState(-10);
    const [yMax, setYMax] = useState(10);

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
                <div className="input-group">
                    <label>X Range:</label>
                    <input type="number" value={xMin} onChange={(e) => setXMin(Number(e.target.value))} />
                    <input type="number" value={xMax} onChange={(e) => setXMax(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Y Range:</label>
                    <input type="number" value={yMin} onChange={(e) => setYMin(Number(e.target.value))} />
                    <input type="number" value={yMax} onChange={(e) => setYMax(Number(e.target.value))} />
                </div>
            </div>

            <div className="plot-area">
                <Canvas camera={{ position: [25, 25, 25], fov: 60 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={0.7} />
                    <GraphSurface expression={expression} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
                    <GridAndAxes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
};

export default ThreeDGraph;
