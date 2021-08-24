let fordData = [
  {
    quarter: "Q1",
    year: 2018,
    truck: 109276,
    suv: 82395,
    car: 52635,
  },
  {
    quarter: "Q2",
    year: 2018,
    truck: 100683,
    suv: 84617,
    car: 45335,
  },
  {
    quarter: "Q3",
    year: 2018,
    truck: 93408,
    suv: 66884,
    car: 37112,
  },
  {
    quarter: "Q4",
    year: 2018,
    truck: 106599,
    suv: 79225,
    car: 34950,
  },
  {
    quarter: "Q1",
    year: 2019,
    truck: 278898,
    suv: 213086,
    car: 98265,
  },
  {
    quarter: "Q2",
    year: 2019,
    truck: 324243,
    suv: 215898,
    car: 110195,
  },
  {
    quarter: "Q3",
    year: 2019,
    truck: 309920,
    suv: 193100,
    car: 77231,
  },
  {
    quarter: "Q4",
    year: 2019,
    truck: 330075,
    suv: 208387,
    car: 63400,
  },
];

const primaryColors = { 2018: "steelblue", 2019: "dodgerblue" };
let years = new Set();
fordData.forEach((i) => years.add(i.year));
years = Array.from(years);
const yearlyData = [];
years.forEach((year) => {
  let sum = 0;
  fordData.forEach((d) => {
    if (d.year === year) sum += d.truck + d.suv + d.car;
  });
  yearlyData.push(sum);
});

let svgHeight = document.querySelector("#year svg").clientHeight;
const svgWidth = document.querySelector("#year svg").clientWidth;

document.getElementById("generator").addEventListener("click", () => {
  const yearSvg = d3.select("#year svg").style("border-left", "1px solid gray");
  yearSvg
    .selectAll("rect")
    .data(yearlyData)
    .join("rect")
    .attr("height", () => svgHeight / 4 - 10)
    .attr("width", (d) => d / 10000)
    .attr("y", (d, i) => (svgHeight / 4) * (i + 1))
    .attr("fill", (d, i) => primaryColors[years[i]])
    .style("cursor", "pointer")
    .attr("id", (d, i) => years[i]);

  yearSvg
    .selectAll("text")
    .data(yearlyData)
    .join("text")
    .text((d, i) => `${years[i]}, ${d}`)
    .attr("y", (d, i) => (svgHeight / 4) * (i + 1.5))
    .attr("x", (d) => d / 10000 + 10)
    .style("font-size", 12)
    .style("font-weight", "bold");

  d3.select("#year p").html("Yearly Income<br/>Click a bar to view details");

  yearSvg.selectAll("rect").on("click", function () {
    const quarter = d3.select("#quarter");
    quarter
      .select("p")
      .html(`${this.id} - Quarter Break up<br/>Hover on a bar to view details`);

    const quarterlyData = [];
    fordData.forEach((d) => {
      if (d.year == this.id) quarterlyData.push(d);
    });

    const quarterSvg = quarter
      .select("svg")
      .style("border-left", "1px solid gray");

    quarterSvg
      .selectAll("rect")
      .data(quarterlyData)
      .join("rect")
      .attr("y", (d, i) => (svgHeight / 4) * i)
      .attr("height", svgHeight / 4 - 10)
      .attr("width", (d) => (d.truck + d.suv + d.car) / 2000)
      .attr("id", (d) => d.quarter)
      .attr("fill", (d, i) => primaryColors[this.id])
      .style("opacity", (d, i) => 0.25 * (i + 1))
      .style("cursor", "pointer");

    quarterSvg
      .selectAll("text")
      .data(quarterlyData)
      .join("text")
      .text((d) => d.quarter)
      .attr("y", (d, i) => (svgHeight / 4) * (i + 0.5))
      .attr("x", 10)
      .style("font-size", 12)
      .style("font-weight", "bold");

    quarterSvg.selectAll("rect").on("mouseenter", function (e, d) {
      const quarterVehicle = d3.select("#quarter-vehicle");

      quarterVehicle.select("p").text(`${this.id} Vehicle Types`);

      quarterVehicle
        .select("svg")
        .style("border-left", "1px solid gray")
        .selectAll("rect")
        .data([d.truck, d.suv, d.car])
        .join("rect")
        .attr("height", svgHeight / 4 - 10)
        .attr("y", (d, i) => (svgHeight / 4) * (i + 0.5))
        .attr("width", (d) => d / 1000)
        .attr("fill", "blue")
        .style("opacity", (d, i) => 0.5 / (1 + i * 0.3));

      quarterVehicle
        .select("svg")
        .selectAll("text")
        .data(["Truck", "SUV", "Car"])
        .join("text")
        .text((d) => d)
        .attr("x", 10)
        .attr("y", (d, i) => (svgHeight / 4) * (i + 1))
        .style("font-size", 12)
        .style("font-weight", "bold");
    });
  });
});
