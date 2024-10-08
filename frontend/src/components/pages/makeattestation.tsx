import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
} from "@chakra-ui/react";
import { getSchemas } from "../../mocks/getSchemas";
import Header from "../templates/Header/Header";
import Footer from "../pages/footer";
import { Schema } from "./attestations";

// Definir el tipo FormValues basado en los campos del schema
type FormValues = {
  [key: string]: string | number | string[]; // Los valores del formulario pueden ser string, number o array de strings
};

function MakeAttestation() {
  const { id } = useParams();
  const [schema, setSchema] = useState<Schema | null>(null); // Estado para almacenar el schema seleccionado
  const [formValues, setFormValues] = useState<FormValues>({}); // Estado para almacenar los valores del formulario

  // Obtener el schema del mock según el ID
  useEffect(() => {
    const schemas = getSchemas(); // Obtener los schemas
    const selectedSchema = schemas.find((schema) => schema.id === id); // Buscar el schema según el ID
    setSchema(selectedSchema || null); // Guardar el schema en el estado
    if (selectedSchema) {
      // Inicializar los valores del formulario
      const initialValues: FormValues = {};
      selectedSchema.fields.forEach((field) => {
        initialValues[field.name] = field.isArray ? [] : ""; // Inicializa como array o string según el tipo
      });
      setFormValues(initialValues); // Establecer los valores iniciales del formulario
    }
  }, [id]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    setFormValues({
      ...formValues,
      [fieldName]: e.target.value,
    });
  };

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      bg="brand.background"
      color="brand.black"
    >
      {/* Header */}
      <Box w="100%">
        <Header />
      </Box>

      {/* Contenido principal */}
      <Flex
        justify="center"
        alignItems="center"
        flex="1"
        direction="column"
        p={5}
      >
        <Box
          w="100%"
          maxW="800px"
          textAlign="center"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
        >
          {schema ? (
            <>
              <Heading as="h2" mb={6} color="brand.black">
                Attestation for Schema: {schema.name}
              </Heading>
              <Text mb={6} color="brand.gray">
                You are creating an attestation for the schema: {schema.name}.
                Please fill in the necessary fields below.
              </Text>
              {/* Generar el formulario dinámicamente según los campos */}
              <form>
                {schema.fields.map((field) => (
                  <FormControl key={field.name} mb={4}>
                    <FormLabel>{field.description}</FormLabel>
                    {/* Mostrar Input o Select basado en el tipo de campo */}
                    {field.type === "string" && !field.isArray ? (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.name}`}
                        value={formValues[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.type === "number" ? (
                      <Input
                        type="number"
                        placeholder={`Enter ${field.name}`}
                        value={formValues[field.name] as number}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.isArray ? (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.name} (comma separated values)`}
                        value={(formValues[field.name] as string[]).join(", ")}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : field.format === "date" ? (
                      <Input
                        type="date"
                        value={formValues[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    ) : (
                      <Select
                        placeholder={`Select ${field.name}`}
                        value={formValues[field.name] as string}
                        onChange={(e) => handleChange(e, field.name)}
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </Select>
                    )}
                  </FormControl>
                ))}
                {/* Botón para enviar el formulario */}
                <Button
                  mt={8}
                  bg="brand.primary"
                  color="white"
                  _hover={{ bg: "brand.secondary" }}
                  border="none"
                  w={{ base: "100%", md: "300px" }}
                  onClick={() => console.log("Form Values:", formValues)}
                >
                  Submit Attestation
                </Button>
              </form>
            </>
          ) : (
            <Text>Loading schema information...</Text>
          )}
        </Box>
      </Flex>

      {/* Footer */}
      <Box w="100%">
        <Footer />
      </Box>
    </Flex>
  );
}

export default MakeAttestation;
