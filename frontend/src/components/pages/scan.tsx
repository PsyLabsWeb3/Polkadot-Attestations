import {
  Box,
  Heading,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import Header from "../templates/Header/Header";
import Footer from "../pages/footer";
import SearchById, { SearchType } from "../../components/pages/SearchById";
import { useEffect, useState } from "react";
import { useWallet } from "../contexts/AccountContext";
import { AttestationData, SchemaData, useApi } from "../contexts/ApiContext";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";

function Scan() {
  const { formatAccount } = useWallet();

  const [schemas, setSchemas] = useState<SchemaData[]>([]);
  const [hasFetchedSchemas, setHasFetchedSchemas] = useState(false);
  const [attestations, setAttestations] = useState<AttestationData[]>([]);
  const [hasFetchedAttestations, setHasFetchedAttestations] = useState(false);
  const { getAll, api } = useApi();

  useEffect(() => {
    setHasFetchedSchemas(false);
    setHasFetchedAttestations(false);
  }, []);

  useEffect(() => {
    const fetchSchemas = async () => {
      if (api) {
        try {
          const schemas = await getAll(api.query.attestations.schemas.entries);
          setSchemas(schemas);
          setHasFetchedSchemas(true);
        } catch (error) {
          console.error("Error fetching schemas:", error);
        }
      }
    };

    const fetchAttestations = async () => {
      if (api) {
        try {
          const attestations = await getAll(
            api.query.attestations.attestations.entries
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
  }, [api, hasFetchedSchemas, hasFetchedAttestations]);

  const handleAttestationSearchResult = (result: any) => {
    if (result) {
      setAttestations([result]);
    } else {
      setAttestations(attestations);
    }
  };

  const handleSchemaSearchResult = (result: any) => {
    if (result) {
      setSchemas([result]);
    } else {
      setSchemas(schemas);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="brand.background">
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Main Content with Tabs */}
      <Flex justify="center" flex="1" p={10} gap={10} wrap="wrap">
        <Box
          w={{ base: "100%", md: "90%" }}
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="pink"
            sx={{
              ".chakra-tabs__tab:focus": {
                outline: "none",
              },
            }}
          >
            <TabList>
              <Tab>Schemas</Tab>
              <Tab>Attestations</Tab>
            </TabList>
            <TabPanels>
              {/* Schemas Tab */}
              <TabPanel>
                <Heading as="h3" mb={4} color="brand.black">
                  Schemas
                </Heading>
                {/* Search Schemas */}
                <SearchById
                  searchType={SearchType.SCHEMA}
                  onSearchResult={handleSchemaSearchResult}
                />
                {/* Schemas Table */}
                <Box overflowX="auto">
                  <Table variant="simple" size="md" mt={4} minWidth="600px">
                    <Thead bg="pink.500">
                      <Tr>
                        <Th color="white" textAlign="center" width="10%">
                          ID
                        </Th>
                        <Th color="white" textAlign="center" width="30%">
                          Name
                        </Th>
                        <Th color="white" textAlign="center" width="30%">
                          Issuer
                        </Th>
                        <Th color="white" textAlign="center" width="20%">
                          Number of Fields
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {schemas.map((schema) => (
                        <Tr key={schema.id}>
                          <Td textAlign="center">{schema.id}</Td>
                          <Td textAlign="center" whiteSpace="nowrap">
                            {formatAccount(
                              encodeAddress(decodeAddress(schema.issuer))
                            )}
                            <IconButton
                              aria-label="Copy Issuer Address"
                              icon={<CopyIcon />}
                              size="xs"
                              ml={2}
                              onClick={() =>
                                copyToClipboard(
                                  encodeAddress(decodeAddress(schema.issuer))
                                )
                              }
                            />
                          </Td>
                          <Td textAlign="center">{schema.name}</Td>
                          <Td textAlign="center">{schema.fields.length}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Attestations Tab */}
              <TabPanel>
                <Heading as="h3" mb={4} color="brand.black">
                  Attestations
                </Heading>
                {/* Search Attestations */}
                <SearchById
                  searchType={SearchType.ATTESTATION}
                  onSearchResult={handleAttestationSearchResult}
                />
                {/* Attestations Table */}
                <Box overflowX="auto">
                  <Table variant="simple" size="md" mt={4} minWidth="600px">
                    <Thead bg="pink.500">
                      <Tr>
                        <Th color="white" textAlign="center" width="10%">
                          ID
                        </Th>
                        <Th color="white" textAlign="center" width="20%">
                          Schema ID
                        </Th>
                        <Th color="white" textAlign="center" width="20%">
                          Subject
                        </Th>
                        <Th color="white" textAlign="center" width="30%">
                          Issuer
                        </Th>
                        <Th color="white" textAlign="center" width="20%">
                          Number of Fields
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {attestations.map((attestation) => (
                        <Tr key={attestation.id}>
                          <Td textAlign="center">{attestation.id}</Td>
                          <Td textAlign="center">{attestation.schemaId}</Td>
                          <Td textAlign="center">{attestation.subject}</Td>
                          <Td textAlign="center" whiteSpace="nowrap">
                            {formatAccount(
                              encodeAddress(decodeAddress(attestation.issuer))
                            )}
                            <IconButton
                              aria-label="Copy Issuer Address"
                              icon={<CopyIcon />}
                              size="xs"
                              ml={2}
                              onClick={() =>
                                copyToClipboard(
                                  encodeAddress(
                                    decodeAddress(attestation.issuer)
                                  )
                                )
                              }
                            />
                          </Td>
                          <Td textAlign="center">{attestation.data.length}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Scan;
