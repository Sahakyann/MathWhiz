import React, { useRef, useEffect } from "react";

export function FractalVisualizer({ isDarkMode, depth = 4 }) {
    const canvasRef = useRef(null);

    // Persistent zoom/pan state using refs
    const scaleRef = useRef(1);
    const offsetXRef = useRef(0);
    const offsetYRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 600;

        let isDragging = false;
        let lastX, lastY;

        function clearCanvas() {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = isDarkMode ? "#111" : "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawKochIterative(p1, p2, maxDepth) {
            const stack = [{ p1, p2, depth: maxDepth }];

            while (stack.length > 0) {
                const { p1, p2, depth } = stack.pop();

                if (depth < 1) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    continue;
                }

                const dx = (p2.x - p1.x) / 3;
                const dy = (p2.y - p1.y) / 3;

                const pA = { x: p1.x + dx, y: p1.y + dy };
                const pB = { x: p1.x + 2 * dx, y: p1.y + 2 * dy };

                const angle = Math.PI / 3;
                const px = pA.x + Math.cos(angle) * dx - Math.sin(angle) * dy;
                const py = pA.y + Math.sin(angle) * dx + Math.cos(angle) * dy;
                const pC = { x: px, y: py };

                stack.push({ p1: pB, p2, depth: depth - 1 });
                stack.push({ p1: pC, p2: pB, depth: depth - 1 });
                stack.push({ p1: pA, p2: pC, depth: depth - 1 });
                stack.push({ p1, p2: pA, depth: depth - 1 });
            }
        }

        function drawFractal() {
            clearCanvas();

            ctx.save();
            ctx.translate(offsetXRef.current, offsetYRef.current);
            ctx.scale(scaleRef.current, scaleRef.current);

            ctx.strokeStyle = isDarkMode ? "white" : "black";

            ctx.lineWidth = Math.max(0.5 / scaleRef.current, 0.1);

            const centerX = 300;
            const centerY = 300;
            const size = 300;
            const height = size * Math.sqrt(3) / 2;

            const a = { x: centerX, y: centerY - height / 2 };
            const b = { x: centerX - size / 2, y: centerY + height / 2 };
            const c = { x: centerX + size / 2, y: centerY + height / 2 };

            const intDepth = Math.floor(depth);
            drawKochIterative(a, b, intDepth);
            drawKochIterative(b, c, intDepth);
            drawKochIterative(c, a, intDepth);

            ctx.restore();
        }

        drawFractal();

        function handleWheel(event) {
            const scaleAmount = 1.1;
            const zoom = event.deltaY < 0 ? scaleAmount : 1 / scaleAmount;

            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left - offsetXRef.current) / scaleRef.current;
            const y = (event.clientY - rect.top - offsetYRef.current) / scaleRef.current;

            offsetXRef.current -= x * (zoom - 1) * scaleRef.current;
            offsetYRef.current -= y * (zoom - 1) * scaleRef.current;
            scaleRef.current *= zoom;

            drawFractal();
        }

        function handleMouseDown(e) {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        }

        function handleMouseMove(e) {
            if (!isDragging) return;
            offsetXRef.current += e.clientX - lastX;
            offsetYRef.current += e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            drawFractal();
        }

        function handleMouseUp() {
            isDragging = false;
        }

        canvas.addEventListener("wheel", handleWheel);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp);

        return () => {
            canvas.removeEventListener("wheel", handleWheel);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
        };
    }, [isDarkMode, depth]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <canvas ref={canvasRef} style={{ border: "1px solid gray" }} />
            </div>
        </div>
    );
}
