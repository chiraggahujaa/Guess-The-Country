import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
};

export const DisplayMap = (props) => {
  const { randomCountry } = props;

  return (
    <Box
      p={2}
      border="1px"
      borderColor="gray.200"
      height={"85vh"}
      width={"85vw"}
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
  );
};
