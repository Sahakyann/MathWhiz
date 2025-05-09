import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export default function CoinFlipGame() {
    const [flips, setFlips] = useState(100);
    const [bias, setBias] = useState(0.5);
    const [results, setResults] = useState(null);

    const simulateFlips = () => {
        let heads = 0;
        for (let i = 0; i < flips; i++) {
            if (Math.random() < bias) heads++;
        }
        const tails = flips - heads;
        setResults({ heads, tails });
    };

    const isDarkMode = document.body.classList.contains('dark-mode');
    const backgroundColor = isDarkMode ? '#1e1e2f' : '#ffffff';
    const fontColor = isDarkMode ? '#e0e0e0' : '#111111';

    return (
        <div className="quiz-box">
            <h3>Coin Flip</h3>
            <p>Let's try a minigame! Pick a number of flips and see how many heads and tails we get. The larger the number of flips, the closer it is to 50/50. You can also make the coin unfair and observe the change! </p>
            <p><strong>Number of Flips:</strong></p>
            <select value={flips} onChange={(e) => setFlips(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={100}>100</option>
                <option value={1000}>1000</option>
            </select>

            <p><strong>Bias Toward Heads:</strong> {bias.toFixed(2)}</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bias}
                onChange={(e) => setBias(parseFloat(e.target.value))}
            />

            <br /><br />
            <button onClick={simulateFlips}>Flip Coins</button>

            {results && (
                <div style={{ marginTop: '1rem' }}>
                    <p>Heads: {results.heads} ({(results.heads / flips).toFixed(2)})</p>
                    <p>Tails: {results.tails} ({(results.tails / flips).toFixed(2)})</p>
                    <Plot
                        data={[{
                            type: 'bar',
                            x: ['Heads', 'Tails'],
                            y: [results.heads, results.tails],
                            marker: {
                                color: ['#638eff', '#d883ff']
                            }
                        }]}
                        layout={{
                            title: {
                                text: 'Coin Flip Results',
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
