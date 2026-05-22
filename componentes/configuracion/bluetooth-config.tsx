import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORES } from "@/estilos";
import { HouseWifi, RefreshCcwIcon } from "lucide-react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import Boton from "../boton";

const NOMBRE_BLUETOOTH = "DeysaHouse";

interface Props {
  dispositivo: BluetoothDevice | null;
  setDispositivo: (dispositivo: BluetoothDevice | null) => void;
}

export default function PasoBluetooth({ dispositivo, setDispositivo }: Props) {
  const [cargando, setCargando] = useState(false);

  async function solicitarPermisos() {
    if (Platform.OS !== "android") return true;

    try {
      if (Platform.Version >= 31) {
        const resultado = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return Object.values(resultado).every(
          (estado) => estado === PermissionsAndroid.RESULTS.GRANTED,
        );
      }

      const resultado = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      return resultado === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function buscarDispositivos() {
    try {
      setCargando(true);
      setDispositivo(null);

      const permisosOtorgados = await solicitarPermisos();

      if (!permisosOtorgados) {
        Alert.alert(
          "Permisos requeridos",
          "Debes otorgar permisos de Bluetooth y ubicación.",
        );
        return;
      }

      const bluetoothActivado = await RNBluetoothClassic.isBluetoothEnabled();

      if (!bluetoothActivado) {
        await RNBluetoothClassic.requestBluetoothEnabled();
      }

      const dispositivosEmparejados =
        await RNBluetoothClassic.getBondedDevices();

      console.log(
        "Dispositivos emparejados:",
        dispositivosEmparejados.map((d) => d.name),
      );

      let encontrado = dispositivosEmparejados.find(
        (d) => d.name === NOMBRE_BLUETOOTH,
      );

      if (!encontrado) {
        const dispositivosEncontrados =
          await RNBluetoothClassic.startDiscovery();

        console.log(
          "Dispositivos encontrados:",
          dispositivosEncontrados.map((d) => d.name),
        );

        encontrado = dispositivosEncontrados.find(
          (d) => d.name === NOMBRE_BLUETOOTH,
        );
      }

      if (encontrado) {
        setDispositivo(encontrado);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || String(error));
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    buscarDispositivos();
  }, []);

  if (cargando) {
    return (
      <View style={estilos.contenedorCargando}>
        <ActivityIndicator size="large" />
        <Text style={estilos.textoCargando}>Buscando dispositivos...</Text>
      </View>
    );
  }

  if (!dispositivo) {
    return (
      <View style={estilos.contenedorPrincipal}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={[estilos.dispositivoEncontrado, { flex: 1 }]}>
            Dispositivos encontrados:
          </Text>

          <Boton
            onPress={buscarDispositivos}
            style={{
              padding: 4,
              borderRadius: 15,
              backgroundColor: COLORES.textoCielo,
            }}
          >
            <RefreshCcwIcon size={32} color={COLORES.textoBlanco} />
          </Boton>
        </View>

        <View style={estilos.contenedorCargando}>
          <Text style={estilos.textoCargando}>
            No se encontró ningún dispositivo
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={[estilos.dispositivoEncontrado, { flex: 1 }]}>
          Dispositivos encontrados:
        </Text>

        <Boton
          onPress={buscarDispositivos}
          style={{
            padding: 4,
            borderRadius: 15,
            backgroundColor: COLORES.textoCielo,
          }}
        >
          <RefreshCcwIcon size={32} color={COLORES.textoBlanco} />
        </Boton>
      </View>

      <Boton
        containerStyle={estilos.contenedorBoton}
        style={estilos.contenedorHijoBoton}
      >
        <HouseWifi size={82} color={COLORES.textoAzul} />
        <Text style={estilos.nombreDispositivo}>{dispositivo.name}</Text>
      </Boton>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    marginVertical: 15,
  },
  contenedorCargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  textoCargando: {
    color: COLORES.textoBlanco,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  dispositivoEncontrado: {
    color: COLORES.textoBlanco,
    fontSize: 22,
    fontWeight: "bold",
  },

  contenedorBoton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorHijoBoton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 15,
    padding: 10,
  },

  nombreDispositivo: {
    color: COLORES.textoAzul,
    fontSize: 42,
    fontWeight: "bold",
  },
});
