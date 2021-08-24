const dryFruitData = [
  {
    name: "Almonds",
    carbs: 15,
    fats: 72,
    proteins: 13,
  },
  {
    name: "Raisins",
    carbs: 96,
    fats: 1,
    proteins: 3,
  },
  {
    name: "Cashews",
    carbs: 23,
    fats: 66,
    proteins: 11,
  },
  {
    name: "Walnuts",
    carbs: 9,
    fats: 83,
    proteins: 8,
  },
  {
    name: "Apricots",
    carbs: 93,
    fats: 2,
    proteins: 5,
  },
  {
    name: "Pistachios",
    carbs: 20,
    fats: 67,
    proteins: 13,
  },
  {
    name: "Figs",
    carbs: 94,
    fats: 3,
    proteins: 3,
  },
  {
    name: "Dates",
    carbs: 98,
    fats: 0,
    proteins: 2,
  },
  {
    name: "Prunes",
    carbs: 96,
    fats: 1,
    proteins: 3,
  },
  {
    name: "Hazelnuts",
    carbs: 11,
    fats: 81,
    proteins: 8,
  },
];

const svg = d3.select("#charts");

const svgHeight = svg.node().clientHeight;
const svgWidth = svg.node().clientWidth;
const gWidth = svgWidth / (dryFruitData.length * 2 + 1);

svg.attr("viewBox", `0 ${-svgHeight} ${svgWidth} ${svgHeight}`);

const Gs = svg.selectAll("g").data(dryFruitData).join("g").each(genBar);

function genBar(d, i, n) {
  let heightAccumulator = 0;
  const colors = ["burlywood", "wheat", "tan"];
  const G = d3.select(this);
  G.selectAll("rect")
    .data([d.carbs, d.fats, d.proteins])
    .join("rect")
    .attr("width", gWidth)
    .attr("height", (d) => (d / 100) * svgHeight)
    .attr("x", gWidth * (i * 2 + 1))
    .attr("y", (d) => (heightAccumulator -= (d / 100) * svgHeight))
    .attr("rx", 10)
    .attr("fill", (d, i) => colors[i]);

  G.selectAll("text")
    .data([d])
    .join("text")
    .text((d) => `${d.name} (${d.carbs},${d.fats},${d.proteins})`)
    .attr("x", gWidth * (i * 2 + 0.75))
    .attr("y", -250)
    .style("text-anchor", "middle")
    .style("writing-mode", "tb");
}
