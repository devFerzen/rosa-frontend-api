<template>
  <v-card :loading="herramientasLoader" class="mt-2 rounded-xl d-flex flex-column" max-height="85vh"
    :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

      <v-form ref="registro" v-model="valid" lazy-validation>
        <v-text-field v-model="FormC.correo" :rules="emailRules" label="Correo" required>
        </v-text-field>

        <v-text-field v-model="FormC.asunto" label="Titulo" required>
        </v-text-field>

        <v-textarea counter label="Comentario" v-model="FormC.mensaje">
        </v-textarea>

        <!--Text area para descripcion-->
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-row align="left" justify="center">
        <v-col cols="12">
          <div class="text-caption grey--text text--lighten-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </v-col>
      </v-row>
    </v-card-text>


    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn depressed elevation="2" color="primary" width="140" :disabled="!valid" @click="enviandoCorreo"> Enviar
        </v-btn>
        <v-btn depressed outlined color="primary" width="140"
          @click="$store.dispatch('panelHerramientasContactanos', false);"> Cancelar</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
  import GeneralMixins from '../mixins/general-mixins.js';

  export default {
    name: 'contacto',
    mixins: [GeneralMixins],
    data() {
      return {
        herramientasLoader: false,
        valid: true,
        FormC: {
          correo: '',
          asunto: '',
          mensaje: ''
        },
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        panelCSS: {
          panelCardHeight: '85vh'
        },
      }
    },
    computed: {

    },
    methods: {
      async enviandoCorreo() {
        let MutateResult;

        if (this.$refs.registro.validate()) {
          try {
            MutateResult = await this.mixinNuevoCorreoContactanos(this.FormC);
          } catch (error) {
            console.log("vue enviandoCorreo...");
            console.dir(error);
            this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al registrar...>>>>${error}` });
            throw error;
          }
          console.dir(MutateResult);
          this.$store.dispatch("activationAlert", { type: "success", message: `${MutateResult.mensaje}` });
          this.mixinLlamadaRouter(MutateResult);
          return;
        }

        this.$store.dispatch('activationAlert', { type: 'error', message: `Favor de llenar todos los campos requeridos!.` });
      }
    }
  }
</script>
<style>

</style>