<template>
  <v-card :loading="herramientasLoader" class="mt-2 rounded-xl d-flex flex-column" max-height="85vh"
    :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

      <v-form ref="verificacion" v-model="valid" lazy-validation>
        <v-text-field v-model="FormV.codigoVerificacion" :rules="codigoRules" label="Código Verificación" required>
        </v-text-field>
        <!--Codigo Verificacion-->
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-row align="left" justify="center">
        <v-col cols="12">
          <div class="text-caption grey--text text--lighten-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliquaconsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </v-col>
      </v-row>
    </v-card-text>


    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn depressed elevation="2" color="primary" width="140" :disabled="!valid" @click="verificando"> Enviar
        </v-btn>
        <v-btn depressed outlined color="primary" width="140"
          @click="$store.dispatch('panelHerramientasVerificacion', false);"> Cancelar</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
  import GeneralMixins from '../mixins/general-mixins.js';

  export default {
    name: 'contacto',
    mixins: [GeneralMixins],
    components: {
    },
    data() {
      return {
        herramientasLoader: false,
        valid: true,
        FormV: {
          codigoVerificacion: ''
        },
        codigoRules: [
          v => !!v || 'Código es requerido'
        ],
        panelCSS: {
          panelCardHeight: '85vh'
        },
      }
    },
    computed: {

    },
    methods: {
      async verificando() {
        let mutateResult, params;
        console.log("vue verificando...");

        if (!this.$refs.verificacion.validate()) {
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>código de verificación con error...>>>>` });
          return;
        }

        try {
          params = {
            input: this.FormV.codigoVerificacion,
            usuario: this.$store.state.usuario.usuario.usuario
          }
          console.dir(params);
          mutateResult = await this.mixinCompararVerificacionUsuario(params);
        } catch (error) {
          console.log("vue verificando en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al verificar tu códigio...>>>>${error.mensaje}` });
          throw error;
        }

        console.dir(mutateResult);
        this.$store.dispatch('activationAlert', { type: 'success', message: `${mutateResult.data.compararVerificacionUsuario}` });
        this.$store.dispatch('panelHerramientasCambioContraseña', true);
        this.$store.dispatch('seteandoVerificacionUsuario', params.input);
      }

    }
  }
</script>
<style>

</style>