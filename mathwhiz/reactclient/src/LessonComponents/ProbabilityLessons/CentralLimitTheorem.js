import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CentralLimitTheorem = () => {
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
                    <li><a href="#clt-intro">Central Limit Theorem</a></li>
                    <li><a href="#clt-definition">Definition</a></li>
                    <li><a href="#clt-formula">Formula</a></li>
                    <li><a href="#clt-examples">Examples</a></li>
                    <li><a href="#clt-assumptions">Assumptions</a></li>
                    <li><a href="#clt-steps">Problem Solving Steps</a></li>
                    <li><a href="#example1">Example 1: Male Weight</a></li>
                    <li><a href="#example2">Example 2: Distribution</a></li>
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
                <h1 id="clt-intro">Central Limit Theorem</h1>
                <p>The Central Limit Theorem states that as the sample size increases and its variance is finite, then the distribution of the sample mean approaches normal distribution irrespective of the shape of the population distribution.</p>
                <p>The central limit theorem posits that the distribution of sample means will invariably conform to a normal distribution provided the sample size is sufficiently large. This holds regardless of the underlying distribution of the population, be it normal, Poisson, binomial, or any alternative distribution.</p>

                <h2 id="clt-definition">Central Limit Theorem Definition</h2>
                <p>The <b>Central Limit Theorem</b> states that:</p>
                <p>When large samples (usually greater than thirty) are taken into consideration, the distribution of the sample arithmetic mean approaches a normal distribution, <b>regardless of whether the original random variables were normally distributed or not</b>.</p>

                <h2 id="clt-formula">Central Limit Theorem Formula</h2>
                <p>Let us assume we have a random variable <InlineMath math="X"/>. Let <InlineMath math="\sigma"/> be its standard deviation and <InlineMath math="\mu"/> be the mean of the random variable. According to the <b>Central Limit Theorem (CLT)</b>, the sample mean <InlineMath math="\overline{X}"/> will approximate the normal distribution:</p>
                <BlockMath math="\overline{X} \sim \mathcal{N}\left(\mu, \frac{\sigma}{\sqrt{n}}\right)"/>

                <p>The Z-score of the sample mean is given by:</p>
                <BlockMath math="Z = \frac{\overline{X} - \mu}{\frac{\sigma}{\sqrt{n}}}"/>

                <p>Additional formulas:</p>
                <ul>
                    <li>Sample Mean = Population Mean = <InlineMath math="\mu"/></li>
                    <li>Sample Standard Deviation = <InlineMath math="\frac{\text{Standard Deviation}}{\sqrt{n}}"/></li>
                    <li>That is, Sample Standard Deviation = <InlineMath math="\frac{\sigma}{\sqrt{n}}"/></li>
                </ul>

                <h2 id="clt-examples">Central Limit Theorem Examples</h2>
                <p>Let's say we have a large sample of observations and each sample is randomly produced and independent of other observations. Calculate the average of the observations, thus having a collection of averages of observations. Now as per the Central Limit Theorem, if the sample size is adequately large, then the probability distribution of these sample averages will approximate to a normal distribution.</p>

                <h2 id="clt-assumptions">Assumptions of the Central Limit Theorem</h2>
                <p>The Central Limit Theorem is valid for the following conditions:</p>
                <ul>
                    <li>The drawing of the sample from the population should be random.</li>
                    <li>The drawing of the sample should be independent of each other.</li>
                    <li>The sample size should not exceed ten percent of the total population when sampling is done without replacement.</li>
                    <li>Sample size should be adequately large.</li>
                    <li>CLT only holds for a population with finite variance.</li>
                </ul>

                <h2 id="clt-steps">Steps to Solve Problems on Central Limit Theorem</h2>
                <p>Problems of the Central Limit Theorem that involve <InlineMath math=">"/>, <InlineMath math="<"/> or "between" can be solved by the following steps:</p>
                <ol>
                    <li><b>First identify</b> the <InlineMath math=">"/>, <InlineMath math="<"/> associated with sample size, population size, mean, and variance in the problem. Also, there can be a "between" case associated with a range of two numbers.</li>
                    <li><b>Draw a graph</b> with the mean as the center.</li>
                    <li><b>Find the Z-score</b> using the formula:
                    <BlockMath math="Z = \frac{\overline{X} - \mu}{\sigma / \sqrt{n}}"/></li>
                    <li><b>Refer to the Z-table</b> to find the value of <InlineMath math="Z"/> obtained in the previous step.</li>
                    <li>If the problem involves '<InlineMath math=">"/>', subtract the Z-score from 0.5; if the problem involves '<InlineMath math="<"/>', add 0.5 to the Z-score. If the problem involves "between", then perform only steps 3 and 4.</li>
                    <li>The Z-score value is found along <InlineMath math="\overline{X}"/>.</li>
                    <li><b>Convert the decimal value</b> obtained in all three cases to a percentage or leave it as a decimal as needed.</li>
                </ol>

                <h2 id="example1">Example 1</h2>
                <p>The male population's weight data follows a normal distribution. It has a mean of 70 kg and a standard deviation of 15 kg. What would the mean and standard deviation of a sample of 50 guys be if a researcher looked at their records?</p>

                <p><b>Given:</b></p>
                <BlockMath math="\mu = 70 \text{ kg}, \quad \sigma = 15 \text{ kg}, \quad n = 50"/>

                <p>As per the Central Limit Theorem, the sample mean is equal to the population mean.</p>
                <BlockMath math="\Rightarrow \mu_{\overline{x}} = \mu = 70 \text{ kg}"/>

                <p>Now, the standard deviation of the sample mean is:</p>
                <BlockMath math="\sigma_{\overline{x}} = \frac{\sigma}{\sqrt{n}} = \frac{15}{\sqrt{50}} \approx 2.1 \text{ kg}"/>

                <h2 id="example2">Example 2</h2>
                <p>A distribution has a mean of 4 and a standard deviation of 5. Find the mean and standard deviation if a sample of 25 is drawn from the distribution.</p>

                <p><b>Given:</b></p>
                <BlockMath math="\mu = 4, \quad \sigma = 5, \quad n = 25"/>

                <p>As per the Central Limit Theorem, the sample mean is equal to the population mean:</p>
                <BlockMath math="\Rightarrow \mu_{\overline{x}} = \mu = 4"/>

                <p>Now, the standard deviation of the sample mean is:</p>
                <BlockMath math="\sigma_{\overline{x}} = \frac{\sigma}{\sqrt{n}} = \frac{5}{\sqrt{25}} = 1"/>
            </div>
        </div>
    );
};

export default CentralLimitTheorem;