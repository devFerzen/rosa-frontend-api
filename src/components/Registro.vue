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
        (v) => !!v || "Correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo invalido",
      ],
      contrasenaRules: [(v) => !!v || "Contraseña es requerida"],
      celularRules: [(v) => !!v || "Celular invalido"],
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
          this.mixinLlamadaRouter(error);
          return;
        }

        console.log("vue registrandoUsuario... MutateResult");
        console.dir(MutateResult);
        this.mixinLlamadaRouter(MutateResult);
      }
    },
  },
};
</script>
<style>
</style>