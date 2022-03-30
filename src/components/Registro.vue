<template>
  <v-card
    :loading="herramientasLoader"
    class="rounded-xl d-flex flex-column"
    max-height="85vh"
    :height="panelCSS.panelCardHeight"
    min-height="20vh"
    elevation="2"
    outlined
  >
    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h6 text-center my-4 color-rosa">Registro</h6>

      <v-form ref="form_registro" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormR.usuario"
          :rules="emailRules"
          label="Correo"
          dense
          filled
          rounded
          required
        >
        </v-text-field>

        <v-text-field
          v-model="FormR.contrasena"
          :rules="contrasenaRules"
          label="Contraseña"
          dense
          filled
          rounded
          required
        >
        </v-text-field>

        <v-text-field
          label="Confirmar Contraseña"
          dense
          filled
          rounded
          required
        >
        </v-text-field>

        <v-text-field
          v-model="FormR.numero_telefonico"
          :rules="celularRules"
          label="Celular"
          dense
          filled
          rounded
          required
        >
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-row justify="center">
      <v-card-actions>
        <v-btn
          class="rounded-xl"
          depressed
          elevation="2"
          color="primary"
          width="100"
          :disabled="!valid"
          @click="registrandoUsuario"
          small
        >          
          <span style="color: white; font-size: 12px;">Registrarse</span>
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import GeneralMixins from "../mixins/general-mixins.js";

export default {
  mixins: [GeneralMixins],
  name: "registro",
  props: {},
  data() {
    return {
      herramientasLoader: false,
      valid: true,
      FormR: {
        usuario: "",
        contrasena: "",
        numero_telefonico: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      contrasenaRules: [(v) => !!v || "Contraseña es requerida"],
      celularRules: [(v) => !!v || "Contraseña es requerida"],
      panelCSS: {
        panelCardHeight: "82vh",
      },
    };
  },
  computed: {},
  methods: {
    async registrandoUsuario() {
      let MutateResult;

      if (this.$refs.form_registro.validate()) {
        try {
          console.log("vue registrandoUsuario... validado");
          console.dir(this.FormR);
          MutateResult = await this.mixinRegistro(this.FormR);
        } catch (error) {
          console.log("vue registrandoUsuario en error...");
          console.dir(error);
          this.$store.dispatch("activationAlert", {
            type: "error",
            message: `>>>Error al registrar...>>>>${error.mensaje}`,
          });
          return;
        }

        console.log("vue registrandoUsuario... MutateResult");
        console.dir(MutateResult);

        this.$store.dispatch("activationAlert", {
          type: "success",
          message: `${MutateResult.mensaje}`,
        });
        this.$store.dispatch("setSesion", MutateResult.data);
        this.$store.dispatch("panelHerramientasRegistro", false);
        this.mixinLlamadaRouter(MutateResult);
      }
    },
  },
};
</script>
<style>
</style>