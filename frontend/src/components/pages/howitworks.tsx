import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Create an Schema",
      image: "/path/to/image1.png",
      description: "Description for creating a schema. You can explain the process here.",
    },
    {
      title: "Make an Attestation",
      image: "/path/to/image2.png",
      description: "Description for making an attestation. You can explain the process here.",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Flex direction="column" w="100%" minH="100vh" alignItems="center" justifyContent="center">
      <Heading as="h2" mb={6}>
        How it Works
      </Heading>

      {/* Carrusel */}
      <Box borderWidth="1px" borderRadius="md" p={6} textAlign="center" w="300px">
        {/* Espacio para la imagen */}
        <Box h="200px" mb={4} borderWidth="1px" borderRadius="md">
          {/* Placeholder de la imagen */}
          <Text>Image Carousel</Text>
        </Box>

        {/* Título del slide */}
        <Heading as="h3" fontSize="xl" mb={4}>
          {slides[currentSlide].title}
        </Heading>

        {/* Descripción del slide */}
        <Text mb={6}>{slides[currentSlide].description}</Text>

        {/* Botones para navegar entre slides */}
        <Flex justifyContent="space-between">
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default HowItWorks;
