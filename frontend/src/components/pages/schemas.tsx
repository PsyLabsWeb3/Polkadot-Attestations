import { Box, Heading, Flex, VStack, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../templates/Header/Header";
import Footer from "../pages/footer";
import { useState } from "react";

function Schemas() {
  const [schemaName, setSchemaName] = useState(""); // State to capture the schema name input

  // Hook for redirection
  const navigate = useNavigate();

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="brand.background">
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Main Content */}
      <Flex justify="center" alignItems="center" flex="1" p={5}>
        <Box
          w="100%"
          maxW="600px"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          {/* Title */}
          <Heading as="h2" mb={6} color="brand.black">
            Search for an existing Schema to Attest
          </Heading>

          {/* Schema Search Form */}
          <VStack spacing={4}>
            <Input
              placeholder="Search By ID" // Placeholder for schema search by ID
              value={schemaName} // Controlled input for schema name
              onChange={(e) => setSchemaName(e.target.value)} // Update state on input change
              w="100%"
              bg="white"
              borderColor="gray.700"
              color="gray.700"
              _placeholder={{ color: "gray.500" }}
              _focus={{ borderColor: "brand.primary" }}
            />
            {/* Button to navigate to create a new schema */}
            <Button
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              w="100%"
              onClick={() => navigate("/create-schema")}
            >
              Create New Schema
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Schemas;
