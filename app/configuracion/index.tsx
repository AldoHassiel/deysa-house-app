import Boton from "@/componentes/boton";
import PasoBluetooth from "@/componentes/configuracion/bluetooth-config";
import ModalPasswordWifi from "@/componentes/configuracion/modal-wifi";
import PasoWifi from "@/componentes/configuracion/wifi-config";
import Navegacion from "@/componentes/navegacion";
import PantallaContenedor from "@/componentes/pantalla-contenedor";
import { COLORES } from "@/estilos";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { BluetoothDevice } from "react-native-bluetooth-classic";

export default function Configuracion() {
  const [paso, setPaso] = useState(0);
  const [dispositivo, setDispositivo] = useState<BluetoothDevice | null>(null);
  const [wifiSeleccionado, setWifiSeleccionado] = useState<string | null>(null);
  const [pwdWifi, setPwdWifi] = useState("");
  const [mostrarModalWifi, setMostrarModalWifi] = useState(false);

  function renderizarPaso() {
    switch (paso) {
      case 0:
        return (
          <PasoBluetooth
            dispositivo={dispositivo}
            setDispositivo={setDispositivo}
          />
        );

      case 1:
        return (
          <PasoWifi
            wifiSeleccionado={wifiSeleccionado}
            setWifiSeleccionado={setWifiSeleccionado}
          />
        );
      default:
        return null;
    }
  }

  function irAlPasoSiguiente() {
    switch (paso) {
      case 0:
        if (!dispositivo) {
          Alert.alert(
            "Dispositivo no encontrado",
            "Primero debes seleccionar el dispositivo Bluetooth.",
          );
          return;
        }

        setPaso(1);
        return;

      case 1:
        if (!wifiSeleccionado) {
          Alert.alert("Red Wi-Fi", "Selecciona una red Wi-Fi.");
          return;
        }

        setMostrarModalWifi(true);
        return;

      case 2:
        break;
    }

    setPaso((prev) => prev + 1);
  }

  async function enviarConfiguracionWifi(ssid: string, password: string) {
    if (!dispositivo) return;

    try {
      const conectado = await dispositivo.isConnected();

      if (!conectado) {
        await dispositivo.connect();
      }

      const payload = JSON.stringify({
        type: "wifi_config",
        ssid,
        password,
      });

      await dispositivo.write(payload + "\n");

      Alert.alert(
        "Configuración enviada",
        "El dispositivo está intentando conectarse al Wi-Fi.",
      );

      setPaso(2);
    } catch (error: any) {
      Alert.alert("Error", error.message || String(error));
    }
  }

  const mostrarBotones = paso < 4;

  return (
    <PantallaContenedor>
      <Navegacion titulo="Configuración" />

      <View style={{ flex: 1 }}>{renderizarPaso()}</View>

      {mostrarBotones && (
        <View style={{ marginTop: 10, marginBottom: 10, flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <Boton
            onPress={irAlPasoSiguiente}
            style={estilos.botonSiguiente}
            containerStyle={{ flex: 1 }}
          >
            <Text style={estilos.textoBoton}>
              {paso === 3 ? "Finalizar" : "Siguiente"}
            </Text>
          </Boton>
        </View>
      )}

      <ModalPasswordWifi
        visible={mostrarModalWifi}
        ssid={wifiSeleccionado}
        passwordInicial={pwdWifi}
        onCancelar={() => setMostrarModalWifi(false)}
        onConfirmar={async (password) => {
          if (!wifiSeleccionado) {
            Alert.alert("Error", "No hay una red seleccionada.");
            return;
          }

          if (!password.trim()) {
            Alert.alert("Contraseña", "Ingresa la contraseña del Wi-Fi.");
            return;
          }

          setPwdWifi(password);
          setMostrarModalWifi(false);

          await enviarConfiguracionWifi(wifiSeleccionado, password);
        }}
      />
    </PantallaContenedor>
  );
}

const estilos = StyleSheet.create({
  botonSiguiente: {
    backgroundColor: "#BBC8DAB8",
    padding: 4,
    borderRadius: 8,
  },
  textoBoton: {
    fontWeight: "bold",
    color: COLORES.textoAzul,
    fontSize: 24,
    textAlign: "center",
  },
});
