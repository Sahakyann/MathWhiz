import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import QuizComponent from '../QuizComponent';
import ToggleMedia from '../ToggleMedia';

export default function RandomVariables() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const randomVarQuizzes = [
        {
            id: "rv1",
            question: "Which of these is an example of a discrete random variable?",
            equation: "",
            correctAnswer: "b",
            options: [
                { id: "a", label: "The exact temperature of a cup of coffee" },
                { id: "b", label: "The number of students in a classroom" }, // Correct
                { id: "c", label: "The weight of a newborn baby" },
                { id: "d", label: "The time taken to run a marathon" },
            ],
            solution: (
                <div>
                    <p>The number of students in a classroom is discrete because it can only take whole number values (you can't have a fraction of a student). The other options are continuous variables that can take any value within a range.</p>
                </div>
            ),
        },
        {
            id: "rv2",
            question: "What is the mathematical notation for a random variable mapping from sample space to real numbers?",
            equation: "",
            correctAnswer: "a",
            options: [
                { id: "a", label: <InlineMath math={"X: S \\rightarrow \\mathbb{R}"} /> }, // Correct
                { id: "b", label: <InlineMath math={"X: \\mathbb{R} \\rightarrow S"} /> },
                { id: "c", label: <InlineMath math={"S: X \\rightarrow \\mathbb{R}"} /> },
                { id: "d", label: <InlineMath math={"\\mathbb{R}: S \\rightarrow X"} /> },
            ],
            solution: (
                <div>
                    <p>A random variable is defined as a function that maps from the sample space to real numbers:</p>
                    <BlockMath math="X: S \rightarrow \mathbb{R}" />
                </div>
            ),
        },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSidebarVisible(true);
            } else {
                setSidebarVisible(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="lesson-wrapper">
            <nav className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#random-variable">Random Variable</a></li>
                    <li><a href="#what-are-variables">What are Variables?</a></li>
                    <li><a href="#discrete-variables">Discrete Variables</a></li>
                    <li><a href="#continuous-variables">Continuous Variables</a></li>
                    <li><a href="#difference">Difference Between Discrete and Continuous</a></li>
                </ul>
            </nav>

            <div className="top-page">
                <div className="button-container">
                    <button className="transparent-button" onClick={() => navigate('/probability')}>
                        Back to Probability
                    </button>
                </div>
            </div>

            <div className="latex-container">
                <h1 id="random-variable">Random Variable</h1>
                <p>
                    A random variable is a fundamental concept in statistics that bridges the gap between theoretical probability and real-world data. A random variable in statistics is a function that assigns a real value to an outcome in the sample space of a random experiment. For example, if you roll a die, you can assign a number to each possible outcome.
                </p>
                <p>There are two basic types of random variables:</p>
                <ul>
                    <li>Discrete Random Variables (which take on specific values)</li>
                    <li>Continuous Random Variables (assume any value within a given range)</li>
                </ul>

                <p>We define a random variable as a function that maps from the sample space of an experiment to the real numbers.</p>
                <p>Mathematically, a random variable is expressed as:</p>
                <BlockMath math="X: S \rightarrow \mathbb{R}" />
                <p>where:</p>
                <ul>
                    <li><InlineMath math="X" /> is a random variable (usually denoted using a capital letter)</li>
                    <li><InlineMath math="S" /> is the sample space</li>
                    <li><InlineMath math="\mathbb{R}" /> is the set of real numbers</li>
                </ul>

                <h2>Example 1</h2>
                <p>If two unbiased coins are tossed, then find the random variable associated with that event.</p>
                <p><strong>Solution:</strong></p>
                <p>Suppose two unbiased coins are tossed. Let <InlineMath math="X" /> be the number of heads. (<InlineMath math="X" /> is a random variable or function)</p>
                <p>The sample space is:</p>
                <BlockMath math="S = \{HH, HT, TH, TT\}" />
                <p>The values of random variable <InlineMath math="X" /> are:</p>
                <BlockMath math="X(HH) = 2, \quad X(HT) = 1, \quad X(TH) = 1, \quad X(TT) = 0" />

                <h1 id="what-are-variables">What are Variables?</h1>
                <p>
                    In mathematics, a variable is a symbol or letter that represents an unknown quantity. Variables are used to formulate mathematical expressions, equations, and functions. They are placeholders for numbers or other mathematical objects whose specific values are unknown or may vary in different contexts.
                </p>
                <p>
                    In statistics and research, a variable is any characteristic, number, or quantity that can be measured or observed and can vary among individuals, objects, or situations.
                </p>
                <p>Variables can be classified into several types based on their characteristics and measurement scales:</p>
                <ul>
                    <li>Independent Variable</li>
                    <li>Dependent Variable</li>
                    <li>Continuous Variable</li>
                    <li>Discrete Variable</li>
                    <li>etc.</li>
                </ul>

                <h1 id="discrete-variables">What are Discrete Variables?</h1>
                <p>
                    A discrete variable is a type of variable that can only take on specific or distinct values. These values are typically whole numbers or integers. Discrete variables often represent counts or categories.
                </p>
                <p><strong>Examples of discrete variables:</strong></p>
                <ul>
                    <li>
                        <strong>Number of students in a classroom</strong>: It is a discrete variable because it can only take on whole number values (e.g., 25 students, 30 students).
                    </li>
                    <li>
                        <strong>Outcomes of rolling a six-sided die</strong>: The output will be <InlineMath math="\{1, 2, 3, 4, 5, 6\}" />, which are discrete because they consist of distinct, separate categories.
                    </li>
                    <li>
                        <strong>Number of books on a shelf</strong>: The number of books is discrete because it cannot take on fractional or continuous values (e.g., 5 books, 10 books, 15 books).
                    </li>
                </ul>

                <h1 id="continuous-variables">What are Continuous Variables?</h1>
                <p>
                    A continuous variable is a type of variable that can take on any value within a given range. Unlike discrete variables, which consist of distinct, separate values, continuous variables can represent an infinite number of possible values, including fractional and decimal values. Continuous variables often represent measurements or quantities.
                </p>
                <p><strong>Examples of continuous variables:</strong></p>
                <ul>
                    <li>
                        <strong>Height</strong>: Height is a continuous variable because it can take on any value within a range (e.g., 150.5 cm, 162.3 cm, 175.9 cm).
                    </li>
                    <li>
                        <strong>Weight</strong>: Weight is continuous because it can be measured with precision and can take on any value within a range (e.g., 55.3 kg, 68.7 kg, 72.1 kg).
                    </li>
                    <li>
                        <strong>Time</strong>: Time can be measured with precision, and it can take on any value (e.g., 10:30:15.5 AM, 10:45:30.75 AM).
                    </li>
                </ul>

                <h1 id="difference">Difference Between Discrete and Continuous Variables</h1>
                <p>The difference between continuous and discrete variables is described below:</p>

                <h2>Discrete Variables</h2>
                <ul>
                    <li>They can take only specific or discrete values.</li>
                    <li>Typically measured on a nominal or ordinal scale.</li>
                    <li>Often represented by bar graphs or histograms.</li>
                    <li>Examples include:
                        <ul>
                            <li>Number of students in a class</li>
                            <li>Outcomes of rolling a die</li>
                        </ul>
                    </li>
                    <li>Discrete variables have probability mass functions (PMF).</li>
                    <li>Employed in various mathematical contexts and applications where quantities are counted.</li>
                </ul>

                <h2>Continuous Variables</h2>
                <ul>
                    <li>They can take any value within a specific range.</li>
                    <li>Typically measured on an interval or ratio scale.</li>
                    <li>Often represented by line graphs or smooth curves.</li>
                    <li>Examples include:
                        <ul>
                            <li>Measurements such as length, time, or temperature</li>
                        </ul>
                    </li>
                    <li>Continuous variables have probability density functions (PDF).</li>
                    <li>Employed in branches of mathematics like calculus, differential equations, and real analysis, as well as in applied fields such as physics, engineering, and statistics.</li>
                </ul>

                <QuizComponent quizzes={randomVarQuizzes} title="Check Your Understanding" />
            </div>
        </div>
    );
}