<template>
  <v-container fluid class="white">
    <v-row align="start" justify="center">
      <v-col
        cols="12"
        :lg="widthComponents.herramientasWidth"
        :class="alturaPanelHerramientas"
        style="z-index:2;">
        <panel-herramientas v-if="!iniciandoSesion && !registrandose" @activandoGrid="activandoGrid" @panelMinimizeH="panelMinimizeH" />
        <inicio-sesion v-else-if="iniciandoSesion" />
        <registro v-else-if="registrandose" />
      </v-col>
      <v-col cols="12" :lg="widthComponents.sistemaWidth">
        <espacio-publicitario v-if="iniciandoSesion || registrandose" />
        <sistema-tarjetas-descripcion
          :fullAnuncioEstado="hayAnuncio"
          v-else-if="!iniciandoSesion && !registrandose"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PanelHerramientas from "@/components/Panel-Herramientas";
import SistemaTarjetasDescripcion from "@/components/Sistema-Tarjetas-Descripcion";
import InicioSesion from "@/components/Inicio-Sesion";
import Registro from "@/components/Registro";
import EspacioPublicitario from "@/components/Espacio-Publicitario";
import axios from "axios";

export default {
  name: "home",
  props: {
    id: {
      default: false,
    },
  },
  data() {
    return {
      panelHerramientasClass: ''
    }
  },
  components: {
    PanelHerramientas,
    SistemaTarjetasDescripcion,
    InicioSesion,
    Registro,
    EspacioPublicitario,
  },
  data() {
    return {
      widthComponents: {
        herramientasWidth: 3,
        sistemaWidth: 9,
        _herramientasWidth: 3,
        _sistemaWidth: 9,
      }
    };
  },
  computed: {
    alturaPanelHerramientas() {
      const { xs, sm } = this.$vuetify.breakpoint;
      this.panelHerramientasClass = xs || sm ? 'panel-herramientas-mbview' : 'panel-herramientas-pcview';
      return this.panelHerramientasClass;
    },
    hayAnuncio() {
      return this.id;
    },
    iniciandoSesion() {
      return this.$store.state.iniciandoSesion;
    },
    registrandose() {
      return this.$store.state.registrandose;
    },
  },
  methods: {
    ampliandoHerramientas() {
      this.widthComponents.herramientasWidth =
        this.widthComponents.herramientasWidth !== 12
          ? 12
          : this.widthComponents._herramientasWidth;
      this.widthComponents.sistemaWidth =
        this.widthComponents.sistemaWidth !== 12
          ? 12
          : this.widthComponents._sistemaWidth;
    },
    panelMinimizeH(Value) {
      console.log(`vue: panelMinimizeH => `);
      console.dir(Value);

      this.panelHerramientasClass = Value.panelHerramientasClass;
    },
    activandoGrid(WidthComponents) {
      console.log(`Vue: activandoGrid =>`);
      console.dir(WidthComponents);

      this.widthComponents.herramientasWidth =
        WidthComponents.herramientasWidth;
      this.widthComponents.sistemaWidth = WidthComponents.sistemaWidth;
    },
  },
  mounted() {},
};
</script>
<style>
.panel-herramientas-mbview {
  position: sticky;
  height: 24vh;
  top: 9vh;
  max-height: calc(24% - 9vh);
  transform: translateX(0%);
  z-index: 2;
}

.panel-herramientas-pcview {
  position: sticky;
  height: 100vh;
  top: 9vh;
  max-height: calc(100% - 9vh);
  transform: translateX(0%);
  z-index: 2;
}
</style>
