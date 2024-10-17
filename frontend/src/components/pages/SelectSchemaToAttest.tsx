import { Box, Heading, Flex, VStack, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../templates/Header/Header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { SchemaData, useApi } from "../contexts/ApiContext";
import { useWallet } from "../contexts/AccountContext";
import { decodeAddress } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import SearchSchemasById from "./SearchSchemasById";

function SelectSchemaToAttest() {
  const [schemasList, setSchemasList] = useState<SchemaData[]>([]);
  const [hasFetchedSchemas, setHasFetchedSchemas] = useState(false);

  const { getAllByIssuer, isQueryLoading, api } = useApi();
  const { selectedAccount } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    setHasFetchedSchemas(false);
  }, [selectedAccount]);

  useEffect(() => {
    const fetchSchemas = async () => {
      if (api && selectedAccount) {
        try {
          const hexAccount = u8aToHex(decodeAddress(selectedAccount));
          const schemas = await getAllByIssuer(
            api.query.attestations.schemas.entries,
            hexAccount
          );
          setSchemasList(schemas);
          setHasFetchedSchemas(true);
        } catch (error) {
          console.error("Error fetching schemas:", error);
        }
      }
    };

    if (!hasFetchedSchemas) {
      fetchSchemas();
    }
  }, [api, getAllByIssuer, hasFetchedSchemas, selectedAccount]);

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      bg="brand.background"
      color="brand.black"
    >
      {/* Header section */}
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

          {/* Display loading message while schemas are being fetched */}
          {isQueryLoading ? (
            <Text>Loading schemas...</Text>
          ) : (
            <VStack spacing={4} w="100%">
              {/* Display the list of available schemas */}
              {schemasList?.length > 0 ? (
                schemasList?.map((schema: SchemaData) => (
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
                    <Text fontWeight="bold">{schema.name}</Text>
                  </Box>
                ))
              ) : (
                <Text>No schemas found</Text> // Message if no schemas are found
              )}
            </VStack>
          )}

          {/* Component for searching schemas by ID */}
          <SearchSchemasById />

          {/* Button to navigate to the page for creating a new schema */}
          <Button
            mt={8}
            bg="brand.primary"
            color="white"
            _hover={{ bg: "brand.secondary" }}
            border="none"
            w={"100%"}
            onClick={() => navigate("/create-schema")}
          >
            Create a New Schema to Attest
          </Button>
        </Box>
      </Flex>

      {/* Footer section */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default SelectSchemaToAttest;
