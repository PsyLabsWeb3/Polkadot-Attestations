import { Box, Heading, Flex, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Divider } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Header from "../templates/Header/Header"; // Asegúrate de la ruta correcta
import Footer from "../pages/footer"; // Asegúrate de la ruta correcta
import { useState } from "react";

function Attestations() {
  const [schemasList, setSchemasList] = useState([]); // Lista de schemas creados
  const [attestationsList, setAttestationsList] = useState([]); // Lista de attestations (historial)

  // Hook para redirigir
  const navigate = useNavigate();

  // Cargar schemas y attestations
  const loadSchemas = () => {
    setSchemasList(["Schema 1", "Schema 2", "Schema 3"]); // Simulación de schemas
  };

  const loadAttestations = () => {
    setAttestationsList([
      { id: 1, schema: "#234", owner: "aDbjks35dns...", timestamp: "2024-08-21 18:42:05 UTC" },
      { id: 2, schema: "#235", owner: "bKjdsksjdl9...", timestamp: "2024-08-22 11:15:22 UTC" },
    ]); // Simulación del historial de attestations
  };

  // Cargar datos al montar el componente
  useState(() => {
    loadSchemas();
    loadAttestations();
  }, []);

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="gray.50">
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Contenido principal de Attestations */}
      <Flex justify="center" align="center" flex="1" direction="column" p={5}>
        {/* Título */}
        <Heading as="h2" mb={6}>
          Choose your schema to attest
        </Heading>

        {/* Listado de schemas */}
        <VStack spacing={4} w="100%" maxW="600px">
          {schemasList.length > 0 ? (
            schemasList.map((schema, index) => (
              <Box
                key={index}
                p={4}
                w="100%"
                bg="white"
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                {schema}
              </Box>
            ))
          ) : (
            <p>No schemas available</p>
          )}
        </VStack>

        {/* Botón para crear un nuevo schema */}
        <Button
          mt={8}
          bg="brand.primary"
          color="white"
          _hover={{ bg: "brand.secondary" }}
          border="none"
          w={{ base: "90%", md: "300px" }}
          onClick={() => navigate("/createschema")} // Redirige a la página CreateSchema
        >
          Create a New Schema to Attest
        </Button>

        {/* Divider más angosto y de color morado */}
        <Divider
          mt={12}
          w={{ base: "70%", md: "40%" }} // Ajuste de ancho responsivo
          borderWidth="2px"
          borderColor="brand.secondary" // Tu color morado
          mx="auto"
        />

        {/* Historial de attestations */}
        <Heading as="h3" mt={10} mb={6}>
          Attestation History
        </Heading>

        {/* Tabla de historial de attestations */}
        <Box w="80%" bg="white" borderRadius="8px" boxShadow="lg" p="1rem">
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg="pink.500">
                <Th color="white" textAlign="center">ID</Th>
                <Th color="white" textAlign="center">Schema</Th>
                <Th color="white" textAlign="center">Owner Address</Th>
                <Th color="white" textAlign="center">Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attestationsList.length > 0 ? (
                attestationsList.map((attestation) => (
                  <Tr key={attestation.id}>
                    <Td textAlign="center">{attestation.id}</Td>
                    <Td textAlign="center">{attestation.schema}</Td>
                    <Td textAlign="center">{attestation.owner}</Td>
                    <Td textAlign="center">{attestation.timestamp}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} textAlign="center">No attestations found</Td>
                </Tr>
              )}
            </Tbody>
          </Table>

          {/* Paginación */}
          <Flex justifyContent="center" alignItems="center" mt="1.5rem">
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              isRound
              variant="ghost"
              sx={{
                color: "#7204FF",  // Color morado
                _hover: { bg: "#FF2670", color: "white" },  // Hover rosa
              }}
            />
            <Box mx="1rem" color="gray.500">
              Page 1 - 37
            </Box>
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              isRound
              variant="ghost"
              sx={{
                color: "#7204FF",  // Color morado
                _hover: { bg: "#FF2670", color: "white" },  // Hover rosa
              }}
            />
          </Flex>
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
