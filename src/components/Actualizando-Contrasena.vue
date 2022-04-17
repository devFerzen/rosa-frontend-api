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
      <h6 class="text-h4 text-lg-h6 text-center my-4 color-rosa">Actualización Contraseña</h6>

      <v-form ref="verificacion" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormAC.nuevaContrasena"
          :rules="contrasenaRules"
          label="Nueva Contraseña"
          dense
          filled
          rounded
          required
        >
        </v-text-field>
        <v-text-field
          v-model="FormAC.repetirContrasena"
          :rules="contrasenaValidacion"
          label="Confirmar Contraseña"
          dense
          filled
          rounded
          required
        >
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-card-text class="mt-1">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="text-caption text-center text--lighten-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et.
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn
          depressed
          elevation="2"
          color="primary"
          width="140"
          :disabled="!valid"
          @click="actualizarContrasena"
        >
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import GeneralMixins from "../mixins/general-mixins.js";

export default {
  name: "cambioContrasena",
  mixins: [GeneralMixins],
  components: {},
  data() {
    return {
      herramientasLoader: false,
      valid: true,
      FormAC: {
        nuevaContrasena: "",
        repetirContrasena: "",
      },
      contrasenaRules: [(v) => !!v || "Contraseña es requerida"],
      contrasenaValidacion: [(v) => !!v || "Contraseña no coincide"],
      panelCSS: {
        panelCardHeight: "82vh",
      },
    };
  },
  computed: {},
  methods: {
    async actualizarContrasena() {
      let MutateResult, params;
      console.log("vue actualizarContrasena...");

      if (!this.$refs.verificacion.validate()) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `Favor de llenar todos los campos!`,
        });
        return;
      }

      try {
        params = {
          input: this.$store.state.usuario.usuario.verificacionUsuario,
          usuario: this.$store.state.usuario.usuario.usuario,
          contrasena: this.FormAC.nuevaContrasena,
        };
        console.dir(params);
        MutateResult = await this.mixinRestablecerContrasena(params);
      } catch (error) {
        console.log("vue actualizarContrasena en error...");
        console.dir(error);
        this.mixinLlamadaRouter(error);
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `>>>Error al verificar tu códigio...>>>>${error.mensaje}`,
        });
        return;
      }

      console.dir(MutateResult);
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: `${MutateResult.mensaje}`,
      });
      
      this.mixinCerrarSesion();
      this.mixinLlamadaRouter(MutateResult);
    },
  },
};
</script>
<style>
</style>