<template>
  <v-card :loading="herramientasLoader" class="rounded-xl d-flex flex-column" max-height="85vh"
    :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

      <v-form ref="inicioSesion" v-model="valid" lazy-validation>
        <v-text-field v-model="FormIS.usuario" :rules="emailRules" label="Correo" required></v-text-field>

        <v-text-field v-model="FormIS.contrasena" :rules="contrasenaRules" label="Contraseña" required>
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn depressed elevation="2" color="primary" width="140" :disabled="!valid" @click="iniciandoSesion"></v-btn>
      </v-card-actions>
    </v-row>

    <v-row align="center" justify="space-between" no-gutters>
      <v-col cols="6" class="d-flex">
        <v-btn text @click="restablecerContrasena">
          <div class="text-caption grey--text text--lighten-1 text-center" style="text-transform: capitalize;">
            Restablecer contraseña!
          </div>
        </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex">
        <v-btn text @click="abrirRegistro" style="margin-left: auto; margin-right: auto;">
          <div class="text-caption grey--text text--lighten-1 text-center" style="text-transform: capitalize;">
            Registrarte Aquí!
          </div>
        </v-btn>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
  import PanelHerramientas from '@/components/Panel-Herramientas'
  import GeneralMixins from '../mixins/general-mixins.js';

  export default {
    mixins: [GeneralMixins],
    name: 'inicio-sesion',
    components: {
      PanelHerramientas,
    },
    data() {
      return {
        herramientasLoader: false,
        valid: true,
        panelCSS: {
          panelCardHeight: '85vh'
        },
        FormIS: {
          usuario: '',
          contrasena: ''
        },
        emailRules: [
          v => !!v || 'Correo es requerida',
          v => /.+@.+\..+/.test(v) || 'Correo es invalido',
        ],
        contrasenaRules: [
          v => !!v || 'Contraseña es requerida'
        ]
      }
    },
    computed: {

    },
    methods: {
      abrirRegistro() {
        this.$store.dispatch('panelHerramientasRegistro', true);
      },
      /*
        Descripción: Acción para iniciar sesion con correo y contraseña
       */
      async iniciandoSesion() {
        let MutateResult;
        console.log("vue iniciandoSesion... validado");
        console.dir(this.FormIS);

        if (!this.$refs.inicioSesion.validate()) {
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Favor de validar su información...>>>>` });
          return;
        }

        try {
          MutateResult = await this.mixinInicioSesion(this.FormIS);
        } catch (error) {
          console.log("vue iniciandoSesion en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          return;
        }

        console.log("vue iniciandoSesion... MutateResult");
        console.dir(MutateResult);

        this.$store.dispatch('activationAlert', { type: 'success', message: MutateResult.mensaje });
        this.mixinLlamadaRouter(MutateResult);
      },
      async restablecerContrasena() {
        let MutateResult;

        if (!this.FormIS.usuario) {
          console.log(`usuario, ${this.FormIS.usuario}`);
          this.$store.dispatch('activationAlert', { type: 'error', message: `Favor de indicar el usuario del cuál desea reinicar la contraseña!` });
          return;
        }

        try {
          MutateResult = await this.mixinSolicitarRestablecerContrasena(this.FormIS.usuario);
        } catch (error) {
          console.log("vue restablecerContrasena en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
          this.mixinLlamadaRouter(MutateResult);
          return;
        }

        this.$store.dispatch('activationAlert', { type: 'success', message: `${MutateResult.mensaje}` });
        this.mixinLlamadaRouter(MutateResult);
      }
    }
  }
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