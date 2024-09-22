import { Box, Heading, Flex, VStack, Button, Input, Select, HStack, Switch, Text } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../templates/Header/Header"; // Ajusta la ruta según tu estructura
import Footer from "../pages/footer"; // Ajusta la ruta según tu estructura

function CreateSchema() {
  const [schemaFields, setSchemaFields] = useState([{ fieldName: "", fieldType: "", isArray: false }]); // Campos iniciales
  const [resolverAddress, setResolverAddress] = useState(""); // Dirección del resolver contract
  const [isRevocable, setIsRevocable] = useState(false); // Si es revocable

  // Manejador para agregar un nuevo campo al schema
  const handleAddField = () => {
    setSchemaFields([...schemaFields, { fieldName: "", fieldType: "", isArray: false }]);
  };

  // Manejador para eliminar el último campo del schema
  const handleRemoveLastField = () => {
    if (schemaFields.length > 1) {
      setSchemaFields(schemaFields.slice(0, -1)); // Elimina el último campo del array
    }
  };

  // Manejador para actualizar los campos del schema
  const handleFieldChange = (index, field, value) => {
    const updatedFields = schemaFields.map((fieldItem, i) =>
      i === index ? { ...fieldItem, [field]: value } : fieldItem
    );
    setSchemaFields(updatedFields);
  };

  // Manejador para crear el schema (simulación)
  const handleCreateSchema = () => {
    const schemaData = {
      fields: schemaFields,
      resolver: resolverAddress,
      revocable: isRevocable,
    };
    console.log("Schema Created:", schemaData);
    // Aquí iría la llamada para insertar el schema usando tu pallet
  };

  return (
    <Flex direction="column" w="100%" minH="100vh" bg="brand.background" color="brand.black">
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Contenido principal */}
      <Flex justify="center" alignItems="center" flex="1" direction="column" p={5}>
        <Box w="100%" maxW="600px" textAlign="center" bg="white" p={6} borderRadius="md" boxShadow="lg">
          <Heading as="h2" mb={4} color="brand.black">
            Create a Schema
          </Heading>
          <Text mb={6} color="gray.600">
            Include fields that are essential for your schema's functionality.
          </Text>

          <VStack spacing={4} align="stretch">
            {/* Campos del schema */}
            {schemaFields.map((field, index) => (
              <HStack key={index} spacing={3}>
                <Input
                  placeholder="Field name"
                  value={field.fieldName}
                  onChange={(e) => handleFieldChange(index, "fieldName", e.target.value)}
                  bg="white"
                  borderColor="gray.500"
                  color="gray.700"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{ borderColor: "brand.primary" }}
                />
                <Select
                  placeholder="Select type"
                  value={field.fieldType}
                  onChange={(e) => handleFieldChange(index, "fieldType", e.target.value)}
                  bg="white" // Fondo claro para la lista desplegable
                  borderColor="gray.500"
                  color="black" // Texto negro
                  _hover={{ bg: "brand.grayLight" }} // Hover con fondo claro
                  _focus={{ borderColor: "brand.primary" }}
                  sx={{
                    option: {
                      bg: "white", // Fondo blanco para las opciones
                      color: "black", // Texto negro para las opciones
                    },
                  }}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="address">Address</option>
                  <option value="bytes32">Bytes32</option>
                </Select>
                <HStack
                  borderWidth="2px"
                  borderColor={field.isArray ? "transparent" : "brand.primary"} // Trazo rosa cuando no está activado
                  bg={field.isArray ? "brand.primary" : "transparent"} // Fondo rosa cuando está activado
                  p={2}
                  borderRadius="full" // Hacemos el borde circular para un look similar a un switch
                  transition="background-color 0.3s ease"
                  _hover={{ bg: !field.isArray && "#FFD4E2" }} // Hover rosa claro cuando no está activado
                >
                  <Text color={field.isArray ? "white" : "brand.primary"}>Array</Text> {/* Texto cambia a blanco si está activado */}
                  <Switch
                    isChecked={field.isArray}
                    onChange={(e) => handleFieldChange(index, "isArray", e.target.checked)}
                    colorScheme="pink"
                    sx={{
                      "span.chakra-switch__track": {
                        bg: field.isArray ? "pink.500" : "transparent", // Cambiamos el track
                      },
                      "span.chakra-switch__thumb": {
                        bg: "white", // El círculo del switch en blanco
                        border: field.isArray ? "2px solid brand.secondary" : "2px solid #FF2670", // Trazo rosa cuando está desactivado
                      },
                    }}
                  />
                </HStack>
              </HStack>
            ))}

            {/* Botones para agregar y eliminar campos */}
            <HStack spacing={4} alignSelf="flex-start">
              <Button
                onClick={handleAddField}
                bg="brand.primary"
                color="white"
                _hover={{ bg: "brand.secondary" }}
                border="none"
              >
                + Add field
              </Button>
              <Button
                onClick={handleRemoveLastField}
                bg="brand.primary"
                color="white"
                _hover={{ bg: "brand.secondary" }}
                border="none"
                disabled={schemaFields.length <= 1} // Desactivar si solo queda un campo
              >
                - Last Field
              </Button>
            </HStack>

            {/* Resolver Address */}
            <Box>
              <Text mb={2} fontWeight="bold" color="gray.700">
                Resolver Address
              </Text>
              <Text fontSize="sm" mb={2} color="gray.600">
                Optional contract that runs with each attestation of this type. This can be used to verify, restrict, or apply custom logic on attestations.
              </Text>
              <Input
                placeholder="ex: 0x0000000000000000000000000000000000000000"
                value={resolverAddress}
                onChange={(e) => setResolverAddress(e.target.value)}
                bg="white"
                borderColor="gray.500"
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
                _focus={{ borderColor: "brand.primary" }}
              />
            </Box>

            {/* Is Revocable */}
            <Box>
              <Text mb={2} fontWeight="bold" color="gray.700">
                Is Revocable
              </Text>
              <Text fontSize="sm" mb={2} color="gray.600">
                Specify if attestations created under this schema can be revoked.
              </Text>
              <HStack justify="center" spacing={4}>
                <Button
                  bg={isRevocable ? "brand.secondary" : "gray.200"}
                  color={isRevocable ? "white" : "black"}
                  _hover={isRevocable ? { bg: "brand.primary" } : {}}
                  onClick={() => setIsRevocable(true)}
                >
                  Yes
                </Button>
                <Button
                  bg={!isRevocable ? "brand.secondary" : "gray.200"}
                  color={!isRevocable ? "white" : "black"}
                  _hover={!isRevocable ? { bg: "brand.primary" } : {}}
                  onClick={() => setIsRevocable(false)}
                >
                  No
                </Button>
              </HStack>
            </Box>

            {/* Botón para crear el schema */}
            <Button
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.secondary" }}
              border="none"
              onClick={handleCreateSchema}
            >
              Create Schema
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default CreateSchema;
