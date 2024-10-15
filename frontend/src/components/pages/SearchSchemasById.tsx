import { Box, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../contexts/ApiContext";

function SearchSchemasById() {
  const [schemaId, setSchemaId] = useState("");
  const { getById, isQueryLoading, api } = useApi();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (schemaId.trim() === "") {
      setErrorMessage("Please enter a valid schema ID.");
      return;
    }
    if (!api) {
      setErrorMessage("API not ready.");
      return;
    }
    try {
      const schema = await getById(
        api.query.attestations.schemas,
        Number(schemaId)
      );
      if (schema) {
        navigate(`/attest/${schemaId}`);
      } else {
        setErrorMessage("Schema not found.");
      }
    } catch (error) {
      setErrorMessage("Error fetching schema. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Text mb={2} fontWeight="bold" color="gray.700" marginTop={12}>
        Search for an existing Schema to Attest
      </Text>

      <VStack spacing={4}>
        <Input
          placeholder="Search By Schema ID"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          w="100%"
          bg="white"
          borderColor="gray.700"
          color="gray.700"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "brand.primary" }}
        />

        {errorMessage && <Box color="red.500">{errorMessage}</Box>}

        <Button
          bg="brand.primary"
          color="white"
          _hover={{ bg: "brand.secondary" }}
          w="100%"
          isLoading={isQueryLoading}
          onClick={handleSearch}
        >
          Search
        </Button>
      </VStack>
    </>
  );
}

export default SearchSchemasById;
