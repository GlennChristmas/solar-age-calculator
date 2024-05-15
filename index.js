import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let birthDate = null;
let planetAge = [];
let partyDetailsCurrent = {};
let guestListCurrent = [];

//Function sourcing
import { nextPlanetAgeDaysCalculator } from "./helpers/nextPlanetAgeDaysCalculator.js";
import { birthdayIntervalTextGenerator } from "./helpers/birthdayIntervalTextGenerator.js";

// Data sourcing
import { modalData, modalKeyTitles } from "./public/modalData.js";
import { keyExists } from "./public/keyExists.js";
import { getValueByKey } from "./public/getValueByKey.js";
import {
  planetAgeMultiples,
  planets,
  planetImageNames,
  planetDemonyms,
} from "./public/planetData.js";
import { loadPartyDetails } from "./public/loadPartyDetailsCurrent.js";
import { loadGuestList } from "./public/loadGuestListCurrent.js";
import { savePartyDetails } from "./public/savePartyDetailsCurrent.js";
import { keyValueExtractor } from "./public/keyValueExtractor.js";
import { arrayElementIndexFinder } from "./public/arrayElementIndexFinder.js";
import { arrayElementDeleter } from "./public/arrayElementDeleter.js";

import partyFormContents from "./data/partyFormContents.json" assert { type: "json" };
import guestListModalContents from "./data/guestListModalContents.json" assert { type: "json" };
import { saveGuestList } from "./public/saveGuestListCurrent.js";

app.get("/", (req, res) => {
  res.render("index", { currentYear, birthDate });
});

app.get("/party-planning", (req, res) => {
  partyDetailsCurrent = loadPartyDetails();
  guestListCurrent = loadGuestList();

  res.render("partyPlanning", {
    currentYear,
    partyFormContents,
    partyDetailsCurrent,
    keyExists,
    getValueByKey,
    keyValueExtractor,
    guestListModalContents,
    guestListCurrent,
  });
});

app.post("/submit-party-details", (req, res) => {
  let partyDetailsObject = req.body;

  partyDetailsCurrent = partyDetailsObject;
  console.log(partyDetailsCurrent);

  savePartyDetails(partyDetailsCurrent);

  res.render("partyPlanning", {
    currentYear,
    partyFormContents,
    partyDetailsCurrent,
    keyExists,
    getValueByKey,
    keyValueExtractor,
    guestListModalContents,
    guestListCurrent,
  });
});

app.post("/submit-guest-list", (req, res) => {
  let guestDetails = req.body;
  let guestUUID = uuidv4();

  guestDetails["uuid"] = guestUUID;

  //this will add a new record - regardless of whether we are editing another one or not
  guestListCurrent.push(guestDetails);

  saveGuestList(guestListCurrent);

  res.render("partyPlanning", {
    currentYear,
    partyFormContents,
    partyDetailsCurrent,
    keyExists,
    getValueByKey,
    keyValueExtractor,
    guestListModalContents,
    guestListCurrent,
  });
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
    modalKeyTitles,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
