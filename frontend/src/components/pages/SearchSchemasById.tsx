import {
  Box,
  Text,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { SearchIcon } from "@chakra-ui/icons"; // Chakra UI icon

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
        <InputGroup>
          <Input
            placeholder="Search By Schema ID"
            value={schemaId}
            onChange={(e) => setSchemaId(e.target.value)}
            w="100%"
            bg="transparent"
            zIndex={3}
            color="gray.700"
            _placeholder={{ color: "gray.500" }}
            _focus={{
              borderColor: "brand.primary",
              boxShadow: "2px 2px 2px 4px brand.primary",
              outline: "none",
            }}
            _focusVisible={{
              outline: "none",
            }}
            borderRadius="md"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Box
              bg="brand.primary"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="100%"
              w="100%"
              cursor="pointer"
              onClick={handleSearch}
              _hover={{ bg: "brand.secondary" }}
            >
              <SearchIcon color="white" />
            </Box>
          </InputRightElement>
        </InputGroup>

        {errorMessage && <Box color="red.500">{errorMessage}</Box>}
      </VStack>
    </>
  );
}

export default SearchSchemasById;
