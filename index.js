const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //this is a slightly newer approach to extract user POSTs

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let birthDate = null;
let planetAge = [];
let intervals = [];

//Constants
const planetAgeMultiples = [4.17, 1.61, 1, 0.53, 0.08, 0.03, 0.01, 0.006];
const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];
const planetImageNames = [
  "/assets/nasa-mercury.jpg",
  "/assets/nasa-venus.jpg",
  "/assets/nasa-earth.jpg",
  "/assets/nasa-mars.jpg",
  "/assets/jupiter.jpg",
  "/assets/nasa-saturn.jpg",
  "/assets/nasa-uranus.jpg",
  "/assets/nasa-neptune.jpg",
];
const planetDemonyms = [
  "mercurian",
  "venusian",
  "terran",
  "martian",
  "jovian",
  "saturnian",
  "uranian",
  "neptunian",
];

//Function sourcing
const {
  nextPlanetAgeDaysCalculator,
} = require("./helpers/nextPlanetAgeDaysCalculator");

const {
  birthdayIntervalTextGenerator,
} = require("./helpers/birthdayIntervalTextGenerator");

//Data sourcing
const { modalData } = require("./modalData");

app.get("/", (req, res) => {
  res.render("index", { currentYear, birthDate });
});

app.post("/submit-birthdate", (req, res) => {
  let birthDate = req.body.birthDate;
  console.log("Birthdate submitted:", birthDate);
  let birthDateNumeric = new Date(req.body.birthDate);

  console.log(`your birthDate is ${birthDate}`);
  console.log(`your birthDateNumeric is ${birthDateNumeric}`);

  let ageDiff = Math.abs(currentDate - birthDateNumeric);
  let earthAge = ageDiff / (1000 * 60 * 60 * 24 * 365.25);

  for (let i = 0; i < planetAgeMultiples.length; i++) {
    planetAge[i] = planetAgeMultiples[i] * earthAge;
  }

  //calculate earth days until next planet birthday
  let earthDaysToPlanetBirthday = nextPlanetAgeDaysCalculator(
    planetAge,
    planetAgeMultiples
  );

  //generate text according to no. of earth days until each planet birthday
  let { intervals, messages } = birthdayIntervalTextGenerator(
    earthDaysToPlanetBirthday
  );

  res.render("index", {
    currentYear,
    birthDate,
    planetAge,
    intervals,
    messages,
    planets,
    planetImageNames,
    planetDemonyms,
    modalData,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
