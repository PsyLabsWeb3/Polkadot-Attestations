import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function WhyAtt() {
  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-b, #7928CA, #FF0080)" // Fondo morado a rosa
      color="#FFFFFF" // Texto blanco
      p={10}
    >
      {/* Título principal */}
      <Heading as="h1" mb={6} textAlign="center">
        Why Attestations Matter
      </Heading>

      {/* Descripción principal */}
      <Text fontSize="xl" mb={12} textAlign="center" maxW="800px">
        Attestations provide a secure and tamper-proof way to bring off-chain events on-chain. This ensures the authenticity, integrity, and trustworthiness of data in decentralized ecosystems.
      </Text>

      {/* Contenedor de ventajas */}
      <Flex
        direction={["column", "column", "row"]} // Se adapta en pantallas pequeñas
        w="100%"
        maxW="1200px"
        justifyContent="space-between"
        alignItems="center"
        gap={6}
      >
        {/* Caja 1: Ventaja 1 */}
        <Box
          flex="1"
          p={6}
          borderRadius="lg"
          bgGradient="linear(to-b, #FF0080, #7928CA)" // Fondo rosa a morado
          textAlign="center"
          boxShadow="xl"
          maxW="350px" // Fijamos el tamaño máximo para simetría
          minH="250px" // Altura mínima para mantener el tamaño uniforme
        >
          <Heading as="h3" size="lg" mb={4}>
            Secure Data Integrity
          </Heading>
          <Text fontSize="md">
            Attestations ensure the data you share is accurate and verifiable, providing trust and security across decentralized networks.
          </Text>
        </Box>

        {/* Caja 2: Ventaja 2 */}
        <Box
          flex="1"
          p={6}
          borderRadius="lg"
          bgGradient="linear(to-b, #FF0080, #7928CA)" // Fondo rosa a morado
          textAlign="center"
          boxShadow="xl"
          maxW="350px" // Fijamos el tamaño máximo para simetría
          minH="250px" // Altura mínima para mantener el tamaño uniforme
        >
          <Heading as="h3" size="lg" mb={4}>
            Tamper-Proof Records
          </Heading>
          <Text fontSize="md">
            Attestations are stored immutably on-chain, ensuring no one can alter or manipulate the data once it's attested.
          </Text>
        </Box>

        {/* Caja 3: Ventaja 3 */}
        <Box
          flex="1"
          p={6}
          borderRadius="lg"
          bgGradient="linear(to-b, #FF0080, #7928CA)" // Fondo rosa a morado
          textAlign="center"
          boxShadow="xl"
          maxW="350px" // Fijamos el tamaño máximo para simetría
          minH="250px" // Altura mínima para mantener el tamaño uniforme
        >
          <Heading as="h3" size="lg" mb={4}>
          Verifiable Proof of Authenticity
          </Heading>
          <Text fontSize="md">
            Any third party can easily verify the validity of the attested data on-chain, ensuring transparency and trust.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default WhyAtt;
