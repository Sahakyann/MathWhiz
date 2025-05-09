import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useNavigate } from 'react-router-dom';

const IntroToStatistics = () => {

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
                    <li><a href="#median">Median</a></li>
                    <li><a href="#mean">Mean</a></li>
                    <li><a href="#mode">Mode</a></li>
                    <li><a href="#quartiles">Quartiles</a></li>
                    <li><a href="#iqr">Interquartile Range (IQR)</a></li>
                    <li><a href="#boxplot">Box Plot</a></li>
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
                <div id="intro">
                    <p>
                        Whether you're analyzing survey results, interpreting trends in sports performance, or making sense of scientific data, <strong>statistics</strong> is the key to understanding the world through numbers.
                        It gives us tools to summarize information, spot patterns, and make informed decisions based on data.
                    </p>
                    <p>
                        In this lesson, we’ll break down the foundational concepts in statistics: <em>mean</em>, <em>median</em>, <em>mode</em>, <em>quartiles</em>, and <em>box plots</em>. These tools help us interpret data clearly, avoid misleading conclusions, and communicate findings with confidence.
                    </p>
                </div>
                <h1 id="median">Median</h1>
                <p>
                    Median is a key measure of central tendency in statistics, representing the middle value of a data set when arranged in ascending or descending order. Unlike the mean, the median is not affected by extreme values, making it a reliable measure for skewed distributions.
                </p>

                <h2>Examples of Finding the Median</h2>
                <p>Consider the following examples for better understanding:</p>

                <ul>
                    <li>
                        <strong>Odd Number of Data Points:</strong>
                        <ul>
                            <li>Data set: 3, 1, 9, 7, 5</li>
                            <li>Ordered: 1, 3, 5, 7, 9</li>
                            <li>Median: The middle value is 5.</li>
                        </ul>
                    </li>

                    <li>
                        <strong>Even Number of Data Points:</strong>
                        <ul>
                            <li>Data set: 4, 1, 7, 3</li>
                            <li>Ordered: 1, 3, 4, 7</li>
                            <li>
                                Median: The average of the two middle values 3 and 4, which is
                                <BlockMath math="\frac{3 + 4}{2} = 3.5" />
                            </li>
                        </ul>
                    </li>
                </ul>

                <h2>Median Definition and Rules</h2>
                <p>
                    A <strong>median</strong> is the middle number in a sorted list of either ascending or descending numbers. It is used in statistical studies. The numbers must first be sorted or arranged in value order from lowest to highest or highest to lowest to determine the median value in a sequence.
                </p>

                <ul>
                    <li>If there is an <strong>odd</strong> amount of numbers, the median value is the number that is in the middle, with the same amount of numbers below and above.</li>
                    <li>If there is an <strong>even</strong> amount of numbers in the list, the middle pair must be determined, added together, and divided by two to find the median value.</li>
                </ul>

                <h1 id="mean">Mean</h1>
                <h2>What is a Mean?</h2>
                <p>
                    The <strong>Mean</strong> is the average of a set of numbers. It is calculated by dividing the sum of the given numbers by the total count of numbers.
                </p>

                <h3>Example</h3>
                <p>Find the mean of the given numbers: 2, 4, 4, 4, 5, 5, 7, and 9.</p>
                <p><strong>Solution:</strong></p>
                <BlockMath math="\frac{2 + 4 + 4 + 4 + 5 + 5 + 7 + 9}{8} = 5" />

                <ol>
                    <li>Step 1: Find the sum of all numbers: <BlockMath math="2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40" /></li>
                    <li>Step 2: Divide the sum by the total count of numbers: <BlockMath math="\frac{40}{8} = 5" /></li>
                </ol>

                <p>So, the <strong>mean</strong> is 5.</p>

                <h3>Properties of Mean</h3>
                <ul>
                    <li>The mean (or average) is the most popular and well-known measure of central tendency.</li>
                    <li>It can be used with both discrete and continuous data, although it is most commonly used with continuous data.</li>
                    <li>There are other types of means: <em>Geometric mean</em> and <em>Arithmetic mean</em>.</li>
                    <li>
                        The mean is the only measure of central tendency for which the sum of the deviations of each value from the mean is always zero:
                        <BlockMath math="\sum_{i=1}^{n} (x_i - \bar{x}) = 0" />
                    </li>
                </ul>

                <h3>What is Arithmetic Mean?</h3>
                <p>
                    <strong>Arithmetic Mean</strong>, often referred to simply as the mean or average, is a measure of central tendency used to summarize a set of numbers. Arithmetic Mean is calculated by taking the sum of all the given values and then dividing it by the number of values. For evenly distributed terms arranged in ascending or descending order, arithmetic mean is the middle term of the sequence. The arithmetic mean is sometimes also called mean, average, or arithmetic average.
                </p>

                <h3>Example: Find the Arithmetic Mean of 3, 6, 7, and 4</h3>
                <p>The mean is calculated first by taking the sum of all the values:</p>
                <BlockMath math="3 + 6 + 7 + 4 = 20" />
                <p>and then dividing it by 4 as we have a total of 4 terms.</p>
                <BlockMath math="\text{Arithmetic Mean} = \frac{20}{4} = 5" />
                <p>Thus, the arithmetic mean of the given value is 5.</p>

                <h3>What is Geometric Mean?</h3>
                <p>
                    <em>Geometric Mean is defined as the <InlineMath math="n" />th root of the product of <InlineMath math="n" /> number of given dataset.</em>
                </p>
                <p>
                    It gives the central measure of the data set. To find the geometric mean of various numbers, we first multiply the given numbers and then take the <InlineMath math="n" />th root of the given product.
                </p>
                <p>
                    Suppose we are given 3 numbers: 3, 9, and 27. Then the geometric mean of the given values is calculated by taking the third root of the product of the three values. The calculation is shown below:
                </p>
                <BlockMath math="\sqrt[3]{3 \times 9 \times 27} = \sqrt[3]{729} = 9" />
                <p>
                    Thus, the geometric mean is the measure of the <strong>central tendency</strong> that is used to find the central value of the data set.
                </p>

                <h1 id="mode">Mode</h1>
                <h2>What is Mode?</h2>
                <p>
                    Mode is the value which occurs most frequently in a set of observations.
                </p>
                <p>
                    For example, given the dataset: <InlineMath math="\{6, 3, 9, 6, 6, 5, 9, 3\}" />, the <strong>Mode</strong> is 6, as it occurs most often.
                </p>

                <h2>Facts about Mode:</h2>
                <ol>
                    <li>Sometimes there can be more than one mode. Having two modes is called <em>bimodal</em>.<br></br> Having more than two modes is called <em>multimodal</em>.</li>
                    <li>
                        There is an empirical relationship between the Mean, Median, and Mode:
                        <BlockMath math="\text{Mean} - \text{Mode} = 3 \left( \text{Mean} - \text{Median} \right)" />
                    </li>
                </ol>

                <h1 id="quartiles">Quartiles</h1>
                <h2>What are Quartiles?</h2>
                <p>
                    <strong>Quartiles</strong> are the set of values that divide the data points into four identical values using three individual data points. Thus, quartile formula is a very important topic in Statistics that helps us to study large amounts of data. They are used to divide the large data values into four equal quarters. These quartiles show the data that is near the middle points of the large data set. This method is particularly useful for understanding outliers and comparing different data sets.
                </p>

                <h2>Quartiles Definition</h2>
                <p>
                    Quartiles are the values from the dataset which divide the dataset into four equal parts where each part of the dataset contains an equal number of observations.
                </p>

                <h2>There are three quartiles such as:</h2>
                <ul>
                    <li>First or Lower Quartile</li>
                    <li>Second Quartile or Median</li>
                    <li>Third or Upper Quartile</li>
                </ul>

                <h2>What is the Quartile Formula?</h2>
                <p>
                    As mentioned above, <strong>Quartile divides the data into 4 equal parts</strong>. This can be represented visually as follows:
                </p>

                <div>
                    {/* Quartiles */}
                    <div>
                        [Visual representation of quartiles]
                    </div>
                </div>

                <ul>
                    <li><strong>Quartile 1 (Q1)</strong> lies between the starting term and the middle term.</li>
                    <li><strong>Quartile 2 (Q2)</strong> lies between the starting term and the last term; it is the median.</li>
                    <li><strong>Quartile 3 (Q3)</strong> lies between quartile 2 and the last term.</li>
                </ul>

                <h2>Steps to Find Quartile Values</h2>
                <p>There is a separate formula for finding each quartile value. The steps to obtain the quartile formula are as follows:</p>

                <ul>
                    <li><strong>Step 1</strong>: Sort the given data in ascending order.</li>
                    <li><strong>Step 2</strong>: Find respective quartile values/terms as per need using the formulas below:</li>
                </ul>

                <h3>Formulas for Quartiles:</h3>
                <ul>
                    <li>
                        <strong>First Quartile (Q<sub>1</sub>)</strong>:
                        <BlockMath math="Q_1 = \left(\frac{n + 1}{4}\right)^{\text{th}} \text{ term}" />
                    </li>
                    <li>
                        <strong>Second Quartile (Q<sub>2</sub>) / Median</strong>:
                        <BlockMath math="Q_2 = \left(\frac{n + 1}{2}\right)^{\text{th}} \text{ term}" />
                    </li>
                    <li>
                        <strong>Third Quartile (Q<sub>3</sub>)</strong>:
                        <BlockMath math="Q_3 = \left(\frac{3(n + 1)}{4}\right)^{\text{th}} \text{ term}" />
                    </li>
                </ul>

                <p>Where <InlineMath math="n" /> is the total number of data points in the given dataset.</p>

                <h1 id="iqr">Interquartile Range (IQR)</h1>
                <p>
                    <strong>Interquartile Range</strong> is the distance between the first quartile and the third quartile. It is also known as the <em>mid-spread</em>. It helps us calculate variation for the data that is divided into quartiles.
                </p>

                <p>The formula for calculating the Interquartile Range is given by:</p>
                <BlockMath math="\text{Interquartile Range (IQR)} = Q_3 - Q_1" />

                <p><strong>Where,</strong></p>
                <ul>
                    <li><InlineMath math="Q_3" /> is the third/upper quartile,</li>
                    <li><InlineMath math="Q_1" /> is the first/lower quartile.</li>
                </ul>

                <h1>Example: Find the First, Second, and Third Quartile</h1>
                <p><strong>Given Data:</strong></p>
                <BlockMath math="8,\, 5,\, 15,\, 20,\, 18,\, 30,\, 40,\, 25" />

                <p><strong>Step 1: Sort the Data in Ascending Order</strong></p>
                <BlockMath math="5,\, 8,\, 15,\, 18,\, 20,\, 25,\, 30,\, 40" />

                <p><strong>Total Number of Observations:</strong> <InlineMath math="n = 8" /></p>

                <p><strong>First Quartile (<InlineMath math="Q_1" />):</strong></p>
                <BlockMath math="Q_1 = \left( \frac{n + 1}{4} \right)^\text{th} \text{ term} = \left( \frac{9}{4} \right)^\text{th} = 2.25^\text{th} \text{ term}" />
                <BlockMath math="2.25^\text{th} = 2^\text{nd} \text{ term} + 0.25 \times (\text{3rd term} - \text{2nd term}) = 8 + 0.25 \times (15 - 8) = 8 + 1.75 = 9.75" />
                <p><strong>So, </strong> <InlineMath math="Q_1 = \boxed{9.75}" /></p>

                <p><strong>Second Quartile (<InlineMath math="Q_2" />):</strong></p>
                <BlockMath math="Q_2 = \left( \frac{n + 1}{2} \right)^\text{th} \text{ term} = \left( \frac{9}{2} \right)^\text{th} = 4.5^\text{th} \text{ term}" />
                <BlockMath math="4.5^\text{th} = 4^\text{th} \text{ term} + 0.5 \times (\text{5th term} - \text{4th term}) = 18 + 0.5 \times (20 - 18) = 18 + 1 = 19" />
                <p><strong>So, </strong> <InlineMath math="Q_2 = \boxed{19}" /></p>

                <p><strong>Third Quartile (<InlineMath math="Q_3" />):</strong></p>
                <BlockMath math="Q_3 = \left( \frac{3(n + 1)}{4} \right)^\text{th} \text{ term} = \left( \frac{27}{4} \right)^\text{th} = 6.75^\text{th} \text{ term}" />
                <BlockMath math="6.75^\text{th} = 6^\text{th} \text{ term} + 0.75 \times (\text{7th term} - \text{6th term}) = 25 + 0.75 \times (30 - 25) = 25 + 3.75 = 28.75" />
                <p><strong>So, </strong> <InlineMath math="Q_3 = \boxed{28.75}" /></p>

                <h1 id="boxplot">Box Plot</h1>
                <p>
                    Box plot is a graphical representation of the distribution of a dataset. It displays key summary statistics such as the median, quartiles, and potential outliers in a concise and visual manner. By using Box plot you can provide a summary of the distribution, identify potential and compare different datasets in a compact and visual manner.
                </p>

                <div>
                    {/* BoxPlot1 */}
                    <div>
                        [Box plot]
                    </div>
                </div>

                <h1>How to create a box plots?</h1>
                <p>Let us take a sample data to understand how to create a box plot.</p>
                <p>Here are the runs scored by a cricket team in a league of 12 matches:</p>
                <BlockMath math="\text{Data: } 100, 120, 110, 150, 110, 140, 130, 170, 120, 220, 140, 110" />

                <h3>Step 1: Arrange Data in Ascending Order</h3>
                <BlockMath math="100, 110, 110, 110, 120, 120, 130, 140, 140, 150, 170, 220" />

                <h3>Step 2: Find the Median (Q2)</h3>
                <p>Since the number of observations <InlineMath math="n = 12" /> is even:</p>
                <BlockMath math="Q_2 = \frac{120 + 130}{2} = 125" />

                <h3>Step 3: Find First and Third Quartiles</h3>
                <p>First Quartile <InlineMath math="Q_1" />: Median of the first 6 values:</p>
                <BlockMath math="Q_1 = \frac{110 + 110}{2} = 110" />

                <p>Third Quartile <InlineMath math="Q_3" />: Median of the last 6 values:</p>
                <BlockMath math="Q_3 = \frac{140 + 150}{2} = 145" />

                <h3>Step 4: Calculate Interquartile Range (IQR)</h3>
                <BlockMath math="\text{IQR} = Q_3 - Q_1 = 145 - 110 = 35" />

                <h3>Step 5: Determine Outlier Limits</h3>
                <BlockMath math="\text{Lower Limit} = Q_1 - 1.5 \times \text{IQR} = 110 - 1.5 \times 35 = 110 - 52.5 = 57.5" />
                <BlockMath math="\text{Upper Limit} = Q_3 + 1.5 \times \text{IQR} = 145 + 1.5 \times 35 = 145 + 52.5 = 197.5" />

                <h3>Step 6: Identify Minimum, Maximum, and Outliers</h3>
                <BlockMath math="\text{Minimum (within range)} = 100,\quad \text{Maximum (within range)} = 170" />
                <BlockMath math="\text{Outlier(s)} = 220 \quad (\text{as it is greater than } 197.5)" />

                <div>
                    {/* BoxPlot2 */}
                    <div>
                        [Box plot with outlier visualization would go here]
                    </div>
                </div>

                <p>We can see from the diagram that the Median is not exactly at the center of the box and one whisker is longer than the other. We also have one Outlier.</p>
            </div>

        </div>
    );
};

export default IntroToStatistics;