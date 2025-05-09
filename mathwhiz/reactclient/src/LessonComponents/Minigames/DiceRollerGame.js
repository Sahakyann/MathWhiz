import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export default function DiceRollerGame() {
    const [rolls, setRolls] = useState(100);
    const [counts, setCounts] = useState(null);

    const simulateRolls = () => {
        const result = Array(6).fill(0);
        for (let i = 0; i < rolls; i++) {
            const outcome = Math.floor(Math.random() * 6);
            result[outcome]++;
        }
        setCounts(result);
    };

    const isDarkMode = document.body.classList.contains('dark-mode');
    const backgroundColor = isDarkMode ? '#1e1e2f' : '#ffffff';
    const fontColor = isDarkMode ? '#e0e0e0' : '#111111';

    return (
        <div className="quiz-box">
            <h3>Dice Roller</h3>
            <p>In this minigame you can simulate rolling a standard six-sided die multiple times and observe the distribution of outcomes.</p>
            <p><strong>Number of Rolls:</strong></p>
            <select value={rolls} onChange={(e) => setRolls(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={100}>100</option>
                <option value={1000}>1000</option>
            </select>

            <br /><br />
            <button onClick={simulateRolls}>Roll Dice</button>

            {counts && (
                <div style={{ marginTop: '1rem' }}>
                    <Plot
                        data={[{
                            type: 'bar',
                            x: ['1', '2', '3', '4', '5', '6'],
                            y: counts,
                            marker: {
                                color: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff']
                            }
                        }]}
                        layout={{
                            title: {
                                text: 'Dice Roll Results',
                                font: { color: fontColor }
                            },
                            paper_bgcolor: backgroundColor,
                            plot_bgcolor: backgroundColor,
                            font: { color: fontColor },
                            width: 400,
                            height: 300,
                            bargap: 0.3,
                        }}
                        config={{ responsive: true }}
                    />
                </div>
            )}
        </div>
    );
}