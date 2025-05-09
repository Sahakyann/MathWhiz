import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import QuizComponent from '../QuizComponent';
import ToggleMedia from '../ToggleMedia';
import CoinFlipGame from '../Minigames/CoinFlipGame';
import DiceRollerGame from '../Minigames/DiceRollerGame';
import CardDrawGame from '../Minigames/CardDrawGame';

export default function IntroToProbability() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const probabilityQuizzes = [
        {
            id: "prob1",
            question: "What is the probability of picking a number divisible by 2 from 1 to 10?",
            equation: "",
            correctAnswer: "b",
            options: [
                { id: "a", label: <InlineMath math={"\\frac{2}{10}"} /> },
                { id: "b", label: <InlineMath math={"\\frac{5}{10}"} /> }, // Correct
                { id: "c", label: <InlineMath math={"\\frac{1}{10}"} /> },
                { id: "d", label: <InlineMath math={"1"} /> },
            ],
            solution: (
                <div>
                    <p>Even numbers from 1 to 10: 2, 4, 6, 8, 10 → 5 numbers</p>
                    <p>Total outcomes: 10</p>
                    <BlockMath math="P = \\frac{5}{10} = \\frac{1}{2}" />
                </div>
            ),
        },
        {
            id: "prob2",
            question: "Which of these is a valid sample space for tossing a coin twice?",
            equation: "",
            correctAnswer: "c",
            options: [
                { id: "a", label: <InlineMath math="\\{H, T\\}" /> },
                { id: "b", label: <InlineMath math="\\{HH, TT\\}" /> },
                { id: "c", label: <InlineMath math="\\{HH, HT, TH, TT\\}" /> }, // Correct
                { id: "d", label: <InlineMath math="\\{HHT, TTH\\}" /> },
            ],
            solution: (
                <div>
                    <p>All combinations of outcomes for 2 coins:</p>
                    <BlockMath math="S = \\{HH, HT, TH, TT\\}" />
                    <p>That’s 4 outcomes: 2 options (H/T) × 2 tosses = 4 total.</p>
                </div>
            ),
        },
        {
            id: "prob3",
            question: "If P(A) = 0.6 and P(B) = 0.3, and A and B are independent, what is P(A ∩ B)?",
            equation: "",
            correctAnswer: "a",
            options: [
                { id: "a", label: <InlineMath math="0.18" /> }, // Correct
                { id: "b", label: <InlineMath math="0.9" /> },
                { id: "c", label: <InlineMath math="0.3" /> },
                { id: "d", label: <InlineMath math="0.6" /> },
            ],
            solution: (
                <div>
                    <p>Use the rule for independent events:</p>
                    <BlockMath math="P(A \\cap B) = P(A) \\times P(B) = 0.6 \\times 0.3 = 0.18" />
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
                    <li>
                        <a href="#intro">Introduction</a>
                        <ul>
                            <li><a href="#prob-irl">Everyday Probability</a></li>
                        </ul>
                    </li>
                    <li><a href="#sample-space-events">Sample Space and Events</a>
                        <ul>
                            <li><a href="#formula-prob">Probability Formula</a></li>
                            <li><a href="#prob-rules">Probability Rules</a></li>
                            <li><a href="#prob-rules-examples">Examples</a></li>
                        </ul>
                    </li>
                    <li><a href="#dep-ind-events">Dependent and Independent Events</a>
                        <ul>
                            <li><a href="#dep-ind-events-examples">Examples</a></li>
                            <li><a href="#dep-ind-events-diff">Differences</a></li>
                        </ul>
                    </li>
                    <li><a href="#mutual-exclusive">Mutual Exclusiveness</a></li>
                    <li><a href="#conditional-probability">Conditional Probability</a>
                        <ul>
                            <li><a href="#conditional-probability-formula">Formula</a></li>
                            <li><a href="#conditional-probability-examples">Examples</a></li>
                        </ul>
                    </li>
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
                <div id="intro"></div>
                <ToggleMedia imageSrc={"/WhatIsProbability_ManimCE_v0.19.0.png"} videoSrc={"/WhatIsProbability.mp4"}></ToggleMedia>
                <p>
                    Imagine you're reaching into a bag filled with 10 slips of paper, each numbered from 1 to 10. You close your eyes, mix them around, and pull one out at random.
                </p>
                <p>
                    What are the chances the number is even? Or that it’s exactly 7? That’s where <strong>probability</strong> comes in — it helps us measure the uncertainty of events when we don’t know the outcome in advance.
                </p>
                <p>
                    Probability is all about asking questions like:
                </p>
                <ul>
                    <li>How likely is it to rain tomorrow?</li>
                    <li>What are the odds of winning a lottery?</li>
                    <li>What's the chance of flipping two heads in a row?</li>
                </ul>
                <p>
                    It gives us a way to assign numbers to these uncertainties — always between 0 and 1. A probability of 1 means the event is certain, and 0 means it's impossible. Most real-world probabilities fall somewhere in between.
                </p>

                <p><strong>What are the chances of the following events when we pick a random number from 1 to 10?</strong></p>

                <p style={{ marginBottom: '1em' }}><strong>The number is divisible by 1</strong><br />
                    100% are divisible by 1. We say probability is 1</p>

                <p style={{ marginBottom: '1em' }}><strong>The number is divisible by 11</strong><br />
                    0% are divisible by 11. We say probability is 0</p>

                <p style={{ marginBottom: '1em' }}><strong>The number is divisible by 2</strong><br />
                    50% are divisible by 2. We say probability is <InlineMath math="\frac{1}{2}" /></p>

                <p style={{ marginBottom: '1em' }}><strong>The number is divisible by 5</strong><br />
                    20% are divisible by 5. We say probability is <InlineMath math="\frac{1}{5}" /></p>

                <h1 id="prob-irl">Where Do We See Probability in Real Life?</h1>
                <p>
                    Probability isn't just something you study in math class — it shows up everywhere in your daily life. Every time we plan, guess, or take a risk, we’re relying on our instincts about probability.
                </p>
                <p>Here are some everyday examples:</p>

                <ul>
                    <li><strong>Weather Forecasting</strong>: When the forecast says there's a 70% chance of rain, it's using probability models based on past weather data. It doesn’t guarantee rain — it just means that out of 10 similar days, 7 ended up rainy.</li>
                    <li><strong>Insurance</strong>: Insurance companies crunch huge amounts of data to figure out how likely it is that a person will get into a car accident, fall ill, or live past 90 — and set prices based on that.</li>
                    <li><strong>Stock Market</strong>: Traders use probabilistic models to guess which way the market will move. It’s never certain — but it’s better than guessing randomly.</li>
                </ul>

                <p>
                    So whenever you're deciding whether to bring an umbrella, invest in a company, or buy an extended warranty, you're making a probability-based judgment — whether you realize it or not.
                </p>

                <h2>How Likely Is Something to Happen?</h2>
                <p>
                    In probability, an "event" is just a fancy name for something that might happen. For example, rolling a 4 on a die, or drawing a red card from a deck.
                </p>
                <p>
                    We write the probability of an event like this: <InlineMath math="P(E)" />, where <InlineMath math="E" /> stands for the event.
                </p>
                <p>Now here’s how we interpret the values:</p>

                <ul>
                    <li><InlineMath math="P(E) = 0" /> means the event is impossible — it’s never going to happen.</li>
                    <li><InlineMath math="P(E) = 1" /> means it’s guaranteed — it always happens.</li>
                    <li>Anything in between 0 and 1 means it's possible, but not certain.</li>
                </ul>

                <p>
                    Think of probability like a confidence meter — the closer it is to 1, the more confident we are the event will occur.
                </p>

                <h2 id="sample-space-events">Sample Space and Events</h2>
                <p>
                    When we toss a coin, there are only two possible outcomes: Heads (H) or Tails (T). However, if we toss two coins simultaneously, there will be four possible outcomes: (H, H), (H, T), (T, H), and (T, T).
                </p>

                <ul>
                    <li><strong>Sample Space and Events Sample Space</strong>: The sample space, often denoted by <InlineMath math="S" />, is the set of all possible outcomes of an experiment. For example, when rolling a six-sided die, the sample space is <InlineMath math="S = \{1, 2, 3, 4, 5, 6\}" />.</li>
                    <li><strong>Event</strong>: An event is any subset of the sample space. It represents a specific outcome or a combination of outcomes. There are many different types of events in probability such as Impossible and Sure Events, Mutually Exclusive Events, Exhaustive Events, Dependent and Independent Events, etc. For example, rolling an even number <InlineMath math="E = \{2, 4, 6\}" /> is an event in the context of rolling a die.</li>
                </ul>
                <CoinFlipGame />
                <h2 id="formula-prob">Formula for Probability</h2>
                <p>
                    Probability formula is defined as the ratio of the number of favorable outcomes and the total number of outcomes.
                </p>
                <BlockMath math="P(E) = \frac{\text{Number of Favorable Outcomes}}{\text{Total Number of Outcomes}}" />

                <h2 id="prob-rules">Basic Probability Rules</h2>
                <ul>
                    <li><strong>Addition Rule</strong>: <InlineMath math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" />, where <InlineMath math="A \cup B" /> denotes the union of events A and B.</li>
                    <li><strong>Multiplication Rule</strong> for Independent Events: <InlineMath math="P(A \cap B) = P(A) \times P(B)" />, where A and B are independent events.</li>
                    <li><strong>Complement Rule</strong>: <InlineMath math="P(A') = 1 - P(A)" />, where <InlineMath math="A'" /> denotes the complement of event A.</li>
                </ul>

                <h2 id="prob-rules-examples">Examples</h2>
                <p><strong>Example 1:</strong> There are 6 pillows in a bed, 3 are red, 2 are yellow and 1 is blue. What is the probability of randomly picking a yellow pillow?</p>
                <p><strong>Solution:</strong></p>
                <p>
                    Probability is equal to the number of yellow pillows in the bed divided by the total number of pillows, i.e.
                    <BlockMath math="\frac{2}{6} = \frac{1}{3}" />
                </p>

                <p><strong>Example 2:</strong> There is a container full of coloured bottles, red, blue, green and orange. Some of the bottles are picked out and displaced. Sumit did this 1000 times and got the following results:</p>
                <ul>
                    <li>No. of blue bottles picked out: 300</li>
                    <li>No. of red bottles: 200</li>
                    <li>No. of green bottles: 450</li>
                    <li>No. of orange bottles: 50</li>
                </ul>

                <p><strong>a. What is the probability that Sumit will pick a green bottle?</strong></p>
                <p>
                    For every 1000 bottles picked out, 450 are green.<br />
                    Therefore,
                    <BlockMath math="P(\text{green}) = \frac{450}{1000} = 0.45" />
                </p>

                <p><strong>b. If there are 100 bottles in the container, how many of them are likely to be green?</strong></p>
                <p>
                    Experiment implies that 450 out of 1000 bottles are green.<br />
                    Therefore,<br />
                    Out of 100 bottles, 45 are green.
                </p>

                <p><strong>Example 3:</strong> Find the probability of getting 3 on rolling a die.</p>
                <p><strong>Solution:</strong></p>
                <p>
                    Sample Space = <InlineMath math="S = \{1, 2, 3, 4, 5, 6\}" /><br />
                    Total number of outcomes = <InlineMath math="n(S) = 6" /><br />
                    Let <InlineMath math="A" /> be the event of getting 3.<br />
                    Number of favorable outcomes = <InlineMath math="n(A) = 1" /><br />
                    i.e. <InlineMath math="A = \{3\}" /><br />
                    Probability, <InlineMath math="P(A) = \frac{n(A)}{n(S)} = \frac{1}{6}" /><br />
                    Hence, <InlineMath math="P(\text{getting 3 on rolling a die}) = \frac{1}{6}" />
                </p>
                <QuizComponent quizzes={probabilityQuizzes} title="Check Your Understanding" />
                <h1 id="dep-ind-events">Dependent and Independent Events</h1>
                <p>
                    Dependent and Independent Events are the types of events that occur in probability. Suppose we have two events, say Event A and Event B. Then if Event A and Event B are dependent events, the occurrence of one event is dependent on the occurrence of the other. If they are independent events, then the occurrence of one event does not affect the probability of the other.
                </p>
                <p>
                    We can learn about dependent and independent events with the help of examples such as the event of tossing two coins simultaneously. The outcome of one coin does not affect the outcome of the other coin — then they are independent events. Suppose we take other experiments where we toss a coin only when we get a six in the throw of a die, where the outcome of one event is affected by other events — then they are dependent events.
                </p>

                <h1>Dependent Events</h1>
                <p>
                    Dependent events are those events that are affected by the outcomes of events that had already occurred previously. i.e. Two or more events that depend on one another are known as dependent events. If one event is by chance changed, then another is likely to differ. Thus, if whether one event occurs does affect the probability that the other event will occur, then the two events are said to be dependent.
                </p>
                <p>
                    When the occurrence of one event affects the occurrence of another subsequent event, the two events are dependent events. The concept of dependent events gives rise to the concept of conditional probability which will be discussed in the article further.
                </p>

                <h2>Examples of Dependent Events</h2>
                <p>
                    For example, let's say three cards are to be drawn from a pack of cards. Then the probability of getting a king is highest when the first card is drawn, while the probability of getting a king would be less when the second card is drawn.
                </p>
                <p>
                    In the draw of the third card, this probability would be dependent upon the outcomes of the previous two cards. We can say that after drawing one card, there will be fewer cards available in the deck, therefore the probabilities after each drawn card change.
                </p>

                <h1>Independent Events</h1>
                <p>
                    Independent events are those events whose occurrence is not dependent on any other event. If the probability of occurrence of an event A is not affected by the occurrence of another event B, then A and B are said to be independent events.
                </p>
                <ToggleMedia imageSrc={"/DependentVsIndependent_ManimCE_v0.19.0.png"} videoSrc={"/DependentVsIndependent.mp4"}></ToggleMedia>
                <h2 id="dep-ind-events-examples">Examples of Independent Events</h2>
                <p>Various examples of independent events are:</p>
                <ul>
                    <li>
                        <strong>Tossing a Coin</strong><br />
                        Sample Space (S) in a coin toss = <InlineMath math="\{H, T\}" /><br />
                        Both getting H and T are independent events.
                    </li>
                    <li>
                        <strong>Rolling a Die</strong><br />
                        Sample Space (S) in rolling a die = <InlineMath math="\{1, 2, 3, 4, 5, 6\}" />, all of these events are independent too.
                    </li>
                </ul>
                <p>Both of the above examples are simple events. Even compound events can be independent events.</p>

                <h2>Tossing a Coin and Rolling a Die</h2>
                <p>
                    If we simultaneously toss a coin and roll a die, then the probability of all the events is the same, and all of the events are independent events.
                </p>
                <p>Sample Space (S) of such experiment:</p>
                <BlockMath math="S = \{(1, H), (2, H), (3, H), (4, H), (5, H), (6, H), (1, T), (2, T), (3, T), (4, T), (5, T), (6, T)\}" />
                <p>These events are independent because only one can occur at a time, and the occurrence of one event does not affect the others.</p>

                <p><strong>Note:</strong></p>
                <ul>
                    <li>
                        A and B are two events associated with the same random experiment. Then A and B are known as independent events if:
                        <BlockMath math="P(A \cap B) = P(B) \cdot P(A)" />
                    </li>
                </ul>

                <h1 id="dep-ind-events-diff">Difference Between Independent Events <br></br>and Dependent Events</h1>
                <p>The difference between independent events and dependent events is outlined below:</p>

                <h3>Independent Events</h3>
                <ul>
                    <li>Independent events are events that are not affected by the occurrence of other events.</li>
                    <li>
                        The formula for the independent events is:
                        <BlockMath math="P(A \cap B) = P(A) \cdot P(B)" />
                    </li>
                    <li>
                        Examples of independent events:
                        <ul>
                            <li>Tossing one coin is not affected by the tossing of other coins.</li>
                            <li>Raining for a day and getting a six on a die are independent events.</li>
                        </ul>
                    </li>
                </ul>

                <h3>Dependent Events</h3>
                <ul>
                    <li>Dependent events are events that are affected by the occurrence of other events.</li>
                    <li>
                        The formula for the dependent events is:
                        <BlockMath math="P(A \cap B) = P(A) \cdot P(B|A)" />
                    </li>
                    <li>
                        Example of dependent events:
                        <ul>
                            <li>The probability of finding a red ball from a box of 4 red balls and 3 green balls changes if we take out two balls from the box.</li>
                        </ul>
                    </li>
                </ul>

                <h1 id="mutual-exclusive">Mutually Exclusive Events</h1>
                <p>
                    Two events A and B are said to be mutually exclusive events if they cannot occur at the same time.<br />
                    Mutually exclusive events never have an outcome in common.
                </p>
                <p>
                    If we take two events A and B as mutually exclusive events where the probability of event A is <InlineMath math="P(A)" /> and the probability of event B is <InlineMath math="P(B)" />, then the probability of both events occurring together is:
                    <BlockMath math="P(A \cap B) = 0" />
                </p>
                <p>
                    Then the probability of occurring any one event is:
                    <BlockMath math="P(A \cup B) = P(A) + P(B)" />
                </p>

                <h1 id="conditional-probability">Conditional Probability</h1>
                <p>
                    Conditional probability is one type of probability in which the possibility of an event depends upon the existence of a previous event. Conditional probability is the likelihood of an outcome occurring based on a previous outcome in similar circumstances. In probability notation, this is denoted as A given B, expressed as <InlineMath math="P(A \mid B)" />, indicating that the probability of event A is dependent on the occurrence of event B.
                </p>
                <p>Let us understand the concept with an example.</p>

                <h2>Example:</h2>
                <p>We roll a six-sided die. What is the probability that the roll is a 6, given that the outcome is an even number?</p>
                <p>The possible outcomes when rolling a die are: 1, 2, 3, 4, 5, 6.</p>
                <p>The even numbers are: 2, 4, 6 (3 outcomes).</p>
                <p>Only one of these is a 6.</p>
                <p>So our answer is:</p>
                <BlockMath math="P(6 \mid \text{even}) = \frac{1}{3}" />

                <h2 id="conditional-probability-formula">Conditional Probability Formula</h2>
                <p>
                    Let's consider two events A and B. Then the formula for conditional probability of A when B has already occurred is given by:
                    <BlockMath math="P(A \mid B) = \frac{P(A \cap B)}{P(B)}" />
                </p>
                <p>Where:</p>
                <ul>
                    <li><InlineMath math="P(A \cap B)" /> represents the probability of both events A and B occurring simultaneously.</li>
                    <li><InlineMath math="P(B)" /> represents the probability of event B occurring.</li>
                </ul>
                <p>
                    In other words, the conditional probability of A given B has already occurred is equal to the probability of the intersection of A and B divided by the probability of event B.
                </p>

                <h1>Steps to Find Probability of <br></br> One Event Given Another</h1>
                <p>To calculate the conditional probability, we can use the following step-by-step method:</p>
                <ol>
                    <li>Identify the events. Let's call them Event A and Event B.</li>
                    <li>Determine the probability of Event A, i.e., <InlineMath math="P(A)" />.</li>
                    <li>Determine the probability of Event B, i.e., <InlineMath math="P(B)" />.</li>
                    <li>Determine the probability of both Event A and Event B, i.e., <InlineMath math="P(A \cap B)" />.</li>
                    <li>
                        Apply the conditional probability formula and calculate the required probability:
                        <BlockMath math="P(A \mid B) = \frac{P(A \cap B)}{P(B)}" />
                    </li>
                </ol>

                <h1 id="conditional-probability-examples">Conditional Probability Examples</h1>

                <h3>Example 1: Rolling a Dice with 3 <br></br>on the First Roll and 9 as Sum</h3>
                <p>Sample space of the event:</p>
                <BlockMath math={`
        \\begin{aligned}
        S = \\{ &(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), \\\\
               &(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), \\\\
               &(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), \\\\
               &(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), \\\\
               &(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), \\\\
               &(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6) \\}
        \\end{aligned}
      `} />

                <p>Let:</p>
                <ul>
                    <li>Event <InlineMath math="A" />: Getting 3 on the first die.</li>
                    <li>Event <InlineMath math="B" />: Getting a sum of 9.</li>
                </ul>

                <p>The cases where the first die is 3:</p>
                <BlockMath math="(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6)" />
                <p>Only one of these has a sum of 9: <InlineMath math="(3, 6)" />.</p>
                <p>Thus,</p>
                <BlockMath math="P(B \mid A) = \frac{1}{6}" />

                <p>Now, to find <InlineMath math="P(A \mid B)" />:</p>
                <p>Cases where the sum is 9:</p>
                <BlockMath math="(3, 6), (4, 5), (5, 4), (6, 3)" />
                <p>Only one of these has 3 on the first die: <InlineMath math="(3, 6)" />.</p>
                <p>Thus,</p>
                <BlockMath math="P(A \mid B) = \frac{1}{4}" />
                <DiceRollerGame></DiceRollerGame>
                <h2>Example 2: A King Given a Face Card</h2>
                <p>A standard deck contains 52 cards.</p>
                <ul>
                    <li>Total number of face cards = 12 (4 kings, 4 queens, 4 jacks)</li>
                    <li>Number of kings = 4</li>
                </ul>

                <BlockMath math="P(\text{King} \cap \text{Face Card}) = \frac{4}{52}" />
                <BlockMath math="P(\text{Face Card}) = \frac{12}{52}" />
                <BlockMath math="P(\text{King} \mid \text{Face Card}) = \frac{P(\text{King} \cap \text{Face Card})}{P(\text{Face Card})} = \frac{4/52}{12/52} = \frac{4}{12} = \frac{1}{3}" />
                <CardDrawGame></CardDrawGame>
            </div>
        </div >
    );

}

