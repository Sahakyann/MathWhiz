import React, { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function ToggleMedia ({ imageSrc, videoSrc }) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="toggle-container">
            <button
                onClick={() => setShowVideo(!showVideo)}
                className="toggle-button"
            >
                {showVideo ? "Show Image" : "Show Animation"}
            </button>

            {showVideo ? (
                <video autoPlay muted loop controls width="600" style={{ display: "block", margin: "1rem auto" }}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img
                    src={imageSrc}
                    alt="Media Toggle"
                    style={{ maxWidth: "600px", display: "block", margin: "1rem auto" }}
                />
            )}
        </div>
    );
};