import { useState } from "react";
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
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Header from "../templates/Header/Header";
import Footer from "../pages/footer";
import { useWallet } from "../contexts/AccountContext";
import { useApi, SchemaField, SchemaData } from "../contexts/ApiContext";

function CreateSchema() {
  const { selectedAccount } = useWallet();
  const { sendTransaction, api, isTransactionLoading } = useApi();

  const [schemaName, setSchemaName] = useState("");
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([
    { name: "", dataType: "", value: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddField = () => {
    setSchemaFields([...schemaFields, { name: "", dataType: "", value: "" }]);
  };

  const handleRemoveLastField = () => {
    if (schemaFields.length > 1) {
      setSchemaFields(schemaFields.slice(0, -1));
    }
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedFields = schemaFields.map((fieldItem, i) =>
      i === index ? { ...fieldItem, [field]: value } : fieldItem
    );
    setSchemaFields(updatedFields);
  };

  const handleInsertSchema = async () => {
    if (!api) {
      setErrorMessage("API not ready.");
      return;
    }

    if (!selectedAccount) {
      setErrorMessage("Account not selected or wallet not connected.");
      return;
    }

    const schemaData: SchemaData = {
      name: schemaName,
      fields: schemaFields,
    };

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await sendTransaction(selectedAccount, api.tx.attestations.insertSchema, [
        schemaData,
      ]);
      setSuccessMessage(`Transaction successful!`);
    } catch (error) {
      console.error("Error inserting schema:", error);
      setErrorMessage(`Failed to insert schema: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      bg="brand.background"
      color="brand.black"
    >
      <Box w="100%">
        <Header />
      </Box>

      {(error || successMessage) && !isTransactionLoading && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          justify="center"
          align="center"
          zIndex="9999"
        >
          <Alert
            status={error ? "error" : "success"}
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            width="400px"
            borderRadius="md"
            boxShadow="lg"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {error ? "Error" : "Success"}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {error || successMessage}
            </AlertDescription>
            <Button
              mt={4}
              onClick={() => {
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
            >
              Close
            </Button>
          </Alert>
        </Flex>
      )}

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

          <Text mb={2} fontWeight="bold" color="gray.700" marginTop={12}>
            Include fields that are essential for your schema's functionality.
          </Text>

          <VStack mt="2rem" spacing={4} align="stretch">
            {schemaFields.map((field, index) => (
              <HStack key={index} spacing={3}>
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
                <Select
                  placeholder="Select type"
                  value={field.dataType}
                  onChange={(e) =>
                    handleFieldChange(index, "dataType", e.target.value)
                  }
                  bg="white"
                  borderColor="gray.500"
                  color="black"
                  _hover={{ bg: "brand.grayLight" }}
                  _focus={{ borderColor: "brand.primary" }}
                  sx={{ option: { bg: "white", color: "black" } }}
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

            <Button
              mt="2rem"
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              onClick={handleInsertSchema}
              isDisabled={isSubmitting || isTransactionLoading}
              leftIcon={
                isSubmitting || isTransactionLoading ? (
                  <Spinner size="sm" />
                ) : undefined
              }
            >
              Create Schema
            </Button>
          </VStack>
        </Box>
      </Flex>

      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default CreateSchema;
