// store sales data across 4 regions, with top 4 categories of goods
const SALES_DATA = [
  {
    region: "North",
    s_t: 325000, // sports and travel
    h_l: 550000, // home and lifestyle
    e_g: 350000, // electronics and gadgets
    h_b: 300000, // health and beauty
  },
  {
    region: "East",
    s_t: 400000, // sports and travel
    h_l: 500000, // home and lifestyle
    e_g: 450000, // electronics and gadgets
    h_b: 350000, // health and beauty
  },
  {
    region: "South",
    s_t: 350000, // sports and travel
    h_l: 400000, // home and lifestyle
    e_g: 500000, // electronics and gadgets
    h_b: 325000, // health and beauty
  },
  {
    region: "West",
    s_t: 600000, // sports and travel
    h_l: 350000, // home and lifestyle
    e_g: 550000, // electronics and gadgets
    h_b: 500000, // health and beauty
  },
];

const SVG_H_R1 = document.querySelector("#LH svg").clientHeight;
const SVG_W_R1 = document.querySelector("#LH svg").clientWidth;
const SVG_H_R2 = document.querySelector("#LtH svg").clientHeight;
const SVG_W_R2 = document.querySelector("#LtH svg").clientWidth;

const R_ABBR = SALES_DATA.map((d) => d.region[0]);
const BUFFER = 35;
const DATA_LENGTH = SALES_DATA.length;

const LH_SVG = d3.select("#LH svg");
const AA_SVG = d3.select("#AA svg");
const LtH_SVG = d3.select("#LtH svg");
const RS_SVG = d3.select("#RS svg");
const CP_SVG = d3.select("#CP svg");

const COLOR_SCALE = d3.scaleOrdinal().range(d3.schemePastel2);
d3.selectAll("#legend span").style("background-color", function () {
  return COLOR_SCALE(this.id);
});

let tr = d3.transition().duration(250);
let widthScale, heightScale, xScale, yScale, xAxis, yAxis;

// Lowest and Highest
const LH = SALES_DATA.map((data) => {
  const temp = Object.entries(data).reduce(
    (acc, i) => {
      if (i[1] > acc.max[1]) {
        acc.max = i;
      } else if (i[1] < acc.min[1]) {
        acc.min = i;
      }
      return acc;
    },
    { max: [, -Infinity], min: [, Infinity] }
  );

  return [temp.max, temp.min];

  // let temp = [];
  // for (let key in data) {
  //   if (typeof data[key] !== "string") temp.push({ [key]: data[key] });
  // }
  // return [
  //   d3.least(temp, (a, b) => Object.values(a) - Object.values(b)),
  //   d3.least(temp, (a, b) => Object.values(b) - Object.values(a)),
  // ];
});

widthScale = d3
  .scaleLinear()
  .domain([0, d3.max(d3.merge(LH))[1]])
  .range([0, SVG_W_R1 - BUFFER * 2]);

yScale = d3
  .scaleBand()
  .domain(R_ABBR)
  .range([BUFFER, SVG_H_R1 - BUFFER])
  .paddingInner(0.03);

xAxis = d3.axisBottom(widthScale).ticks(3).tickSizeInner(0).tickPadding(10);
xAxis(
  LH_SVG.append("g")
    .attr("class", "LH_ticks")
    .style("transform", `translate(${BUFFER}px,${SVG_H_R1 - BUFFER}px)`)
);

yAxis = d3.axisLeft(yScale).tickSizeInner(0).tickPadding(10);
yAxis(
  LH_SVG.append("g")
    .attr("class", "LH_ticks")
    .style("transform", `translateX(${BUFFER}px)`)
);

const LH_BAR_Gs = LH_SVG.append("g")
  .attr("class", "bars")
  .selectAll("g")
  .data(LH)
  .join("g")
  .attr("id", (d, i) => R_ABBR[i]);

LH_BAR_Gs.selectAll("rect")
  .data((d) => d)
  .join("rect")
  .attr("rx", 4)
  .attr("x", BUFFER + 1)
  .attr("height", yScale.bandwidth() / 2)
  .style("fill", (d) => COLOR_SCALE(d[0]));

LH_SVG.select(".bars")
  .selectAll("rect")
  .transition(tr)
  .delay((d, i) => 125 * i)
  .attr("width", (d) => widthScale(d[1]));

LH_BAR_Gs.each(function () {
  const id = this.id;
  d3.select(this)
    .selectAll("rect")
    .attr("y", (d, i) => yScale(id) + (yScale.bandwidth() / 2) * i);
});

//Above the Average
const AA = SALES_DATA.map((d) => {
  const temp = Object.entries(d);
  const aver = d3.mean(d3.merge(temp));

  return temp.filter((i) => i[1] >= aver);

  // const temp = [];
  // for (let key in d) {
  //   if (typeof d[key] !== "string") temp.push({ [key]: d[key] });
  // }
  // const aver = d3.mean(temp, (n) => Object.values(n));
  // return temp.filter((n) => Object.values(n) > aver);
});

widthScale = d3
  .scaleLinear()
  .domain([0, d3.max(d3.merge(AA), (i) => i[1])])
  .range([0, SVG_W_R1 - BUFFER * 2]);

xAxis.scale(widthScale);

xAxis(
  AA_SVG.append("g")
    .attr("class", "AA_ticks")
    .style("transform", `translate(${BUFFER}px,${SVG_H_R1 - BUFFER}px)`)
);

yAxis(
  AA_SVG.append("g")
    .attr("class", "AA_ticks")
    .style("transform", `translateX(${BUFFER}px)`)
);

const AA_BAR_Gs = AA_SVG.append("g")
  .attr("class", "bars")
  .selectAll("g")
  .data(AA)
  .join("g")
  .attr("id", (d, i) => R_ABBR[i]);

AA_BAR_Gs.selectAll("rect")
  .data((d) => d)
  .join("rect")
  .attr("x", BUFFER + 1)
  .attr("height", yScale.bandwidth() / 3)
  .attr("fill", (d) => COLOR_SCALE(d[0]))
  .attr("rx", 4);
let n = 0;
AA_SVG.select(".bars")
  .selectAll("rect")
  .transition(tr)
  .delay((d, i) => 125 * (i + 1))
  .attr("width", (d) => widthScale(d[1]))
  .on("start", () => n++)
  .on("end", () => {
    n--;
    if (!n)
      document.getElementById("footer").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  });

AA_BAR_Gs.each(function () {
  const id = this.id;
  d3.select(this)
    .selectAll("rect")
    .attr("y", (d, i) => yScale(id) + (yScale.bandwidth() / 3) * i);
});

//Low to High
const LtH = SALES_DATA.reduce((acc, d) => {
  return acc.concat(Object.entries(d).filter((i) => typeof i[1] !== "string"));
}, []);

yScale = d3
  .scaleLinear()
  .domain([d3.max(LtH, (d) => d[1]), 0])
  .range([BUFFER, SVG_H_R2 - BUFFER]);

yAxis.scale(yScale).ticks(3, "~s");
yAxis(
  LtH_SVG.append("g")
    .attr("class", "LtH_ticks")
    .style("transform", `translateX(${BUFFER}px)`)
);

xScale = d3
  .scaleLinear()
  .domain([0, LtH.length])
  .range([BUFFER, SVG_W_R2 - BUFFER * 2]);
xAxis.scale(xScale).ticks(0);
xAxis(
  LtH_SVG.append("g")
    .attr("class", "LtH_ticks")
    .style("transform", `translateY(${SVG_H_R2 - BUFFER}px)`)
);

const LtH_SVG_G = LtH_SVG.append("g").attr("class", "circles");

const circles = LtH_SVG_G.selectAll("circle")
  .data(LtH)
  .join("circle")
  .attr("id", (d, i) => R_ABBR[Math.floor(i / 4)])
  .sort((a, b) => a[1] - b[1])
  .attr("cx", (d, i) => xScale(i + 0.5))
  .attr("cy", (d) => yScale(d[1]))
  .style("fill", (d) => COLOR_SCALE(d[0]))
  .transition()
  .delay((d, i) => 1700 + 100 * i)
  .duration(100)
  .attr("r", 5)
  .on("start", function () {
    const id = this.id;
    const x = this.cx.animVal.value;
    const y = this.cy.animVal.value;
    LtH_SVG_G.append("text")
      .text(id)
      .attr("x", x)
      .attr("y", SVG_H_R2 - BUFFER + 16)
      .style("text-anchor", "middle")
      .style("font-size", 12);
    LtH_SVG_G.append("line")
      .attr("stroke", "gray")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", SVG_H_R2 - BUFFER)
      .attr("y2", SVG_H_R2 - BUFFER)
      .transition()
      .duration(150)
      .attr("y2", y + 10);
  });

// Region Total Sales
