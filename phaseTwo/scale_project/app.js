const top10PopDensity = [
  {
    country: "Macao",
    density: 20777.5,
  },
  {
    country: "Singapore",
    density: 7952.9,
  },
  {
    country: "Hong Kong",
    density: 7096.1,
  },
  {
    country: "Gibraltar",
    density: 3371.8,
  },
  {
    country: "Baharain",
    density: 2017.2,
  },
  {
    country: "Maldives",
    density: 1718.9,
  },
  {
    country: "Malta",
    density: 1514.4,
  },
  {
    country: "Bangladesh",
    density: 1239.5,
  },
  {
    country: "Bermuda",
    density: 1183.7,
  },
  {
    country: "Channel Islands",
    density: 861.1,
  },
];

const MaxScale = Math.max(...top10PopDensity.map((i) => i.density));
const PerToActScale = d3.scaleLinear([0, 100], [0, MaxScale]);
const ActToPerScale = d3.scaleLinear([0, MaxScale], [0, 100]);
const colorScale = d3.scaleLinear(
  [0, top10PopDensity.length],
  ["darkcyan", "skyblue"]
);

let lastModified;

d3.selectAll("input").on("focus", function () {
  lastModified = this.id;
});

document.querySelector("button").addEventListener("click", () => {
  if (lastModified === "percentage") {
    const target = document.querySelector("#actual");
    const current = document.querySelector("#percentage").value;
    target.value = PerToActScale(current).toFixed(1);
  } else if (lastModified === "actual") {
    const target = document.querySelector("#percentage");
    const current = document.querySelector("#actual").value;
    target.value = ActToPerScale(current).toFixed();
  }
});

const svgWidth = document.querySelector("svg").clientWidth;
const rectHeight = 400 / top10PopDensity.length - 10;

const Gs = d3.select("svg").selectAll("g").data(top10PopDensity).join("g");
Gs.selectAll("rect")
  .data((d) => [d.density])
  .join("rect");

Gs.selectAll("text")
  .data((d) => [d.country])
  .join("text");

const rects = d3
  .selectAll("rect")
  .attr("height", rectHeight)
  .attr("y", (d, i) => (10 + rectHeight) * i)
  .attr("width", (d) => (ActToPerScale(d) * svgWidth) / 120)
  .attr("x", -5)
  .attr("rx", 5)
  .style("fill", (d, i) => colorScale(i));

const texts = d3
  .selectAll("text")
  .text((d) => d)
  .attr("y", (d, i) => (10 + rectHeight) * (i + 0.5))
  .attr("x", (d, i) =>
    document.querySelector(`g:nth-of-type(${i + 1}) rect`).getAttribute("width")
  )
  .style("fill", "darkcyan")
  .style("font-weight", "900");
