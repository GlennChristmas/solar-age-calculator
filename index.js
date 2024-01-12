const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //this is a slightly newer approach to extract user POSTs

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let birthDate = null;
let planetAge = [4.17, 1.61, 1, 0.53, 0.08, 0.03, 0.01, 0.006];

app.get("/", (req, res) => {
  res.render("index", { currentYear, birthDate });
});

app.post("/submit-birthdate", (req, res) => {
  let birthDate = req.body.birthDate;
  console.log("Birthdate submitted:", birthDate);
  let birthDateNumeric = new Date(req.body.birthDate);

  let ageDiff = Math.abs(currentDate - birthDateNumeric);
  let earthAge = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));

  for (let i = 0; i < planetAge.length; i++) {
    planetAge[i] *= earthAge;
    planetAge[i] = Math.round(planetAge[i]);
  }

  console.log(`Your earth age is ${earthAge}.`);
  console.log(planetAge);

  res.render("index", { currentYear, birthDate, planetAge });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
