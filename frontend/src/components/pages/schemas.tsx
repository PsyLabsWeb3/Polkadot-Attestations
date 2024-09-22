import { Box, Heading, Flex } from "@chakra-ui/react";
import Header from "../templates/Header/Header"; // Asegúrate de que la ruta sea correcta
import Footer from "../pages/footer"; // Asegúrate de que la ruta sea correcta

function Schemas() {
  return (
    <Flex
      direction="column"
      w="100%"
      h="100vh"
      bg="pink"
    >
      {/* Header */}
      <Box>
        <Header />
      </Box>

      {/* Contenido principal de Schemas */}
      <Flex justify="center" alignItems="center" flex="1">
        <Box textAlign="center">
          <Heading fontSize="3xl">Schemas</Heading>
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

export default Schemas;
