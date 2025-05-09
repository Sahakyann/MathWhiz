import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EstimationMethods = () => {
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
                    <li><a href="#mom">Method of Moments (MoM)</a></li>
                    <li><a href="#mle">Maximum Likelihood Estimation (MLE)</a></li>
                    <li><a href="#mle-problems">MLE Problems</a></li>
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
                <h1 id="mom">Method of Moments (MoM)</h1>
                <p>Recall that the first four moments tell us a lot about the distribution. The first moment is the expectation or mean, and the second moment tells us the variance.</p>
                <p>Suppose we only need to estimate one parameter <InlineMath math="\theta"/> (you might have to estimate two for example <InlineMath math="\theta = (\mu, \sigma^2)"/> for the <InlineMath math="\mathcal{N}(\mu, \sigma^2)"/> distribution). The idea behind <b>Method of Moments (MoM)</b> estimation is that: to find a good estimator, we should have the true and sample moments match as best we can. That is, I should choose the parameter <InlineMath math="\theta"/> such that the first true moment <InlineMath math="\mathbb{E}[X]"/> is equal to the first sample moment <InlineMath math="\bar{x}"/>.</p>

                <h3>Example:</h3>
                <p>Let's say <InlineMath math="x_1, x_2, \ldots, x_n"/> are iid samples from <InlineMath math="X \sim \text{Unif}(0, \theta)"/>. What is the MoM estimator of <InlineMath math="\theta"/>?</p>

                <h3>Solution:</h3>
                <p>We then set the first true moment to the first sample moment as follows (recall that <InlineMath math="\mathbb{E}[\text{Unif}(a,b)] = \frac{a + b}{2}"/>):</p>
                <BlockMath>{'\mathbb{E}[X] = \frac{\theta}{2} = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>Solving for <InlineMath math="\theta"/> we get:</p>
                <BlockMath>{'\hat{\theta}_{MoM} = \frac{2}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>That's all there is to it! Much simpler than MLE, right?</p>

                <h3>Method of Moments Estimation</h3>
                <p>Let <InlineMath math="\mathbf{x} = (x_1, \ldots, x_n)"/> be iid realizations (samples) from probability mass function <InlineMath math="p_X(t; \theta)"/> (if <InlineMath math="X"/> is discrete), or from density <InlineMath math="f_X(t; \theta)"/> (if <InlineMath math="X"/> is continuous), where <InlineMath math="\theta"/> is a parameter (or vector of parameters).</p>
                <p>We then define the <b>method of moments (MoM)</b> estimator <InlineMath math="\hat{\theta}_{MoM}"/> of <InlineMath math="\theta = (\theta_1, \ldots, \theta_k)"/> to be a solution (if it exists) to the <InlineMath math="k"/> simultaneous equations where, for <InlineMath math="j = 1, \ldots, k"/>, we set the <InlineMath math="j^\text{th}"/> (true) moment equal to the <InlineMath math="j^\text{th}"/> sample moment:</p>
                <BlockMath>{'\mathbb{E}[X] = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <BlockMath>{'\vdots'}</BlockMath>
                <BlockMath>{'\mathbb{E}[X^k] = \frac{1}{n} \sum_{i=1}^{n} x_i^k'}</BlockMath>

                <h3>Example</h3>
                <p>Let's say <InlineMath math="x_1, x_2, \ldots, x_n"/> are iid samples from <InlineMath math="X \sim \text{Exp}(\theta)"/>. What is the MoM estimator of <InlineMath math="\theta"/>?</p>
                <p><i>Solution:</i> We have <InlineMath math="k = 1"/> (since only one parameter). <b>We then set the first true moment to the first sample moment</b> as follows (recall that <InlineMath math="\mathbb{E}[\text{Exp}(\lambda)] = \frac{1}{\lambda}"/>):</p>
                <BlockMath>{'\mathbb{E}[X] = \frac{1}{\theta} = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>Solving for <InlineMath math="\theta"/> gives the MoM estimator:</p>
                <BlockMath>{'\hat{\theta}_{MoM} = \left( \frac{1}{n} \sum_{i=1}^{n} x_i \right)^{-1}'}</BlockMath>
                <p>Notice that in this case, the MoM estimator <b>agrees with the MLE</b> (Maximum Likelihood Estimator), hooray!</p>
                <BlockMath>{'\hat{\theta}_{MoM} = \hat{\theta}_{MLE} = \frac{1}{\frac{1}{n} \sum_{i=1}^{n} x_i}'}</BlockMath>
                <p>Isn't this way better/easier than MLE?</p>

                <h3>Example</h3>
                <p>Let's say <InlineMath math="x_1, x_2, \ldots, x_n"/> are iid samples from <InlineMath math="X \sim \text{Poi}(\theta)"/>. (These values might look like <InlineMath math="x_1 = 13, x_2 = 5, x_3 = 4,"/> etc.) What is the MoM estimator of <InlineMath math="\theta"/>?</p>
                <p><i>Solution:</i> We have <InlineMath math="k = 1"/> (since only one parameter). <b>We then set the first true moment to the first sample moment as follows (recall that <InlineMath math="\mathbb{E}[\text{Poi}(\lambda)] = \lambda"/>):</b></p>
                <BlockMath>{'\mathbb{E}[X] = \theta = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>Solving for <InlineMath math="\theta"/>, we get:</p>
                <BlockMath>{'\hat{\theta}_{MoM} = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>In this case, again, the MoM estimator <b>agrees with the MLE</b>! Again, much easier than MLE :).</p>

                <h3>Example with two parameters</h3>
                <p>Let <InlineMath math="x_1, x_2, \dots, x_n"/> be i.i.d. samples from <InlineMath math="X \sim \mathcal{N}(\theta_1, \theta_2)"/>, where <InlineMath math="\theta_1 = \mu"/> is the mean and <InlineMath math="\theta_2 = \sigma^2"/> is the variance. We want to find the Method of Moments (MoM) estimators for the vector <InlineMath math="\theta = (\theta_1, \theta_2)"/>.</p>

                <p><b>Step 1: Estimate the first moment (mean)</b><br />
                We set the first true moment equal to the first sample moment:</p>
                <BlockMath>{'\mathbb{E}[X] = \theta_1 = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>
                <p>Solving for <InlineMath math="\theta_1"/>, we get:</p>
                <BlockMath>{'\hat{\theta}_1 = \frac{1}{n} \sum_{i=1}^{n} x_i'}</BlockMath>

                <p><b>Step 2: Estimate the second moment</b><br />
                Recall the identity:</p>
                <BlockMath>{'\mathbb{E}[X^2] = \text{Var}(X) + (\mathbb{E}[X])^2 = \theta_2 + \theta_1^2'}</BlockMath>
                <p>We equate the second true moment to the second sample moment:</p>
                <BlockMath>{'\mathbb{E}[X^2] = \frac{1}{n} \sum_{i=1}^{n} x_i^2'}</BlockMath>
                <p>Substitute and solve for <InlineMath math="\theta_2"/>:</p>
                <BlockMath>{'\frac{1}{n} \sum_{i=1}^{n} x_i^2 = \theta_2 + \theta_1^2'}</BlockMath>
                <BlockMath>{'\hat{\theta}_2 = \frac{1}{n} \sum_{i=1}^{n} x_i^2 - \left( \frac{1}{n} \sum_{i=1}^{n} x_i \right)^2'}</BlockMath>
                <p>Thus, the Method of Moments estimators are:</p>
                <BlockMath>{'\hat{\theta}_1 = \frac{1}{n} \sum_{i=1}^{n} x_i, \quad \hat{\theta}_2 = \frac{1}{n} \sum_{i=1}^{n} x_i^2 - \left( \frac{1}{n} \sum_{i=1}^{n} x_i \right)^2'}</BlockMath>
                <p>If you were to use Maximum Likelihood Estimation (MLE), you would obtain the same formulas.</p>

                <h1 id="mle">Maximum Likelihood Estimation (MLE)</h1>
                <p>I have a bag that contains 3 balls. Each ball is either red or blue, but I have no information in addition to this. Thus, the number of blue balls, call it <InlineMath math="\theta"/>, might be 0, 1, 2, or 3. I am allowed to choose 4 balls at random from the bag <i>with</i> replacement. We define the random variables <InlineMath math="X_1, X_2, X_3, X_4"/> as follows:</p>
                <BlockMath>{'X_i = \\begin{cases} 1 & \\text{if the } i\\text{th chosen ball is blue} \\\\ 0 & \\text{if the } i\\text{th chosen ball is red} \\end{cases}'}</BlockMath>
                <p>Note that <InlineMath math="X_i"/>'s are i.i.d. and <InlineMath math="X_i \sim \text{Bernoulli}\left(\frac{\theta}{3}\right)"/>. After doing my experiment, I observe the following values for <InlineMath math="X_i"/>'s:</p>
                <BlockMath>{'x_1 = 1,\\quad x_2 = 0,\\quad x_3 = 1,\\quad x_4 = 1.'}</BlockMath>
                <p>Thus, I observe 3 blue balls and 1 red ball.</p>
                <ol>
                    <li>For each possible value of <InlineMath math="\theta"/>, find the probability of the observed sample, <InlineMath math="(x_1, x_2, x_3, x_4) = (1, 0, 1, 1)"/>.</li>
                    <li>For which value of <InlineMath math="\theta"/> is the probability of the observed sample the largest?</li>
                </ol>

                <h3>Solution</h3>
                <p>Since <InlineMath math="X_i \sim \text{Bernoulli}\left(\frac{\theta}{3}\right)"/>, we have</p>
                <BlockMath>{'P_{X_i}(x) = \\begin{cases} \\frac{\\theta}{3} & \\text{for } x = 1 \\\\ 1 - \\frac{\\theta}{3} & \\text{for } x = 0 \\end{cases}'}</BlockMath>
                <p>Since <InlineMath math="X_i"/>'s are independent, the joint PMF of <InlineMath math="X_1, X_2, X_3, X_4"/> can be written as</p>
                <BlockMath>{'P_{X_1X_2X_3X_4}(x_1, x_2, x_3, x_4) = P_{X_1}(x_1)P_{X_2}(x_2)P_{X_3}(x_3)P_{X_4}(x_4)'}</BlockMath>
                <p>Therefore,</p>
                <BlockMath>{'P_{X_1X_2X_3X_4}(1, 0, 1, 1) = \\frac{\\theta}{3} \\cdot \\left(1 - \\frac{\\theta}{3}\\right) \\cdot \\frac{\\theta}{3} \\cdot \\frac{\\theta}{3} = \\left(\\frac{\\theta}{3}\\right)^3 \\left(1 - \\frac{\\theta}{3}\\right)'}</BlockMath>
                <p>Note that the joint PMF depends on <InlineMath math="\theta"/>, so we write it as</p>
                <BlockMath>{'P_{X_1X_2X_3X_4}(x_1, x_2, x_3, x_4; \\theta)'}</BlockMath>
                <p>We obtain the values given in table for the probability of <InlineMath math="(1, 0, 1, 1)"/>.</p>
                <BlockMath>{'P_{X_1X_2X_3X_4}(1, 0, 1, 1; \\theta = 0) = 0'}</BlockMath>
                <BlockMath>{'P_{X_1X_2X_3X_4}(1, 0, 1, 1; \\theta = 1) = 0.0247'}</BlockMath>
                <BlockMath>{'P_{X_1X_2X_3X_4}(1, 0, 1, 1; \\theta = 2) = 0.0988'}</BlockMath>
                <BlockMath>{'P_{X_1X_2X_3X_4}(1, 0, 1, 1; \\theta = 3) = 0'}</BlockMath>
                <p><b>Therefore, the probability is maximized at </b> <InlineMath math="\theta = 2"/></p>
                <p>The probability of the observed sample for <InlineMath math="\theta = 0"/> and <InlineMath math="\theta = 3"/> is zero. This makes sense because our sample included both red and blue balls. From the table we see that the probability of the observed data is maximized for <InlineMath math="\theta = 2"/>. This means that the observed data is most likely to occur for <InlineMath math="\theta = 2"/>. For this reason, we may choose <InlineMath math="\hat{\theta} = 2"/> as our estimate of <InlineMath math="\theta"/>. This is called the <b>maximum likelihood estimate (MLE)</b> of <InlineMath math="\theta"/>.</p>

                <p>The above example gives us the idea behind the <b>maximum likelihood estimation</b>. Here, we introduce this method formally.</p>
                <p>Let <InlineMath math="X_1, X_2, X_3, \ldots, X_n"/> be a random sample from a distribution with parameter <InlineMath math="\theta"/> (In general, <InlineMath math="\theta"/> might be a vector, <InlineMath math="\theta = (\theta_1, \theta_2, \ldots, \theta_k)"/>). Suppose that <InlineMath math="x_1, x_2, x_3, \ldots, x_n"/> are the observed values of <InlineMath math="X_1, X_2, X_3, \ldots, X_n"/>.</p>

                <ul>
                    <li>If <InlineMath math="X_i"/>'s are discrete random variables, we define the <b>likelihood function</b> as the probability of the observed sample as a function of <InlineMath math="\theta"/>:
                    <BlockMath>{'L(x_1, x_2, \\ldots, x_n; \\theta) = P(X_1 = x_1, X_2 = x_2, \\ldots, X_n = x_n; \\theta) = P_{X_1X_2 \\cdots X_n}(x_1, x_2, \\ldots, x_n; \\theta).'}</BlockMath></li>

                    <li>To write this more compactly, we can use vector notation, <InlineMath math="\mathbf{X} = (X_1, X_2, \ldots, X_n)"/>, and write:
                    <BlockMath>{'L(\\mathbf{x}; \\theta) = P_{\\mathbf{X}}(\\mathbf{x}; \\theta).'}</BlockMath></li>

                    <li>If <InlineMath math="X_1, X_2, \ldots, X_n"/> are jointly continuous, then we define the likelihood function using the joint PDF:
                    <BlockMath>{'L(x_1, x_2, \\ldots, x_n; \\theta) = f_{X_1X_2 \\cdots X_n}(x_1, x_2, \\ldots, x_n; \\theta).'}</BlockMath></li>
                </ul>

                <p>In some problems, it is easier to work with the <b>log likelihood function</b>, which is given by:</p>
                <BlockMath>{'\ln L(x_1, x_2, \\ldots, x_n; \\theta).'}</BlockMath>

                <h1 id="mle-problems">Problem:</h1>
                <p>For the following random samples, find the likelihood function:</p>
                <ol>
                    <li><InlineMath math="X_i \sim \text{Binomial}(3, \theta)"/>, and we have observed <InlineMath math="(x_1, x_2, x_3, x_4) = (1, 3, 2, 2)"/>.</li>
                    <li><InlineMath math="X_i \sim \text{Exponential}(\theta)"/> and we have observed <InlineMath math="(x_1, x_2, x_3, x_4) = (1.23, 3.32, 1.98, 2.12)"/>.</li>
                </ol>

                <h3>Solution:</h3>
                <p>Recall that when we have a random sample, the <InlineMath math="X_i"/>'s are i.i.d., so we can obtain the joint PMF or PDF by multiplying the individual PMFs or PDFs.</p>

                <h4>1. Binomial case:</h4>
                <p>If <InlineMath math="X_i \sim \text{Binomial}(3, \theta)"/>, then the PMF is</p>
                <BlockMath>{'P_{X_i}(x; \\theta) = \\binom{3}{x} \\theta^x (1 - \\theta)^{3 - x}.'}</BlockMath>
                <p>Therefore, the likelihood function is</p>
                <BlockMath>{'L(x_1, x_2, x_3, x_4; \\theta) = P_{X_1X_2X_3X_4}(x_1, x_2, x_3, x_4; \\theta) = \\prod_{i=1}^{4} \\binom{3}{x_i} \\theta^{x_i} (1 - \\theta)^{3 - x_i}.'}</BlockMath>
                <p>Let <InlineMath math="T = x_1 + x_2 + x_3 + x_4"/>, then:</p>
                <BlockMath>{'L(x_1, x_2, x_3, x_4; \\theta) = \\left[ \\prod_{i=1}^{4} \\binom{3}{x_i} \\right] \\theta^{T} (1 - \\theta)^{12 - T}.'}</BlockMath>

                <p>Since <InlineMath math="(x_1, x_2, x_3, x_4) = (1, 3, 2, 2)"/>, we have <InlineMath math="T = 8"/>, and</p>
                <BlockMath>{'L(1, 3, 2, 2; \\theta) = \\binom{3}{1} \\binom{3}{3} \\binom{3}{2} \\binom{3}{2} \\theta^8 (1 - \\theta)^4 = 3 \\cdot 1 \\cdot 3 \\cdot 3 \\cdot \\theta^8 (1 - \\theta)^4 = 27 \\theta^8 (1 - \\theta)^4.'}</BlockMath>

                <h4>2. Exponential case:</h4>
                <p>If <InlineMath math="X_i \sim \text{Exponential}(\theta)"/>, then the PDF is</p>
                <BlockMath>{'f_{X_i}(x; \\theta) = \\theta e^{-\\theta x} u(x),'}</BlockMath>
                <p>where <InlineMath math="u(x)"/> is the unit step function (<InlineMath math="u(x) = 1"/> for <InlineMath math="x \geq 0"/>, and <InlineMath math="0"/> otherwise). Assuming all <InlineMath math="x_i \geq 0"/>, we have</p>
                <BlockMath>{'L(x_1, x_2, x_3, x_4; \\theta) = \\prod_{i=1}^{4} \\theta e^{-\\theta x_i} = \\theta^4 e^{-\\theta \\sum x_i}.'}</BlockMath>

                <p>Given <InlineMath math="(x_1, x_2, x_3, x_4) = (1.23, 3.32, 1.98, 2.12)"/>, we find:</p>
                <BlockMath>{'\sum x_i = 1.23 + 3.32 + 1.98 + 2.12 = 8.65,'}</BlockMath>
                <p>so</p>
                <BlockMath>{'L(1.23, 3.32, 1.98, 2.12; \\theta) = \\theta^4 e^{-8.65\\theta}.'}</BlockMath>

                <h3>Problem:</h3>
                <p>For the following random samples, find the maximum likelihood estimate of <InlineMath math="\theta"/>:</p>
                <ol>
                    <li><InlineMath math="X_i \sim \text{Binomial}(3, \theta)"/>, and we have observed <InlineMath math="(x_1, x_2, x_3, x_4) = (1, 3, 2, 2)"/>.</li>
                    <li><InlineMath math="X_i \sim \text{Exponential}(\theta)"/>, and we have observed <InlineMath math="(x_1, x_2, x_3, x_4) = (1.23, 3.32, 1.98, 2.12)"/>.</li>
                </ol>

                <h3>Solution:</h3>

                <h4>1. Binomial Case</h4>
                <p>From Example 8.8, we found the likelihood function to be:</p>
                <BlockMath>{'L(1, 3, 2, 2; \\theta) = 27 \\theta^8 (1 - \\theta)^4.'}</BlockMath>

                <p>To maximize the likelihood, we differentiate with respect to <InlineMath math="\theta"/>:</p>
                <BlockMath>{'\\frac{dL(1, 3, 2, 2; \\theta)}{d\\theta} = 27 \\left[ 8\\theta^7(1 - \\theta)^4 - 4\\theta^8(1 - \\theta)^3 \\right].'}</BlockMath>

                <p>Setting the derivative to zero and solving gives:</p>
                <BlockMath>{'\\hat{\\theta}_{\\text{ML}} = \\frac{2}{3}.'}</BlockMath>

                <h4>2. Exponential Case</h4>
                <p>From Example 8.8, the likelihood function is:</p>
                <BlockMath>{'L(1.23, 3.32, 1.98, 2.12; \\theta) = \\theta^4 e^{-8.65\\theta}.'}</BlockMath>

                <p>It is easier to work with the log-likelihood:</p>
                <BlockMath>{'\\ln L(1.23, 3.32, 1.98, 2.12; \\theta) = 4 \\ln \\theta - 8.65 \\theta.'}</BlockMath>

                <p>Taking the derivative and setting it to zero:</p>
                <BlockMath>{'\\frac{d}{d\\theta} \\ln L(\\theta) = \\frac{4}{\\theta} - 8.65 = 0,'}</BlockMath>
                <BlockMath>{'\\Rightarrow \\hat{\\theta}_{\\text{ML}} = \\frac{4}{8.65} \\approx 0.46.'}</BlockMath>

                <p><i>Note:</i> To confirm that the solution is a maximum, one should examine the second derivative or endpoints. In this case, these values do indeed maximize the likelihood.</p>

                <p>Also note that the value <InlineMath math="\hat{\theta}_{\text{ML}}"/> is a function of the observed data. Therefore, the maximum likelihood estimator (MLE), denoted by <InlineMath math="\hat{\Theta}_{\text{ML}}"/>, is a random variable.</p>

                <h3>Definition: Maximum Likelihood Estimator (MLE)</h3>
                <p>Let <InlineMath math="X_1, X_2, \dots, X_n"/> be a random sample from a distribution with parameter <InlineMath math="\theta"/>. Given observed values <InlineMath math="X_1 = x_1, \dots, X_n = x_n"/>, a maximum likelihood estimate of <InlineMath math="\theta"/>, denoted by <InlineMath math="\hat{\theta}_{\text{ML}}"/>, is a value of <InlineMath math="\theta"/> that maximizes the likelihood function:</p>
                <BlockMath>{'L(x_1, x_2, \\dots, x_n; \\theta).'}</BlockMath>

                <p>The maximum likelihood estimator (MLE), denoted by <InlineMath math="\hat{\Theta}_{\text{ML}}"/>, is a random variable:</p>
                <BlockMath>{'\\hat{\\Theta}_{\\text{ML}} = \\hat{\\Theta}_{\\text{ML}}(X_1, X_2, \\dots, X_n),'}</BlockMath>
                <p>whose value, when <InlineMath math="X_1 = x_1, \dots, X_n = x_n"/>, is <InlineMath math="\hat{\theta}_{\text{ML}}"/>.</p>
            </div>
        </div>
    );
};

export default EstimationMethods;