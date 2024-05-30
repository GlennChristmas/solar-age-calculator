export function getClosestPlanetBirthdays(planetInfo, n) {
  let sortedPlanets = planetInfo.sort(
    (a, b) => a.nextBirthdayTimestamp - b.nextBirthdayTimestamp
  );

  let filteredPlanets = sortedPlanets.slice(0, n);

  return filteredPlanets;
}
