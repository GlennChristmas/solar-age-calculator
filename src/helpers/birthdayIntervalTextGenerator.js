export function birthdayIntervalTextGeneratorHelper(days) {
  let birthdayInterval, birthdayIntervalMessage;

  if (days < 7) {
    birthdayInterval = "days";
    birthdayIntervalMessage = "Better stock up on snacks and party hats!";
  } else if (days >= 7 && days < 31) {
    birthdayInterval = "weeks";
    birthdayIntervalMessage = "Better send the RSVPs out!";
  } else if (days >= 31 && days < 365) {
    birthdayInterval = "months";
    birthdayIntervalMessage = "Relax, you've got time to plan your party!";
  } else if (days >= 365 && days < 3650) {
    birthdayInterval = "years";
    birthdayIntervalMessage =
      "You've got a while to wait until your next party.";
  } else if (days > 3650) {
    birthdayInterval = "over a decade";
    birthdayIntervalMessage = "A lot could change before your next birthday.";
  }

  return { birthdayInterval, birthdayIntervalMessage };
}

//apply the above with map (using birthdayIntervalTextGenerator as a helper function)

export function birthdayIntervalTextGenerator(daysArray) {
  let intervals = [];
  let messages = [];

  daysArray.forEach((days) => {
    const { birthdayInterval, birthdayIntervalMessage } =
      birthdayIntervalTextGeneratorHelper(days);
    intervals.push(birthdayInterval);
    messages.push(birthdayIntervalMessage);
  });

  return { intervals, messages };
}
