import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const LawOfLargeNumbers = () => {
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
                    <li><a href="#intro">Law of Large Numbers</a></li>
                    <li><a href="#types">Types of LLN</a></li>
                    <li><a href="#weak">Weak Law (WLLN)</a></li>
                    <li><a href="#strong">Strong Law (SLLN)</a></li>
                    <li><a href="#limitations">Limitations</a></li>
                    <li><a href="#examples">Examples</a></li>
                    <li><a href="#example1">Coin Flip Example</a></li>
                    <li><a href="#example2">Ball Drawing Example</a></li>
                    <li><a href="#example3">Quiz Example</a></li>
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
                <h1 id="intro">Law of Large Numbers</h1>
                <p>The Law of Large Numbers (LLN) is a mathematical theorem in probability and statistics that helps us understand how averages work over time. It says that if you repeat an experiment many times, the average result will get closer and closer to the expected value. For example, if you flip a fair coin many times, the proportion of heads and tails will get closer to 50 percent each. This principle is important because it shows that with enough trials, we can predict the average outcome of random events more accurately. In this article, we'll explain what the Law of Large Numbers is, its limitations, and why it's useful, using simple examples and explanations.</p>

                <h1 id="types">Types of Law of Large Numbers</h1>
                <p>Various forms of the Law of Large Numbers are:</p>

                <h2 id="weak">1. Weak Law of Large Numbers (WLLN)</h2>
                <p>Imagine you have a fair coin and flip it several times to determine the Weak Law of Large Numbers (WLLN). The Weak Law of Large Numbers indicates that the proportion of heads (or tails) seen will get closer and closer to 0.5 (since the coin is fair, and the probability of obtaining a head or a tail is 0.5). As you increase the number of coin flips:</p>
                <p>Generally speaking, the WLLN states that as the number of observations rises, the sample average will converge to the theoretical mean if your series consists of independent and identically distributed random variables (such as coin flips).</p>

                <h2 id="strong">2. Strong Law of Large Numbers (SLLN)</h2>
                <p>An improved form of the WLLN is the Strong Law of Large Numbers (SLLN). It states that the sample average not only will converge to the expected value but also provides a gauge of the speed at which this convergence occurs.</p>
                <p>Returning to the coin flipping example, the SLLN indicates that as the number of coin flips increases, the likelihood of the sample average deviating from the expected value (0.5) by a notable amount decreases.</p>
                <p>Stated differently, when more observations are gathered, the likelihood of the sample average deviating significantly from the expected value becomes even more rare.</p>
                <p>Both versions essentially mean that with enough trials, the results will stabilize around the expected average.</p>

                <h1 id="limitations">Limitations of the Law of Large Numbers</h1>
                <p>Various limitations of the Law of Large Numbers are:</p>
                <ol>
                    <li><b>Sample Size:</b> The Law of Large Numbers operates most effectively when the sample size is genuinely large. A limited sample size may result in outcomes that do not represent the underlying population, and the law may not hold.</li>
                    <li><b>Independence:</b> The Law of Large Numbers assumes that the events or observations are independent. If there is any dependence or correlation between observations, the law might not apply correctly.</li>
                    <li><b>Rate of Convergence:</b> Although the Law of Large Numbers states that the sample mean will converge to the population mean as the sample size grows, it does not indicate the speed of this convergence. In some cases, convergence may be slow, requiring a very large sample size to achieve the desired precision.</li>
                    <li><b>Outliers and Extreme Values:</b> The presence of outliers or extreme values in the data can significantly impact the Law of Large Numbers. Even with a large sample size, a few extreme observations can distort the sample mean.</li>
                    <li><b>Observations Not Identically Distributed:</b> The Law of Large Numbers assumes that the data are drawn from a single probability distribution. If the distribution varies over time or the data are drawn from different distributions, the law may not hold.</li>
                    <li><b>Biased Sampling:</b> If the sampling procedure is biased or non-random, the Law of Large Numbers may not apply, and the sample mean may not converge to the true population mean.</li>
                    <li><b>Finite Population:</b> The Law of Large Numbers is typically stated for an infinite population. When dealing with a finite population, the law may need adjustments to account for the finite size.</li>
                </ol>

                <h2 id="examples">Examples of Law of Large Numbers</h2>
                <p>An example explaining the law of large numbers is added below:</p>
                <p>Imagine your bag contains blue and red balls. Assume the bag holds 50% blue balls and 50% red balls. Drawing just one ball from the bag might result in a red or a blue ball, but it would be difficult to forecast the precise hue. Now imagine you take 10 balls from the bag one at a time, noting the colors. You might get six red balls and four blue balls or perhaps seven red balls and three blue balls. Although your little sample's red to blue ball ratio would not be exactly 50:50, it would most certainly be near.</p>
                <p>The Law of Large Numbers, however, informs us that the ratio of red balls to blue balls in your total sample would get closer and closer to the theoretical ratio of 50:50 if you kept drawing balls from the bag and tracking the colors hundreds or perhaps thousands of times.</p>

                <h2 id="example1">Example 1</h2>
                <p>In a game, a player flips a fair coin. If it lands heads, the player wins \$1; if it lands tails, the player loses \$1. What is the expected average profit/loss for the player as the number of flips increases?</p>

                <h3>Solution:</h3>
                <p>Expected value of flipping a fair coin is 0.5 for heads and 0.5 for tails.</p>
                <p>Expected profit/loss for each flip is <InlineMath math="(0.5 \times \$1) + (0.5 \times -\$1) = \$0"/>.</p>
                <p>Therefore, the expected average profit/loss for the player as the number of flips increases approaches \$0 by the Law of Large Numbers.</p>

                <h2 id="example2">Example 2</h2>
                <p>A bag contains 20 red balls and 30 blue balls. A ball is drawn from the bag, and the color is noted. The ball is then returned to the bag, and the process is repeated. What is the expected proportion of red balls drawn as the number of draws increases?</p>

                <h3>Solution:</h3>
                <p>Probability of drawing a red ball on any single draw is <InlineMath math="\frac{20}{20+30} = \frac{20}{50} = \frac{2}{5}"/>.</p>
                <p>By the Law of Large Numbers, as the number of draws increases, the proportion of red balls drawn will approach <InlineMath math="\frac{2}{5}"/>.</p>

                <h2 id="example3">Example 3</h2>
                <p>A student takes multiple-choice quizzes with 5 questions, each with 4 answer choices. If the student randomly guesses the answers to all questions, what is the expected average score as the number of quizzes increases?</p>

                <h3>Solution:</h3>
                <p>Each question has 4 answer choices, so the probability of guessing the correct answer to any question is <InlineMath math="\frac{1}{4}"/>.</p>
                <p>Since there are 5 questions, the expected score for each quiz is <InlineMath math="\left(\frac{1}{4} \times 5\right) = \frac{5}{4}"/>.</p>
                <p>Therefore, the expected average score for the student as the number of quizzes increases approaches <InlineMath math="\frac{5}{4}"/> by the Law of Large Numbers.</p>
            </div>
        </div>
    );
};

export default LawOfLargeNumbers;