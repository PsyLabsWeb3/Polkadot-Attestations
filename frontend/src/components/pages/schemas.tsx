import { Box, Heading, Flex, VStack, Button, Input, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import Header from "../templates/Header/Header"; // Asegúrate de que la ruta sea correcta
import Footer from "../pages/footer"; // Asegúrate de que la ruta sea correcta
import { useState } from "react";

function Schemas() {
  const [schemaName, setSchemaName] = useState(""); // Para capturar el nombre del esquema
  const [schemasList, setSchemasList] = useState([]); // Lista de schemas creados

  // Hook para redirigir
  const navigate = useNavigate();

  // Manejador para el envío de un nuevo esquema
  const handleCreateSchema = () => {
    if (schemaName) {
      setSchemasList([...schemasList, schemaName]); // Simula el guardado del schema
      setSchemaName(""); // Resetea el input
    }
  };

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="gray.50">
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Contenido principal de Schemas */}
      <Flex justify="center" align="center" flex="1" direction="column" p={5}>
        {/* Título */}
        <Heading as="h2" mb={6}>
          Search for an existing Schema to Attest
        </Heading>

        {/* Formulario para buscar un schema */}
        <VStack spacing={4} w="100%" maxW="600px">
          <Input
            placeholder="Search By ID"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
            w={{ base: "90%", md: "500px" }} // Ajuste de la anchura del input
            bg="white" // Fondo blanco en el input
            borderColor="gray.700" // Trazo oscuro
            color="gray.700" // Texto más oscuro
            _placeholder={{ color: "gray.500" }} // Placeholder más oscuro
            _focus={{ borderColor: "brand.primary" }} // Trazo rosa al hacer foco
          />
          <Button
            bg="brand.primary" // Color rosa
            color="white" // Texto blanco
            _hover={{ bg: "brand.secondary" }} // Hover morado
            border="none" // Sin trazo
            w={{ base: "90%", md: "300px" }} // Botón responsive
            onClick={() => navigate("/createschema")} // Redirige a la página CreateSchema
          >
            Create New Schema
          </Button>
        </VStack>

        {/* Divider más angosto y de color morado */}
        <Divider
          mt={12}
          w={{ base: "70%", md: "40%" }} // Ajuste de ancho responsivo
          borderWidth="2px"
          borderColor="brand.secondary" // Tu color morado
          mx="auto"
        />

        {/* Listado de schemas creados */}
        <Box mt={10} w="100%" maxW="600px">
          <Heading mb={10} fontSize="xl" textAlign="center">
            Existing Schemas
          </Heading>
          {schemasList.length > 0 ? (
            <VStack spacing={2}>
              {schemasList.map((schema, index) => (
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
              ))}
            </VStack>
          ) : (
            <p style={{ textAlign: 'center' }}>No existing schemas</p>
          )}
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Schemas;
