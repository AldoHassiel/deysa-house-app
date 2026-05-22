import { COLORES } from "@/estilos";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function PantallaContenedor({ children }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedor}>{children}</SafeAreaView>
    </View>
  );
}

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORES.fondo,
    padding: 20,
  },
});
