import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react";
import {
  useApi,
  AttestationData,
  SchemaField,
  SchemaData,
} from "../contexts/ApiContext";
import { useWallet } from "../contexts/AccountContext";

type FormValues = {
  [key: string]: string | number | boolean;
};

function Attest() {
  const { id } = useParams<{ id: string }>();
  const [schema, setSchema] = useState<SchemaData | null>(null);
  const [fields, setFields] = useState<FormValues>({ subject: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { selectedAccount } = useWallet();
  const {
    getById,
    sendTransaction,
    api,
    isQueryLoading,
    isTransactionLoading,
  } = useApi();
  const isInitialized = useRef(false);

  useEffect(() => {
    const fetchSchema = async () => {
      if (!id || !api || isInitialized.current) return;

      try {
        const fetchedSchema = await getById(
          api.query.attestations.schemas,
          Number(id)
        );
        if (fetchedSchema) {
          setSchema(fetchedSchema);
          const initialValues: FormValues = { subject: "" };
          fetchedSchema.fields.forEach((field: SchemaField) => {
            initialValues[field.name] = "";
          });
          setFields(initialValues);
          isInitialized.current = true;
        } else {
          setSchema(null);
        }
      } catch (error) {
        console.error("Error fetching schema:", error);
        setErrorMessage("Failed to fetch schema.");
      }
    };

    fetchSchema();
  }, [id, api, getById]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    // Regular expression to disallow special characters and accents
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (regex.test(value)) {
      setFields((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }
  };

  const handleInsertAttestation = async () => {
    if (!api) {
      setErrorMessage("API not ready.");
      return;
    }

    if (!selectedAccount) {
      setErrorMessage("Account not selected or wallet not connected.");
      return;
    }

    // Ensure all fields are filled
    for (const key in fields) {
      if (
        fields[key] === "" ||
        fields[key] === null ||
        fields[key] === undefined
      ) {
        setErrorMessage("All fields are required.");
        return;
      }
    }

    const attestationData: SchemaField[] =
      schema?.fields.map((field) => ({
        name: field.name,
        dataType: field.dataType,
        value: fields[field.name]?.toString() || "",
      })) || [];

    const attestation: AttestationData = {
      id: "",
      schemaId: Number(id),
      subject: fields.subject as string,
      issuer: selectedAccount,
      data: attestationData,
    };

    try {
      await sendTransaction(
        selectedAccount,
        api.tx.attestations.insertAttestation,
        [attestation]
      );
      setSuccessMessage(`Transaction successful!`);
    } catch (error) {
      console.error("Error inserting attestation:", error);
      setErrorMessage(`Failed to insert attestation: ${error}`);
    }
  };

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="brand.background">
      {(errorMessage || successMessage) && !isTransactionLoading && (
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
            status={errorMessage ? "error" : "success"}
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
              {errorMessage ? "Error" : "Success"}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {errorMessage || "Attestation submitted successfully!"}
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
          {isQueryLoading ? (
            <Spinner size="xl" />
          ) : schema ? (
            <>
              <Heading as="h2" mb={6} color="brand.black">
                Attestation for Schema: {schema.name}
              </Heading>
              <Text mb={6} color="brand.gray">
                You are creating an attestation for {schema.name}. Please fill
                in the necessary fields below.
              </Text>

              {/* Generate the form dynamically based on schema fields */}
              <form>
                {/* Subject Field */}
                <FormControl mb={4} isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter subject"
                    value={fields.subject as string}
                    onChange={(e) => handleChange(e, "subject")}
                  />
                </FormControl>

                {schema.fields.map((field: SchemaField) => (
                  <FormControl key={field.name} mb={4} isRequired>
                    <FormLabel>{field.name}</FormLabel>
                    {/* Render Input or Select based on field type */}
                    {field.dataType === "string" ? (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.name}`}
                        value={fields[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.dataType === "number" ? (
                      <Input
                        type="number"
                        placeholder={`Enter ${field.name}`}
                        value={fields[field.name] as number}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.dataType === "boolean" ? (
                      <Select
                        value={fields[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                        placeholder="Select value"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Select>
                    ) : field.dataType === "address" ||
                      field.dataType === "cid" ? (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.name}`}
                        value={fields[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.dataType === "bytes32" ? (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.name} (32-byte string)`}
                        value={fields[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : null}
                  </FormControl>
                ))}

                {/* Button to submit the form */}
                <Button
                  mt="2rem"
                  bg="brand.primary"
                  color="white"
                  w={{ base: "100%", md: "300px" }}
                  _hover={{ bg: "brand.secondary" }}
                  border="none"
                  onClick={handleInsertAttestation}
                  isDisabled={isTransactionLoading}
                  leftIcon={
                    isTransactionLoading ? <Spinner size="sm" /> : undefined
                  }
                >
                  Submit Attestation
                </Button>
              </form>
            </>
          ) : (
            <Text>Loading schema...</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Attest;
