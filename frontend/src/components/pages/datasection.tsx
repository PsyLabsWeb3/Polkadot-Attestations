import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

function DataSection() {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <Flex
      w="100%"
      h="100vh"
      bg="black"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      p="2rem"
    >
      {/* Título */}
      <Heading fontSize="3rem" mb="2rem">
        Attestations
      </Heading>

      {/* Sección de estadísticas */}
      <Flex
        w="100%"
        maxW="1200px"
        justifyContent="space-around"
        alignItems="center"
        mb="4rem"
        textAlign="center"
        flexWrap="wrap"
      >
        <Box>
          <Heading fontSize="4rem" mb="1rem">
            10000
          </Heading>
          <Text fontSize="1.5rem">Attestations</Text>
        </Box>

        <Box>
          <Heading fontSize="4rem" mb="1rem">
            2343
          </Heading>
          <Text fontSize="1.5rem">Unique Attestors</Text>
        </Box>
      </Flex>

      {/* Botones */}
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="2rem"
        flexWrap="wrap"
      >
        {/* Botón Make Attestation */}
        <Button
          bg="pink.500"
          color="white"
          size="lg"
          _hover={{ bg: "pink.600" }}
          onClick={() => navigate("/attestations")} // Redirige a la página Attestation
        >
          Make Attestation
        </Button>

        {/* Botón Create New Schema */}
        <Button
          bg="pink.500"
          color="white"
          size="lg"
          _hover={{ bg: "pink.600" }}
          onClick={() => navigate("/createschema")} // Redirige a la página CreateSchema
        >
          Create New Schema
        </Button>
      </Flex>
    </Flex>
  );
}

export default DataSection;
