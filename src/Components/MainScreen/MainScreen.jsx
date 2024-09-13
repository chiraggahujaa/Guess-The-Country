import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./MainScreen.css";
import axios from "axios";
import { Box, Button, Input } from "@chakra-ui/react";

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
};

export const MainScreen = () => {
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [guessedCountry, setGuessedCountry] = useState("");
  const [guessedCapital, setGuessedCapital] = useState("");
  const [noOfTrails, setNoOfTrails] = useState(0);

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
  };

  const handleGuessedCountryInputChange = (e) => {
    setGuessedCountry(e.target.value);
  };

  const handleGuessedCapitalInputChange = (e) => {
    setGuessedCapital(e.target.value);
  };

  const onSubmit = () => {
    if (
      guessedCountry.toLowerCase() === randomCountry?.name.common.toLowerCase()
    ) {
      alert("Correct!");
      if (countries.length > 0) {
        changeCountry(countries);
      } else {
        alert("No more countries left!");
      }
    } else {
      setNoOfTrails((prev) => prev + 1);
      if(noOfTrails < 3)
        alert(`Incorrect! You have ${3 - noOfTrails} trails left.`);
      else{
        changeCountry(countries);
        alert("Wrong");
      }      
      
    }
  };

  return (
    <div>
      <Box>Random Country : {randomCountry?.name?.common}</Box>
      <Box>Random Country : {randomCountry?.capital[0]}</Box>
      <Input
        placeholder="Guess the country ..."
        value={guessedCountry}
        onChange={handleGuessedCountryInputChange}
        width="800px"
      />
      <Input
        placeholder="Guess the capital ..."
        value={guessedCapital}
        onChange={handleGuessedCapitalInputChange}
        width="800px"
      />
      <Button colorScheme="blue" size="md" onClick={onSubmit}>
        Submit
      </Button>
      <Box
        p={2}
        border="1px"
        borderColor="gray.200"
        height={"90vh"}
        width={"90vw"}
        overflow="hidden"
      >
        <MapContainer
          center={randomCountry?.capitalInfo?.latlng || [0, 0]}
          zoom={13}
        >
          <MapUpdater center={randomCountry?.capitalInfo?.latlng || [0, 0]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          />
          {randomCountry?.capitalInfo?.latlng && (
            <Marker position={randomCountry.capitalInfo.latlng}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>
    </div>
  );
};
