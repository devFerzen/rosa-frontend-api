<template>
  <v-container fluid color="white" :class="{'container-mbview': cssPanelHerramientas === 'panel-herramientas-mbview'}">
    <v-row no-gutters aling="center" justify="center" v-if="!inicioSesionView && !registroView && !verificacionView && !actualizandoContrasenaView && !contactanosView">
      <v-col cols="12">
        <v-card style="height: 120px;" flat>
          <v-card-title class="text-center text-h4 text-md-h2 font-weight-bold" style="justify-content: center;">Los errores son para encontrarse.
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="start" justify="space-around" no-gutters>
      <v-col cols="12" :sm="WidthComponents.herramientasWidth.sm" :md="WidthComponents.herramientasWidth.lg"
         :class="[cssPanelHerramientas, correccionAlturaWbView]">
        <panel-herramientas
          v-if="!inicioSesionView && !registroView && !verificacionView && !actualizandoContrasenaView && !contactanosView"
          @activandoGrid="activandoGrid" @panelMinClass="panelMinClass" style="margin-top: 0!important;" />
        <inicio-sesion v-else-if="inicioSesionView" class="panel-inicioSesion-pcview" />
        <registro v-else-if="registroView" />

        <verificacion v-else-if="verificacionView" />
        <actualizando-contrasena v-else-if="actualizandoContrasenaView" />
        <contactanos v-else-if="contactanosView" />
      </v-col>
      <!--Panel Herramientas-->

      <v-col cols="12" :md="WidthComponents.sistemaWidth.lg">
        <espacio-publicitario
          v-if=" actualizandoContrasenaView || contactanosView" />

        <sistema-tarjetas-descripcion :fullAnuncioEstado="hayAnuncio" :colUsuarioDesc="WidthComponents.colUsuarioDesc" class="mx-2"
          v-else-if="!actualizandoContrasenaView && !contactanosView" />
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
      cssPanelHerramientas() {
        const { xs, sm, md } = this.$vuetify.breakpoint;
        this.panelHerramientasClass = xs || sm ? 'panel-herramientas-mbview' : 'panel-herramientas-pcview';
        return this.panelHerramientasClass;
      },
      hayAnuncio() {
        return this.id;
      },
      correccionAlturaWbView(){
        return this.inicioSesionView || this.registroView ? 'panelHerramientas-IS-correccion' : '';
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
      }
    },
    methods: {
      panelMinClass(Value) {
        /*Funcion solo la usa el componente panel de herramientas. para extenderlo hacia arriba*/
        console.log(`vue: panelMinClass => `);
        console.dir(Value);

        this.panelHerramientasClass = Value.panelHerramientasClass;
        this.mbViewTop = this.panelHerramientasClass === 'panel-herramientas-mbview' ? 'activarTopMin' : '';
      },
      activandoGrid(WidthComponents) {
        console.log(`Vue: activandoGrid =>`);
        console.dir(WidthComponents);
        this.WidthComponents = WidthComponents;
      },
    }
  };
</script>
<style>

  .container-mbview {
    padding: 0;
  }

  .panel-herramientas-mbview {
    position: sticky;
    top: 7.6vh;
    height: auto;
    transform: translateX(0%);
    z-index: 6;
    padding-right: 9px!important;
    padding-left: 9px!important;
  }

  .panel-herramientas-pcview {
    position: sticky;
    top: 12vh;
    height: auto;
    transform: translateX(0%);
    z-index: 6;
    padding-top: 0;
  }

  .panel-inicioSesion-pcview {
    height: 47vh;
    transform: translateX(0%);
    z-index: 6;
    padding-top: 0;
  }

  .activarTopMin{
    top: 7.6vh!important;
  }

  .panelHerramientas-IS-correccion{
    top: 0!important;
    margin-top: 20px;
  }
</style>