import { Box, Flex, Text } from "@chakra-ui/react";
import SecuredByPolkadot from "./secured";

function Footer() {
  return (
    <Box as="footer" w="100%" bg="gray.900" color="white" py="4rem">
      <Flex
        maxW="1200px"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={["column", "column", "row"]} // Columna en móviles, fila en pantallas grandes
        textAlign="center"
        gap="2rem"
      >
        {/* Columna 1 */}
        <Box flex="1">
          <SecuredByPolkadot />
        </Box>


        {/* Columna 2 */}
        <Box flex="1">
          <Text fontSize="lg">
            Made with ❤️ by <a href="https://psylabs.io" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Psy Labs</a>
          </Text>
        </Box>

        {/* Columna 3 */}
        <Box flex="1">
          <Text fontSize="lg">
          <a href="mailto:hello@psylabs.io">hello@psylabs.io</a>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
