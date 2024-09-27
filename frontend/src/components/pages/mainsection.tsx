import { Box, Flex, Heading } from "@chakra-ui/react";

function MainSection() {
  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="calc(100vh - 4rem)"  // Ajusta según la altura del Header
      bgGradient="linear(to-r, #7204ff, #FF2670)"
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center">
        <Heading fontSize="4rem" color="white">
          PolkAttest Chain
        </Heading>
        <Heading as="h2" fontSize="2rem" color="white" mt="1rem">
          Substrate-based Attestation Blockchain
        </Heading>
      </Box>
    </Flex>
  );
}

export default MainSection;
