import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const BayesTheorem = () => {
    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSidebarVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="lesson-wrapper">
            <nav className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#bayes-theorem">Bayes' Theorem</a></li>
                    <li><a href="#formula">Bayes Theorem Formula</a></li>
                    <li><a href="#statement">Bayes Theorem Statement</a></li>
                    <li><a href="#difference">Difference Between Conditional Probability and Bayes' Theorem</a></li>
                    <li><a href="#total-probability">Theorem of Total Probability</a></li>
                    <li><a href="#example1">Example 1: Urn Problem</a></li>
                    <li><a href="#example2">Example 2: Card Problem</a></li>
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
                <h1 id="bayes-theorem">Bayes' Theorem</h1>
                <p>Bayes' Theorem is a mathematical formula that helps determine the conditional probability of an event based on prior knowledge and new evidence. It adjusts probabilities when new information comes in and helps make better decisions in uncertain situations.</p>
                <p><b>For example,</b> if we want to find the probability that a white marble drawn at random came from the first bag, given that a white marble has already been drawn, and there are three bags each containing some white and black marbles, then we can use Bayes' Theorem.</p>

                <h2 id="formula">Bayes Theorem Formula</h2>
                <p>For any two events <InlineMath math="A"/> and <InlineMath math="B"/>, the formula for Bayes' Theorem is given by:</p>
                <BlockMath math="P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}"/>

                <p>Where,</p>
                <ul>
                    <li><InlineMath math="P(A)"/> and <InlineMath math="P(B)"/> are the probabilities of events <InlineMath math="A"/> and <InlineMath math="B"/>, respectively. Also, <InlineMath math="P(B) \neq 0"/>.</li>
                    <li><InlineMath math="P(A \mid B)"/> is the probability of event <InlineMath math="A"/> given that event <InlineMath math="B"/> has occurred.</li>
                    <li><InlineMath math="P(B \mid A)"/> is the probability of event <InlineMath math="B"/> given that event <InlineMath math="A"/> has occurred.</li>
                </ul>

                <h2 id="statement">Bayes Theorem Statement</h2>
                <p>Let <InlineMath math="E_1, E_2, \ldots, E_n"/> be a set of events associated with the sample space <InlineMath math="S"/>, in which all the events <InlineMath math="E_1, E_2, \ldots, E_n"/> have a non-zero probability of occurrence. All the events <InlineMath math="E_1, E_2, \ldots, E_n"/> form a partition of <InlineMath math="S"/>.</p>
                <p>Let <InlineMath math="A"/> be an event from space <InlineMath math="S"/> for which we want to find the probability. Then, according to Bayes' Theorem:</p>
                <BlockMath math="P(E_i \mid A) = \frac{P(E_i) \cdot P(A \mid E_i)}{\sum_{k=1}^{n} P(E_k) \cdot P(A \mid E_k)}"/>
                <p>for <InlineMath math="k = 1, 2, 3, \ldots, n"/>.</p>

                <h2 id="difference">Difference Between Conditional Probability and Bayes' Theorem</h2>

                <h3>Bayes' Theorem</h3>
                <ul>
                    <li>Bayes' Theorem is derived using the definition of conditional probability.</li>
                    <li>It is used to find the reverse probability.</li>
                    <li><b>Formula:</b>
                    <BlockMath math="P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}"/></li>
                </ul>

                <h3>Conditional Probability</h3>
                <ul>
                    <li>Conditional Probability is the probability of event <InlineMath math="A"/> given that event <InlineMath math="B"/> has already occurred.</li>
                    <li><b>Formula:</b>
                    <BlockMath math="P(A \mid B) = \frac{P(A \cap B)}{P(B)}"/></li>
                </ul>

                <h1 id="total-probability">Theorem of Total Probability</h1>
                <p>Let <InlineMath math="E_1, E_2, \ldots, E_n"/> be mutually exclusive and exhaustive events associated with a random experiment, and let <InlineMath math="E"/> be an event that occurs with some <InlineMath math="E_i"/>. Then, the total probability of <InlineMath math="E"/> is:</p>
                <BlockMath math="P(E) = \sum_{i=1}^{n} P(E \mid E_i) \cdot P(E_i)"/>

                <h2 id="example1">Example 1: Urn Problem</h2>
                <p>There are three urns containing 3 white and 2 black balls; 2 white and 3 black balls; 1 black and 4 white balls respectively. There is an equal probability of each urn being chosen. One ball is drawn at random. What is the probability that a white ball is drawn?</p>

                <h3>Solution:</h3>
                <p>Let <InlineMath math="E_1, E_2, \text{and } E_3"/> be the events of choosing the first, second, and third urn respectively. Then,</p>
                <BlockMath math="P(E_1) = P(E_2) = P(E_3) = \frac{1}{3}"/>

                <p>Let <InlineMath math="E"/> be the event that a white ball is drawn. Then,</p>
                <BlockMath math="P(E \mid E_1) = \frac{3}{5}, \quad P(E \mid E_2) = \frac{2}{5}, \quad P(E \mid E_3) = \frac{4}{5}"/>

                <p>By the theorem of total probability:</p>
                <BlockMath math="P(E) = P(E \mid E_1) \cdot P(E_1) + P(E \mid E_2) \cdot P(E_2) + P(E \mid E_3) \cdot P(E_3)"/>

                <BlockMath math="\Rightarrow P(E) = \left(\frac{3}{5} \cdot \frac{1}{3}\right) + \left(\frac{2}{5} \cdot \frac{1}{3}\right) + \left(\frac{4}{5} \cdot \frac{1}{3}\right)"/>

                <BlockMath math="\Rightarrow P(E) = \frac{9}{15} = \frac{3}{5}"/>

                <h2 id="example2">Example 2: Card Problem</h2>
                <p>A card from a pack of 52 cards is lost. From the remaining cards of the pack, two cards are drawn and are found to be both hearts. Find the probability of the lost card being a heart.</p>

                <h3>Solution:</h3>
                <p>Let <InlineMath math="E_1, E_2, E_3, E_4"/> be the events of losing a card of hearts, clubs, spades, and diamonds respectively. Then:</p>
                <BlockMath math="P(E_1) = P(E_2) = P(E_3) = P(E_4) = \frac{13}{52} = \frac{1}{4}"/>

                <p>Let <InlineMath math="E"/> be the event of drawing 2 hearts from the remaining 51 cards.</p>

                <BlockMath math="P(E \mid E_1) = \frac{{^{12}C_2}}{{^{51}C_2}} = \frac{12 \times 11}{51 \times 50} = \frac{132}{2550} = \frac{22}{425}"/>

                <BlockMath math="P(E \mid E_2) = P(E \mid E_3) = P(E \mid E_4) = \frac{{^{13}C_2}}{{^{51}C_2}} = \frac{13 \times 12}{51 \times 50} = \frac{156}{2550} = \frac{26}{425}"/>

                <p>By Bayes' Theorem:</p>
                <BlockMath math="P(E_1 \mid E) = \frac{P(E_1) \cdot P(E \mid E_1)}{P(E_1) \cdot P(E \mid E_1) + P(E_2) \cdot P(E \mid E_2) + P(E_3) \cdot P(E \mid E_3) + P(E_4) \cdot P(E \mid E_4)}"/>

                <BlockMath math="P(E_1 \mid E) = \frac{\frac{1}{4} \cdot \frac{22}{425}}{\frac{1}{4} \cdot \frac{22}{425} + \frac{1}{4} \cdot \frac{26}{425} + \frac{1}{4} \cdot \frac{26}{425} + \frac{1}{4} \cdot \frac{26}{425}} = \frac{\frac{22}{1700}}{\frac{100}{1700}} = \frac{22}{100} = 0.22"/>

                <p><b>Hence, the required probability is 0.22.</b></p>
            </div>
        </div>
    );
};

export default BayesTheorem;