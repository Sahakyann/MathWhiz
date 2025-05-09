import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CovarianceCorrelation = () => {
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
                    <li><a href="#intro">Introduction</a></li>
                    <li><a href="#covariance">Covariance</a></li>
                    <li><a href="#covariance-types">Types of Covariance</a></li>
                    <li><a href="#covariance-formula">Covariance Formula</a></li>
                    <li><a href="#correlation">Correlation</a></li>
                    <li><a href="#correlation-formula">Correlation Formula</a></li>
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
                <h1 id="intro">Covariance and Correlation</h1>
                <p>Covariance and correlation are the two key concepts in Statistics that help us analyze the relationship between two variables. Covariance measures how two variables change together, indicating whether they move in the same or opposite directions.</p>

                <h1 id="covariance">Covariance</h1>
                <p>Covariance is a statistical measure that indicates the direction of the linear relationship between two variables. It assesses how much two variables change together from their mean values.</p>

                <h2 id="covariance-types">Types of Covariance</h2>
                <ul>
                    <li><b>Positive Covariance:</b> When one variable increases, the other variable tends to increase as well, and vice versa.</li>
                    <li><b>Negative Covariance:</b> When one variable increases, the other variable tends to decrease.</li>
                    <li><b>Zero Covariance:</b> There is no linear relationship between the two variables; they move independently of each other.</li>
                </ul>

                <h2>Properties of Covariance</h2>
                <ol>
                    <li>It is the relationship between a pair of random variables where a change in one variable causes a change in another variable.</li>
                    <li>It can take any value between <InlineMath math="-\infty"/> to <InlineMath math="+\infty"/>, where the negative value represents the negative relationship whereas a positive value represents the positive relationship.</li>
                    <li>It is used for the linear relationship between variables.</li>
                    <li>It gives the direction of relationship between variables.</li>
                </ol>

                <h1 id="covariance-formula">Covariance Formula</h1>
                <h3>For Population:</h3>
                <BlockMath math="\text{Cov}(x, y) = \frac{\sum_{i=1}^{n} (x_i - \bar{x}) (y_i - \bar{y})}{n}"/>

                <h3>For Sample:</h3>
                <BlockMath math="\text{Cov}(x, y) = \frac{\sum_{i=1}^{n} (x_i - \bar{x}) (y_i - \bar{y})}{n - 1}"/>

                <p>Here, <InlineMath math="\bar{x}"/> and <InlineMath math="\bar{y}"/> are the means of the respective sample sets, <InlineMath math="n"/> is the total number of samples, and <InlineMath math="x_i"/>, <InlineMath math="y_i"/> are the individual sample values.</p>

                <div className="image-placeholder">
                    <p>[Covariance visualization would appear here]</p>
                </div>

                <h3>Key Notes</h3>
                <ul>
                    <li>Covariance provides the direction of the relationship but <b>not</b> its strength.</li>
                    <li>The magnitude of covariance depends on the units of the variables.</li>
                </ul>

                <h1 id="correlation">What is Correlation?</h1>
                <p><b>Correlation</b> is a standardized measure of the strength and direction of the linear relationship between two variables. It is derived from covariance and <b>ranges between -1 and 1</b>. Unlike covariance, which only indicates the direction of the relationship, correlation provides a standardized measure.</p>

                <ul>
                    <li><b>Positive Correlation (close to +1):</b> As one variable increases, the other variable also tends to increase.</li>
                    <li><b>Negative Correlation (close to -1):</b> As one variable increases, the other variable tends to decrease.</li>
                    <li><b>Zero Correlation:</b> There is no linear relationship between the variables.</li>
                </ul>

                <p>The <b>correlation coefficient</b> <InlineMath math="\rho"/> (rho) for variables <InlineMath math="X"/> and <InlineMath math="Y"/> is defined as:</p>

                <h2>Properties of Correlation</h2>
                <ol>
                    <li>It shows whether and how strongly pairs of variables are related to each other.</li>
                    <li>Correlation takes values between <InlineMath math="-1"/> to <InlineMath math="+1"/>, wherein values close to <InlineMath math="+1"/> represent strong positive correlation and values close to <InlineMath math="-1"/> represent strong negative correlation.</li>
                    <li>In this, variables are indirectly related to each other.</li>
                    <li>It gives the direction and strength of the relationship between variables.</li>
                </ol>

                <h2 id="correlation-formula">Correlation Formula</h2>
                <BlockMath math="Corr(x, y) = \frac{\sum_{i=1}^{n} (x_i - x')(y_i - y')}{\sqrt{\sum_{i=1}^{n} (x_i - x')^2 \sum_{i=1}^{n} (y_i - y')^2}}"/>

                <p>Here, <InlineMath math="x'"/> and <InlineMath math="y'"/> = mean of given sample set, <InlineMath math="n"/> = total number of samples, <InlineMath math="x_i"/> and <InlineMath math="y_i"/> = individual samples of the set.</p>

                <div className="image-placeholder">
                    {/* Placeholder for Correlation visualization */}
                    <p>[Correlation visualization would appear here]</p>
                </div>
            </div>
        </div>
    );
};

export default CovarianceCorrelation;