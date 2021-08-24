document.querySelector(".buttons").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  changeSelected(e.target.innerText);
});

function randomRGB() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
}

function changeSelected(mode) {
  document.querySelector("#select").innerText = `clicked : ${mode}`;
  const color = randomRGB();

  if (mode === "select") {
    d3.select(".circles")
      .selectChild("circle")
      .select((d, i, n) => (n[i].style.fill = color));
    d3.select(".squares")
      .selectChild("rect")
      .select((d, i, n) => (n[i].style.fill = color));
    d3.select(".rects")
      .selectChild("rect")
      .select((d, i, n) => (n[i].style.fill = color));
  } else {
    const circles = d3.select(".circles").selectChildren("circle");
    const squares = d3.select(".squares").selectChildren("rect");
    const rects = d3.select(".rects").selectChildren("rect");

    const selections = [circles, squares, rects];

    if (mode === "selectAll") {
      selections.forEach((selection) => {
        selection.select((d, i, n) => {
          n[i].style.fill = color;
          n[i].style.opacity = (i + 1) * 0.25;
        });
      });
    }

    selections.forEach((selection) => {
      selection.filter((d, i, n) => {
        if (mode === "filter-odd" && i % 2 === 0) {
          n[i].style.fill = color;
          n[i].style.opacity = (i + 1) * 0.25;
        }
        if (mode === "filter-even" && i % 2 === 1) {
          n[i].style.fill = color;
          n[i].style.opacity = (i + 1) * 0.25;
        }
      });
    });
  }
}
