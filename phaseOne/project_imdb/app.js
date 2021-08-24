function randomRGB() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
}

function searchMovieData(name) {
  for (let movie of movieData) {
    if (movie.name === name) {
      return movie;
    }
  }
}

const movieData = [
  {
    name: "Avengers: Endgame",
    contentRating: "12A",
    duration: 181, // in minutes
    starRating: 8.4, // out of 10
    votes: 747374,
    gross: 858, // USD million
  },
  {
    name: "The Lion King",
    contentRating: "PG",
    duration: 118,
    starRating: 6.9,
    votes: 198014,
    gross: 544,
  },
  {
    name: "Star Wars: The Rise of Skywalker",
    contentRating: "12A",
    duration: 141,
    starRating: 6.6,
    votes: 343828,
    gross: 515,
  },
  {
    name: "Frozen 2",
    contentRating: "U",
    duration: 103,
    starRating: 6.9,
    votes: 120859,
    gross: 477,
  },
  {
    name: "Toy Story 4",
    contentRating: "U",
    duration: 100,
    starRating: 7.8,
    votes: 187391,
    gross: 434,
  },
  {
    name: "Captain Marvel",
    contentRating: "12A",
    duration: 123,
    starRating: 6.9,
    votes: 420459,
    gross: 427,
  },
  {
    name: "Spider-Man: Far From Home",
    contentRating: "12A",
    duration: 129,
    starRating: 7.5,
    votes: 301963,
    gross: 391,
  },
  {
    name: "Aladdin",
    contentRating: "PG",
    duration: 128,
    starRating: 7.0,
    votes: 213479,
    gross: 356,
  },
  {
    name: "Joker",
    contentRating: "15",
    duration: 122,
    starRating: 8.5,
    votes: 840556,
    gross: 335,
  },
  {
    name: "Jumanji: The Next Level",
    contentRating: "12A",
    duration: 123,
    starRating: 6.7,
    votes: 163288,
    gross: 317,
  },
];

const divWidth =
  document.getElementById("movies-selection").clientWidth / 2 - 10;
const divHeight =
  (document.getElementById("movies-selection").clientHeight - 40) / 5;

movieData.forEach((mv) => (mv.color = randomRGB()));

for (let i = 0; i < movieData.length; i++) {
  d3.select("#movies-selection")
    .append("div")
    .style("width", divWidth + "px")
    .style("height", divHeight + "px")
    .style("line-height", divHeight + "px")
    .attr("class", "movie-select")
    .property("innerText", movieData[i].name);
}

document.getElementById("movies-selection").addEventListener("click", (e) => {
  if (e.target.className === "movie-select") {
    const movieName = e.target.innerText;
    const movieObj = searchMovieData(movieName);
    const infoHtml = `
    <h2>${movieName}</h2>
    <p>Content Rating : <span>${movieObj.contentRating}</span></p>
    <p>Duration(mins) : <span>${movieObj.duration}</span></p>
    <p>Star Rating(out of 10) : <span>${movieObj.starRating}</span></p>
    <p>Votes : <span>${movieObj.votes}</span></p>
    <p>Gross : <span>${movieObj.gross}</span></p>
    `;
    d3.select("#movies-info").html(infoHtml);
  }
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

  const choicesMap = new Map();
  choicesMap.set("U", d3.select("#cbu").property("checked"));
  choicesMap.set("15", d3.select("#cb15").property("checked"));
  choicesMap.set("12A", d3.select("#cb12a").property("checked"));
  choicesMap.set("PG", d3.select("#cbpg").property("checked"));

  if (Array.from(choicesMap.values()).includes(true)) {
    d3.select("#feedback").text("");
  } else {
    d3.select("#feedback").text("NONONO");
  }

  createSelectionChart(choicesMap);
});

function createSelectionChart(choicesMap) {
  const selectedMovies = [];
  for (let [key, value] of choicesMap) {
    if (value === true) {
      movieData.forEach((mv) => {
        if (mv.contentRating === key) {
          selectedMovies.push(mv);
        }
      });
    }
  }
  updateCategory(selectedMovies);
  updateLegend(selectedMovies);
}

function updateCategory(selectedMovies) {
  let [countU, count15, count12A, countPG] = [0, 0, 0, 0];

  const uniqueSet = new Set();

  movieData.forEach((movie) => {
    uniqueSet.add(movie.contentRating);
  });

  selectedMovies.forEach((movie) => {
    switch (movie.contentRating) {
      case "U":
        countU++;
        break;
      case "15":
        count15++;
        break;
      case "12A":
        count12A++;
        break;
      case "PG":
        countPG++;
        break;
    }
  });

  for (let i = 0; i < uniqueSet.size; i++) {
    d3.select("#category").append("div");
  }

  d3.select("#category div:nth-child(1)").html(`
  <h2>${countU}</h2>
  <p>"U" rating movie(s) selected</p>`);
  d3.select("#category div:nth-child(2)").html(`
  <h2>${count15}</h2>
  <p>"15" rating movie(s) selected</p>`);
  d3.select("#category div:nth-child(3)").html(`
  <h2>${count12A}</h2>
  <p>"12A" rating movie(s) selected</p>`);
  d3.select("#category div:nth-child(4)").html(`
  <h2>${countPG}</h2>
  <p>"PG" rating movie(s) selected</p>`);
}

function updateLegend(selectedMovies) {
  selectedMovies.forEach((mv) => {
    const holder = d3
      .select("#legend")
      .append("div")
      .style("display", "flex")
      .style("align-items", "center");
    holder
      .append("div")
      .style("width", "15px")
      .style("height", "15px")
      .style("border-radius", "8px")
      .style("background-color", mv.color);
    holder.append("p").text(mv.name);
  });
}
