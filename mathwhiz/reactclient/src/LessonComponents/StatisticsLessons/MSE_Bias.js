import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MSEBiasVariance = () => {
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
                    <li><a href="#mse">Mean Squared Error</a></li>
                    <li><a href="#bias">Bias</a></li>
                    <li><a href="#variance">Variance</a></li>
                    <li><a href="#combinations">Bias-Variance Combinations</a></li>
                    <li><a href="#decomposition">Bias-Variance Decomposition</a></li>
                    <li><a href="#standard-error">Standard Error</a></li>
                    <li><a href="#consistency">Consistency</a></li>
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
                <h1 id="mse">Mean Squared Error (MSE)</h1>
                
                <h3>What is Mean Squared Error?</h3>
                <p>
                    Mean squared error (MSE) is a metric used to measure the average squared difference between the predicted values and the actual values in the dataset. It is calculated by taking the average of the squared residuals, where the residual is the difference between predicted value and the actual value for each data point. The MSE value provides a way to analyze the accuracy of the model.
                </p>

                <h3>Mean Squared Error Formula</h3>
                <p>The formula for the mean squared error is:</p>
                <BlockMath math="\textit{Mean Squared Error} = \frac{1}{n} \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2" />
                <p>Where:</p>
                <ul>
                    <li><InlineMath math="n" /> is the number of observations in the dataset.</li>
                    <li><InlineMath math="Y_i" /> is the actual value of the observation.</li>
                    <li><InlineMath math="\hat{Y}_i" /> is the predicted value of the <InlineMath math="i^{\text{th}}" /> observation.</li>
                </ul>

                <h2>Example: MSE Calculation</h2>
                <p>Suppose we have a dataset consisting of the actual and predicted values for the regression problem:</p>
                <ul>
                    <li><strong>Actual Values:</strong> [10, 20, 30, 40, 50]</li>
                    <li><strong>Predicted Values:</strong> [12, 18, 32, 38, 48]</li>
                </ul>

                <p>To calculate MSE we first compute the squared differences between each actual and predicted value:</p>
                <BlockMath math="\text{Squared Differences: } [(10 - 12)^2, (20 - 18)^2, (30 - 32)^2, (40 - 38)^2, (50 - 48)^2]" />
                <BlockMath math="= [4, 4, 4, 4, 4]" />

                <p>Next, we take the average of these squared differences to obtain the MSE:</p>
                <BlockMath math="\text{MSE} = \frac{4 + 4 + 4 + 4 + 4}{5} = \frac{20}{5} = 4" />
                <p>Therefore, the MSE for this regression model is 4.</p>

                <h1 id="bias">What is Bias?</h1>
                <p>
                    Bias is simply defined as the inability of the model because of the fact that there is some difference or error occurring between the model's predicted value and the actual value. These differences between actual or expected values and the predicted values are known as error or bias error or error due to bias. Bias is a systematic error that occurs due to wrong assumptions in the machine learning process.
                </p>
                <p>
                    Let <InlineMath math="Y" /> be the true value of a parameter, and let <InlineMath math="\hat{Y}" /> be an estimator of <InlineMath math="Y" /> based on a sample of data. Then, the bias of the estimator <InlineMath math="\hat{Y}" /> is given by:
                </p>
                <BlockMath math="\text{Bias}(\hat{Y}) = \mathbb{E}[\hat{Y}] - Y" />
                <p>where <InlineMath math="\mathbb{E}[\hat{Y}]" /> is the expected value of the estimator <InlineMath math="\hat{Y}" />. It is the measurement of how well the model fits the data.</p>

                <ul>
                    <li>
                        <strong>Low Bias:</strong> Low bias value means fewer assumptions are taken to build the target function. In this case, the model will closely match the training dataset.
                    </li>
                    <li>
                        <strong>High Bias:</strong> High bias value means more assumptions are taken to build the target function. In this case, the model will not match the training dataset closely.
                    </li>
                </ul>

                <p>
                    The high-bias model will not be able to capture the dataset trend. It is considered as the <strong>underfitting</strong> model which has a high error rate. It is due to a very simplified algorithm.
                </p>

                <h1 id="variance">What is Variance?</h1>
                <p>
                    Variance is the measure of spread in data from its mean position. In machine learning, variance is the amount by which the performance of a predictive model changes when it is trained on different subsets of the training data. More specifically, variance is the variability of the model, indicating how sensitive it is to changes in the training dataset—i.e., how much it adjusts when trained on a new subset of data.
                </p>

                <p>
                    Let <InlineMath math="Y" /> be the actual values of the target variable, and <InlineMath math="\hat{Y}" /> be the predicted values of the target variable. Then, the variance of a model can be measured as the expected value of the square of the difference between the predicted values and their expected value:
                </p>
                <BlockMath math="\text{Variance} = \mathbb{E}\left[(\hat{Y} - \mathbb{E}[\hat{Y}])^2\right]" />
                <p>where <InlineMath math="\mathbb{E}[\hat{Y}]" /> is the expected value of the predicted values, averaged over all possible training sets.</p>

                <p>Variance errors can be either low or high:</p>
                <ul>
                    <li>
                        <strong>Low Variance:</strong> The model is less sensitive to changes in the training data and can produce consistent estimates of the target function when trained on different subsets from the same distribution. However, low variance can also indicate <em>underfitting</em> if the model is too simple and fails to capture underlying patterns, leading to poor performance on both training and testing data.
                    </li>
                    <li>
                        <strong>High Variance:</strong> The model is highly sensitive to changes in the training data. It may perform very well on the training data but poorly on unseen test data, which is a sign of <em>overfitting</em>. It captures noise in the training data, reducing generalization capability.
                    </li>
                </ul>

                <h2 id="combinations">Different Combinations of Bias-Variance</h2>
                <p>There can be four possible combinations of bias and variance in a machine learning model:</p>
                <ol>
                    <li>
                        <strong>High Bias, Low Variance:</strong><br />
                        A model with high bias and low variance is said to be <em>underfitting</em>. It is too simple to capture the underlying structure of the data and makes strong assumptions, leading to high error on both training and test sets.
                    </li>
                    <li>
                        <strong>High Variance, Low Bias:</strong><br />
                        A model with high variance and low bias is said to be <em>overfitting</em>. It learns the training data too well, including noise and fluctuations, leading to poor performance on new, unseen data.
                    </li>
                    <li>
                        <strong>High Bias, High Variance:</strong><br />
                        A model with both high bias and high variance neither captures the underlying patterns in the data (due to high bias) nor generalizes well (due to high variance). Such a model yields inconsistent and inaccurate predictions on average.
                    </li>
                    <li>
                        <strong>Low Bias, Low Variance:</strong><br />
                        A model with low bias and low variance is ideal. It accurately captures the underlying data distribution and generalizes well to unseen data. However, in practice, achieving this combination is very difficult.
                    </li>
                </ol>

                <div className="visualization-placeholder">
                    <h4>Bias-Variance Tradeoff Visualization</h4>
                    <p>[Bias-Variance tradeoff diagram would appear here]</p>
                </div>

                <p>
                    Now we know that the ideal case will be <strong>Low Bias and Low Variance</strong>, but in practice, it is not possible. So, we trade off between Bias and Variance to achieve a balanced bias and variance.
                </p>

                <p>
                    A model with balanced bias and variance is said to have optimal generalization performance. This means that the model is able to capture the underlying patterns in the data without overfitting or underfitting. The model is likely to be just complex enough to capture the complexity of the data, but not too complex to overfit the training data. This can happen when the model has been carefully tuned to achieve a good balance between bias and variance, by adjusting the hyperparameters and selecting an appropriate model architecture.
                </p>

                <h2 id="decomposition">Bias-Variance Decomposition</h2>
                <p>
                    <strong>Theorem (Bias-Variance Decomposition of the MSE):</strong> If <InlineMath math="\hat{\theta}" /> is an estimator for <InlineMath math="\theta" />, then
                    <BlockMath math="\text{MSE}(\hat{\theta}, \theta) = \left(\text{Bias}(\hat{\theta}, \theta)\right)^2 + \text{Var}_{\theta}(\hat{\theta})" />
                </p>

                <p>
                    Bias is the <strong>accuracy</strong> of the estimator <InlineMath math="\hat{\theta}" /><br />
                    Variance is the <strong>precision</strong> of the estimator <InlineMath math="\hat{\theta}" />
                </p>

                <h2 id="standard-error">Standard Error and Estimated Standard Error</h2>
                <p>
                    <strong>Definition:</strong> The standard deviation of the estimator is called the standard error of the estimator <InlineMath math="\hat{\theta}" /> and is denoted by
                    <BlockMath math="SE(\hat{\theta}) = sd(\hat{\theta}) = \sqrt{\mathrm{Var}_\theta(\hat{\theta})}" />
                </p>

                <p>
                    Usually, the standard error will depend on the unknown value of the parameter <InlineMath math="\theta" />. If we use the estimator <InlineMath math="\hat{\theta}" />, then the estimated standard error of <InlineMath math="\hat{\theta}" />, <InlineMath math="SE(\hat{\theta})" /> is the standard error, where after calculation we plug <InlineMath math="\hat{\theta}" /> instead of <InlineMath math="\theta" />.
                </p>

                <p>
                    And statisticians, when reporting the estimate, usually report also the estimated standard error, as a measure of how precise the result is. If the standard error is small (and we are using a nice estimator, say, it is unbiased), then this is a sign that the result is close to the real/actual one.
                </p>

                <h1 id="consistency">Consistency</h1>
                <p>
                    Another important and desirable property of an estimator is the consistency: this is about its behavior when we increase the number of data points:
                </p>

                <p><strong>Definition:</strong> A point estimator <InlineMath math="\hat{\theta}_n" /> of the parameter <InlineMath math="\theta" /> is called</p>
                <ul>
                    <li><strong>consistent</strong>, if <InlineMath math="\hat{\theta}_n \xrightarrow{P} \theta" /> for any <InlineMath math="\theta \in \Theta" />;</li>
                    <li><strong>strongly consistent</strong>, if <InlineMath math="\hat{\theta}_n \xrightarrow{\text{a.s.}} \theta" /> for any <InlineMath math="\theta \in \Theta" />;</li>
                    <li><strong>Weakly or mean square consistent</strong>, if <InlineMath math="\hat{\theta}_n \xrightarrow{\text{q.m.}} \theta" /> for any <InlineMath math="\theta \in \Theta" />.</li>
                </ul>

                <h3>Some properties</h3>
                <ul>
                    <li>If the estimator is strongly consistent, then it is consistent;</li>
                    <li>If the estimator is weakly consistent, then it is consistent;</li>
                    <li>
                        If <InlineMath math="\hat{\theta}_n" /> is an unbiased estimator for <InlineMath math="\theta" /> and
                        <BlockMath math="\operatorname{Var}(\hat{\theta}_n) \to 0, \quad n \to \infty," />
                        then <InlineMath math="\hat{\theta}_n" /> is consistent;
                    </li>
                    <li>
                        If <InlineMath math="\hat{\theta}_n" /> is an asymptotically unbiased estimator for <InlineMath math="\theta" /> and
                        <BlockMath math="\operatorname{Var}(\hat{\theta}_n) \to 0, \quad n \to \infty," />
                        then <InlineMath math="\hat{\theta}_n" /> is consistent.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MSEBiasVariance;