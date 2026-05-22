import { COLORES } from "@/estilos";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import Boton from "./boton";

interface Props {
  titulo: string;
}

export default function Navegacion({ titulo }: Props) {
  const router = useRouter();

  return (
    <View style={estilos.contenedorNavegacion}>
      <View style={estilos.contenedorBotonAtras}>
        <Boton onPress={() => router.back()} style={estilos.botonAtras}>
          <ArrowLeftIcon size={36} color={COLORES.textoAzul} />
        </Boton>
      </View>

      <Text style={estilos.titulo}>{titulo}</Text>
    </View>
  );
}

export const estilos = StyleSheet.create({
  contenedorNavegacion: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  contenedorBotonAtras: {
    position: "absolute",
    left: 0,
  },
  botonAtras: {
    backgroundColor: "#BBC8DAB8",
    padding: 4,
    borderRadius: 8,
  },
  titulo: {
    color: COLORES.textoBlanco,
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
  },
});
