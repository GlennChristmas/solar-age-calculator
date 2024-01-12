const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //this is a slightly newer approach to extract user POSTs

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let birthDate = null;

app.get("/", (req, res) => {
  res.render("index", { currentYear, birthDate });
});

app.post("/submit-birthdate", (req, res) => {
  let birthDate = req.body.birthDate;
  console.log("Birthdate submitted:", birthDate);
  res.render("index", { currentYear, birthDate });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
