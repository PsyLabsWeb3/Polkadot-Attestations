import { Box, Text, Image, Flex } from "@chakra-ui/react";
import polkadot from "../../assets/images/polkadot.png";

function SecuredByPolkadot() {
  return (
    <Box
      bg="#1A1A1A" // Fondo oscuro 
      p={4}        // Padding para que no quede pegado a los bordes
      borderRadius="md" // Borde redondeado
      display="inline-block" // Mantenerlo en bloque inline
      border="1px solid black" // Añadir trazo negro de 1 px
    >
      <Flex alignItems="center">
        {/* Texto "Secured by" */}
        <Text color="gray.200" fontSize="md" mr={2}>
          Powered by
        </Text>

        {/* Logo de Polkadot con enlace */}
        <a href="https://polkadot.com" target="_blank" rel="noopener noreferrer">
          <Image src={polkadot} />
        </a>
        
      </Flex>
    </Box>
  );
}

export default SecuredByPolkadot;
