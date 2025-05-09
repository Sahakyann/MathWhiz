import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ConfidenceIntervals = () => {
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
                    <li><a href="#ci">Confidence Interval (CI)</a></li>
                    <li><a href="#z-test">Z test</a></li>
                    <li><a href="#t-test">T test</a></li>
                    <li><a href="#interpreting-ci">Interpreting Confidence Interval</a></li>
                    <li><a href="#constructing-ci">Constructing a Confidence Interval</a></li>
                    <li><a href="#types-ci">Types of Confidence Intervals</a></li>
                    <li><a href="#calculating-ci">Calculating Confidence Intervals</a></li>
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
                <h1 id="ci">Confidence Interval (CI)</h1>
                <p>A <b>Confidence Interval (CI)</b> is a range of values that estimates where the true population value is likely to fall. Instead of simply stating:</p>
                <blockquote>
                    "The average height of students is 165 cm,"
                </blockquote>
                <p>a confidence interval allows us to say:</p>
                <blockquote>
                    "We are 95% confident that the true average height is between 160 cm and 170 cm."
                </blockquote>
                <p>Confidence intervals provide a way to express uncertainty about an estimate. The <i>confidence level</i> (e.g., 95%) indicates how often the interval would contain the true parameter if the experiment were repeated many times.</p>

                <p>Before diving into the construction and interpretation of confidence intervals, you should be familiar with:</p>
                <ul>
                    <li><b>t-test</b></li>
                    <li><b>z-test</b></li>
                </ul>

                <h1 id="z-test">Z test</h1>
                <p>A Z-test is a type of hypothesis test that compares the sample's average to the population's average. It calculates the <b>Z-score</b>, which tells us how much the sample average differs from the population average by considering the population's standard deviation.</p>

                <p>The Z-test is especially useful when:</p>
                <ul>
                    <li>The sample size is large (<InlineMath math="n > 30"/>)</li>
                    <li>The population variance <InlineMath math="\sigma^2"/> is known.</li>
                </ul>

                <p><b>Z-test helps us answer questions such as:</b></p>
                <ul>
                    <li>Is the sample mean significantly different from a known population mean?</li>
                    <li>Is there a significant difference between the means of two sample groups?</li>
                </ul>

                <p><b>Z-score Formula (Z-statistic):</b></p>
                <BlockMath math="Z = \frac{\bar{x} - \mu}{\sigma}"/>

                <p><b>Where:</b></p>
                <ul>
                    <li><InlineMath math="\bar{x}"/> = Mean of the sample</li>
                    <li><InlineMath math="\mu"/> = Mean of the population</li>
                    <li><InlineMath math="\sigma"/> = Standard deviation of the population</li>
                </ul>

                <p>This Z-score represents the number of standard deviations the sample mean is away from the population mean.</p>
                
                <h3>Example:</h3>
                <p>Let's understand the Z-test with the help of an example:</p>

                <p><b>Given:</b></p>
                <ul>
                    <li>Population mean annual income in India: <InlineMath math="\mu = 200{,}000"/></li>
                    <li>Population standard deviation: <InlineMath math="\sigma = 5{,}000"/></li>
                    <li>Sample mean income in Delhi: <InlineMath math="\bar{x} = 300{,}000"/></li>
                </ul>

                <p><b>Z-Score Formula:</b></p>
                <BlockMath math="Z = \frac{\bar{x} - \mu}{\sigma} = \frac{300{,}000 - 200{,}000}{5{,}000} = \frac{100{,}000}{5{,}000} = 20"/>

                <p>This indicates that the average family annual income in Delhi is <b>20 standard deviations above the mean</b> of the population (India).</p>

                <h2>Assumptions for Reliable Z-Test</h2>
                <p>For a Z-test to provide reliable results, the following assumptions must be met:</p>
                <ol>
                    <li><b>Normal Distribution:</b> The population should be approximately normally distributed.</li>
                    <li><b>Equal Variance:</b> The variances of the populations should be equal.</li>
                    <li><b>Independence:</b> Observations should be independent of one another.</li>
                </ol>

                <h2>Steps to Perform Z-Test</h2>
                <ol>
                    <li><b>State the hypotheses:</b>
                    <BlockMath math="H_0: \mu = \mu_0 \quad \text{(null hypothesis)} \\ H_1: \mu \ne \mu_0 \quad \text{(alternative hypothesis)}"/></li>
                    
                    <li><b>Choose the level of significance:</b> <InlineMath math="\alpha"/> (e.g., 0.05)</li>

                    <li><b>Find the critical value</b> from the Z-distribution table.</li>

                    <li><b>Compute the Z-test statistic using:</b>
                    <BlockMath math="Z = \frac{\bar{x} - \mu}{\frac{\sigma}{\sqrt{n}}}"/></li>

                    <li><b>Make a decision:</b>
                    <ul>
                        <li>If <InlineMath math="|Z| > Z_{\text{critical}}"/>, reject <InlineMath math="H_0"/></li>
                        <li>Otherwise, do not reject <InlineMath math="H_0"/></li>
                    </ul>
                    </li>
                </ol>

                <p>A <b>one-sample Z-test</b> is used to determine whether the mean of a single sample is significantly different from a known population mean.</p>

                <h3>When to Use:</h3>
                <ul>
                    <li>The population standard deviation is known.</li>
                    <li>The sample size is large (usually <InlineMath math="n > 30"/>)</li>
                    <li>The data is approximately normally distributed.</li>
                </ul>

                <h3>Example:</h3>
                <p>A company claims that their new smartphone has an average battery life of 12 hours. A consumer group tests 100 phones and finds an average battery life of 11.8 hours, with a known population standard deviation of 0.5 hours.</p>

                <h4>Step 1: State the Hypotheses</h4>
                <BlockMath math="H_0: \mu = 12 \quad \text{(Null Hypothesis)}"/>
                <BlockMath math="H_1: \mu \ne 12 \quad \text{(Alternative Hypothesis)}"/>

                <h4>Step 2: Calculate the Z-Score</h4>
                <p>We use the formula:</p>
                <BlockMath math="z = \frac{\bar{x} - \mu}{\frac{\sigma}{\sqrt{n}}}"/>

                <p>Where:</p>
                <ul>
                    <li><InlineMath math="\bar{x} = 11.8"/> (sample mean)</li>
                    <li><InlineMath math="\mu = 12"/> (population mean)</li>
                    <li><InlineMath math="\sigma = 0.5"/> (population standard deviation)</li>
                    <li><InlineMath math="n = 100"/> (sample size)</li>
                </ul>

                <p>Substituting the values:</p>
                <BlockMath math="z = \frac{11.8 - 12}{\frac{0.5}{\sqrt{100}}} = \frac{-0.2}{0.05} = -4"/>

                <h4>Step 3: Make a Decision</h4>
                <p>The critical value for a two-tailed test at significance level <InlineMath math="\alpha = 0.05"/> is <InlineMath math="\pm 1.96"/>.</p>
                <BlockMath math="|z| = 4 > 1.96"/>

                <p><b>Conclusion:</b> Since the calculated z-value is greater than the critical value, we reject <InlineMath math="H_0"/>. There is significant evidence against the company's claim.</p>

                <h2>Two-Sample Z-Test</h2>
                <p>In a two-sample Z-test, we compare the means of two independent and normally distributed populations. We assume that we have random samples from both populations.</p>

                <p>Let:</p>
                <ul>
                    <li><InlineMath math="\mu_1, \mu_2"/>: population means</li>
                    <li><InlineMath math="\bar{X}_1, \bar{X}_2"/>: sample means</li>
                    <li><InlineMath math="\sigma_1, \sigma_2"/>: population standard deviations</li>
                    <li><InlineMath math="n_1, n_2"/>: sample sizes</li>
                </ul>

                <h3>Hypotheses</h3>
                <BlockMath math="H_0: \mu_1 - \mu_2 = 0 \quad \text{(no difference in means)}"/>
                <BlockMath math="H_1: \mu_1 - \mu_2 \ne 0 \quad \text{(there is a difference in means)}"/>

                <h3>Z-Test Formula</h3>
                <BlockMath math="Z = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}"/>

                <h3>Example</h3>
                <p>Two groups of students prepared for a competition:</p>
                <ul>
                    <li>Group A (Offline): <InlineMath math="n_1 = 50"/>, <InlineMath math="\bar{x}_1 = 75"/>, <InlineMath math="\sigma_1 = 10"/></li>
                    <li>Group B (Online): <InlineMath math="n_2 = 60"/>, <InlineMath math="\bar{x}_2 = 80"/>, <InlineMath math="\sigma_2 = 12"/></li>
                </ul>

                <h4>Step 1: Hypotheses</h4>
                <BlockMath math="H_0: \mu_1 - \mu_2 = 0 \quad \text{vs.} \quad H_1: \mu_1 - \mu_2 \ne 0"/>

                <h4>Step 2: Significance Level</h4>
                <BlockMath math="\alpha = 0.05"/>

                <h4>Step 3: Compute the Z-score</h4>
                <BlockMath math="Z = \frac{(75 - 80) - 0}{\sqrt{\frac{10^2}{50} + \frac{12^2}{60}}} = \frac{-5}{\sqrt{2 + 2.4}} = \frac{-5}{\sqrt{4.4}} = \frac{-5}{2.0976} \approx -2.384"/>

                <h4>Step 4: Critical Value</h4>
                <p>From Z-table, the critical value for <InlineMath math="\alpha/2 = 0.025"/> is:</p>
                <BlockMath math="Z_{\text{critical}} = 1.96"/>

                <h4>Step 5: Conclusion</h4>
                <BlockMath math="|\text{Z-score}| = 2.384 > 1.96"/>

                <p><b>Therefore, we reject the null hypothesis.</b> There is significant evidence that the mean scores of the two groups are different. Hence, the mode of preparation (online vs. offline) affects performance.</p>

                <div className="image-placeholder">
                    {/* Placeholder for Z-test visualization */}
                    <p>[Z-test visualization would appear here]</p>
                </div>

                <h1 id="t-test">T test</h1>
                <p>After learning about the Z-test, we now move on to another important statistical test called the <b>t-test</b>.</p>
                <p>While the Z-test is useful when the <b>population variance is known</b>, the t-test is used when the population variance is <b>unknown</b> and must be estimated from the sample. The t-test is particularly useful when working with small sample sizes. The t-test is used to compare the means of two groups to determine if they are significantly different from each other.</p>

                <p><b>Example:</b></p>
                <p>Suppose you want to compare the test scores of two groups of students:</p>
                <ul>
                    <li><b>Group 1:</b> 30 students who studied using Method A.</li>
                    <li><b>Group 2:</b> 30 students who studied using Method B.</li>
                </ul>
                <p>You can use a t-test to evaluate whether there is a significant difference in the <b>average test scores</b> between the two groups. The t-test is part of hypothesis testing where you start with an assumption the null hypothesis that the two group means are the same. Then the test helps you decide if there's enough evidence to reject that assumption and conclude that the groups are different.</p>

                <h2>Prerequisites for the t-Test</h2>
                <p>Before diving deeper into the t-test, it is important to understand the following key prerequisites:</p>

                <ol>
                    <li><b>Hypothesis Testing:</b><br />
                    Hypothesis testing is a statistical method used to make inferences about a population based on a sample of data.</li>
                    
                    <li><b>P-value:</b><br />
                    The p-value is the probability of observing a test statistic as extreme as, or more extreme than, the one observed, assuming the null hypothesis is true.
                    <ul>
                        <li>A small p-value (usually less than 0.05) means the results are unlikely to be due to random chance, so we reject the null hypothesis.</li>
                        <li>A large p-value means the results could easily happen by chance, so we do not reject the null hypothesis.</li>
                    </ul></li>

                    <li><b>Degree of Freedom (df):</b><br />
                    The degree of freedom tells us the number of independent pieces of information used to estimate a parameter.
                    <p>In a t-test, the degrees of freedom are calculated as:</p>
                    <BlockMath math="df = \sum n_s - 1,"/>
                    <p>where <InlineMath math="n_s"/> is the number of observations in a sample.</p>
                    <p>For two samples A and B, the degrees of freedom would be:</p>
                    <BlockMath math="df = (n_A - 1) + (n_B - 1)"/></li>

                    <li><b>Significance Level (<InlineMath math="\alpha"/>):</b><br />
                    The significance level is a predetermined threshold used to decide whether to reject the null hypothesis. Common significance levels are 0.05, 0.01, and 0.10.</li>

                    <li><b>t-statistic:</b><br />
                    The t-statistic is a measure of the difference between the means of two groups, scaled by the variability in the data. It is computed as:
                    <BlockMath math="t = \frac{\bar{x}_1 - \bar{x}_2}{\text{Standard Error of the Difference}}"/>
                    <ul>
                        <li>A large t-value indicates the two groups are significantly different.</li>
                        <li>A small t-value suggests that the groups may come from the same population.</li>
                    </ul></li>

                    <li><b>t-Distribution:</b><br />
                    The t-distribution, also known as Student's t-distribution, is a probability distribution with heavier tails than the normal distribution. It is used especially when the sample size is small and the population standard deviation is unknown.</li>

                    <li><b>Statistical Significance:</b><br />
                    Statistical significance is determined by comparing the p-value to the significance level:
                    <ul>
                        <li>If the p-value <InlineMath math="\leq \alpha"/>, the result is statistically significant, and we reject the null hypothesis.</li>
                        <li>If the p-value <InlineMath math="> \alpha"/>, the result is not statistically significant, and we fail to reject the null hypothesis.</li>
                    </ul></li>
                </ol>

                <p>In the context of a t-test, these concepts are applied to determine whether the means of two groups are significantly different. The p-value obtained from the t-test is compared with the significance level to make a decision about the null hypothesis.</p>

                <p>A t-table, or a t-distribution table, is a reference table that provides critical values for the t-test. The table is organized by degrees of freedom and significance levels (usually 0.05 or 0.01). The t-table is used to find the critical t-value corresponding to their specific degrees of freedom and chosen significance level.</p>

                <div className="image-placeholder">
                    {/* Placeholder for T-table visualization */}
                    <p>[T-table visualization would appear here]</p>
                </div>

                <h3>One sample T-test</h3>
                <p>One sample t-test is used for comparison of the sample mean of the data to a particularly given value. We can use this when the sample size is small. (under 30) data is collected randomly and it is approximately normally distributed. It can be calculated as:</p>
                <p>The formula for the t-statistic is:</p>
                <BlockMath math="t = \frac{\bar{x} - \mu}{\frac{s}{\sqrt{n}}}"/>

                <p>Where:</p>
                <ul>
                    <li><InlineMath math="\bar{x}"/>: Sample mean (Mean of the sample)</li>
                    <li><InlineMath math="\mu"/>: Reference value (e.g., population mean)</li>
                    <li><InlineMath math="s"/>: Sample standard deviation</li>
                    <li><InlineMath math="n"/>: Number of observations (sample size)</li>
                </ul>

                <h3>Independent sample T-test</h3>
                <p>An <b>Independent sample t-test</b>, commonly known as an <b>unpaired sample t-test</b>, is used to determine if the differences observed between two groups are statistically significant or simply due to random variation. This test is appropriate when:</p>
                <ul>
                    <li>The population mean or standard deviation is unknown (i.e., population parameters are not available).</li>
                    <li>The two samples are independent of each other (e.g., comparing boys and girls).</li>
                </ul>

                <p>It can be calculated using:</p>
                <BlockMath math="t = \frac{\bar{X}_1 - \bar{X}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}"/>

                <p>Where:</p>
                <ul>
                    <li><InlineMath math="\bar{X}_1"/> = Mean of sample 1</li>
                    <li><InlineMath math="\bar{X}_2"/> = Mean of sample 2</li>
                    <li><InlineMath math="s_1^2"/> = Variance of sample 1 (square of standard deviation of sample 1)</li>
                    <li><InlineMath math="s_2^2"/> = Variance of sample 2 (square of standard deviation of sample 2)</li>
                    <li><InlineMath math="n_1"/> = Number of observations in sample 1</li>
                    <li><InlineMath math="n_2"/> = Number of observations in sample 2</li>
                </ul>

                <p>The numerator <InlineMath math="\bar{X}_1 - \bar{X}_2"/> represents the difference between the two sample means.</p>
                <p>The denominator <InlineMath math="\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}"/> represents the standard error of the difference between means.</p>

                <h1 id="interpreting-ci">Interpreting Confidence Interval</h1>
                <p>Let's say we take a sample of 50 students and calculate a 95 percent confidence interval for their average height which turns out to be 160-170 cm. This means If we repeatedly take similar samples 95 percent of those intervals would contain the true average height of all students in the population.</p>

                <div className="image-placeholder">
                    {/* Placeholder for CI visualization */}
                    <p>[CI visualization would appear here]</p>
                </div>

                <h3>Confidence Levels</h3>
                <p>Confidence level tells us how sure we are that the true population value lies within a calculated confidence interval. If we repeat the sampling process many times, a certain percentage of those intervals are expected to contain the true parameter value.</p>
                <ul>
                    <li><b>90% Confidence:</b> 90% of the intervals would include the true population value.</li>
                    <li><b>95% Confidence:</b> 95% of the intervals would include the true population value. This is the most commonly used level in data science.</li>
                    <li><b>99% Confidence:</b> 99% of the intervals would include the true population value, but the intervals would be wider to reflect the increased certainty.</li>
                </ul>

                <h1 id="constructing-ci">Steps for Constructing a Confidence Interval</h1>
                <p>To calculate a confidence interval, follow these four simple steps:</p>

                <h3>Step 1: Identify the Sample Problem</h3>
                <p>Define the population parameter you want to estimate, for example, the mean height of students. Choose the appropriate statistic, such as the sample mean <InlineMath math="\bar{x}"/>.</p>

                <h3>Step 2: Select a Confidence Level</h3>
                <p>Choose a confidence level, typically:</p>
                <ul>
                    <li>90% (less confidence, narrower interval)</li>
                    <li>95% (commonly used)</li>
                    <li>99% (more confidence, wider interval)</li>
                </ul>
                <p>This represents how sure we are about our estimate.</p>

                <h3>Step 3: Find the Margin of Error</h3>
                <p>The margin of error (ME) is calculated using the formula:</p>
                <BlockMath math="\text{Margin of Error} = \text{Critical Value} \times \text{Standard Error}"/>

                <ul>
                    <li><b>Critical Value:</b> obtained from a Z-table (for large samples) or T-table (for small samples), based on your chosen significance level <InlineMath math="\alpha"/> and whether the test is one-tailed or two-tailed.</li>
                    <li><b>Standard Error (SE):</b> measures the variability of the sample mean and is calculated as:
                    <BlockMath math="\text{SE} = \frac{s}{\sqrt{n}}"/>
                    where <InlineMath math="s"/> is the sample standard deviation and <InlineMath math="n"/> is the sample size.</li>
                </ul>

                <h3>Step 4: Specify the Confidence Interval</h3>
                <p>The formula to calculate the confidence interval is:</p>
                <BlockMath math="\text{Confidence Interval} = \text{Point Estimate} \pm \text{Margin of Error}"/>

                <ul>
                    <li><b>Point Estimate:</b> usually the sample mean <InlineMath math="\bar{x}"/>, our best guess for the population mean.</li>
                    <li><b>Margin of Error:</b> calculated in Step 3.</li>
                </ul>

                <p>By adding and subtracting the margin of error from the point estimate, you get a range of values that likely includes the true population parameter with the selected level of confidence.</p>

                <h1 id="types-ci">Types of Confidence Intervals</h1>

                <h3>1. Confidence Interval for the Mean of Normally Distributed Data</h3>
                <p>When estimating the mean of a population based on sample data:</p>
                <ul>
                    <li>If the sample size is <b>small</b> (<InlineMath math="n < 30"/>), use the <b>t-distribution</b> because small samples tend to have more variability.</li>
                    <li>If the sample size is <b>large</b> (<InlineMath math="n \geq 30"/>), use the <b>z-distribution</b> because large samples provide more accurate estimates.</li>
                </ul>

                <h3>2. Confidence Interval for Proportions</h3>
                <p>Used when estimating population proportions (e.g., percentage of people who prefer a product). It requires:</p>
                <ul>
                    <li>Sample proportion <InlineMath math="\hat{p}"/></li>
                    <li>Standard error <InlineMath math="SE = \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}"/></li>
                    <li>Critical z-value (from Z-table)</li>
                </ul>

                <p>The confidence interval is:</p>
                <BlockMath math="\hat{p} \pm Z_{\alpha/2} \cdot \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}"/>

                <h3>3. Confidence Interval for Non-Normally Distributed Data</h3>
                <p>If the data is not normally distributed (i.e., not bell-shaped), traditional confidence intervals may not be reliable. In such cases, use:</p>
                <ul>
                    <li><b>Bootstrap Methods:</b> Resample the data many times to create new samples and calculate the confidence interval based on these resamples.</li>
                </ul>

                <h1 id="calculating-ci">Calculating Confidence Intervals</h1>
                <p>To calculate a confidence interval, you need two key statistics:</p>

                <h3>Mean (<InlineMath math="\mu"/>) — Arithmetic Mean</h3>
                <p>The mean is the average of all observations:</p>
                <BlockMath math="\mu = \frac{1 + 2 + 3 + \dots + n}{n}"/>

                <p>Or more generally:</p>
                <BlockMath math="\mu = \frac{1}{n} \sum_{i=1}^{n} x_i"/>

                <h3>Standard Deviation (<InlineMath math="\sigma"/>)</h3>
                <p>Standard deviation measures the spread of data from the mean:</p>
                <BlockMath math="\sigma = \sqrt{ \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2 }"/>

                <h3>Constructing the Confidence Interval</h3>
                <p>Once you have the sample mean and standard deviation, the confidence interval is calculated as:</p>
                <BlockMath math="\text{Confidence Interval} = \bar{x} \pm \text{Critical Value} \times \frac{s}{\sqrt{n}}"/>

                <ul>
                    <li>Use <b>t-distribution</b> if population standard deviation is unknown and <InlineMath math="n < 30"/></li>
                    <li>Use <b>z-distribution</b> if population standard deviation is known or <InlineMath math="n \geq 30"/></li>
                </ul>

                <h2>A) Using the t-distribution</h2>
                <p>When the sample size is small (typically <InlineMath math="n < 30"/>) and the population standard deviation is unknown, we use the <b>t-distribution</b> to construct confidence intervals. This approach is common in small-sample statistical inference, such as in A/B testing or pilot studies.</p>

                <h3>Example</h3>
                <p>A random sample of 10 UFC fighters was taken, and their weights were measured.</p>
                <ul>
                    <li>Sample mean: <InlineMath math="\bar{x} = 240"/> kg</li>
                    <li>Sample standard deviation: <InlineMath math="s = 25"/> kg</li>
                    <li>Sample size: <InlineMath math="n = 10"/></li>
                    <li>Confidence level: 95%</li>
                </ul>

                <p>We are asked to construct a 95% confidence interval for the true mean weight of all UFC fighters.</p>

                <h4>Step-by-Step Process</h4>

                <h5>1. Degrees of Freedom (df)</h5>
                <BlockMath math="df = n - 1 = 10 - 1 = 9"/>

                <h5>2. Significance Level <InlineMath math="\alpha"/></h5>
                <BlockMath math="\alpha = \frac{1 - \text{CL}}{2} = \frac{1 - 0.95}{2} = 0.025"/>

                <h5>3. Critical t-value</h5>
                <p>From the t-distribution table for <InlineMath math="df = 9"/> and <InlineMath math="\alpha = 0.025"/>, the two-tailed critical t-value is:</p>
                <BlockMath math="t_{\alpha/2} = 2.262"/>

                <div className="table-placeholder">
                    {/* Placeholder for t-distribution table */}
                    <p>[t-distribution table would appear here]</p>
                </div>

                <h5>4. Margin of Error (ME)</h5>
                <BlockMath math="\text{ME} = t_{\alpha/2} \cdot \frac{s}{\sqrt{n}} = 2.262 \cdot \frac{25}{\sqrt{10}} = 2.262 \cdot 7.906 = 17.88"/>

                <h5>5. Confidence Interval</h5>
                <BlockMath math="\text{CI} = \bar{x} \pm \text{ME} = 240 \pm 17.88"/>
                <BlockMath math="\text{CI} = (222.12, 257.88)"/>

                <p><b>Conclusion:</b> We are 95% confident that the true mean weight of all UFC fighters lies between 222.12 kg and 257.88 kg.</p>
            </div>
        </div>
    );
};

export default ConfidenceIntervals;