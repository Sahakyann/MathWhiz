import React, { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function QuizComponent({ quizzes, title }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isCorrect, setIsCorrect] = useState({});
    const [showSolutions, setShowSolutions] = useState({});

  
    const handleSelect = (quizId, optionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionId }));
    };

    const handleSubmit = (quizId, correctAnswer) => {
        setIsCorrect((prev) => ({ ...prev, [quizId]: selectedAnswers[quizId] === correctAnswer }));
    };

    return (
        <div className="quiz-container">
            <h2>{title}</h2>

            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-box">
                    <h3>{quiz.question}</h3>
                    <BlockMath math={quiz.equation} />

                    <form>
                        {quiz.options.map((option) => (
                            <label key={option.id} className="quiz-option">
                                <input
                                    type="radio"
                                    name={quiz.id}
                                    value={option.id}
                                    onChange={() => handleSelect(quiz.id, option.id)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </form>

                    <button onClick={() => handleSubmit(quiz.id, quiz.correctAnswer)} className="quiz-button">
                        Check Answer
                    </button>

                    {isCorrect[quiz.id] !== undefined && (
                        <p className={isCorrect[quiz.id] ? "correct-answer" : "wrong-answer"}>
                            {isCorrect[quiz.id] ? "Correct!" : "Not Quite Right. Try again!"}
                        </p>
                    )}

                    <button
                        onClick={() => setShowSolutions((prev) => ({ ...prev, [quiz.id]: !prev[quiz.id] }))}
                        className="quiz-button"
                    >
                        {showSolutions[quiz.id] ? "Hide Solution" : "Show Solution"}
                    </button>

                    {showSolutions[quiz.id] && <div className="solution-box">{quiz.solution}</div>}
                </div>
            ))}
        </div>
    );
}
