import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const DataVisualizationLesson = () => {
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
                    <li><a href="#histograms">Histograms</a></li>
                    <li><a href="#bar-graph">Bar Graph</a></li>
                    <li><a href="#sports-example">Sports Example</a></li>
                    <li><a href="#tree-example">Tree Heights Example</a></li>
                    <li><a href="#scatter-plot">Scatter Plot</a></li>
                    <li><a href="#pie-chart">Pie Chart</a></li>
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
                <h1 id="histograms">Histograms</h1>
                <p>
                    Using a line or a bar graph to plot the frequencies of data values is
                    often an effective way of portraying a data set. However, for some data
                    sets the number of distinct values is too large to utilize this approach.
                    Instead, in such cases, we divide the values into groupings, or class
                    intervals, and then plot the number of data values falling in each class
                    interval.
                </p>

                <h3>To Construct a Histogram from a Data Set</h3>
                <ol>
                    <li>Arrange the data in increasing order.</li>
                    <li>Choose class intervals so that all data points are covered.</li>
                    <li>Construct a frequency table.</li>
                    <li>Draw adjacent bars having heights determined by the frequencies in step 3.</li>
                </ol>

                <h3>A Histogram can Often Indicate</h3>
                <ol>
                    <li>How symmetric the data are</li>
                    <li>How spread out the data are</li>
                    <li>Whether there are intervals having high levels of data concentration</li>
                    <li>Whether there are gaps in the data</li>
                    <li>Whether some data values are far apart from others</li>
                </ol>

                <h1 id="bar-graph">Bar Graph</h1>
                <p>
                    The pictorial representation of data in groups, either in horizontal or vertical bars where the length of the bar represents the value of the data present on the axis. Bar graphs are usually used to display or impart the information belonging to 'categorical data' i.e., data that fit in some category.
                </p>

                <h3>Properties of Bar Graph</h3>
                <ul>
                    <li>All bars have a common base.</li>
                    <li>The length of each bar corresponds to its respective data mentioned on the axis 
                    (<strong>Y-axis for Vertical Graph, X-axis for Horizontal Graph</strong>).</li>
                    <li>Each bar displayed has the same width.</li>
                    <li>The distance between consecutive bars is the same.</li>
                </ul>

                <h3>Difference Between Bar Graphs and Histograms</h3>
                <ul>
                    <li>
                        <strong>Dimensionality:</strong><br />
                        Bar graphs are one-dimensional, whereas histograms are two-dimensional.
                    </li>
                    <li>
                        <strong>Representation of Frequency:</strong><br />
                        In a bar graph, the frequency is represented by the length of the bars.<br />
                        In a histogram, it is represented by the area of the bars.
                    </li>
                    <li>
                        <strong>Significance of Bar Width:</strong><br />
                        In bar graphs, bar width has no special significance.<br />
                        In histograms, bar width represents the interval or bin.
                    </li>
                    <li>
                        <strong>Spacing Between Bars:</strong><br />
                        In bar graphs, bars are separated by equal spaces.<br />
                        In histograms, bars are adjacent to each other without spaces.
                    </li>
                </ul>

                <h1 id="sports-example">Bar Graph: Number of Students in Each Sport</h1>
                <h3>Sports and Number of Students</h3>
                <ul>
                    <li><strong>Volleyball</strong>: 10 students</li>
                    <li><strong>Football</strong>: 25 students</li>
                    <li><strong>Tennis</strong>: 15 students</li>
                    <li><strong>Badminton</strong>: 30 students</li>
                </ul>

                <div className="visualization-placeholder">
                    <h4>Bar Graph Visualization</h4>
                    <p>[Bar graph showing sports vs number of students would appear here]</p>
                </div>

                <h1 id="tree-example">Histogram Data for Tree Heights</h1>
                <p>
                    In a park, there are 28 trees of different heights. The heights are measured in centimeters and fall within the range 100-350 cm. The number of trees in each height interval is given below:
                </p>

                <ul>
                    <li><strong>100-150 cm:</strong> 2 trees</li>
                    <li><strong>150-200 cm:</strong> 10 trees</li>
                    <li><strong>200-250 cm:</strong> 6 trees</li>
                    <li><strong>250-300 cm:</strong> 3 trees</li>
                    <li><strong>300-350 cm:</strong> 7 trees</li>
                </ul>

                <p>The total number of trees is <InlineMath math="2 + 10 + 6 + 3 + 7 = 28" />.</p>
                <p>
                    Since the height of the trees are lying between 100-350, we shall start by marking the heights on x-axis in groups of 50cm each and the number of trees will be mentioned on y-axis. Therefore, if a tree has a height of 230 cm, it will lie in the rectangle 200-250.
                </p>

                <div className="visualization-placeholder">
                    <h4>Histogram Visualization</h4>
                    <p>[Histogram showing tree height distribution would appear here]</p>
                </div>

                <h1 id="scatter-plot">Scatter Plot</h1>
                <p>
                    Scatter plot is one of the most important data visualization techniques and it is considered one of the Seven Basic Tools of Quality. A scatter plot is used to plot the relationship between two variables, on a two-dimensional graph that is known as Cartesian Plane on mathematical grounds.
                </p>
                <p>
                    It is generally used to plot the relationship between one independent variable and one dependent variable, where an independent variable is plotted on the x-axis and a dependent variable is plotted on the y-axis so that you can visualize the effect of the independent variable on the dependent variable. These plots are known as Scatter Plot Graph or Scatter Diagram.
                </p>

                <h3>Types of Scatter Plot</h3>
                <p>On the basis of correlation of two variables, Scatter Plot can be classified into the following types:</p>
                <ul>
                    <li>Scatter Plot for Positive Correlation</li>
                    <li>Scatter Plot for Negative Correlation</li>
                    <li>Scatter Plot for Null Correlation</li>
                </ul>

                <h3>Scatter Plot for Positive Correlation</h3>
                <p>
                    In this type of scatter-plot, value on the y-axis increases on moving left to right. In more technical terms, if one variable is directly proportional to another, then the scatter plot will show positive correlation. Positive correlation can be further classified into Perfect Positive, High Positive and Low Positive.
                </p>

                <h3>Scatter Plot for Negative Correlation</h3>
                <p>
                    In this type of scatter-plot, value on the y-axis decreases on moving left to right. In other words, the value of one variable is decreasing with respect to the other. Negative correlation can be further classified into Perfect Negative, High Negative and Low Negative.
                </p>

                <h3>Scatter Plot for Null Correlation</h3>
                <p>
                    In this type of scatter-plot, values are scattered all over the graph. Generally, this kind of graph represents that there is no relationship between the two variables plotted on the Scatter Plot.
                </p>

                <h1 id="pie-chart">Pie Chart</h1>
                <p>
                    Pie chart is a popular and visually intuitive tool used in data representation, making complex information easier to understand at a glance. This circular graph divides data into slices, each representing a proportion of the whole, allowing for a clear comparison of different categories making it easier to digest complex information through a straightforward, intuitive format.
                </p>

                <h3>Pie Chart Example</h3>
                <p>
                    In a class of 200 students, a survey was done to collect each student's favorite sport. The pie chart of the data is given below:
                </p>
                <p>
                    Since the pie chart is provided and the total number of students is given, we can easily take the original data out for each sport.
                </p>

                <div className="visualization-placeholder">
                    <h4>Pie Chart Visualization</h4>
                    <p>[Pie chart showing sports preferences would appear here]</p>
                </div>

                <ul>
                    <li><strong>Cricket</strong> <InlineMath math="= \dfrac{17}{100} \times 200 = 34" /> students</li>
                    <li><strong>Football</strong> <InlineMath math="= \dfrac{25}{100} \times 200 = 50" /> students</li>
                    <li><strong>Badminton</strong> <InlineMath math="= \dfrac{12}{100} \times 200 = 24" /> students</li>
                    <li><strong>Hockey</strong> <InlineMath math="= \dfrac{5}{100} \times 200 = 10" /> students</li>
                    <li><strong>Other</strong> <InlineMath math="= \dfrac{41}{100} \times 200 = 82" /> students</li>
                </ul>
            </div>
        </div>
    );
};

export default DataVisualizationLesson;