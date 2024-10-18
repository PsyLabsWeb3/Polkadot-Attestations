import "./App.css";

import Home from "./components/pages/Home"; // Home page component
import SearchSchemasById from "./components/pages/SearchById"; // Schemas page component
import SelectSchemaToAttest from "./components/pages/SelectSchemaToAttest"; // Attestations page component
import CreateSchema from "./components/pages/createSchema"; // Create Schema page component
import Scan from "./components/pages/scan"; // Scan page component
import Attest from "./components/pages/Attest"; // Make Attestation page component
import UserDashboard from "./components/pages/UserDashboard"; // User Dashboard page component
import { ChakraProvider, Flex } from "@chakra-ui/react"; // ChakraProvider imported for Chakra UI
import theme from "./theme/theme"; // Importing custom theme

// Import react-router-dom to manage routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Wrapping the content inside ChakraProvider for Chakra UI */}
      <Router>
        {/* Adding Router to handle route management */}
        <Flex w="100%" h="100%">
          <Routes>
            {/* Route for Home page */}
            <Route path="/" element={<Home />} />
            {/* Route for Create Schema page */}
            <Route path="/create-schema" element={<CreateSchema />} />
            {/* Route for Scan page */}
            <Route path="/scan" element={<Scan />} />
            {/* Route for SelectSchemaToAttest page */}
            <Route path="/attest" element={<SelectSchemaToAttest />} />
            {/* Route for Attest page */}
            <Route path="/attest/:id" element={<Attest />} />
            {/* Route for User Dashboard page */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
