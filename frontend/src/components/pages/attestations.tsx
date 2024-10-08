import { Box, Heading, Flex, VStack, Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import Header from "../templates/Header/Header";
import Footer from "../pages/footer";
import { useEffect, useState } from "react";
import { getSchemas } from "../../mocks/getSchemas";

export type Field = {
  name: string;
  type: string;
  isArray: boolean;
  description: string;
  format?: string;
};

export type Schema = {
  id: string;
  name: string;
  fields: Field[];
  resolverAddress: string;
  isRevocable: boolean;
};

function Attestations() {
  const [schemasList, setSchemasList] = useState<Schema[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setSchemasList(getSchemas());
  }, []);

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      bg="brand.background"
      color="brand.black"
    >
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Main content */}
      <Flex
        justify="center"
        alignItems="center"
        flex="1"
        direction="column"
        p={5}
      >
        <Box
          w="100%"
          maxW="600px"
          textAlign="center"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h2" mb={6} color="brand.black">
            Choose your schema to attest
          </Heading>

          {/* List of schemas */}
          <VStack spacing={4} w="100%">
            {schemasList.map((schema: any) => (
              <Box
                key={schema.id}
                w="100%"
                p={4}
                bg="white"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                color="brand.black"
                _hover={{ bg: "brand.grayLight", cursor: "pointer" }}
                onClick={() => navigate(`/attest/${schema.id}`)}
              >
                {schema.name}
              </Box>
            ))}
          </VStack>

          {/* Button to create a new schema */}
          <Button
            mt={8}
            bg="brand.primary"
            color="white"
            _hover={{ bg: "brand.secondary" }}
            border="none"
            w={{ base: "100%", md: "300px" }}
            onClick={() => navigate("/createschema")} // Navigate to /createschema on click
          >
            Create a New Schema to Attest
          </Button>
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Attestations;
