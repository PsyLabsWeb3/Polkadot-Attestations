import { Box, Heading, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide
  const navigate = useNavigate();

  // Array of slides for the carousel
  const slides = [
    {
      title: "Create a Schema",
      image: "/path/to/image1.png",
      description:
        "Description for creating a schema. You can explain the process here.",
      buttonLabel: "Create New Schema",
      buttonRoute: "/create-schema",
    },
    {
      title: "Make an Attestation",
      image: "/path/to/image2.png",
      description:
        "Description for making an attestation. You can explain the process here.",
      buttonLabel: "Make Attestation",
      buttonRoute: "/attest",
    },
  ];

  // Function to handle the next slide
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)); // Loop back to the first slide after the last
  };

  // Function to handle the previous slide
  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); // Loop back to the last slide when on the first
  };

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="#000000" // Black background
      color="#FFFFFF" // White text color
    >
      <Heading as="h2" mb={6}>
        How it Works
      </Heading>

      {/* Container divided into 3 sections */}
      <Flex
        w="100%"
        maxW="1200px"
        h="60vh"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left arrow */}
        <IconButton
          aria-label="Previous slide"
          icon={<ChevronLeftIcon />}
          size="lg"
          bg="transparent"
          color="brand.secondary"
          _hover={{ bg: "transparent" }}
          onClick={handlePrevious} // Go to the previous slide
        />

        {/* Central section containing the carousel */}
        <Box flex="2" textAlign="center">
          <Box textAlign="center" w="100%" p={6}>
            {/* Image placeholder */}
            <Box h="200px" mb={4}>
              <Text>Image Carousel</Text>
            </Box>

            {/* Slide title */}
            <Heading as="h3" fontSize="xl" mb={4}>
              {slides[currentSlide].title}
            </Heading>

            {/* Slide description */}
            <Text mb={6}>{slides[currentSlide].description}</Text>

            {/* Conditional button for navigating to different routes */}
            <Button
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              onClick={() => navigate(slides[currentSlide].buttonRoute)} // Navigate to the specified route
            >
              {slides[currentSlide].buttonLabel}
            </Button>
          </Box>
        </Box>

        {/* Right arrow */}
        <IconButton
          aria-label="Next slide"
          icon={<ChevronRightIcon />}
          size="lg"
          bg="transparent"
          color="brand.secondary"
          _hover={{ bg: "transparent" }}
          onClick={handleNext} // Go to the next slide
        />
      </Flex>
    </Flex>
  );
}

export default HowItWorks;
