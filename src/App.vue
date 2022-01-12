<template>
  <v-app>
    <v-app-bar app color="white" class="hidden-sm-and-down">
      <div class="d-flex align-center mx-3" style="cursor:pointer;">
        <v-img alt="Vuetify Logo" class="shrink" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"
          @click="$router.push({path:'/'}).catch(error=>{}); $store.dispatch('panelHerramientasBusqueda', true);" />
      </div>

      <v-row align="center" justify="end">
        <v-btn color="green" class="mr-2 rounded-lg" :class="btnClasses['btnClass']" @click="anunciate" tile depressed
          raised rounded>
          <span :class="btnClasses['span']" style="color:white;">Anunciaté</span>
        </v-btn>
        <!--Btn Anunciate-->

        <v-btn color="primary" class="mx-2 rounded-lg" :class="btnClasses['btnClass']" @click="iniciandoSesion"
          depressed tile rounded v-if="!usuarioLoggeado">
          <span :class="btnClasses['span']" style="color:white;">Login</span>
        </v-btn>
        <!--Btn Login-->

        <v-btn color="primary" class="mx-2 rounded-lg" :class="btnClasses['btnClass']"
          @click="sideDashboard = !sideDashboard" depressed tile rounded v-else>
          <span :class="btnClasses['span']" style="color:white;">Dashboard</span>
        </v-btn>
        <!--Btn Dashboard-->
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="sideDashboard" absolute bottom temporary>
      <div class="d-flex flex-row mb-8">
        <div>
          <v-img alt="Vuetify Logo" class="shrink" contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
            width="40" />
        </div>
        <v-btn fab small depressed color="white" class="ml-auto" @click="sideDashboard = !sideDashboard">
          <font-awesome-icon :icon="['fas','times']" class="fa-2x"></font-awesome-icon>
        </v-btn>
      </div>
      <!--Sidedar Header-->

      <div class="text-h5 text-xl-h6 mb-1 font-weight-bold text-center">
        Lorem Ipsum
      </div>
      <!--Sidedar Tile-->

      <div class="subtitle-1 text-center mb-8">
        Lorem Ipsum
      </div>
      <!--Sidedar Subtile-->

      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item @click="$router.push({path:'/dashboard'})">
            <v-list-item-title class="text-center">Mis Anuncios</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({path:'/compras'})">
            <v-list-item-title class="text-center">Compras</v-list-item-title>
          </v-list-item>
          <v-list-item @click="contactanos">
            <v-list-item-title class="text-center">Contactanos</v-list-item-title>
          </v-list-item>
          <v-list-item @click="cerrarSesion">
            <v-list-item-title class="text-center">Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!--Sidedar List views-->
    </v-navigation-drawer>

    <v-alert border="bottom" colored-border :type="Alert.type" :value="Alert.isActive" elevation="205" dismissible
      transition="slide-x-reverse-transition"
      style="position: absolute; top: 80px; z-index:205; right: 0; width: 50%; height:65px;">
      {{Alert.message}}
    </v-alert>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import GeneralMixins from './mixins/general-mixins.js';
  import UsuarioMixin from './mixins/usuario-mixins.js';
  import { mapGetters } from 'vuex';
  import * as GraphqlCalls from './graphql/general-mutations';

  export default {
    name: 'App',
    mixins: [UsuarioMixin, GeneralMixins],
    data() {
      return {
        sideDashboard: false
      }
    },
    computed: {
      ...mapGetters(["usuarioLoggeado", "getDdlEstados", "getDdlMunicipios", "getDdlCategorias", "getDdlSexo", "getDdlRedesSociales"]),
      Alert() {
        return this.$store.state.alert.alert;
      },
      btnClasses() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { 'span': 'hidden', 'btnClass': 'btn-menu-mbview' } : { 'span': '', 'btnClass': 'btn-menu-pcview' };
      }
    },
    methods: {
      iniciandoSesion() {
        this.mixinLlamadaRouter({ pagina: 'home', componenteInterno: { panelHerramientasInicioSesion: true } });
      },
      contactanos() {
        this.mixinLlamadaRouter({ pagina: 'home', componenteInterno: { panelHerramientasContactanos: true } });
      },
      async cerrarSesion() {
        let DispatchResult;
        try {
          DispatchResult = await this.mixinCerrarSesion();
        } catch (error) {
          console.log("vue anunciate... en error");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          return;
        }
        console.log("vue cerrar sesion...");
        console.dir(DispatchResult);

        this.$store.dispatch('activationAlert', { type: 'success', message: `${DispatchResult.mensaje}` });
        this.mixinLlamadaRouter(DispatchResult);
      },
      async anunciate() {
        let DispatchResult;
        console.log("vue anunciate...");

        try {
          this.$store.dispatch('anuncioEditSet', null);
          DispatchResult = await this.$store.dispatch('crearAnuncioDisplay', null);
        } catch (error) {
          console.log("vue anunciate... en error");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          return;
        }
        console.log("vue anunciate...");
        console.dir(DispatchResult);
        this.mixinLlamadaRouter(DispatchResult);
      },
      async actualizandoContrasena() {
        let queryResult;

        await this.mixinContrasenaActualizar({ contrasenaVieja: '123', contrasenaNueva: '000' })
          .then(result => {
            console.log("vue mixinContrasenaActualizar");
            console.dir(queryResult); //Cuando no hay id regresa error si pasa por el reject pero pasa como resulto x.X valor undefiend
          })
          .catch(error => {
            console.log("vue mixinContrasenaActualizar en error...");
            this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Llamada mixinContrasenaActualizar... >>>>${error.message}` });
            return;
          });
      }
    },
    async created() {
      let QueryEstadosResult;

      if (this.getDdlEstados[0]['no_id'] == 0) {
        //console.log("correr query en mounted ddlEstado");
        QueryEstadosResult = await this.mixinDdlGeneral("ddlEstado");
        await this.$store.dispatch('ddls', { categoria: 'ddlEstado', categorias: QueryEstadosResult.data.queryddlsByCategoria });
      }

      if (this.getDdlMunicipios[0]['no_id'] == 0) {
        //console.log("correr query en mounted ddlMunicipios");
        QueryEstadosResult = await this.mixinDdlGeneral("ddlMunicipios");
        await this.$store.dispatch('ddls', { categoria: 'ddlMunicipios', categorias: QueryEstadosResult.data.queryddlsByCategoria });
      }

      if (this.getDdlCategorias[0]['no_id'] == 0) {
        //console.log("correr query en mounted ddlCategoriaAnuncio");
        QueryEstadosResult = await this.mixinDdlGeneral("ddlCategoriaAnuncio");
        await this.$store.dispatch('ddls', { categoria: 'ddlCategoriaAnuncio', categorias: QueryEstadosResult.data.queryddlsByCategoria });
      }

      if (this.getDdlSexo[0]['no_id'] == 0) {
        //console.log("correr query en mounted ddlSexo");
        QueryEstadosResult = await this.mixinDdlGeneral("ddlSexo");
        await this.$store.dispatch('ddls', { categoria: 'ddlSexo', categorias: QueryEstadosResult.data.queryddlsByCategoria });
      }

      if (this.getDdlRedesSociales[0]['no_id'] == 0) {
        //console.log("correr query en mounted ddlRedesSociales");
        QueryEstadosResult = await this.mixinDdlGeneral("ddlRedesSociales");
        await this.$store.dispatch('ddls', { categoria: 'ddlRedesSociales', categorias: QueryEstadosResult.data.queryddlsByCategoria });
      }
    }
  };
</script>

<style>
  .btn-menu-mbview {}

  .btn-menu-pcview {
    width: 110px;
  }

  .required label::after {
    content: "*";
  }

  * {
    text-transform: none !important;
  }

  .select609 {
    font-size: 10px !important;
    height: 50px;
  }

  /*******Input Selection*/

  /*select's inner visual box*/
  .select609>.v-input__control>.v-input__slot {
    padding: 0 12px;
  }

  /*select's and text input place-holder label*/
  .select609>.v-input__control>.v-input__slot>.v-select__slot>.v-label,
  .select609>.v-input__control>.v-input__slot>.v-text-field__slot input::placeholder {
    font-size: 11px !important;
    color: #9fe676;
  }

  /*item visual view selected label*/
  .select609>.v-input__control>.v-input__slot>.v-select__slot>.v-select__selections>.v-select__selection {
    font-size: 11px !important;
    color: #e0409a;
  }
</style>