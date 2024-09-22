import { Box, Flex, Heading } from "@chakra-ui/react";
import Header from "../templates/Header/Header";
import DataSection from "../pages/datasection"; // Asegúrate de que la ruta sea correcta
import History from "../pages/history"; // Asegúrate de que la ruta sea correcta
import Footer from "../pages/footer"; // Importación del Footer

function Home() {
  return (
    <Flex flexDirection="column" w="100%" minH="100vh" bgGradient="linear(to-r, #7204ff, #FF2670)">
      {/* Header y Títulos */}
      <Header />
      <Flex mt="10rem" justify="center" p="2rem" flex="1">
        <Box textAlign="center">
          <Heading fontSize="4rem" color="white">
            PolkAttest Chain
          </Heading>
          <Heading as="h2" fontSize="2rem" color="white" mt="1rem">
            Substrate-based Attestation Blockchain
          </Heading>
        </Box>
      </Flex>

      {/* Sección de datos */}
      <Box mt="5rem"> {/* Espacio entre los títulos y la sección de datos */}
        <DataSection />
      </Box>

      {/* Sección de Historial */}
      <Box > {/* Espacio antes de la sección de historial */}
        <History />
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

export default Home;
