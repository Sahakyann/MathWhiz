import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const ConvergenceTypes = () => {
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
                    <li><a href="#almost-sure">Almost Sure Convergence</a></li>
                    <li><a href="#distribution">Convergence in Distribution</a></li>
                    <li><a href="#probability">Convergence in Probability</a></li>
                    <li><a href="#mean">Convergence in Mean</a></li>
                </ul>
            </nav>

            <div className="top-page">
                <div className="button-container">
                    <button className="transparent-button" onClick={() => navigate('/statistics')}>
                        Back to Statistics
                    </button>
                </div>
            </div>

            <div className="latex-container">
                <h1 id="almost-sure">Almost Sure Convergence</h1>
                <p>
                    Consider a sequence of random variables <InlineMath math="X_1, X_2, X_3, \cdots" /> that is defined on an underlying sample space <InlineMath math="\mathcal{S}" />. For simplicity, let us assume that <InlineMath math="\mathcal{S}" /> is a finite set, so we can write
                    <BlockMath math="\mathcal{S} = \{s_1, s_2, \cdots, s_k\}." />
                </p>
                <p>
                    Remember that each <InlineMath math="X_n" /> is a function from <InlineMath math="\mathcal{S}" /> to the set of real numbers. Thus, we may write
                    <BlockMath math="X_n(s_i) = x_{ni}, \quad \text{for } i = 1, 2, \cdots, k." />
                </p>
                <p>
                    After this random experiment is performed, one of the <InlineMath math="s_i" />'s will be the outcome of the experiment, and the values of the <InlineMath math="X_n" />'s are known. If <InlineMath math="s_j" /> is the outcome of the experiment, we observe the following sequence:
                    <BlockMath math="x_{1j}, x_{2j}, x_{3j}, \cdots." />
                </p>
                <p>
                    Since this is a sequence of real numbers, we can talk about its convergence. Does it converge? If yes, what does it converge to? <strong>Almost sure</strong> convergence is defined based on the convergence of such sequences. Before introducing almost sure convergence let us look at an example.
                </p>

                <h3>Example 1</h3>
                <p>
                    Consider the following random experiment: A fair coin is tossed once. Here, the sample space has only two elements <InlineMath math="\mathcal{S} = \{H, T\}" />. We define a sequence of random variables <InlineMath math="X_1, X_2, X_3, \cdots" /> on this sample space as follows:
                    <BlockMath math="X_n(s) = 
                    \begin{cases}
                    \frac{n}{n+1} & \text{if } s = H \\
                    (-1)^n & \text{if } s = T
                    \end{cases}" />
                </p>
                <ol type="a">
                    <li>For each of the possible outcomes (<InlineMath math="H" /> or <InlineMath math="T" />), determine whether the resulting sequence of real numbers converges or not.</li>
                    <li>Find 
                    <BlockMath math="P\left( \left\{ s_i \in \mathcal{S} : \lim_{n \to \infty} X_n(s_i) = 1 \right\} \right)." />
                    </li>
                </ol>

                <h3>Solution</h3>
                <ol type="a">
                    <li>
                        <p>If the outcome is <InlineMath math="H" />, then we have 
                        <BlockMath math="X_n(H) = \frac{n}{n+1}," />
                        so we obtain the following sequence
                        <BlockMath math="\frac{1}{2}, \frac{2}{3}, \frac{3}{4}, \frac{4}{5}, \cdots." />
                        </p>
                        <p>This sequence converges to <InlineMath math="1" /> as <InlineMath math="n \to \infty" />.</p>
                        <p>If the outcome is <InlineMath math="T" />, then we have 
                        <BlockMath math="X_n(T) = (-1)^n," />
                        so we obtain the following sequence
                        <BlockMath math="-1, 1, -1, 1, -1, \cdots." />
                        </p>
                        <p>This sequence does not converge as it oscillates between <InlineMath math="-1" /> and <InlineMath math="1" /> forever.</p>
                    </li>
                    <li>
                        <p>By part (a), the event <InlineMath math="\left\{ s_i \in \mathcal{S} : \lim_{n \to \infty} X_n(s_i) = 1 \right\}" /> happens if and only if the outcome is <InlineMath math="H" />, so
                        <BlockMath math="P \left( \left\{ s_i \in \mathcal{S} : \lim_{n \to \infty} X_n(s_i) = 1 \right\} \right)
                        = P(H)
                        = \frac{1}{2}." />
                        </p>
                    </li>
                </ol>

                <p>
                    In the above example, we saw that the sequence <InlineMath math="X_n(s)" /> converged when <InlineMath math="s = H" /> and did not converge when <InlineMath math="s = T" />. In general, if the probability that the sequence <InlineMath math="X_n(s)" /> converges to <InlineMath math="X(s)" /> is equal to 1, we say that <InlineMath math="X_n" /> converges to <InlineMath math="X" /> <strong>almost surely</strong> and write
                    <BlockMath math="X_n \xrightarrow{\text{a.s.}} X." />
                </p>

                <h3>Definition: Almost Sure Convergence</h3>
                <p>
                    A sequence of random variables <InlineMath math="X_1, X_2, X_3, \cdots" /> converges <strong>almost surely</strong> to a random variable <InlineMath math="X" />, shown by <InlineMath math="X_n \xrightarrow{\text{a.s.}} X" />, if
                    <BlockMath math="P \left( \left\{ s \in \mathcal{S} : \lim_{n \to \infty} X_n(s) = X(s) \right\} \right) = 1." />
                </p>

                <h1 id="distribution">Convergence in Distribution</h1>
                <p>
                    Convergence in distribution is in some sense the weakest type of convergence. All it says is that the CDF of <InlineMath math="X_n" />'s converges to the CDF of <InlineMath math="X" /> as <InlineMath math="n" /> goes to infinity. It does not require any dependence between the <InlineMath math="X_n" />'s and <InlineMath math="X" />. We saw this type of convergence before when we discussed the central limit theorem. To say that <InlineMath math="X_n" /> converges in distribution to <InlineMath math="X" />, we write
                    <BlockMath math="X_n \xrightarrow{d} X." />
                </p>

                <h3>Definition: Convergence in Distribution</h3>
                <p>
                    A sequence of random variables <InlineMath math="X_1, X_2, X_3, \cdots" /> converges <strong>in distribution</strong> to a random variable <InlineMath math="X" />, shown by <InlineMath math="X_n \xrightarrow{d} X" />, if
                    <BlockMath math="\lim_{n \to \infty} F_{X_n}(x) = F_X(x)," />
                    for all <InlineMath math="x" /> at which <InlineMath math="F_X(x)" /> is continuous.
                </p>
                <p>
                    If <InlineMath math="X_1, X_2, X_3, \cdots" /> is a sequence of i.i.d. random variables with CDF <InlineMath math="F_X(x)" />, then
                    <BlockMath math="X_n \xrightarrow{d} X." />
                    This is because
                    <BlockMath math="F_{X_n}(x) = F_X(x), \quad \text{for all } x." />
                </p>
                <p>
                    Therefore,
                    <BlockMath math="\lim_{n \to \infty} F_{X_n}(x) = F_X(x), \quad \text{for all } x." />
                </p>

                <h3>Example 2</h3>
                <p>
                    Let <InlineMath math="X_2, X_3, X_4, \cdots" /> be a sequence of random variables such that
                    <BlockMath math="F_{X_n}(x) =
                    \begin{cases}
                    1 - \left(1 - \frac{1}{n} \right)^{nx} & x > 0 \\
                    0 & \text{otherwise}
                    \end{cases}" />
                </p>
                <p>
                    Show that <InlineMath math="X_n" /> converges in distribution to <InlineMath math="\text{Exponential}(1)" />.
                </p>

                <h3>Solution</h3>
                <p>
                    Let <InlineMath math="X \sim \text{Exponential}(1)" />. For <InlineMath math="x \leq 0" />, we have
                    <BlockMath math="F_{X_n}(x) = F_X(x) = 0, \quad \text{for } n = 2, 3, 4, \cdots." />
                </p>
                <p>
                    For <InlineMath math="x \geq 0" />, we have
                    <BlockMath math="\lim_{n \to \infty} F_{X_n}(x)
                    = \lim_{n \to \infty} \left( 1 - \left(1 - \frac{1}{n} \right)^{nx} \right)
                    = 1 - \lim_{n \to \infty} \left(1 - \frac{1}{n} \right)^{nx}
                    = 1 - e^{-x}
                    = F_X(x), \quad \text{for all } x." />
                </p>
                <p>
                    Thus, we conclude that
                    <BlockMath math="X_n \xrightarrow{d} X." />
                </p>

                <h1 id="probability">Convergence in Probability</h1>
                <p>
                    Convergence in probability is stronger than convergence in distribution. In particular, for a sequence <InlineMath math="X_1, X_2, X_3, \cdots" /> to converge to a random variable <InlineMath math="X" />, we must have that 
                    <BlockMath math="P(|X_n - X| \geq \epsilon) \to 0 \quad \text{as } n \to \infty, \text{ for any } \epsilon > 0." />
                    To say that <InlineMath math="X_n" /> converges in probability to <InlineMath math="X" />, we write
                    <BlockMath math="X_n \xrightarrow{p} X." />
                </p>

                <h3>Definition: Convergence in Probability</h3>
                <p>
                    A sequence of random variables <InlineMath math="X_1, X_2, X_3, \cdots" /> converges <strong>in probability</strong> to a random variable <InlineMath math="X" />, shown by <InlineMath math="X_n \xrightarrow{p} X" />, if
                    <BlockMath math="\lim_{n \to \infty} P(|X_n - X| \geq \epsilon) = 0, \quad \text{for all } \epsilon > 0." />
                </p>

                <h3>Example 3</h3>
                <p>
                    Let <InlineMath math="X_n \sim \text{Exponential}(n)" />, show that <InlineMath math="X_n \xrightarrow{p} 0" />. That is, the sequence <InlineMath math="X_1, X_2, X_3, \cdots" /> converges in probability to the zero random variable <InlineMath math="X" />.
                </p>

                <h3>Solution</h3>
                <p>
                    We have
                    <BlockMath math="\lim_{n \to \infty} P(|X_n - 0| \geq \varepsilon)
                    = \lim_{n \to \infty} P(X_n \geq \varepsilon) \quad \text{(since } X_n \geq 0 \text{)}" />
                    <BlockMath math="= \lim_{n \to \infty} e^{-n \varepsilon} \quad \text{(since } X_n \sim \text{Exponential}(n) \text{)}= 0, \quad \text{for all } \varepsilon > 0." />
                </p>

                <h3>Example 4</h3>
                <p>
                    Let <InlineMath math="X" /> be a random variable, and <InlineMath math="X_n = X + Y_n" />, where
                    <BlockMath math="\mathbb{E}Y_n = \frac{1}{n}, \qquad \text{Var}(Y_n) = \frac{\sigma^2}{n}," />
                    where <InlineMath math="\sigma > 0" /> is a constant. Show that <InlineMath math="X_n \xrightarrow{p} X" />.
                </p>

                <h3>Solution</h3>
                <p>
                    First note that by the triangle inequality, for all <InlineMath math="a, b \in \mathbb{R}" />, we have
                    <BlockMath math="|a + b| \leq |a| + |b|." />
                    Choosing <InlineMath math="a = Y_n - \mathbb{E}Y_n" /> and <InlineMath math="b = \mathbb{E}Y_n" />, we obtain
                    <BlockMath math="|Y_n| \leq |Y_n - \mathbb{E}Y_n| + \frac{1}{n}." />
                </p>
                <p>
                    Now, for any <InlineMath math="\varepsilon > 0" />, we have
                    <BlockMath math="P(|X_n - X| \geq \varepsilon) = P(|Y_n| \geq \varepsilon)" />
                    <BlockMath math="\leq P\left( \left| Y_n - \mathbb{E}Y_n \right| + \frac{1}{n} \geq \varepsilon \right)
                    = P\left( \left| Y_n - \mathbb{E}Y_n \right| \geq \varepsilon - \frac{1}{n} \right)" />
                    <BlockMath math="\leq \frac{\text{Var}(Y_n)}{(\varepsilon - \frac{1}{n})^2}
                    = \frac{\sigma^2}{n(\varepsilon - \frac{1}{n})^2} \to 0 \quad \text{as } n \to \infty." />
                </p>
                <p>
                    Therefore, we conclude <InlineMath math="X_n \xrightarrow{p} X" />.
                </p>

                <h1 id="mean">Convergence in Mean</h1>
                <p>
                    One way of interpreting the convergence of a sequence <InlineMath math="X_n" /> to <InlineMath math="X" /> is to say that the "distance" between <InlineMath math="X" /> and <InlineMath math="X_n" /> is getting smaller and smaller. For example, if we define the distance between <InlineMath math="X_n" /> and <InlineMath math="X" /> as <InlineMath math="P(|X_n - X| \geq \varepsilon)" />, we have convergence in probability. One way to define the distance between <InlineMath math="X_n" /> and <InlineMath math="X" /> is
                    <BlockMath math="\mathbb{E} \left( |X_n - X|^r \right)," />
                    where <InlineMath math="r \geq 1" /> is a fixed number. This refers to <strong>convergence in mean</strong>. (Note: for convergence in mean, it is usually required that <InlineMath math="\mathbb{E}|X_n|^r < \infty" />.) The most common choice is <InlineMath math="r = 2" />, in which case it is called the mean-square convergence. (Note: Some authors refer to the case <InlineMath math="r = 1" /> as convergence in mean.)
                </p>

                <h3>Convergence in Mean</h3>
                <p>
                    Let <InlineMath math="r \geq 1" /> be a fixed number. A sequence of random variables <InlineMath math="X_1, X_2, X_3, \dots" /> converges in the <InlineMath math="r" />th mean or in the <InlineMath math="L^r" /> norm to a random variable <InlineMath math="X" />, shown by
                    <BlockMath math="X_n \xrightarrow{L^r} X," />
                    if
                    <BlockMath math="\lim_{n \to \infty} \mathbb{E} \left( |X_n - X|^r \right) = 0." />
                </p>
                <p>
                    If <InlineMath math="r = 2" />, it is called the <strong>mean-square convergence</strong>, and it is shown by
                    <BlockMath math="X_n \xrightarrow{m.s.} X." />
                </p>

                <h3>Example 5</h3>
                <p>
                    Let <InlineMath math="X_n \sim \text{Uniform}\left(0, \frac{1}{n} \right)" />. Show that 
                    <BlockMath math="X_n \xrightarrow{L^r} 0, \quad \text{for any } r \geq 1." />
                </p>

                <h3>Solution</h3>
                <p>
                    The PDF of <InlineMath math="X_n" /> is given by
                    <BlockMath math="f_{X_n}(x) =
                    \begin{cases}
                    n & \text{if } 0 \leq x \leq \frac{1}{n}, \\
                    0 & \text{otherwise}.
                    \end{cases}" />
                </p>
                <p>
                    We have
                    <BlockMath math="\mathbb{E}\left(|X_n - 0|^r\right) = \int_0^{\frac{1}{n}} x^r n \, dx 
                    = \frac{1}{(r+1)n^r} \to 0, \quad \text{for all } r \geq 1." />
                </p>
                <p>
                    Thus, <InlineMath math="X_n \xrightarrow{L^r} 0" />.
                </p>
            </div>
        </div>
    );
};

export default ConvergenceTypes;