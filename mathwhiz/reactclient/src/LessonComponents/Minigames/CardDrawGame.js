import React, { useState } from 'react';

export default function CardDrawGame() {
    const [card, setCard] = useState(null);
    const [history, setHistory] = useState([]);

    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const drawCard = () => {
        const suit = suits[Math.floor(Math.random() * 4)];
        const value = values[Math.floor(Math.random() * values.length)];
        const newCard = `${value}${suit}`;
        setCard(newCard);
        setHistory(prev => [newCard, ...prev.slice(0, 9)]);
    };

    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#e0e0e0' : '#111111';

    return (
        <div className="quiz-box">
            <h3>Card Draw Simulator</h3>
            <p>Simulate drawing a card from a standard 52-card deck and track the recent history of your draws.</p>
            <button onClick={drawCard}>Draw a Card</button>
            {card && (
                <div style={{ marginTop: '1rem', fontSize: '2rem', color: textColor }}>
                    <strong>{card}</strong>
                </div>
            )}
            {history.length > 0 && (
                <div style={{ marginTop: '1rem', fontSize: '1rem', color: textColor }}>
                    <p><strong>History:</strong> {history.join(', ')}</p>
                </div>
            )}
        </div>
    );
}
