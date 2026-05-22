import Boton from "@/componentes/boton";
import PantallaContenedor from "@/componentes/pantalla-contenedor";
import Switch from "@/componentes/switch";
import { COLORES, EstilosGlobales } from "@/estilos";
import { useRouter } from "expo-router";
import { HouseIcon, LightbulbIcon, SettingsIcon } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [lucesActivadas, setLucesActivadas] = useState(false);
  const [cocherAbierta, setCocherAbierta] = useState(false);
  const [paredLlorosaActivada, setParedLlorsaActivada] = useState(false);

  const router = useRouter();

  return (
    <PantallaContenedor>
      {/* Header */}
      <View style={estilos.contenedorHeader}>
        <Text style={[EstilosGlobales.TextoBlanco, estilos.titulo]}>
          Bienvenido!
        </Text>

        <Boton
          style={[estilos.botonConfigurar]}
          onPress={() => router.push("/configuracion")}
        >
          <SettingsIcon color="white" size={32} />
        </Boton>
      </View>

      {/* Contenido */}
      <View style={estilos.contenedorContenido}>
        {/* Notificacion 'Jardin programado' */}
        <View style={estilos.contenedorNotificacion}>
          <Text style={[EstilosGlobales.TextoAzul, estilos.textoContenedor]}>
            Pared llorosa programado
          </Text>
        </View>

        {/* Carrusel de luces */}
        <View></View>

        {/* Dispositivos */}
        <View style={estilos.contenedorDispositivos}>
          <Text style={estilos.tituloDispositivos}>Dispositivos</Text>

          {/* Primera fila  */}
          <View style={estilos.filaBotones}>
            {/* Luces */}
            <Boton
              style={[estilos.botones, EstilosGlobales.BotonApagado]}
              containerStyle={{ flex: 1 }}
            >
              <Text style={[EstilosGlobales.TextoAzul, estilos.textoBoton]}>
                Luces
              </Text>
              <View style={estilos.columnaBotones}>
                <LightbulbIcon size={56} color={COLORES.textoAzul} />
                <Switch
                  value={lucesActivadas}
                  onValueChange={() => setLucesActivadas((prev) => !prev)}
                />
              </View>
            </Boton>

            {/* Porton*/}
            <Boton
              style={[estilos.botones, EstilosGlobales.BotonApagado]}
              containerStyle={{ flex: 1 }}
            >
              <Text style={[EstilosGlobales.TextoAzul, estilos.textoBoton]}>
                Portón
              </Text>

              <View style={estilos.columnaBotones}>
                <HouseIcon size={56} color={COLORES.textoAzul} />
                <Switch
                  value={cocherAbierta}
                  onValueChange={() => setCocherAbierta((prev) => !prev)}
                />
              </View>
            </Boton>
          </View>

          {/* Segunda fila  */}
          <View style={estilos.filaBotones}>
            {/*Pared llorosa*/}
            <Boton
              style={[estilos.botones, EstilosGlobales.BotonApagado]}
              containerStyle={{ flex: 1 }}
            >
              <Text style={[EstilosGlobales.TextoAzul, estilos.textoBoton]}>
                Pared Llorosa
              </Text>

              <View style={estilos.columnaBotones}>
                <HouseIcon size={56} color={COLORES.textoAzul} />
                <Switch
                  value={paredLlorosaActivada}
                  onValueChange={() => setParedLlorsaActivada((prev) => !prev)}
                />
              </View>
            </Boton>
          </View>
        </View>
      </View>
    </PantallaContenedor>
  );
}

const estilos = StyleSheet.create({
  contenedorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  titulo: {
    fontSize: 46,
    fontWeight: "bold",
    maxWidth: 250,
  },
  botonConfigurar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 10,
    padding: 10,
  },

  contenedorContenido: {
    marginTop: 30,
    gap: 5,
  },

  contenedorNotificacion: {
    backgroundColor: COLORES.botonInactivo,
    borderRadius: 10,
    padding: 10,
  },
  textoContenedor: {
    fontSize: 18,
    fontWeight: "bold",
  },

  contenedorDispositivos: {
    gap: 20,
  },
  tituloDispositivos: {
    color: COLORES.textoBlanco,
    fontWeight: "bold",
    fontSize: 36,
  },
  filaBotones: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textoBoton: {
    fontSize: 28,
    fontWeight: "bold",
  },
  columnaBotones: {
    flexDirection: "column",
    gap: 5,
  },
});
