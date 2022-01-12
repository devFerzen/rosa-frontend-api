<template>
  <v-container fluid class="white">
    <v-row no-gutters aling="center" justify="center">
      <v-col cols="12" sm="7">
        <v-card style="height: 80px;" flat>
          <v-card-title class="center" style="text-align: center; font-size:38px;">Los errores son para encontrarse.
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="start" justify="center" style="margin-top: 0;">
      <v-col cols="12" :lg="WidthComponents.herramientasWidth.lg" :md="WidthComponents.herramientasWidth.md"
        :sm="WidthComponents.herramientasWidth.sm" :class="alturaPanelHerramientas">
        <panel-herramientas
          v-if="!inicioSesionView && !registroView && !verificacionView && !actualizandoContrasenaView && !contactanosView"
          @activandoGrid="activandoGrid" @panelMinClass="panelMinClass" />
        <inicio-sesion v-else-if="inicioSesionView" />
        <registro v-else-if="registroView" />

        <verificacion v-else-if="verificacionView" />
        <actualizando-contrasena v-else-if="actualizandoContrasenaView" />
        <contactanos v-else-if="contactanosView" />
      </v-col>
      <!--Panel Herramientas-->

      <v-col cols="12" :lg="WidthComponents.sistemaWidth.lg">
        <espacio-publicitario
          v-if="inicioSesionView || registroView || verificacionView || actualizandoContrasenaView || contactanosView" />

        <sistema-tarjetas-descripcion :fullAnuncioEstado="hayAnuncio"
          v-else-if="!inicioSesionView && !registroView && !verificacionView && !actualizandoContrasenaView && !contactanosView" />
      </v-col>
      <!--Cuerpo-->
    </v-row>
  </v-container>
</template>

<script>
  import PanelHerramientas from "@/components/Panel-Herramientas";
  import SistemaTarjetasDescripcion from "@/components/Sistema-Tarjetas-Descripcion";
  import InicioSesion from "@/components/Inicio-Sesion";
  import Registro from "@/components/Registro";
  import Verificacion from "@/components/Verificacion";
  import ActualizandoContrasena from "@/components/Actualizando-Contrasena";
  import Contactanos from "@/components/Contacto";
  import EspacioPublicitario from "@/components/Espacio-Publicitario";

  export default {
    name: "home",
    props: {
      id: {
        default: false,
      },
    },
    components: {
      PanelHerramientas,
      SistemaTarjetasDescripcion,
      InicioSesion,
      Registro,
      Verificacion,
      ActualizandoContrasena,
      Contactanos,
      EspacioPublicitario
    },
    data() {
      return {
        WidthComponents: {
          herramientasWidth: {
            lg: 3,
            md: 6,
            sm: 8
          },
          sistemaWidth: {
            lg: 9
          }
        },
        panelHerramientasClass: ''
      };
    },
    computed: {
      alturaPanelHerramientas() {
        return this.panelHerramientasClass;
      },
      hayAnuncio() {
        return this.id;
      },
      inicioSesionView() {
        return this.$store.state.inicioSesionView;
      },
      registroView() {
        return this.$store.state.registroView;
      },
      verificacionView() {
        return this.$store.state.verificacionView;
      },
      actualizandoContrasenaView() {
        return this.$store.state.actualizandoContrasenaView;
      },
      contactanosView() {
        return this.$store.state.contactoView;
      },
    },
    methods: {
      panelMinClass(Value) {
        console.log(`vue: panelMinClass => `);
        console.log(Value.panelHerramientasClass);
        this.panelHerramientasClass = Value.panelHerramientasClass;
      },
      activandoGrid(WidthComponents) {
        console.log(`Vue: activandoGrid =>`);
        console.dir(WidthComponents);

        this.WidthComponents = WidthComponents;
      },
    },
    mounted() { },
    created() {
      const { xs, sm } = this.$vuetify.breakpoint;
      this.panelHerramientasClass = xs || sm ? 'panel-herramientas-mbview' : 'panel-herramientas-pcview';
    }
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
    height: 50vh;
    top: 24vh;
    max-height: calc(100% - 24vh);
    transform: translateX(0%);
    z-index: 2;
    padding-top: 0;
  }
</style>