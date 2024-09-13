import "./App.css";
import { MainScreen } from "./Components/MainScreen/MainScreen";
import "leaflet/dist/leaflet.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <MainScreen />
    </ChakraProvider>
  );
}

export default App;
