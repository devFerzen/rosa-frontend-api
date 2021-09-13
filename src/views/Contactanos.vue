<template>
  <v-container fluid fill-height class="white">
    <v-row align="start" justify="center">
      <v-col cols="12" :lg="widthComponents.herramientasWidth" :class="panelHerramientasClases">
        <panel-herramientas v-if="!iniciandoSesion && !registrandose && !panelHerramientasContactanos"
          @activandoGrid="activandoGrid" @panelMinimizeH="panelMinimizeH" />
        <inicio-sesion v-else-if="iniciandoSesion" />
        <registro v-else-if="registrandose" />
        <contacto v-else-if="panelHerramientasContactanos" />
      </v-col>
      <v-col cols="12" :lg="widthComponents.sistemaWidth">
        <espacio-publicitario v-if="iniciandoSesion || registrandose" />

        <sistema-tarjetas-descripcion :fullAnuncioEstado="hayAnuncio" v-else-if="!iniciandoSesion && !registrandose" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Posible eliminación y se pasa hacer una panel común
  import PanelHerramientas from "@/components/Panel-Herramientas";
  import SistemaTarjetas from "@/components/Sistema-Tarjetas";
  import InicioSesion from "@/components/Inicio-Sesion";
  import Registro from "@/components/Registro";
  import Contacto from "@/components/Contacto";
  import EspacioPublicitario from "@/components/Espacio-Publicitario";
  import axios from "axios";

  export default {
    name: "contactanos",
    props: {
      id: {
        default: "",
      },
    },
    components: {
      PanelHerramientas,
      SistemaTarjetas,
      InicioSesion,
      Registro,
      EspacioPublicitario,
      Contacto
    },
    data() {
      return {
        widthComponents: {
          herramientasWidth: 3,
          sistemaWidth: 9,
          _herramientasWidth: 3,
          _sistemaWidth: 9,
        },
        panelHerramientasClases: "panel-herramientas-pcview",
      };
    },
    computed: {
      hayAnuncio() {
        if (!this.id) {
          return false;
        }
        return true;
      },
      iniciandoSesion() {
        return this.$store.state.inicioSesionView;
      },
      registrandose() {
        return this.$store.state.registrandose;
      },
      panelHerramientasContactanos() {
        return this.$store.state.panelHerramientasContactanos;
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

        this.panelHerramientasClases = Value.panelHerramientasClases;
      },
      activandoGrid(WidthComponents) {
        console.log(`Vue: activandoGrid =>`);
        console.dir(WidthComponents);

        this.widthComponents.herramientasWidth =
          WidthComponents.herramientasWidth;
        this.widthComponents.sistemaWidth = WidthComponents.sistemaWidth;
      },
    },
    created() {
      this.$store.dispatch('panelHerramientasContactanos', true);
    },
    mounted() { },
  };
</script>
<style>
  .panel-herramientas-mbview {
    position: sticky;
    height: 24vh;
    top: 9vh;
    max-height: calc(24% - 9vh);
    transform: translateX(0%);
    z-index: 1;
  }

  .panel-herramientas-pcview {
    position: sticky;
    height: 100vh;
    top: 9vh;
    max-height: calc(100% - 9vh);
    transform: translateX(0%);
    z-index: 1;
  }
</style>