const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

app.get("/", (req, res) => {
  res.render("index", { currentYear });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
