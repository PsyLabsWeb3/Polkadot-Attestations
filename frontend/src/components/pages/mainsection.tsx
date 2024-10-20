import { Box, Flex, Heading, keyframes } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

// Definir los keyframes de la animación
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function MainSection() {
  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="calc(100vh - 4rem)" // Ajusta según la altura del Header
      bgGradient="linear(to-r, #7204ff, #FF2670)" // El gradiente inicial
      backgroundSize="200% 200%" // Para permitir el movimiento del gradiente
      animation={`${gradientAnimation} 10s ease infinite`} // Aplicar la animación
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box textAlign="center" zIndex="1">
        <Heading fontSize="4rem" color="white">
          Polkattest Chain
        </Heading>
        <Heading as="h2" fontSize="2rem" color="white" mt="1rem">
          Substrate-based Attestation Blockchain
        </Heading>
      </Box>
      <Flex
        position="absolute" // Position the Flex containing Spline absolutely
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex="0"
      >
        <Spline scene="https://prod.spline.design/JXA2-y0Og7K6LTUi/scene.splinecode" />
      </Flex>
    </Flex>
  );
}

export default MainSection;
