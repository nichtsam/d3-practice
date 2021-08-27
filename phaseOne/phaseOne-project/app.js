// Company Data
const indian9IT = [
  {
    name: "Tata Consultancy Services",
    code: "tcs",
    revenue: 1524970,
    marketCap: 8453370,
    employees: 420000,
    salesGrowth: 10.47,
    color: "salmon",
    fb: 730890,
    tw: 439800,
    li: 4639844,
  },
  {
    name: "Infosys",
    code: "infosys",
    revenue: 873710,
    marketCap: 2820280,
    employees: 228000,
    salesGrowth: 9.81,
    color: "coral",
    fb: 853447,
    tw: 419100,
    li: 3330921,
  },
  {
    name: "HCL Technologies",
    code: "hcl",
    revenue: 656430,
    marketCap: 1533700,
    employees: 150000,
    salesGrowth: 24.74,
    color: "khaki",
    fb: 1415863,
    tw: 438200,
    li: 2042198,
  },
  {
    name: "Wipro",
    code: "wipro",
    revenue: 601370,
    marketCap: 1530430,
    employees: 160000,
    salesGrowth: 4.82,
    color: "turquoise",
    fb: 1446866,
    tw: 482100,
    li: 3115578,
  },
  {
    name: "Tech Mahindra",
    code: "mahindra",
    revenue: 351190,
    marketCap: 701410,
    employees: 125700,
    salesGrowth: 9.45,
    color: "deepskyblue",
    fb: 131903,
    tw: 122400,
    li: 1629563,
  },
  {
    name: "L & T Infotech",
    code: "l & t",
    revenue: 100140,
    marketCap: 293020,
    employees: 31500,
    salesGrowth: 17.34,
    color: "violet",
    fb: 59883,
    tw: 141200,
    li: 675820,
  },
  {
    name: "Mphasis",
    code: "mphasis",
    revenue: 79730,
    marketCap: 177380,
    employees: 22000,
    salesGrowth: 8.33,
    color: "lightpink",
    fb: 15213,
    tw: 7512,
    li: 313362,
  },
  {
    name: "Mindtree",
    code: "mindtree",
    revenue: 73750,
    marketCap: 118550,
    employees: 21000,
    salesGrowth: 14.54,
    color: "mistyrose",
    fb: 57914,
    tw: 82800,
    li: 432892,
  },
  {
    name: "Hexaware Technologies",
    code: "hexaware",
    revenue: 53060,
    marketCap: 101650,
    employees: 18300,
    salesGrowth: 14.17,
    color: "navajowhite",
    fb: 68095,
    tw: 9191,
    li: 246766,
  },
];

const selects = d3
  .select("#selection")
  .selectAll("div")
  .data(indian9IT)
  .join("div")
  .style("display", "flex")
  .style("padding", "0 10px")
  .style("justify-content", "space-between")
  .style("align-items", "center");

const selectH2 = selects
  .append("h2")
  .text((d) => d.code.toUpperCase())
  .style("font-size", "10px")
  .style("text-decoration", "underline")
  .style("cursor", "pointer");

const selectCheckbox = selects.append("input").attr("type", "checkbox");

selectH2.on("click", (e, d) => {
  const info = d3.select("#info");
  const infoTitle = [
    "Company",
    "Revenue",
    "Market Cap",
    "Employees",
    "Sales Growth",
  ];
  info
    .selectAll("p")
    .data([d.name, d.revenue, d.marketCap, d.employees, d.salesGrowth])
    .html((d, i) => `<span>${infoTitle[i]} :</span> ${d}`);

  const socialTitle = ["Facebook", "Twitter", "Linkedin"];
  const socialDivs = d3.selectAll("#social div").data([d.fb, d.tw, d.li]);
  socialDivs.select("h2").text((d, i) => socialTitle[i]);
  socialDivs.select("p").text((d) => d);
});

selectCheckbox.on("input", (e, d) => {
  const renderList = [];
  selectCheckbox.each(function (d, i) {
    if (this.checked === true) renderList.push(indian9IT[i]);
  });

  updateCharts(renderList);
});

function updateCharts(renderList) {
  if (renderList === 0) {
    d3.select("#revenue p").text("");
    d3.select("#employees p").text("");
    d3.select("#market-cap p").text("");
    d3.select("#sales-growth p").text("");
    return;
  }
  d3.select("#revenue p").text("Revenue");
  d3.select("#employees p").text("Employees");
  d3.select("#market-cap p").text("Market Cap");
  d3.select("#sales-growth p").text("Sales Growth");

  const commons = [];
  const revenue = [];
  const employees = [];
  const marketCap = [];
  const salesGrowth = [];

  renderList.forEach((i) => {
    commons.push({ color: i.color, name: i.name });
    revenue.push(i.revenue);
    employees.push(i.employees);
    marketCap.push(i.marketCap);
    salesGrowth.push(i.salesGrowth);
  });

  const svgHeight = document.querySelector("svg").clientHeight;
  const svgWidth = document.querySelector("svg").clientWidth;
  const rectWidth = svgWidth / (renderList.length * 2 + 1);

  const svg = d3
    .selectAll("#charts svg")
    .attr("viewBox", `0 ${-svgHeight} ${svgWidth} ${svgHeight}`)
    .data([revenue, employees, marketCap, salesGrowth]);

  svg
    .selectAll("rect")
    .data(
      (d) => d,
      (d) => d
    )
    .join("rect")
    .attr("x", (d, i) => rectWidth * (i * 2 + 1))
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", (d, i) => commons[i].color)
    .transition()
    .duration(500)
    .attr("width", rectWidth);

  d3.selectAll("#revenue svg rect")
    .attr("height", (d) => (d / revenue[0]) * svgHeight)
    .transition()
    .duration(500)
    .attr("y", (d) => -(d / revenue[0]) * svgHeight);
  d3.selectAll("#employees svg rect")
    .attr("height", (d) => (d / employees[0]) * svgHeight)
    .transition()
    .duration(500)
    .attr("y", (d) => -(d / employees[0]) * svgHeight);
  d3.selectAll("#market-cap svg rect")
    .attr("height", (d) => (d / marketCap[0]) * svgHeight)
    .transition()
    .duration(500)
    .attr("y", (d) => -(d / marketCap[0]) * svgHeight);
  salesGrowthMax = Math.max(...salesGrowth);
  d3.selectAll("#sales-growth svg rect")
    .attr("height", (d) => (d / salesGrowthMax) * svgHeight)
    .transition()
    .duration(500)
    .attr("y", (d) => -(d / salesGrowthMax) * svgHeight);

  svg
    .selectAll("text")
    .data(
      (d) => d,
      (d) => d
    )
    .join("text")
    .text((d, i) => `${commons[i].name},${d}`)
    .style("font-size", 12)
    .style("text-anchor", "middle")
    .style("writing-mode", "tb")
    .attr("x", (d, i) => rectWidth * (i * 2 + 1) - 15)
    .transition()
    .duration(500)
    .attr("y", -svgHeight / 2);
}
