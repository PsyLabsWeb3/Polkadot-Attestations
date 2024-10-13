import "./App.css";

import Home from "./components/pages/Home"; // Home page component
import Schemas from "./components/pages/schemas"; // Schemas page component
import Attestations from "./components/pages/attestations"; // Attestations page component
import CreateSchema from "./components/pages/createSchema"; // Create Schema page component
import Scan from "./components/pages/scan"; // Scan page component
import MakeAttestation from "./components/pages/makeattestation"; // Make Attestation page component
import UserDashboard from "./components/pages/userdashboard"; // User Dashboard page component
import { ChakraProvider, Flex } from "@chakra-ui/react"; // ChakraProvider imported for Chakra UI
import theme from "./theme/theme"; // Importing custom theme

// Import react-router-dom to manage routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      {" "}
      {/* Wrapping the content inside ChakraProvider for Chakra UI */}
      <Router>
        {" "}
        {/* Adding Router to handle route management */}
        <Flex w="100%" h="100%">
          <Routes>
            {" "}
            {/* Defining the routes here */}
            <Route path="/" element={<Home />} /> {/* Route for Home page */}
            <Route path="/schemas" element={<Schemas />} />{" "}
            {/* Route for Schemas page */}
            <Route path="/attestations" element={<Attestations />} />{" "}
            {/* Route for Attestations page */}
            <Route path="/create-schema" element={<CreateSchema />} />{" "}
            {/* Route for Create Schema page */}
            <Route path="/scan" element={<Scan />} />{" "}
            {/* Route for Scan page */}
            <Route path="/makeattestation" element={<MakeAttestation />} />{" "}
            {/* Route for Make Attestation page */}
            <Route path="/userdashboard" element={<UserDashboard />} />{" "}
            {/* Route for User Dashboard page */}
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
