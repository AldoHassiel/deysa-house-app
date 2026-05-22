import { StyleSheet } from "react-native";

export const COLORES = {
  fondo: "#2C3E66",
  textoBlanco: "#FFFFFF",
  textoAzul: "#2C3E66",
  textoCielo: "#BBC8DA",
  botonInactivo: "#BBC8DA",
  botonActivo: "#95B7E3",
};

export const EstilosGlobales = StyleSheet.create({
  TextoBlanco: {
    color: COLORES.textoBlanco,
  },
  TextoCielo: {
    color: COLORES.textoCielo,
  },
  TextoAzul: {
    color: COLORES.textoAzul,
  },
  BotonEncendido: {
    backgroundColor: COLORES.botonActivo,
    borderRadius: 10,
    padding: 10,
  },
  BotonApagado: {
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 10,
    padding: 10,
  },
});
