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
      <h6 class="text-h4 text-lg-h6 text-center my-4 color-rosa">Contactanos</h6>

      <v-form ref="registro" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormC.correo"
          :rules="emailRules"
          label="Correo"
          color="pink"
          dense
          filled
          rounded
        >
        </v-text-field>

        <v-text-field
          v-model="FormC.asunto"
          label="Titulo"
          color="pink"
          dense
          filled
          rounded
          required
        >
        </v-text-field>

        <v-textarea
          counter
          label="Comentario"
          v-model="FormC.mensaje"
          rows="4"
          dense
          filled
          rounded
          required
        >
        </v-textarea>

        <!--Text area para descripcion-->
      </v-form>
    </v-card-text>

    <v-card-actions class="d-flex flex-row mt-1 justify-center">
      <v-btn
        color="green"
        class="rounded-xl"
        tile
        depressed
        raised
        width="100"
        :disabled="!valid"
        @click="correoContacto"
        small
      >
        <span style="color: white; font-size: 12px;">Enviar</span>
      </v-btn>
      <!--btn enviar-->
      <v-btn
        color="primary"
        class="rounded-xl"
        tile
        depressed
        raised
        width="100"
        small
        @click="$store.dispatch('panelHerramientasContactanos', false)"
      >
        <span style="color: white; font-size: 12px;">Cancelar</span>
      </v-btn>
      <!--btn cancelar-->
    </v-card-actions>
  </v-card>
</template>

<script>
import GeneralMixins from "../mixins/general-mixins.js";
import { mapGetters } from "vuex";

export default {
  name: "contacto",
  mixins: [GeneralMixins],
  data() {
    return {
      herramientasLoader: false,
      valid: true,
      FormC: {
        correo: "",
        asunto: "",
        mensaje: "",
        anuncio: this.getIdAnuncioReportado,
      },
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      panelCSS: {
        panelCardHeight: "85vh",
      },
    };
  },
  computed: {
    ...mapGetters["getIdAnuncioReportado"],
  },
  methods: {
    async correoContacto() {
      let MutateResult;

      if (this.$refs.registro.validate()) {
        try {
          MutateResult = await this.mixinNuevoCorreoContactanos(this.FormC);
        } catch (error) {
          console.log("vue correoContacto...");
          console.dir(error);
          this.$store.dispatch("activationAlert", {
            type: "error",
            message: `>>>Error al registrar...>>>>${error}`,
          });
          throw error;
        }
        console.dir(MutateResult);
        this.$store.dispatch("activationAlert", {
          type: "success",
          message: `${MutateResult.mensaje}`,
        });
        this.mixinLlamadaRouter(MutateResult);
        return;
      }

      this.$store.dispatch("activationAlert", {
        type: "error",
        message: `Favor de llenar todos los campos requeridos!.`,
      });
    },
  },
};
</script>
<style>
</style>