import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import './Styles-CSS/ThreeDGraphing.css';
import { useNavigate } from "react-router-dom";


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
    const gridSize = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin));

    return (
        <>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[gridSize, 0.05, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[gridSize / 2 + 0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0, 0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text
                position={[gridSize / 2 + 2, 0, 0]}
                fontSize={1}
                color="white"
                rotation={[0, 0, 0]}
            >
                X
            </Text>


            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.05, 0.05, gridSize]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 0, gridSize / 2 + 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text
                position={[0, 0, gridSize / 2 + 2]}
                fontSize={1}
                color="white"
                rotation={[0, 0, 0]}
            >
                Y
            </Text>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.05, gridSize, 0.05]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, gridSize / 2 + 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.2, 0, -0.5, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <Text
                position={[0, gridSize / 2 + 2, 0]}
                fontSize={1}
                color="white"
                rotation={[0, 0, 0]}
            >
                Z
            </Text>

            <gridHelper args={[gridSize, 20, "gray", "gray"]} rotation={[0, Math.PI / 2, 0]} />
        </>
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
