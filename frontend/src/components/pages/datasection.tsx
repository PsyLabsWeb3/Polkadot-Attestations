import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Hook for navigation between routes
import { keyframes } from "@emotion/react"; // Keyframes utility for animation

// Gradient animation configuration
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

function DataSection() {
  const navigate = useNavigate(); // Used to programmatically navigate between pages

  return (
    <Flex
      w="100%"
      h="100vh"
      bgGradient="linear(to-r, #000000, #7204ff)"
      bgSize="200% 200%"
      animation={`${gradientAnimation} 15s ease infinite`} // Infinite gradient animation for background
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      p="2rem"
    >
      <Heading fontSize="3rem" mb="2rem">
        Attestations
      </Heading>

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

      <Flex
        justifyContent="center"
        alignItems="center"
        gap="2rem"
        flexWrap="wrap"
      >
        <Button
          bg="pink.500"
          color="white"
          size="lg"
          _hover={{ bg: "pink.600" }}
          onClick={() => navigate("/attest")}
        >
          Make Attestation
        </Button>

        <Button
          bg="pink.500"
          color="white"
          size="lg"
          _hover={{ bg: "pink.600" }}
          onClick={() => navigate("/create-schema")}
        >
          Create New Schema
        </Button>
      </Flex>
    </Flex>
  );
}

export default DataSection;
