// componentes/configuracion/wifi-config.tsx
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WifiManager from "react-native-wifi-reborn";
import { WifiIcon, RefreshCcwIcon } from "lucide-react-native";

import Boton from "../boton";
import { COLORES } from "@/estilos";

interface RedWifi {
  SSID: string;
  BSSID: string;
}

interface Props {
  wifiSeleccionado: string | null;
  setWifiSeleccionado: (ssid: string | null) => void;
}

export default function PasoWifi({
  wifiSeleccionado,
  setWifiSeleccionado,
}: Props) {
  const [cargando, setCargando] = useState(false);
  const [redes, setRedes] = useState<RedWifi[]>([]);
  const [ssidActual, setSsidActual] = useState<string | null>(null);

  async function cargarRedes() {
    try {
      setCargando(true);

      let ssid = null;

      try {
        ssid = await WifiManager.getCurrentWifiSSID();

        if (ssid === "<unknown ssid>" || ssid === "unknown ssid" || !ssid) {
          ssid = null;
        }
      } catch {
        ssid = null;
      }

      setSsidActual(ssid);

      const lista = (await WifiManager.loadWifiList()) as RedWifi[];

      const mapa = new Map<string, RedWifi>();

      lista.forEach((red) => {
        if (red.SSID?.trim()) {
          mapa.set(red.SSID, red);
        }
      });

      const redesUnicas = Array.from(mapa.values());

      redesUnicas.sort((a, b) => {
        if (a.SSID === ssid) return -1;
        if (b.SSID === ssid) return 1;
        return a.SSID.localeCompare(b.SSID);
      });

      setRedes(redesUnicas);

      if (ssid) {
        setWifiSeleccionado(ssid);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || String(error));
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarRedes();
  }, []);

  function renderizarRed({ item }: { item: RedWifi }) {
    const seleccionado = item.SSID === wifiSeleccionado;

    const esRedActual = item.SSID === ssidActual;

    return (
      <TouchableOpacity
        style={[
          estilos.tarjetaRed,
          seleccionado && estilos.tarjetaRedSeleccionada,
        ]}
        onPress={() => setWifiSeleccionado(item.SSID)}
      >
        <WifiIcon
          size={32}
          color={seleccionado ? COLORES.textoAzul : COLORES.textoBlanco}
        />

        <View style={{ flex: 1 }}>
          <Text
            style={[
              estilos.nombreRed,
              seleccionado && {
                color: COLORES.textoAzul,
              },
            ]}
          >
            {item.SSID}
          </Text>

          {esRedActual && (
            <Text style={estilos.etiquetaRedActual}>Red actual</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  if (cargando) {
    return (
      <View style={estilos.contenedorCargando}>
        <ActivityIndicator size="large" />
        <Text style={estilos.textoCargando}>Buscando redes Wi-Fi...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text style={[estilos.titulo, { flex: 1 }]}>Redes Wi-Fi</Text>

        <Boton
          onPress={cargarRedes}
          style={{
            padding: 4,
            borderRadius: 15,
            backgroundColor: COLORES.textoCielo,
          }}
        >
          <RefreshCcwIcon size={32} color={COLORES.textoBlanco} />
        </Boton>
      </View>

      {redes.length === 0 ? (
        <View style={estilos.contenedorCargando}>
          <Text style={estilos.textoCargando}>No se encontraron redes.</Text>
        </View>
      ) : (
        <FlatList
          data={redes}
          keyExtractor={(item) => item.BSSID}
          renderItem={renderizarRed}
          contentContainerStyle={{
            gap: 10,
            paddingVertical: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
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

  titulo: {
    color: COLORES.textoBlanco,
    fontSize: 22,
    fontWeight: "bold",
  },

  tarjetaRed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 15,
    backgroundColor: COLORES.botonInactivo,
  },

  tarjetaRedSeleccionada: {
    backgroundColor: COLORES.textoBlanco,
  },

  nombreRed: {
    color: COLORES.textoBlanco,
    fontSize: 18,
    fontWeight: "600",
  },

  etiquetaRedActual: {
    color: COLORES.textoAzul,
    fontSize: 14,
    marginTop: 2,
  },
});
