import { Box, Heading, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // Para redirigir

function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Hook para redirigir

  const slides = [
    {
      title: "Understanding Attestations",
      image: "/path/to/image1.png",
      description: "Attestations form the core of decentralized trust. Learn how they work to verify claims securely and immutably.",
      buttonLabel: "Learn More",
      buttonRoute: "/docs/attestations",
    },
    {
      title: "Create Custom Schemas",
      image: "/path/to/image2.png",
      description: "Schemas define the structure of your attestations. Build custom schemas to tailor attestations to your needs.",
      buttonLabel: "Create New Schema",
      buttonRoute: "/createschema",
    },
    {
      title: "The Attestation Workflow",
      image: "/path/to/image3.png",
      description: "From schema creation to attestation issuance, see how the workflow brings off-chain data into the blockchain.",
      buttonLabel: "View Workflow Docs",
      buttonRoute: "/docs/workflow",
    },
    {
      title: "Integrate Attestations",
      image: "/path/to/image4.png",
      description: "Learn how to integrate attestations into your dApp to enhance security and trust.",
      buttonLabel: "Explore Integration Docs",
      buttonRoute: "/docs/integration",
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="#000000" // Fondo negro
      color="#FFFFFF" // Fuentes blancas
    >
      <Heading as="h2" mb={6}>
        How it Works
      </Heading>

      {/* Contenedor dividido en 3 secciones */}
      <Flex w="100%" maxW="1200px" h="60vh" justifyContent="space-between" alignItems="center">
        {/* Flecha izquierda mejorada */}
        <IconButton
          aria-label="Previous slide"
          icon={<ChevronLeftIcon />}
          size="lg"
          bg="transparent"
          color="brand.secondary"
          _hover={{
            bg: "brand.primary", // Cambia el fondo al hacer hover
            color: "white", // Cambia el color de la flecha
            transform: "scale(1.2)", // Aumenta el tamaño al hacer hover
            borderColor: "brand.primary", // Cambia el color del borde a rosa en hover
          }}
          _active={{ transform: "scale(1.1)" }} // Efecto activo al hacer click
          transition="all 0.3s ease" // Suaviza la animación
          onClick={handlePrevious}
          boxShadow="0px 4px 15px rgba(0, 0, 0, 0.4)" // Añade sombra
          borderRadius="full" // Hace que el fondo sea circular
          p={2}
          border="2px solid" // Añade el borde para que rodee el ícono
          borderColor="brand.secondary" // Color del borde igual al color de la flecha
        />

        {/* Sección central más grande */}
        <Box flex="2" textAlign="center">
          {/* Carrusel */}
          <Box textAlign="center" w="100%" p={6}>
            {/* Espacio para la imagen */}
            <Box h="200px" mb={4}>
              <Text>Image Carousel</Text> {/* Placeholder para la imagen */}
            </Box>

            {/* Título del slide */}
            <Heading as="h3" fontSize="xl" mb={4}>
              {slides[currentSlide].title}
            </Heading>

            {/* Descripción del slide */}
            <Text mb={6}>{slides[currentSlide].description}</Text>

            {/* Botón condicional para navegar a las rutas */}
            <Button
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              onClick={() => navigate(slides[currentSlide].buttonRoute)}
            >
              {slides[currentSlide].buttonLabel}
            </Button>
          </Box>
        </Box>

        {/* Flecha derecha mejorada */}
        <IconButton
          aria-label="Next slide"
          icon={<ChevronRightIcon />}
          size="lg"
          bg="transparent"
          color="brand.secondary"
          _hover={{
            bg: "brand.primary", // Cambia el fondo al hacer hover
            color: "white", // Cambia el color de la flecha
            transform: "scale(1.2)", // Aumenta el tamaño al hacer hover
            borderColor: "brand.primary", // Cambia el color del borde a rosa en hover
          }}
          _active={{ transform: "scale(1.1)" }} // Efecto activo al hacer click
          transition="all 0.3s ease" // Suaviza la animación
          onClick={handleNext}
          boxShadow="0px 4px 15px rgba(0, 0, 0, 0.4)" // Añade sombra
          borderRadius="full" // Hace que el fondo sea circular
          p={2}
          border="2px solid" // Añade el borde para que rodee el ícono
          borderColor="brand.secondary" // Color del borde igual al color de la flecha
        />
      </Flex>
    </Flex>
  );
}

export default HowItWorks;
