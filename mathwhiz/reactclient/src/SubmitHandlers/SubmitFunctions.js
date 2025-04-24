import axios from "axios";

export async function submitFunctionDerivative(input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-derivative",
            { input, xMin, xMax, yMin, yMax, xStep, yStep, derivFrom, derivTo },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitEigenvalueVisualizer(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-eigenvector-visualizer/${userId}`,
            {
                matrix: [
                    [parseFloat(matrixA), parseFloat(matrixB)],
                    [parseFloat(matrixC), parseFloat(matrixD)]
                ],
                vectors
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting eigenvalue visualizer:", error);
        alert("Failed to generate Eigenvalue visualizer.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionLimit(input, xMin, xMax, yMin, yMax, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-limit",
            { function: input, xMin, xMax, yMin, yMax },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 100);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionIntegral(latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-function-integral/${userId}`,
            { latex_function, xMin, xMax, yMin, yMax, xStep, yStep, integral_dx, integral_from, integral_to },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionLinearTransformation(matrixA, matrixB, matrixC, matrixD, vectors, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-linear-transformation/${userId}`,
            {
                matrix: [
                    [parseFloat(matrixA), parseFloat(matrixB)],
                    [parseFloat(matrixC), parseFloat(matrixD)]
                ],
                vectors: vectors
            },
            { responseType: "blob" }
        );
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionNewtonsMethod(latex_function, initialGuess, xMin, xMax, maxIterations, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-newtons-method/${userId}`,
            {
                latex_function: latex_function,
                initialGuess: initialGuess,
                maxIterations: maxIterations,
                xMin: xMin,
                xMax: xMax
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate Newton's Method visualization. Please check your input.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionTaylorSeries(latex_function, expansionPoint, degree, xMin, xMax, setLoading, setVideoUrl, videoUrl, userId) {
    try {
        setLoading(true);
        const response = await axios.post(
            `https://localhost:7160/api/get-taylor-series/${userId}`,
            {
                latex_function,
                expansionPoint,
                degree,
                xMin,
                xMax,
            },
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 10);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate Taylor series visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}