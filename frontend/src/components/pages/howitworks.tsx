import { Box, Heading, Flex, Text, Image } from "@chakra-ui/react";

function HowItWorks() {
  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      p={10}
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(135deg, #FFFFFF, #FFD4E2)"
      color="#000"  
    >
      {/* Contenedor principal con dos columnas */}
      <Flex 
        w="100%" 
        maxW="1200px" 
        justifyContent="space-between" 
        alignItems="center" 
        gap={10}  // Añade espacio entre las columnas
      >
        
        {/* Columna izquierda con la imagen */}
        <Flex flex="1" direction="column" alignItems="center" textAlign="center">
          {/* Espacio para la imagen */}
          <Box h="400px" w="300px" display="flex" justifyContent="center" alignItems="center">
            <Image src="/src/assets/images/check.png" alt="Check Graphic" />
          </Box>
        </Flex>

        {/* Columna derecha con los textos explicativos */}
        <Flex flex="1" direction="column" justifyContent="center" textAlign="left">
          
          {/* Título "How it Works" */}
          <Heading as="h3" mb={10} textAlign="left">
            How it Works
          </Heading>

          {/* Paso 1: Overview */}
          <Flex mb={8} direction="column">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
            PolkAttest: The Ledger for Verifiable Off-Chain Events
            </Text>
            <Text>
              Transforms off-chain events into verifiable, reliable, and permanent records. We bridge the gap between the physical world and the blockchain, ensuring data integrity and authenticity in every transaction.
            </Text>
          </Flex>

          {/* Paso 2: Create a Schema */}
          <Flex mb={8} direction="column">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              1. Create a Schema
            </Text>
            <Text>
              Schemas define the structure of data to be attested. In this step, you can create a schema by specifying the fields and types required for your attestation. Each schema is stored immutably on-chain, allowing others to generate attestations based on your defined format.
            </Text>
          </Flex>

          {/* Paso 3: Make an Attestation */}
          <Flex mb={8} direction="column">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              2. Make an Attestation
            </Text>
            <Text>
              An attestation is the verification of specific data based on a predefined schema. After creating or selecting a schema, you can attest real-world data. Attestations are cryptographically secure and permanently recorded on the blockchain, ensuring transparency and trust.
            </Text>
          </Flex>

          {/* Paso 4: Retrieve and Verify */}
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              3. Retrieve and Verify
            </Text>
            <Text>
              Once the attestation is made, it is stored immutably on the blockchain, ensuring that the data cannot be tampered with. You or others can retrieve and verify the attested data at any point, ensuring trust and transparency in all transactions.
            </Text>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  );
}

export default HowItWorks;
