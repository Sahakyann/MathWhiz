import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const ProbabilityDistributionsLesson = () => {
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
                    <li><a href="#cdf">Cumulative Distribution Function</a></li>
                    <li><a href="#pmf">Probability Mass Function</a></li>
                    <li><a href="#pdf">Probability Density Function</a></li>
                    <li><a href="#uniform">Uniform Distribution</a></li>
                    <li><a href="#bernoulli">Bernoulli Distribution</a></li>
                    <li><a href="#binomial">Binomial Distribution</a></li>
                    <li><a href="#geometric">Geometric Distribution</a></li>
                    <li><a href="#negative-binomial">Negative Binomial</a></li>
                    <li><a href="#poisson">Poisson Distribution</a></li>
                    <li><a href="#hypergeometric">Hypergeometric</a></li>
                    <li><a href="#exponential">Exponential Distribution</a></li>
                    <li><a href="#normal">Normal Distribution</a></li>
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
                <h1 id="cdf">Cumulative Distribution Function of a Random Variable</h1>
                <p>
                    The Cumulative Distribution Function (CDF) of a random variable is a mathematical function that provides the probability that the variable will take a value less than or equal to a particular number.
                </p>
                <p>
                    The CDF starts at 0 for the smallest possible value of X and increases to 1 as x approaches the largest possible value of X. It is a non-decreasing function that provides a complete description of the distribution of the random variable.
                </p>
                <p>
                    For example, if you're looking at the CDF for a test score of 80, and it gives you 0.75, this means there's a 75% chance that a random student's score will be 80 or less.
                </p>
                <p>
                    In short, the CDF helps you understand the likelihood of a random value being within a certain range by summing up probabilities as you go along.
                </p>

                <h3>CDF of a Random Variable</h3>
                <p>
                    Let <InlineMath math="\Omega" /> be a sample space of an experiment and <InlineMath math="X : \Omega \to \mathbb{R}" /> be a random variable. Then the function
                    <BlockMath math="F_X : \mathbb{R} \to [0,1]" />
                    defined by the formula
                    <BlockMath math="F_X(x) = P(X \leq x)" />
                    is called the <strong>cumulative distribution function (CDF)</strong> of the random variable <InlineMath math="X" />.
                </p>
                <p>
                    If the random variable is discrete, it may be comfortable to create its PMF, and only then generate the CDF.
                </p>

                <h3>Example (Rolling 2 dice, RV is X – the number appeared on the first die)</h3>
                <p>The PMF of X is:</p>
                <BlockMath math={`
                    \begin{array}{c|cccccc}
                    X & 1 & 2 & 3 & 4 & 5 & 6 \\
                    \hline
                    P(X = x) & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6} \\
                    \end{array}
                `} />

                <p>Therefore:</p>
                <BlockMath math={`
                    \begin{array}{c|ccccccc}
                    X & <1 & <2 & <3 & <4 & <5 & <6 & \geq 6 \\
                    \hline
                    P(X \leq x) & 0 & \frac{1}{6} & \frac{2}{6} & \frac{3}{6} & \frac{4}{6} & \frac{5}{6} & 1 \\
                    \end{array}
                `} />

                <p>Now the CDF can be written as a piecewise function in a way we used to see them.</p>

                <h2>The Formula and the Graph of the CDF of X</h2>
                <BlockMath math={`
                    F_X(x) = 
                    \begin{cases}
                    0, & \text{if } x < 1 \\
                    \frac{1}{6}, & \text{if } 1 \leq x < 2 \\
                    \frac{2}{6}, & \text{if } 2 \leq x < 3 \\
                    \vdots & \vdots \\
                    \frac{5}{6}, & \text{if } 5 \leq x < 6 \\
                    1, & \text{if } x \geq 6 \\
                    \end{cases}
                `} />

                <div className="visualization-placeholder">
                    <h4>CDF Visualization</h4>
                    <p>[Step function graph of the CDF would appear here]</p>
                </div>

                <h3>The Properties of a CDF</h3>
                <p>For any random variable X, its CDF, F_X, satisfies the following properties:</p>
                <ul>
                    <li><InlineMath math="0 \leq F_X(x) \leq 1" />, for any <InlineMath math="x \in \mathbb{R}" /></li>
                    <li><InlineMath math="F_X" /> is an increasing function on <InlineMath math="\mathbb{R}" /></li>
                    <li><InlineMath math="F_X(-\infty) = 0" /> and <InlineMath math="F_X(+\infty) = 1" /></li>
                    <li><InlineMath math="F_X" /> is a right-continuous function, i.e. <InlineMath math="F_X(x_0^+) = F(x_0)" /> for any <InlineMath math="x_0 \in \mathbb{R}" /></li>
                </ul>

                <h1 id="pmf">Probability Mass Function</h1>
                <p>
                    Probability mass function i.e., PMF is the probability of discrete random variables with fixed values. In this article we will see the probability mass function along with the PMF definition, probability mass function examples, properties of probability mass function and probability mass function formulas.
                </p>
                <p>
                    We will also discuss the probability mass function table and graph, the difference between the probability mass function and probability density function and solve some examples related to the probability mass function. Let's start our learning on the topic "Probability Mass Function".
                </p>

                <h3>What is Probability Mass Function?</h3>
                <p>
                    Probability function that gives discrete random variables probability equal to an exact value is called the probability mass function. The probability mass function is abbreviated as PMF. The different distribution has different formulas to calculate the probability mass function.
                </p>
                <p>
                    <em>PMF is referred to as the probability of a discrete random variable which is equal to a particular value. It is represented as <InlineMath math="f(x) = P(X = x)" /> where <InlineMath math="X" /> is a discrete random variable and <InlineMath math="x" /> is the specified value.</em>
                </p>

                <h3>Probability Mass Function Example</h3>
                <p>
                    Let a die be rolled. Then the probability of getting a number equal to 4 is an example of a probability mass function.  
                    The sample space for the given event is <InlineMath math="\{1, 2, 3, 4, 5, 6\}" />, and let <InlineMath math="X" /> be the random variable for getting a 4.  
                    The probability mass function evaluated for <InlineMath math="X = 4" /> is <InlineMath math="\frac{1}{6}" />.
                </p>

                <h3>Probability Mass Function Formulas</h3>
                <p>
                    The probability mass function for a discrete variable <InlineMath math="X" /> with its value <InlineMath math="x" /> is written as:
                    <BlockMath math="f(x) = P(X = x)." />
                </p>

                <h1 id="pdf">Probability Density Function</h1>
                <p>
                    A <strong>Probability Distribution Function (PDF)</strong> is a mathematical function that describes the likelihood of different outcomes in a random experiment. For any random variable <InlineMath math="X" />, where its value is evaluated at the points <InlineMath math="x" />, the probability distribution function gives the probability that <InlineMath math="X" /> takes a value less than or equal to <InlineMath math="x" />.
                </p>
                <p>
                    We represent the probability distribution as:
                    <BlockMath math="F(x) = P(X \leq x)" />
                </p>
                <p>
                    The Probability Distribution Function is also called the <strong>Cumulative Distribution Function (CDF)</strong>. The CDF represents the cumulative probability up to a certain value of the random variable.
                </p>
                <p>
                    The cumulative probability for a closed interval <InlineMath math="(a, b]" /> is given by:
                    <BlockMath math="P(a < X \leq b) = F(b) - F(a)" />
                </p>
                <p>
                    <strong>Note:</strong> For a probability distribution function, the value of the function lies between 0 and 1:
                    <BlockMath math="0 \leq F(x) \leq 1" />
                </p>

                <h3>Definition</h3>
                <p>
                    A random variable <InlineMath math="X : \Omega \to \mathbb{R}" /> is a <strong>continuous (or, absolutely continuous) random variable</strong> if there exists a non-negative function <InlineMath math="f" />, integrable over <InlineMath math="\mathbb{R}" />, such that
                    <BlockMath math="F_X(x) = \int_{-\infty}^{x} f(t)\,dt, \quad \text{for any } x \in \mathbb{R}," />
                    where <InlineMath math="F_X" /> is the CDF of <InlineMath math="X" />.
                </p>
                <p>
                    The mentioned function <InlineMath math="f" /> is called the <strong>Probability Density Function (PDF)</strong> of the continuous random variable <InlineMath math="X" />.
                </p>

                <h3>Relationship Between CDF and PDF</h3>
                <p>
                    <strong>Note 1:</strong> The CDF of an (absolutely) continuous random variable is a continuous function.
                </p>
                <p>
                    <strong>Note 2:</strong> If the PDF is not only integrable over the real axis but also continuous, then the CDF is far more than continuous — it is differentiable! Moreover:
                    <BlockMath math="F'_X(x) = f(x) \quad \text{everywhere}." />
                </p>
                <p>
                    As a summary:
                </p>
                <ul>
                    <li><InlineMath math="F_X(x) = \int_{-\infty}^{x} f(t)\,dt" />, for any <InlineMath math="x \in \mathbb{R}" /></li>
                    <li><InlineMath math="F'_X(x) = f(x)" /> at every point <InlineMath math="x" /> of continuity of the PDF, <InlineMath math="f(x)" /></li>
                </ul>

                <h1 id="uniform">Uniform Distribution</h1>
                <p>
                    Uniform Distribution is the probability distribution that represents equal likelihood of all outcomes within a specific range. i.e. the probability of each outcome occurring is the same. Whether dealing with a simple roll of a fair die or selecting a random number from a continuous interval, uniform distribution provides a straightforward yet powerful model for understanding randomness.
                </p>
                <p>
                    A continuous random variable <InlineMath math="X" /> is said to be <strong>uniformly distributed</strong> (or simply, <strong>uniform random variable</strong>) over <InlineMath math="[a, b]" /> if the PDF of <InlineMath math="X" /> has the following form:
                    <BlockMath math={`
                        f_X(x) =
                        \begin{cases}
                        \frac{1}{b - a}, & \text{if } a \leq x \leq b \\
                        0, & \text{otherwise}
                        \end{cases}
                    `} />
                </p>
                <p>
                    The fact that <InlineMath math="X" /> is a uniform random variable over <InlineMath math="[a, b]" /> is denoted as
                    <BlockMath math="X \sim U([a, b])." />
                </p>

                <h3>Uniform Distribution Formulas</h3>
                <p>A random variable <InlineMath math="X" /> is said to be uniformly distributed over the interval <InlineMath math="a \leq x \leq b" />, then:</p>
                <ul>
                    <li>
                        <strong>Probability Density Function (PDF):</strong>
                        <BlockMath math="f(x) = \frac{1}{b - a}, \quad a \leq x \leq b" />
                    </li>
                    <li>
                        <strong>Mean (Expected Value):</strong>
                        <BlockMath math="\mu = \frac{a + b}{2}" />
                    </li>
                    <li>
                        <strong>Variance:</strong>
                        <BlockMath math="\sigma^2 = \frac{(b - a)^2}{12}" />
                    </li>
                    <li>
                        <strong>Standard Deviation:</strong>
                        <BlockMath math="\sigma = \sqrt{\frac{(b - a)^2}{12}}" />
                    </li>
                    <li>
                        <strong>Cumulative Distribution Function (CDF):</strong>
                        <BlockMath math="F(x) = \frac{x - a}{b - a}, \quad \text{for } x \in [a, b]" />
                    </li>
                    <li>
                        <strong>Median:</strong>
                        <BlockMath math="\text{Median} = \frac{a + b}{2}" />
                    </li>
                </ul>

                <h1 id="bernoulli">Bernoulli's Trials</h1>
                <p>
                    Bernoulli's trials are a type of experiment where you repeat the same thing over and over again independently. Each time, you're looking for a specific outcome, which we call event A. The chance of this outcome happening is the same each time you do the experiment, no matter how many times you repeat it.
                </p>
                <p>
                    Experiment itself only has two possible outcomes, either event 'A' happens, or it doesn't. It's like flipping a coin where you can either get heads or tails.
                </p>

                <h3>Definition</h3>
                <p>
                    <InlineMath math="X" /> is called a <strong>Bernoulli</strong> random variable if it takes only two values,  
                    1 (called success) and 0 (called failure) with probabilities <InlineMath math="p" /> and <InlineMath math="1 - p" /> respectively, where <InlineMath math="0 \leq p \leq 1" />.
                </p>
                <p>
                    We denote this as:
                    <BlockMath math="X \sim B(1, p)" />
                </p>
                <p>
                    The PMF of <InlineMath math="X" /> is:
                    <BlockMath math={`
                        P(X = k) =
                        \begin{cases}
                        1 - p, & \text{if } k = 0 \\
                        p, & \text{if } k = 1
                        \end{cases}
                    `} />
                </p>

                <h3>Example (Tossing a fair coin)</h3>
                <p>
                    If <InlineMath math="X(\text{heads}) = 1" /> and <InlineMath math="X(\text{tails}) = 0" />, then
                    <BlockMath math="X \sim B(1, 0.5)" />
                </p>

                <h1 id="binomial">Binomial Distribution</h1>
                <p>
                    <strong>Definition</strong><br />
                    <InlineMath math="X" /> is called a <strong>Binomial</strong> random variable if it takes the values <InlineMath math="0, 1, 2, \dots, n" /> with the following probabilities:
                    <BlockMath math="P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad k = 0, 1, \dots, n," />
                    where <InlineMath math="0 \leq p \leq 1" />. Here, <InlineMath math="k" /> is called the number of successes.
                </p>
                <p>
                    We denote this as <InlineMath math="X \sim B(n, p)" />.
                </p>

                <h3>Mean and Variance of Binomial Distribution</h3>
                <p>
                    The mean or expected value of a binomial distribution is given by the formula:
                    <BlockMath math="\text{Mean} = \mu = np" />
                </p>
                <p>
                    The variance, which measures the spread of a binomial distribution, is given by:
                    <BlockMath math="\text{Variance} = \sigma^2 = np(1 - p)" />
                </p>

                <h1 id="geometric">Geometric Distribution</h1>
                <p>
                    Geometric Distribution is a probability distribution that tells the number of independent Bernoulli trials needed to achieve the first success. It is used to analyze situations where each trial has only two possible outcomes (success or failure), and the probability of success remains constant across all trials.
                </p>

                <h3>Definition</h3>
                <p>
                    Let <InlineMath math="X" /> be the number of independent Bernoulli trials <InlineMath math="B(1, p)" />, <InlineMath math="0 < p < 1" />, needed to obtain a successful outcome.
                </p>
                <p>
                    The PMF of <InlineMath math="X" /> is:
                    <BlockMath math="P(X = k) = (1 - p)^{k - 1} p, \quad k = 1, 2, \dots" />
                </p>
                <p>
                    The fact that <InlineMath math="X" /> is a geometric random variable is denoted as:
                    <BlockMath math="X \sim \text{Geo}(p)" />
                </p>

                <h1 id="negative-binomial">Negative Binomial Distribution</h1>
                <p>
                    The Negative Binomial Distribution deals with the number of trials needed to achieve a specific number of successes. It helps determine how many trials it takes to reach a desired number of successes.
                </p>

                <h3>Definition</h3>
                <p>
                    If <InlineMath math="X" /> is the number of independent Bernoulli trials <InlineMath math="B(1, p)" />, with <InlineMath math="0 < p < 1" />, required for <InlineMath math="r \geq 1" /> successes, then <InlineMath math="X" /> is called a <strong>Negative Binomial</strong> random variable.
                </p>
                <p>
                    Its PMF is given by:
                    <BlockMath math="P(X = k) = \binom{k - 1}{r - 1} (1 - p)^{k - r} p^r, \quad k = r, r+1, r+2, \dots" />
                </p>
                <p>
                    The fact that <InlineMath math="X" /> is a negative binomial random variable is denoted as:
                    <BlockMath math="X \sim NB(r, p)" />
                </p>

                <h1 id="poisson">Poisson Distribution</h1>
                <p>
                    The <strong>Poisson distribution</strong> is a type of <strong>discrete probability distribution</strong> that calculates the likelihood of a certain number of events happening in a fixed time or space, assuming the events occur independently and at a constant rate.
                </p>
                <p>
                    A random variable <InlineMath math="X" /> that takes on one of the values <InlineMath math="0, 1, 2, \dots" /> is said to be a <strong>Poisson</strong> random variable with parameter <InlineMath math="\lambda > 0" /> if the PMF of <InlineMath math="X" /> is given by:
                    <BlockMath math="P(X = k) = \frac{\lambda^k}{k!} e^{-\lambda}, \quad k = 0, 1, 2, \dots" />
                </p>

                <h1 id="hypergeometric">Hypergeometric Distribution</h1>
                <p>
                    The hypergeometric distribution is defined as the concept of approximation of a random variable in a hypergeometric probability distribution. This value is further used to evaluate the probability distribution function of the data.
                </p>
                <p>
                    The formula for the Hypergeometric Distribution is given by:
                    <BlockMath math="P(x \mid N, m, n) = \frac{\dbinom{m}{k} \dbinom{N - m}{n - k}}{\dbinom{N}{n}}" />
                </p>

                <h1 id="exponential">Exponential Distribution</h1>
                <p>
                    Suppose we are posed with the question- How much time do we need to wait before a given event occurs? The answer to this question can be given in probabilistic terms if we model the given problem using the Exponential Distribution.
                </p>
                <p>
                    <strong>Definition:</strong>
                    A continuous random variable <InlineMath math="X" /> is said to be <strong>Exponentially Distributed</strong> (or simply, <strong>Exponential Random Variable</strong>) with parameter <InlineMath math="\lambda > 0" /> if the PDF of <InlineMath math="X" /> has the following form:
                    <BlockMath math={`
                        f_X(x) =
                        \begin{cases}
                        0, & \text{if } x < 0 \\
                        \lambda e^{-\lambda x}, & \text{if } x \geq 0
                        \end{cases}
                    `} />
                </p>

                <h1 id="normal">Normal Distribution</h1>
                <p>
                    Standard normal distribution, also known as the z-distribution, is a special type of normal distribution. In this distribution, the mean (average) is 0 and the standard deviation (a measure of spread) is 1. This creates a bell-shaped curve that is symmetrical around the mean.
                </p>
                <p>
                    A continuous random variable <InlineMath math="X" /> is said to be <strong>Normally Distributed</strong> (or simply, <strong>Normal Random Variable</strong>) with parameters <InlineMath math="\mu" /> and <InlineMath math="\sigma^2" /> if the PDF of <InlineMath math="X" /> has the following form:
                    <BlockMath math="f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{ -\frac{(x - \mu)^2}{2\sigma^2} }, \quad -\infty < x < \infty." />
                </p>
                <p>
                    The fact that <InlineMath math="X" /> is a normal RV with parameters <InlineMath math="\mu" /> and <InlineMath math="\sigma^2" /> will be denoted as
                    <BlockMath math="X \sim \mathcal{N}(\mu, \sigma^2)." />
                </p>
            </div>
        </div>
    );
};

export default ProbabilityDistributionsLesson;