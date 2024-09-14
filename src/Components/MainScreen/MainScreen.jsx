import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./MainScreen.css";
import axios from "axios";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { DisplayMap } from "../Map/DisplayMap";
import { useShowToast } from "../../helper/showToast";
import { getResult } from "../../helper/getResult";

export const MainScreen = () => {
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [guessedCountry, setGuessedCountry] = useState("");
  const [guessedCapital, setGuessedCapital] = useState("");
  const [trailsLeft, setTrailsLeft] = useState(3);
  const showToast = useShowToast();

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
      if (res.data.length > 0) {
        changeCountry(res.data);
      }
    });
  }, []);

  const changeCountry = (countriesList) => {
    const rand = Math.random();
    const index = Math.floor(rand * countriesList.length);
    setRandomCountry(countriesList[index]);
    setCountries((countries) => {
      const newCountries = [...countries];
      newCountries.splice(index, 1);
      return newCountries;
    });

    console.log("countriesList[index]", countriesList[index]);
    clearInput();
  };

  const handleGuessedCountryInputChange = (e) => {
    setGuessedCountry(e.target.value);
  };

  const handleGuessedCapitalInputChange = (e) => {
    setGuessedCapital(e.target.value);
  };

  const onSubmit = () => {
    const { countryMatch, cityMatch } = getResult(
      randomCountry,
      guessedCountry,
      guessedCapital
    );

    if (countryMatch && cityMatch) {
      showToast(
        "Correct!",
        "You guessed both the country and the capital correctly.",
        "success",
        10000,
        true
      );
      setTrailsLeft(3);
      if (countries.length > 0) {
        changeCountry(countries);
      } else {
        showToast("Game Over", "No more countries left!", "info", 3000, true);
      }
    } else if (countryMatch) {
      setTrailsLeft((prev) => prev - 1);
      if (trailsCheck()) {
        showToast(
          "Almost there!",
          "You guessed the country correctly but the capital is incorrect.",
          "warning",
          10000,
          true
        );
      }
    } else if (cityMatch) {
      setTrailsLeft((prev) => prev - 1);
      if (trailsCheck()) {
        showToast(
          "Almost there!",
          "You guessed the capital correctly but the country is incorrect.",
          "warning",
          10000,
          true
        );
      }
    } else {
      setTrailsLeft((prev) => prev - 1);
      if (trailsCheck()) {
        showToast(
          "Incorrect",
          `You have ${trailsLeft} trails left.`,
          "warning",
          10000,
          true
        );
      }
    }
  };

  const clearInput = () => {
    setGuessedCountry("");
    setGuessedCapital("");
  };

  const trailsCheck = () => {
    if (trailsLeft <= 0) {
      changeCountry(countries);
      showToast(
        "Wrong",
        "You have no trails left. Moving to the next country.",
        "error",
        10000,
        true
      );
      setTrailsLeft(3);
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <div className="mr-2">
          Random Country : {randomCountry?.name?.common},
        </div>
        <div className="mr-2">Random Capital : {randomCountry?.capital[0]}</div>
        <div>Trails : {trailsLeft}</div>
      </div>
      <div className="flex flex-col p-2 items-center">
        <div className="p-2 flex">
          <Input
            placeholder="Guess the country ..."
            value={guessedCountry}
            onChange={handleGuessedCountryInputChange}
            width="30vw"
            className="mr-2"
          />
          <Input
            placeholder="Guess the capital ..."
            value={guessedCapital}
            onChange={handleGuessedCapitalInputChange}
            width="30vw"
          />
        </div>
        <Button colorScheme="blue" size="md" onClick={onSubmit} width="15vw">
          Submit
        </Button>
      </div>
      <DisplayMap randomCountry={randomCountry} />
    </div>
  );
};
