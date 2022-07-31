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
        Lorem ipsum
      </h6>

      <v-form ref="verificacion" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormV.codigoVerificacion"
          :rules="codigoRules"
          label="Código Verificación"
          required
        >
        </v-text-field>
        <!--Codigo Verificacion-->
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-row align="left" justify="center">
        <v-col cols="12">
          <div class="text-caption grey--text text--lighten-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
            aliquaconsectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          @click="verificando"
        >
          Enviar
        </v-btn>
        <v-btn
          depressed
          outlined
          color="primary"
          width="140"
          @click="$store.dispatch('panelHerramientasVerificacion', false)"
        >
          Cancelar</v-btn
        >
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import GeneralMixins from "../mixins/general-mixins.js";
import UsuarioMixins from "../mixins/usuario-mixins.js";

export default {
  name: "verificacion",
  mixins: [GeneralMixins, UsuarioMixins],
  data() {
    return {
      herramientasLoader: false,
      valid: true,
      FormV: {
        codigoVerificacion: "",
      },
      codigoRules: [(v) => !!v || "Código es requerido"],
      panelCSS: {
        panelCardHeight: "85vh",
      },
    };
  },
  computed: {
    tipoVerificacion() {
      return this.$store.state.tipoVerificacion;
    },
  },
  methods: {
    async verificando() {
      //Validar la accion
      let MutateResult, params;

      if (!this.$refs.verificacion.validate()) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `Favor de llenar todos los campos requeridos!.`,
        });
        return;
      }

      console.log("vue verificando...");

      try {
        //Según su tipo de verificación
        if (
          this.tipoVerificacion === "verificacionUsuario" ||
          this.tipoVerificacion === "verificacionUsuarioContrasena"
        ) {
          console.log(
            "verificacionUsuarioContrasena || verificacionUsuario: ",
            this.tipoVerificacion
          );

          params = {
            input: this.FormV.codigoVerificacion,
            usuario: this.$store.state.usuario.usuario.usuario,
            clean: false,
          };

          if (this.tipoVerificacion === "verificacionUsuario") {
            params.clean = true;
          }
          console.dir(params);
          MutateResult = await this.mixinVerificacionUsuarioComparacion(params);
        }
        //Llamada mixinVerificacionUsuarioComparacion()

        if (this.tipoVerificacion === "verificacionCelular") {
          console.log(`verificacionCelular: ${this.tipoVerificacion}`);
          params = {
            input: this.FormV.codigoVerificacion,
          };
          MutateResult = await this.mixinVerificacionCelularComparacion(params);
        }
        //Llamada mixinVerificacionCelularComparacion()
      } catch (error) {
        console.log("vue verificando en error...");
        console.dir(error);
        this.mixinLlamadaRouter(error);
        return;
      }

      this.mixinLlamadaRouter(MutateResult);
    },
  },
  async created() {
    // AFSS: No mantener vivo este componente para que así se puede llamar una y otra vez verificacionCelularCreacion esta manda correo del nuevo codigo
    let MutateResult;
    if (this.tipoVerificacion === "verificacionCelular") {
      try {
        //Cambiar a una nueva función esta llamada porque primero debe de validar
        console.log("created verificacionCelular...");
        MutateResult = await this.mixinVerificacionCelularCreacion();
      } catch (error) {
        console.log("vue created mixinVerificacionCelularCreacion...");
        console.dir(error);
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `${error.mensaje}`,
        });
        return;
      }
      console.dir(MutateResult);
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: `${MutateResult.mensaje}`,
      });
      this.mixinLlamadaRouter(MutateResult);
    }
  },
};
</script>
<style></style>
