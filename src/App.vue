<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center mx-3" style="cursor: pointer">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          :src="require('./assets/logos/logo_2x.png')"
          transition="scale-transition"
          width="40"
          @click="
            $router.push({ path: '/' }).catch((error) => {});
            $store.dispatch('panelHerramientasBusqueda', true);
            $store.dispatch('querySet', Query);
          "
        />
      </div>
      <!--Image-->

      <v-row align="center" justify="end">
        <v-hover v-slot:default="{ hover }">
          <v-btn
            color="green"
            class="mr-2 rounded-xl"
            :class="btnClasses['btnClass']"
            @click="anunciate"
            tile
            depressed
            raised
            rounded
          >
            <span
              style="color: white; min-width: 70px"
              v-if="btnClasses['span'] != 'hidden' || hover"
              class="mr-1"
              >Anunciaté
            </span>
            <font-awesome-icon
              :icon="['fa', 'bullhorn']"
              class="fa-2x"
              color="white"
              v-show="btnClasses['span'] === 'hidden'"
            ></font-awesome-icon>
          </v-btn>
        </v-hover>
        <!--Btn Anunciate-->

        <v-hover v-slot:default="{ hover }">
          <v-btn
            color="primary"
            class="mx-2 mr-8 rounded-xl"
            :class="btnClasses['btnClass']"
            @click="iniciandoSesion"
            depressed
            tile
            rounded
            v-if="!usuarioLoggeado"
          >
            <span
              style="color: white; min-width: 70px"
              v-if="btnClasses['span'] != 'hidden' || hover"
              >Login
            </span>
            <font-awesome-icon
              :icon="['fa', 'user']"
              class="fa-2x"
              v-show="btnClasses['span'] === 'hidden'"
            ></font-awesome-icon>
          </v-btn>
          <!--Btn Login-->

          <v-btn
            color="primary"
            class="mx-2 mr-8 rounded-xl"
            :class="btnClasses['btnClass']"
            @click="sideDashboard = !sideDashboard"
            tile
            depressed
            raised
            rounded
            v-else
          >
            <span
              style="color: white; min-width: 70px"
              v-if="btnClasses['span'] != 'hidden' || hover"
              >Dashboard
            </span>
            <font-awesome-icon
              :icon="['fa', 'bars']"
              class="fa-2x"
              v-show="btnClasses['span'] === 'hidden'"
            ></font-awesome-icon>
          </v-btn>
          <!--Btn Dashboard-->
        </v-hover>
      </v-row>
    </v-app-bar>
    <!--Top Nav Bar Bottons-->

    <v-navigation-drawer v-model="sideDashboard" absolute temporary>
      <div class="d-flex flex-row mb-8 ml-3 mr-1 mt-3">
        <div
          class="mr-auto"
          >
          <v-img
            alt="Vuetify Logo"
            contain
            :src="require('./assets/logos/logoH_3x.png')"
            transition="scale-transition"
            width="100"
            height="40"
          />
        </div>

        <v-btn
          fab
          small
          depressed
          color="white"
          class="ml-auto"
          @click="sideDashboard = !sideDashboard"
        >
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="fa-2x"
          ></font-awesome-icon>
        </v-btn>
      </div>
      <!--Sidedar Header-->

      <!--<div class="subtitle-1 text-center mb-8">Lorem Ipsum</div>
      Sidedar Subtile-->

      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4" color="primary" v-model="selectedItem">
          <v-list-item @click="$router.push({ path: '/dashboard' })">
            <v-list-item-title class="text-center"
              >Mis Anuncios</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="cambiarContraViewState">
            <v-list-item-title class="text-center">Cambiar Contraseña</v-list-item-title>
          </v-list-item>
          <v-list-item @click="contactanosViewState">
            <v-list-item-title class="text-center"
              >Contactanos</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="cerrarSesion">
            <v-list-item-title class="text-center"
              >Cerrar Sesion</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!--Sidedar List views-->
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <v-alert
        border="bottom"
        colored-border
        :type="Alert.type"
        :value="Alert.isActive"
        elevation="205"
        dismissible
        transition="slide-x-reverse-transition"
        style="
          position: sticky;
          bottom: 0;
          right: 0;
          z-index: 205;
          margin-left: auto;
          width: 50%;
          min-height: 65px;
          height: auto;
        "
      >
        {{ Alert.message }}
      </v-alert>
    </v-main>
  </v-app>
</template>

<script>
import GeneralMixins from "./mixins/general-mixins.js";
import UsuarioMixin from "./mixins/usuario-mixins.js";
import { mapGetters, mapState } from "vuex";

export default {
  name: "App",
  mixins: [UsuarioMixin, GeneralMixins],
  data() {
    return {
      sideDashboard: false,
      selectedItem: 0,
    };
  },
  computed: {
    ...mapGetters([
      "usuarioLoggeado"
    ]),
    ...mapState({
      _Ddls: (state) => state.panelHerramientas.ddls
    }),
    Alert() {
      return this.$store.state.alert.alert;
    },
    btnClasses() {
      const { xs, sm } = this.$vuetify.breakpoint;
      return xs || sm
        ? { span: "hidden", btnClass: "btn-menu-mbview" }
        : { span: "", btnClass: "btn-menu-pcview" };
    },
  },
  methods: {
    iniciandoSesion() {
      this.mixinLlamadaRouter({
        pagina: "home",
        componenteInterno: { panelHerramientasInicioSesion: true },
      });
    },
    cambiarContraViewState(){
      this.mixinLlamadaRouter({
        pagina: "home",
        componenteInterno: { panelHerramientasCambioContrasena: true }
      })
    },
    contactanosViewState() {
      this.mixinLlamadaRouter({
        pagina: "home",
        componenteInterno: { panelHerramientasContactanos: true },
      });
    },
    async cerrarSesion() {
      let DispatchResult;

      try {
        DispatchResult = await this.mixinCerrarSesion();
      } catch (error) {
        console.log("vue cerrarSesion... en error");
        console.dir(error);
       
        this.mixinLlamadaRouter(error);
        return;
      }

      console.log("vue cerrar sesion...");
      console.dir(DispatchResult);
      this.mixinLlamadaRouter(DispatchResult);
    },

    async anunciate() {
      let DispatchResult;
      console.log("vue anunciate...");

      try {
        DispatchResult = await this.$store.dispatch(
          "anunciateSet",
          null
        );
      } catch (error) {
        console.log("vue anunciate... en error");
        console.dir(error);
        this.mixinLlamadaRouter(error);
        return;
      }
      
      console.dir(DispatchResult);
      this.mixinLlamadaRouter(DispatchResult);
    },
  },
  async created() {
    let QueryEstadosResult;
    let _MixinResult;

    if(!this._Ddls.some(_Ddl => _Ddl.categoria == "ddlCategoriaAnuncio")){
      _MixinResult = await this.mixinDdlGeneral("ddlCategoriaAnuncio"); //Analizar, extraer en una sola llamada
      await this.$store.dispatch("ddls", {
        categoria: "ddlCategoriaAnuncio",
        categorias: _MixinResult.data
      });
    }

    if(!this._Ddls.some(_Ddl => _Ddl.categoria == "ddlRedesSociales")){
      _MixinResult = await this.mixinDdlGeneral("ddlRedesSociales"); //Analizar, extraer en una sola llamada
      await this.$store.dispatch("ddls", {
        categoria: "ddlRedesSociales",
        categorias: _MixinResult.data
      });
    }

    if(!this._Ddls.some(_Ddl => _Ddl.categoria == "ddlSexo")){
      _MixinResult = await this.mixinDdlGeneral("ddlSexo"); //Analizar, extraer en una sola llamada
      await this.$store.dispatch("ddls", {
        categoria: "ddlSexo",
        categorias: _MixinResult.data
      });
    }

    if(!this._Ddls.some(_Ddl => _Ddl.categoria == "ddlEstado")){
      _MixinResult = await this.mixinDdlGeneral("ddlEstado"); //Analizar, extraer en una sola llamada
      await this.$store.dispatch("ddls", {
        categoria: "ddlEstado",
        categorias: _MixinResult.data
      });
    }

    if(!this._Ddls.some(_Ddl => _Ddl.categoria == "ddlMunicipios")){
      _MixinResult = await this.mixinDdlGeneral("ddlMunicipios"); //Analizar, extraer en una sola llamada
      await this.$store.dispatch("ddls", {
        categoria: "ddlMunicipios",
        categorias: _MixinResult.data
      });
    }

  },
};
</script>

<style>
.btn-menu-mbview {
  width: auto;
}

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
  font-size: 12px !important;
  height: 50px;
}

/*******Input Selection*/

/*select's inner visual box*/
.select609 > .v-input__control > .v-input__slot {
  padding: 0 12px;
}

/*select's and text input place-holder label*/
.select609 > .v-input__control > .v-input__slot > .v-select__slot > .v-label,
.select609
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  input::placeholder {
  font-size: 13px !important;
  color: #7d7e80;
}

/*item visual view selected label*/
.select609
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > .v-select__selections
  > .v-select__selection {
  font-size: 13px !important;
}

/*Inputs radious*/
.error609TextField{
  border-radius: 7px;
}
</style>