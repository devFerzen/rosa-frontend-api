<template>
  <v-card
    :loading="herramientasLoader"
    class="rounded-xl d-flex flex-column"
    max-height="82vh"
    :height="panelCSS.panelCardHeight"
    min-height="20vh"
    elevation="2"
    outlined
  >
    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h6 text-center my-4 color-rosa">
        Inicar Sesión
      </h6>

      <v-form ref="inicioSesion" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormIS.usuario"
          :rules="emailRules"
          label="correo"
          color="pink"
          dense
          filled
          rounded
          required
        >
        </v-text-field>

        <v-text-field
          v-model="FormIS.contrasena"
          :rules="contrasenaRules"
          label="contraseña"
          color="pink"
          dense
          filled
          rounded
          required
        ></v-text-field>
      </v-form>
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="12" class="d-flex">
          <v-btn
            plain
            text
            @click="abrirRegistro"
            style="margin-left: auto; margin-right: auto;"
          >
            <div
              class="text-caption text--lighten-1 text-center color-rosa"
              style="text-transform: capitalize;"
            >
              Registrarte Aquí!
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn
          class="boton-primario background-rosa color-white"
          elevation="2"
          width="140"
          :disabled="!valid"
          @click="iniciandoSesion"
          depressed
        >
          entrar
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import PanelHerramientas from "@/components/Panel-Herramientas";
import GeneralMixins from "../mixins/general-mixins.js";

export default {
  mixins: [GeneralMixins],
  name: "inicio-sesion",
  components: {
    PanelHerramientas,
  },
  data() {
    return {
      herramientasLoader: false,
      valid: true,
      panelCSS: {
        panelCardHeight: "82vh",
      },
      FormIS: {
        usuario: "",
        contrasena: "",
      },
      emailRules: [
        (v) => !!v || "Correo es requerida",
        (v) => /.+@.+\..+/.test(v) || "Correo es invalido",
      ],
      contrasenaRules: [(v) => !!v || "Contraseña es requerida"],
    };
  },
  computed: {},
  methods: {
    abrirRegistro() {
      this.$store.dispatch("panelHerramientasRegistro", true);
    },
    /*
        Descripción: Acción para iniciar sesion con correo y contraseña
       */
    async iniciandoSesion() {
      let MutateResult = {
        componenteInterno: {
          activationAlert: {
            type: "warning",
            message: `Favor de llenar todos los campos requeridos!.`
          }
        }
      };
      console.log("vue iniciandoSesion... validado");
      console.dir(this.FormIS);

      if (!this.$refs.inicioSesion.validate()) {
        this.mixinLlamadaRouter(MutateResult);
        return;
      }

      try {
        MutateResult = await this.mixinInicioSesion(this.FormIS);
      } catch (error) {
        console.log("vue iniciandoSesion en error...");
        console.dir(error);
        
        this.mixinLlamadaRouter(error);
        return;
      }

      console.log("vue iniciandoSesion... MutateResult");
      console.dir(MutateResult);
      this.mixinLlamadaRouter(MutateResult);
    },

    async restablecerContrasena() {
      let MutateResult = {
        componenteInterno: {
          activationAlert: {
            type: "error",
            message: `Favor de indicar el usuario del cuál desea reinicar la contraseña`
          }
        }
      };
      console.log("vue restablecerContrasena...");

      if (!this.FormIS.usuario) {
        this.mixinLlamadaRouter(MutateResult);
        return;
      }

      try {
        MutateResult = await this.mixinSolicitarRestablecerContrasena(
          this.FormIS.usuario
        );
      } catch (error) {
        console.log("vue restablecerContrasena... en error");
        console.dir(error);
        
        this.mixinLlamadaRouter(MutateResult);
        return;
      }

      this.mixinLlamadaRouter(MutateResult);
    },
  },
};
</script>
<style>
.panel-herramientas-mb {
  position: sticky;
  height: 28vh;
  top: 9vh;
  max-height: calc(28vh - 9vh);
  transform: translateX(0%);
  z-index: 1;
}

.panel-herramientas {
  position: sticky;
  height: 100vh;
  top: 9vh;
  max-height: calc(100% - 9vh);
  transform: translateX(0%);
}
</style>
