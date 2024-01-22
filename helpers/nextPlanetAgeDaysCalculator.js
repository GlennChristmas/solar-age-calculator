export function nextPlanetAgeDaysCalculator(age, multiples) {
  const earthDaysPerOrbit = multiples.map((multiple) => 365.25 / multiple);

  let nextAge = age.map((age) => Math.ceil(age));
  let nextAgeDiff = nextAge.map((nAge, index) => nAge - age[index]);

  let earthDaysToPlanetBirthday = nextAgeDiff.map(
    (diff, index) => diff * earthDaysPerOrbit[index]
  );

  return earthDaysToPlanetBirthday;
}
