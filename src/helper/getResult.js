export const getResult = (randomCountry, guessedCountry, guessedCity) => {
  const countryMatch =
    randomCountry.name.common.toLowerCase() === guessedCountry.toLowerCase();
  const cityMatch =
    randomCountry.capital[0].toLowerCase() === guessedCity.toLowerCase();

  return { countryMatch, cityMatch };
};
