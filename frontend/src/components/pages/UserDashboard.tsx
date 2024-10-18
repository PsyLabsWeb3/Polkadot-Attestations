import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../templates/Header/Header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { useWallet } from "../contexts/AccountContext";
import { AttestationData, SchemaData, useApi } from "../contexts/ApiContext";
import { decodeAddress } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [schemas, setSchemas] = useState<SchemaData[]>([]);
  const [hasFetchedSchemas, setHasFetchedSchemas] = useState(false);
  const [attestations, setAttestations] = useState<AttestationData[]>([]);
  const [hasFetchedAttestations, setHasFetchedAttestations] = useState(false);

  const { getAllByIssuer, api } = useApi();
  const { selectedAccount } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    setHasFetchedSchemas(false);
    setHasFetchedAttestations(false);
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
          setSchemas(schemas);
          setHasFetchedSchemas(true);
        } catch (error) {
          console.error("Error fetching schemas:", error);
        }
      }
    };

    const fetchAttestations = async () => {
      if (api && selectedAccount) {
        try {
          const hexAccount = u8aToHex(decodeAddress(selectedAccount));
          const attestations = await getAllByIssuer(
            api.query.attestations.attestations.entries,
            hexAccount
          );
          setAttestations(attestations);
          setHasFetchedAttestations(true);
        } catch (error) {
          console.error("Error fetching attestations:", error);
        }
      }
    };

    if (!hasFetchedSchemas) {
      fetchSchemas();
    }
    if (!hasFetchedAttestations) {
      fetchAttestations();
    }
  }, [
    api,
    getAllByIssuer,
    hasFetchedSchemas,
    hasFetchedAttestations,
    selectedAccount,
  ]);

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="gray.50">
      <Header />

      <Flex justify="space-evenly" alignItems="center" flex="1" p={10} w="100%">
        <Box
          w="45%"
          bg="white"
          borderRadius="lg"
          p={6}
          boxShadow="md"
          textAlign="center"
        >
          <Heading as="h2" mb={6}>
            My Schemas
          </Heading>
          {schemas.length > 0 ? (
            schemas.map((schema, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold">{schema.name}</Text>
                <Text>Fields: {schema.fields.length}</Text>
              </Box>
            ))
          ) : (
            <Text mb={4}>
              Here you will find your created schemas. You can use the ID to
              create attestations based on them.
            </Text>
          )}
          <Button
            bg="brand.primary"
            color="white"
            _hover={{ bg: "brand.secondary" }}
            border="none"
            onClick={() => navigate("/create-schema")}
          >
            Create New Schema
          </Button>
        </Box>

        <Box
          w="45%"
          bg="white"
          borderRadius="lg"
          p={6}
          boxShadow="md"
          textAlign="center"
        >
          <Heading as="h2" mb={6}>
            My Attestations
          </Heading>
          {attestations.length > 0 ? (
            attestations.map((attestation, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold">Schema ID: {attestation.schemaId}</Text>
                <Text>Fields: {attestation.data.length}</Text>
              </Box>
            ))
          ) : (
            <Text mb={4}>
              Here you will find your created attestations. You can register new
              ones and leave a record of your data.
            </Text>
          )}
          <Button
            bg="brand.primary"
            color="white"
            _hover={{ bg: "brand.secondary" }}
            border="none"
            onClick={() => navigate("/attest")}
          >
            Make New Attestation
          </Button>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
}

export default UserDashboard;
