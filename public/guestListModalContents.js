export const guestListModalContents = [
  {
    name: "firstName",
    questionTitle: "First Name",
    halfWidth: true,
  },
  {
    name: "lastName",
    questionTitle: "Last Name",
    halfWidth: true,
  },
  {
    name: "email",
    questionTitle: "Email Address",
    halfWidth: false,
  },
  {
    name: "dietaryRequirements",
    questionTitle: "Dietary Requirements",
    halfWidth: false,
    dropDownOptions: ["None", "Vegetarian", "Vegan"],
  },
  {
    name: "allergies",
    questionTitle: "Allergies (please separate these out by commas)",
    halfWidth: false,
  },
  {
    name: "drinksAlcohol",
    questionTitle: "Do they drink alcohol?",
    halfWidth: false,
    dropDownOptions: ["Yes", "No"],
  },
  {
    name: "accessibilityRequirements",
    questionTitle: "Accessibility requirements (please separate out by commas)",
    halfWidth: false,
  },
  {
    name: "plusOne",
    questionTitle: "Will they bring a plus one?",
    halfWidth: false,
    dropDownOptions: ["Yes", "No"],
  },
  {
    name: "otherNotes",
    questionTitle: "Any other notes",
    halfWidth: false,
  },
];
