import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import legoImage from '../../assets/images/legoimage.png';
import { useEffect, useState } from 'react';

function Pallet() {
  // Estado para controlar el tamaño de la imagen en función del scroll
  const [scale, setScale] = useState(1); // Estado inicial de la escala (1 = tamaño original)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollFactor = 1 + (scrollPosition / viewportHeight) * 0.5; // Controla la velocidad de escalado
      setScale(Math.min(scrollFactor, 2)); // Limita el escalado a 2x
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="gray.50">
      {/* Contenido principal de Pallet */}
      <Flex
        justify="space-evenly" // Distribuye el espacio uniformemente entre las columnas
        alignItems="center"  // Alinea verticalmente al centro
        flex="1"
        p={10}
        w="100%"
      >
        {/* Columna de texto */}
        <Box
          w="45%" // Se asegura de que ambas columnas tengan el mismo ancho
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* Box envolviendo los elementos de la columna de texto */}
          <Box textAlign="center">
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
        </Box>

        {/* Columna de imagen con efecto de escala al hacer scroll */}
        <Box
          w="45%" // Se asegura de que ambas columnas tengan el mismo ancho
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={legoImage}
            alt="Attestation Pallet Image"
            style={{
              transform: `scale(${scale})`, // Aplica el escalado dinámico
              transition: 'transform 0.1s ease-out', // Suaviza la transición
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Pallet;
