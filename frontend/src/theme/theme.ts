import { extendTheme } from "@chakra-ui/react";

// Colores del Brandbook
const colors = {
  brand: {
    primary: "#FF2670",   // Color rosa para botones primarios, enlaces, etc.
    secondary: "#7204FF", // Morado para botones secundarios y acentos.
    background: "#E1E3F1", // Fondo claro para la página o tarjetas.
    white: "#FFFFFF",     // Textos sobre fondos oscuros.
    black: "#000000",     // Color negro para títulos y textos importantes.
  },
};

// Tipografía
const fonts = {
  heading: `'Poppins', sans-serif`,  // Para H1 y H2
  body: `'Inter', sans-serif`,       // Para textos y subtítulos
};

// Estilos globales y componentes personalizados
const styles = {
  global: {
    body: {
      bg: "brand.background",  // Fondo general
      color: "brand.black",    // Color de texto predeterminado
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
      borderRadius: "8px",
    },
    sizes: {
      lg: {
        h: "56px",
        fontSize: "lg",
        px: "32px",
      },
    },
    variants: {
      primary: {
        bg: "brand.primary",
        color: "brand.white",
        _hover: {
          bg: "brand.secondary",
        },
      },
      secondary: {
        bg: "brand.secondary",
        color: "brand.white",
        _hover: {
          bg: "brand.primary",
        },
      },
    },
  },
  Heading: {
    sizes: {
      xl: {
        fontSize: "4rem",   // Tamaño grande para H1
        fontWeight: "bold",
      },
      lg: {
        fontSize: "2rem",   // Tamaño para H2
        fontWeight: "bold",
      },
    },
    variants: {
      primary: {
        color: "brand.black",   // Color de los títulos principales
      },
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
});

export default theme;
