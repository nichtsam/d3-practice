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
const BUFFER = 25;
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

// Lowest and Highest
const LH = SALES_DATA.map((data) => {
  let temp = [];
  for (let key in data) {
    if (typeof data[key] !== "string") temp.push({ [key]: data[key] });
  }
  return [
    d3.least(temp, (a, b) => Object.values(a) - Object.values(b)),
    d3.least(temp, (a, b) => Object.values(b) - Object.values(a)),
  ];
});

let widthScale = d3
  .scaleLinear()
  .domain([0, d3.max(d3.merge(LH), (i) => Object.values(i))])
  .range([0, SVG_W_R1 - BUFFER * 2]);

let yScale = d3
  .scaleBand()
  .domain(R_ABBR)
  .range([BUFFER, SVG_H_R1 - BUFFER])
  .paddingInner(0.03);

let xAxis = d3.axisBottom(widthScale).ticks(3).tickSizeInner(0).tickPadding(10);
xAxis(
  LH_SVG.append("g")
    .attr("class", "LH_ticks")
    .style("transform", `translate(${BUFFER}px,${SVG_H_R1 - BUFFER}px)`)
);

let yAxis = d3.axisLeft(yScale).tickSizeInner(0).tickPadding(10);
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
  .attr("width", (d) => widthScale(Object.values(d)))
  .style("fill", (d) => COLOR_SCALE(...Object.keys(d)));

LH_BAR_Gs.each(function () {
  const id = this.id;
  d3.select(this)
    .selectAll("rect")
    .attr("y", (d, i) => yScale(id) + (yScale.bandwidth() / 2) * i);
});

//Above the Average
