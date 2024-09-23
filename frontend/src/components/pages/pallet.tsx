import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import legoImage from '../../assets/images/legoimage.png';

function Pallet() {
  return (
    <Flex direction="column" w="100%" minH="100vh" bg="gray.50">
      {/* Contenido principal de Pallet */}
      <Flex
        justify="center" // Centramos las columnas horizontalmente
        alignItems="center"  // Centramos los elementos verticalmente
        flex="1"
        p={10}
        w="100%"
        gap={10}  // Controlamos el espacio entre las columnas
      >
        {/* Columna de texto */}
        <Box maxW="50%">
          <Heading as="h2" mb={6}>
            Attestation Pallet
          </Heading>
          <Text mb={6}>
            The Attestation Pallet is a specialized Substrate pallet designed for handling the creation, management, and verification of attestations. Alongside other essential pallets (such as pallet-balances), this custom pallet brings a unique layer of functionality to the blockchain. It enables developers to integrate attestations directly into their projects, securely bringing off-chain events on-chain. The pallet allows users to define schemas, generate attestations, and store them immutably, ensuring the integrity and authenticity of data across decentralized networks.
          </Text>
          <Button
            bg="brand.primary" // Color rosa
            color="white" // Texto blanco
            _hover={{ bg: "brand.secondary" }} // Hover morado
            border="none" // Sin trazo
            onClick={() => window.open("https://github.com/PsyLabsWeb3/Polkadot-Attestations/tree/main/pallet/pallet-attestations", "_blank")}
          >
            GitHub Repo
          </Button>
        </Box>

        {/* Columna de imagen */}
        <Box
          maxW="50%" // Mantiene la imagen centrada dentro de su espacio
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={legoImage} alt="Attestation Pallet Image" />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Pallet;
