import { convertTimestampToDateString } from "../src/convertTimestampToDateString.js";

export const generatePlanetInfo = function (planetsData, i, earthAge) {
  let milisecondsInADay = 24 * 60 * 60 * 1000;
  let currentTimestamp = new Date().getTime();

  let planetName = planetsData[i].name;
  let planetEarthAgeMultiple = planetsData[i].earthAgeMultiple;
  let planetAge = planetsData[i].earthAgeMultiple * earthAge;
  let planetAgeFloor = Math.floor(planetAge);
  let planetAgeCeiling = Math.ceil(planetAge);

  //calculate earth days until birthday
  let percOfPlanetYearFromBirthday = planetAgeCeiling - planetAge;
  let timeToBirthday =
    (percOfPlanetYearFromBirthday / planetEarthAgeMultiple) *
    365.25 *
    milisecondsInADay;
  //additional day added to correct off-by-one errors (may want to develop a more intuitive fix)
  let nextBirthdayTimestamp =
    currentTimestamp + timeToBirthday + milisecondsInADay;

  let planetInfo = {
    name: planetName,
    planetAge: planetAgeFloor,
    nextBirthdayTimestamp: nextBirthdayTimestamp,
    nextBirthdayString: convertTimestampToDateString(nextBirthdayTimestamp),
  };

  return planetInfo;
};
