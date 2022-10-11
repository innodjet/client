import * as d3 from "d3";
import { useEffect } from "react";
import PropTypes from "prop-types";

function LineChart({ chartData, description }) {
  // establish margins
  const margin = { top: 60, right: 60, bottom: 70, left: 60 };
  const width = 1080;
  const height = 600 - margin.top - margin.bottom;
  const { title, units } = description;
  const parseDate = d3.timeParse("%Y");
  const data = chartData.map((el) => {
    return {
      year: parseDate(el.year),
      temperature: el.temperature,
    };
  });

  // redraw the chart when the chartData is changed
  useEffect(() => {
    d3.select(".svg-container").html("");
    drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const drawChart = () => {
    // establish x and y max values
    const yMinValue = -0.6;
    const yMaxValue = 1.2;
    const xMinValue = d3.min(data, (d) => d.year);
    const xMaxValue = d3.max(data, (d) => d.year);

    // create chart area
    const svg = d3
      .select(".svg-container")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // create scale for the x axis
    const xScale = d3
      .scaleTime()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    // create scale for y axis
    const yScale = d3
      .scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([height, 0]);

    // create X axis Top Label
    svg
      .append("text")
      .attr("class", "x-top-label")
      .attr("fill", "none")
      .attr("stroke", "#7b7b7b")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .text(title);

    // create X axis Bottom Label
    svg
      .append("text")
      .attr("class", "x-label")
      .attr("fill", "none")
      .attr("stroke", "#7b7b7b")
      .attr("text-anchor", "middle")
      .attr("x", width)
      .attr("y", height - 6)
      .text("Year");

    // create Y axis label
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("fill", "none")
      .attr("stroke", "#7b7b7b")
      .attr("text-anchor", "middle")
      .attr("y", 6)
      .text(units);

    // create x grid
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeYear.every(2))
          .tickSize(-height, 0, 0)
          .tickFormat("")
      );

    // create y grid
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width, 0, 0).tickFormat(""));

    // create the x axis on the bottom
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom()
          .ticks(d3.timeYear.every(2))
          .scale(xScale)
          .tickSize(15)
          .tickFormat(d3.timeFormat("%Y"))
      );

    // create the y axis on the left
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".2")));

    // create a line with x and y coordinates scaled to the data
    const line = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.temperature))
      .curve(d3.curveMonotoneX);

    // draw the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#547da9")
      .attr("stroke-width", 3)
      .attr("class", "line")
      .attr("d", line);

    // add the circle dot to the line
    svg
      .selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "#547da9")
      .attr("stroke", "none")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => yScale(d.temperature))
      .attr("r", 5);
  };

  return <div className="svg-container"></div>;
}

LineChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  description: PropTypes.object,
};

export default LineChart;
