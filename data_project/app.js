let planetData = [
  {
    name: "Mercury",
    diameter: 4879,
    density: 5427,
    color: "green",
  },
  {
    name: "Venus",
    diameter: 12104,
    density: 5243,
    color: "purple",
  },
  {
    name: "Earth",
    diameter: 12756,
    density: 5514,
    color: "dodgerblue",
  },
  {
    name: "Mars",
    diameter: 6792,
    density: 3933,
    color: "indianred",
  },
  {
    name: "Jupiter",
    diameter: 142984,
    density: 1326,
    color: "gold",
  },
  {
    name: "Saturn",
    diameter: 120536,
    density: 687,
    color: "navy",
  },
  {
    name: "Uranus",
    diameter: 51118,
    density: 1271,
    color: "thistle",
  },
  {
    name: "Neptune",
    diameter: 49528,
    density: 1638,
    color: "pink",
  },
  {
    name: "Pluto",
    diameter: 2370,
    density: 2095,
    color: "brown",
  },
];

let currentSort = "Ascending";

document.getElementById("btn").addEventListener("click", () => {
  d3.select("#btn-msg").text(`Sorting : ${currentSort}`);
  d3.select("#diaText").text("Diameter of Planets");
  d3.select("#denText").text("Density of Planets");

  getDiameterChart(currentSort);
  getDensityChart(currentSort);
  currentSort = currentSort === "Ascending" ? "Descending" : "Ascending";
});

function getDiameterChart(sort) {
  let cxCount = 0;
  sort = sort === "Ascending" ? (a, b) => a - b : (a, b) => b - a;

  const diameterSvg = d3.select("#diameter svg");

  const diameterCircle = diameterSvg
    .selectAll("circle")
    .data(planetData)
    .join("circle")
    .sort((a, b) => sort(a.diameter, b.diameter))
    .attr("cy", 175)
    .attr("r", (d) => d.diameter / 1000)
    .attr("cx", (d) => {
      cx = cxCount + 50 + d.diameter / 1000;
      cxCount = cx + d.diameter / 1000;
      return cx;
    })
    .attr("fill", (d) => d.color);

  diameterSvg
    .selectAll("text")
    .data(planetData)
    .join("text")
    .sort((a, b) => sort(a.diameter, b.diameter))
    .text((d) => d.name + "," + d.diameter)
    .attr("y", (d, i) => (i % 2 === 0 ? 21 : 345))
    .attr("x", (d, i) =>
      document.querySelectorAll("#diameter circle")[i].getAttribute("cx")
    )
    .style("text-anchor", "middle")
    .style("font-size", 12)
    .style("font-weight", "bold");
}

function getDensityChart(sort) {
  let cyCount = 0;
  sort = sort === "Ascending" ? (a, b) => a - b : (a, b) => b - a;

  const densitySvg = d3.select("#density svg");

  densitySvg
    .selectAll("rect")
    .data(planetData)
    .join("rect")
    .sort((a, b) => sort(a.density, b.density))
    .attr("height", 20)
    .attr("width", (d) => d.density / 8)
    .attr("x", 0)
    .attr("y", (d, i) => 30 * i)
    .attr("fill", (d) => d.color);

  densitySvg
    .selectAll("text")
    .data(planetData)
    .join("text")
    .sort((a, b) => sort(a.density, b.density))
    .attr(
      "x",
      (d, i) =>
        +document.querySelectorAll("#density rect")[i].getAttribute("width") +
        10
    )
    .attr("y", (d, i) => 15 + 30 * i)
    .text((d) => d.name + "," + d.density)
    .style("text-anchor", "middle-left")
    .style("font-size", 12)
    .style("font-weight", "bold");
}
