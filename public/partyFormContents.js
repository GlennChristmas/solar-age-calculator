export const partyFormContents = [
  {
    name: "partyLocation",
    questionTitle: "Where will your party take place?",
    halfWidth: false,
  },
  {
    name: "partyDate",
    questionTitle: "What date?",
    halfWidth: true,
  },
  {
    name: "partyTime",
    questionTitle: "What time?",
    halfWidth: true,
  },
  {
    name: "partyCusine",
    questionTitle: "Pick your cuisine",
    halfWidth: false,
    dropDownOptions: [
      "Italian",
      "Mexican",
      "Indian",
      "Chinese",
      "Japanese",
      "Korean",
    ],
  },
  {
    name: "partyTheme",
    questionTitle: "Pick your party theme",
    halfWidth: false,
    dropDownOptions: [
      "Star Wars",
      "Star Trek",
      "Hitchhiker's Guide",
      "War of the Worlds",
    ],
  },
  {
    name: "partyGame",
    questionTitle: "Pick your party game",
    halfWidth: false,
    dropDownOptions: ["Pass the parcel", "Duck duck goose", "Spin the bottle"],
  },
];
