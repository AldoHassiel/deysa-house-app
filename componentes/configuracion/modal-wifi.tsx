// componentes/configuracion/modal-password-wifi.tsx
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { WifiIcon, Eye, EyeOff } from "lucide-react-native";

import Boton from "@/componentes/boton";
import { COLORES } from "@/estilos";

interface Props {
  visible: boolean;
  ssid: string | null;
  passwordInicial?: string;
  onCancelar: () => void;
  onConfirmar: (password: string) => void;
}

export default function ModalPasswordWifi({
  visible,
  ssid,
  passwordInicial = "",
  onCancelar,
  onConfirmar,
}: Props) {
  const [password, setPassword] = useState(passwordInicial);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useEffect(() => {
    if (visible) {
      setPassword(passwordInicial);
      setMostrarPassword(false);
    }
  }, [visible, passwordInicial]);

  function confirmar() {
    onConfirmar(password.trim());
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancelar}
    >
      <View style={estilos.overlay}>
        <View style={estilos.modal}>
          <View style={estilos.encabezado}>
            <WifiIcon size={36} color={COLORES.textoAzul} />

            <Text style={estilos.titulo}>Contraseña Wi-Fi</Text>

            <Text style={estilos.subtitulo}>{ssid}</Text>
          </View>

          <View style={estilos.contenedorInput}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresa la contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={estilos.input}
            />

            <Boton
              onPress={() => setMostrarPassword(!mostrarPassword)}
              style={estilos.botonOjo}
            >
              {mostrarPassword ? (
                <EyeOff size={24} color={COLORES.textoAzul} />
              ) : (
                <Eye size={24} color={COLORES.textoAzul} />
              )}
            </Boton>
          </View>

          <View style={estilos.contenedorBotones}>
            <Boton
              containerStyle={{ flex: 1 }}
              style={estilos.botonCancelar}
              onPress={onCancelar}
            >
              <Text style={estilos.textoCancelar}>Cancelar</Text>
            </Boton>

            <Boton
              containerStyle={{ flex: 1 }}
              style={estilos.botonConfirmar}
              onPress={confirmar}
            >
              <Text style={estilos.textoConfirmar}>Continuar</Text>
            </Boton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modal: {
    width: "100%",
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 20,
    padding: 24,
    gap: 20,
  },

  encabezado: {
    alignItems: "center",
    gap: 8,
  },

  titulo: {
    color: COLORES.textoBlanco,
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitulo: {
    color: COLORES.textoCielo,
    fontSize: 18,
    fontWeight: "600",
  },

  contenedorInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: COLORES.textoBlanco,
    fontSize: 18,
    paddingVertical: 14,
  },

  botonOjo: {
    padding: 6,
    backgroundColor: "transparent",
  },

  contenedorBotones: {
    flexDirection: "row",
    gap: 12,
  },

  botonCancelar: {
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  botonConfirmar: {
    backgroundColor: COLORES.textoAzul,
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  textoCancelar: {
    color: COLORES.textoBlanco,
    fontSize: 16,
    fontWeight: "600",
  },

  textoConfirmar: {
    color: COLORES.textoBlanco,
    fontSize: 16,
    fontWeight: "600",
  },
});
