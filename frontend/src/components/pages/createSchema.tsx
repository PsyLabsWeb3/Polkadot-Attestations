import {
  Box,
  Heading,
  Flex,
  VStack,
  Button,
  Input,
  Select,
  HStack,
  Text,
} from "@chakra-ui/react";

import Header from "../templates/Header/Header";
import Footer from "../pages/footer";

import { useState } from "react";
import { useWallet } from "../contexts/AccountContext";
import { useApi, SchemaField, SchemaData } from "../contexts/ApiContext"; // Use the context here

function CreateSchema() {
  const { selectedAccount } = useWallet();
  const { sendTransaction, api } = useApi(); // Access the API context

  const [schemaName, setSchemaName] = useState("");

  // State for managing schema fields
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([
    { name: "", data_type: "", value: "" },
  ]);

  // Add a new field to the schema
  const handleAddField = () => {
    setSchemaFields([...schemaFields, { name: "", data_type: "", value: "" }]);
  };

  // Remove the last field from the schema
  const handleRemoveLastField = () => {
    if (schemaFields.length > 1) {
      setSchemaFields(schemaFields.slice(0, -1));
    }
  };

  // Update a field in the schema
  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedFields = schemaFields.map((fieldItem, i) =>
      i === index ? { ...fieldItem, [field]: value } : fieldItem
    );
    setSchemaFields(updatedFields);
  };

  // Handler to insert a schema into the blockchain
  const handleInsertSchema = async () => {
    if (!api) {
      console.log("API not ready");
      alert("API not ready");
      return;
    }

    if (!selectedAccount) {
      console.log("Account not selected");
      alert("Account not selected");
      return;
    }

    // Map the schema fields
    const schemaData: SchemaData = {
      name: schemaName,
      fields: schemaFields,
    };

    // Send the transaction
    await sendTransaction(selectedAccount, api.tx.attestations.insertSchema, [
      schemaData,
    ]);
  };

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
          <Heading as="h2" mb={4} color="brand.black">
            Create a Schema
          </Heading>

          {/* Schema Name Input */}
          <Box mt="2rem">
            <Text fontWeight="bold" color="gray.700">
              Name
            </Text>
            <Input
              mt="2rem"
              placeholder="Schema name"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              bg="white"
              borderColor="gray.500"
              color="gray.700"
              _placeholder={{ color: "gray.500" }}
              _focus={{ borderColor: "brand.primary" }}
            />
          </Box>

          {/* Instructions */}
          <Text mb={2} fontWeight="bold" color="gray.700" marginTop={12}>
            Include fields that are essential for your schema's functionality.
          </Text>

          {/* Schema Fields */}
          <VStack mt="2rem" spacing={4} align="stretch">
            {schemaFields.map((field, index) => (
              <HStack key={index} spacing={3}>
                {/* Field Name Input */}
                <Input
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  bg="white"
                  borderColor="gray.500"
                  color="gray.700"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{ borderColor: "brand.primary" }}
                />

                {/* Field Type Select */}
                <Select
                  placeholder="Select type"
                  value={field.data_type}
                  onChange={(e) =>
                    handleFieldChange(index, "data_type", e.target.value)
                  }
                  bg="white"
                  borderColor="gray.500"
                  color="black"
                  _hover={{ bg: "brand.grayLight" }}
                  _focus={{ borderColor: "brand.primary" }}
                  sx={{
                    option: {
                      bg: "white",
                      color: "black",
                    },
                  }}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="address">Address</option>
                  <option value="bytes32">Bytes32</option>
                  <option value="cid">CID</option>
                </Select>
              </HStack>
            ))}

            {/* Add and Remove Field Buttons */}
            <HStack spacing={4} alignSelf="flex-start">
              <Button
                onClick={handleAddField}
                bg="brand.primary"
                color="white"
                _hover={{ bg: "brand.secondary" }}
                border="none"
              >
                + Add field
              </Button>
              <Button
                onClick={handleRemoveLastField}
                bg="brand.primary"
                color="white"
                _hover={{ bg: "brand.secondary" }}
                border="none"
                disabled={schemaFields.length <= 1}
              >
                - Last Field
              </Button>
            </HStack>

            {/* Submit Button */}
            <Button
              mt="2rem"
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              onClick={handleInsertSchema}
            >
              Create Schema
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

export default CreateSchema;
