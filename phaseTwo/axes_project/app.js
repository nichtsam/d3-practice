const DATA = [64, 71, 21, 62, 62, 83, 41, 40, 60, 60, 49, 38, 84];
const START_DATE = new Date(2020, 0, 5);
const END_DATE = new Date(2020, 2, 29);

const SVG_HEIGHT = document.querySelector("svg").clientHeight;
const SVG_WIDTH = document.querySelector("svg").clientWidth;

const BUFFER = 35;

const SVG = d3.select("svg");
// - - - - -
const aver = Math.round(d3.mean(DATA));
d3.select("#description p span").text(aver);

const colorScale = d3
  .scaleThreshold()
  .domain([aver])
  .range(["skyblue", "steelblue"]);
d3.selectAll("#legend span")
  .data([aver - 1, aver + 1])
  .style("background-color", (d) => colorScale(d));

const DATA_TO_Y_SCALE = d3
  .scaleLinear()
  .domain([Math.max(...DATA), 0])
  .range([BUFFER, SVG_HEIGHT - BUFFER]);

const axisLeft = d3.axisLeft(DATA_TO_Y_SCALE).ticks(12).tickSizeOuter(0);
const axisLeftG = SVG.append("g").attr("id", "axisLeftG");
axisLeft(axisLeftG);
axisLeftG.style("transform", `translateX(${BUFFER}px)`);

const DATE_TO_X_SCALE = d3
  .scaleTime()
  .domain([
    new Date(START_DATE - new Date(1970, 0, 8, 8)),
    new Date(+END_DATE + +new Date(1970, 0, 8, 8)),
  ])
  .range([BUFFER, SVG_WIDTH - BUFFER]);

const axisBottom = d3
  .axisBottom(DATE_TO_X_SCALE)
  .ticks(10, "%m/%d")
  .tickPadding(10);

const axisBottomG = SVG.append("g").attr("id", "axisBottomG");
axisBottom(axisBottomG);
axisBottomG.style("transform", `translateY(${SVG_HEIGHT - BUFFER}px)`);

SVG.append("rect")
  .attr("x", BUFFER)
  .attr("y", BUFFER)
  .attr("height", SVG_HEIGHT - BUFFER * 2)
  .attr("width", SVG_WIDTH - BUFFER * 2)
  .style("fill", "white")
  .lower();

const barWidth = DATE_TO_X_SCALE(START_DATE) - BUFFER - 5;
SVG.append("g")
  .selectAll("rect")
  .data(DATA)
  .join("rect")
  .attr("y", (d) => DATA_TO_Y_SCALE(d))
  .attr(
    "x",
    (d, i) =>
      DATE_TO_X_SCALE(
        new Date(+START_DATE + +new Date(1970, 0, 8, 8) * (i - 0.5))
      ) + 2.5
  )
  .attr("height", (d) => SVG_HEIGHT - DATA_TO_Y_SCALE(d) - BUFFER)
  .attr("width", barWidth)
  .attr("rx", 4)
  .style("fill", (d) => colorScale(d));

SVG.append("g")
  .selectAll("text")
  .data(DATA)
  .join("text")
  .attr("y", (d) => DATA_TO_Y_SCALE(d) + 25)
  .attr("x", (d, i) =>
    DATE_TO_X_SCALE(new Date(+START_DATE + +new Date(1970, 0, 8, 8) * i))
  )
  .style("text-anchor", "middle")
  .text((d) => d)
  .style("font-size", 12)
  .style("font-weight", 900);
