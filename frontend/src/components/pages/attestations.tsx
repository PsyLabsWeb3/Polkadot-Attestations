import { Box, Heading, Flex } from "@chakra-ui/react";
import Header from "../templates/Header/Header"; // Asegúrate de la ruta correcta
import Footer from "../pages/footer"; // Asegúrate de la ruta correcta

function Attestations() {
  return (
    <Flex
      direction="column"
      w="100%"
      h="100vh"
      bg="gray.50"
    >
      {/* Header */}
      <Box>
        <Header />
      </Box>

      {/* Contenido principal de Attestations */}
      <Flex justify="center" alignItems="center" flex="1">
        <Box textAlign="center">
          <Heading fontSize="3xl">Attestations</Heading>
          <p>Hello World!</p>
        </Box>
      </Flex>

      {/* Footer */}
      <Box>
        <Footer />
      </Box>
    </Flex>
  );
}

export default Attestations;
