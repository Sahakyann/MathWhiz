import axios from "axios";

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

        const url = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 0);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}

export async function submitFunctionIntegral(latex_function, xMin, xMax, yMin, yMax, xStep,yStep,integral_dx,integral_from,integral_to, setLoading, setVideoUrl, videoUrl) {
    try {
        setLoading(true);
        const response = await axios.post(
            "https://localhost:7160/api/get-function-integral",
            { latex_function, xMin, xMax, yMin, yMax, xStep,yStep,integral_dx,integral_from,integral_to},
            { responseType: "blob" }
        );

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }

        const url = URL.createObjectURL(new Blob([response.data], { type: "video/mp4" }));
        setVideoUrl(null);
        setTimeout(() => setVideoUrl(url), 0);
    } catch (error) {
        console.error("Error submitting function:", error);
        alert("Failed to generate visualization. Please check your input and try again.");
    } finally {
        setLoading(false);
    }
}


