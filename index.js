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
let elementForEdit = {};
let planetBirthdayInfo = [];
let nNearestBirthdays = [];

//Function sourcing
import { nextPlanetAgeDaysCalculator } from "./src/helpers/nextPlanetAgeDaysCalculator.js";
import { birthdayIntervalTextGenerator } from "./src/helpers/birthdayIntervalTextGenerator.js";

// Data sourcing
import { modalData, modalKeyTitles } from "./public/data/modalData.js";
import {
  planetAgeMultiples,
  planets,
  planetImageNames,
  planetDemonyms,
} from "./public/data/planetData.js";
import { loadPartyDetails } from "./src/loadPartyDetails.js";
import { loadGuestList } from "./src/loadGuestList.js";
import { savePartyDetails } from "./src/savePartyDetails.js";
import { extractKeyValueFromArray } from "./src/extractKeyValueFromArray.js";
import { findIndexInArray } from "./src/arrayElementIndexFinder.js";
import { removeElementFromArray } from "./src/removeElementFromArray.js";
import { generatePlanetInfo } from "./src/generatePlanetInfo.js";
import { getClosestPlanetBirthdays } from "./src/getClosetPlanetBirthdays.js";
import { addIntSuffix } from "./src/addIntSuffix.js";

import planetsData from "./data/planetsData.json" assert { type: "json" };
import partyFormContents from "./data/partyFormContents.json" assert { type: "json" };
import guestListModalContents from "./data/guestListModalContents.json" assert { type: "json" };
import { saveGuestList } from "./src/saveGuestList.js";

app.get("/", (req, res) => {
  res.render("index", {
    currentYear,
    birthDate,
    nNearestBirthdays,
    addIntSuffix,
  });
});

app.get("/party-planning", (req, res) => {
  partyDetailsCurrent = loadPartyDetails();
  guestListCurrent = loadGuestList();

  res.render("partyPlanning", {
    currentYear,
    partyFormContents,
    partyDetailsCurrent,
    guestListModalContents,
    guestListCurrent,
    extractKeyValueFromArray,
    addIntSuffix,
  });
});

app.get("/party-planning-guest-edit", (req, res) => {
  //remove the guestListCurrent element we are amending to avoid duplication
  //note this will need augmenting if we wish to allow users to 'cancel' an edit rather than always submit
  let uuidToDelete = elementForEdit.uuid;
  let elementIndex = findIndexInArray(guestListCurrent, uuidToDelete);
  let tempGuestListCurrent = removeElementFromArray(
    guestListCurrent,
    elementIndex
  );
  guestListCurrent = tempGuestListCurrent;

  res.render("partyPlanning", {
    currentYear,
    partyFormContents,
    partyDetailsCurrent,
    guestListModalContents,
    guestListCurrent,
    elementForEdit,
    extractKeyValueFromArray,
    addIntSuffix,
  });
});

app.post("/guest-edit-send-uuid", (req, res) => {
  let guestId = req.body.guestId;
  //find the specific element in guestListCurrent we wish to edit
  //note - this needs handling for errors, non-matches, etc.
  //also some acknowledgement in PR that use of attribute probably not the typical way/most secure way etc
  let elementIndex = findIndexInArray(guestListCurrent, guestId);
  elementForEdit = guestListCurrent[elementIndex];

  res.status(200).json({
    message: "Guest found for edit",
    elementForEdit: elementForEdit,
  });
});

app.post("/submit-birthdate", (req, res) => {
  let birthDate = req.body.birthDate;
  console.log("Birthdate submitted:", birthDate);
  let birthDateNumeric = new Date(req.body.birthDate);

  console.log(`your birthDate is ${birthDate}`);
  console.log(`your birthDateNumeric is ${birthDateNumeric}`);

  //note, this currently means negative ages can be supplied - we'll need to amend this functionality in future
  let ageDiff = Math.abs(currentDate - birthDateNumeric);
  let earthAge = ageDiff / (1000 * 60 * 60 * 24 * 365.25);

  //-----NEW CONTENT - temporary seperate section for upcoming birthday calculations - goal will be to refactor existing content to prevent duplicate data sources and calculations being used for planet ages etc

  //This handles if a user amends their birthdate during the same session
  planetBirthdayInfo = [];

  //iteratively generate array elements in planetBirthDays
  for (let i = 0; i < planetsData.length; i++) {
    let planetInfo = generatePlanetInfo(planetsData, i, earthAge);
    planetBirthdayInfo.push(planetInfo);
  }
  nNearestBirthdays = getClosestPlanetBirthdays(planetBirthdayInfo, 8);

  //-----ORIGINAL CONTENT BELOW
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
    nNearestBirthdays,
    addIntSuffix,
  });
});

app.post("/submit-party-details", (req, res) => {
  let partyDetailsObject = req.body;

  partyDetailsCurrent = partyDetailsObject;
  console.log(partyDetailsCurrent);

  savePartyDetails(partyDetailsCurrent);

  res.redirect("party-planning");
});

app.post("/submit-guest-list", (req, res) => {
  let guestDetails = req.body;
  let guestUUID = uuidv4();

  guestDetails["uuid"] = guestUUID;

  //this will add a new record - regardless of whether we are editing another one or not
  guestListCurrent.push(guestDetails);

  saveGuestList(guestListCurrent);

  //amended as redirect, rather than re-render required for deletion to work (lightbulb moment as I then realised should be applied elsewhere!)
  res.redirect("party-planning");
});

app.post("/delete-guest", (req, res) => {
  let myKey = req.body.recordUUID;

  let deletionIndex = findIndexInArray(guestListCurrent, myKey);

  let guestListCurrentWithDeletion = removeElementFromArray(
    guestListCurrent,
    deletionIndex
  );

  saveGuestList(guestListCurrentWithDeletion);

  res.redirect("party-planning");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
