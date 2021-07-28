<template>
<v-card :loading="herramientasLoader" class="mt-2 rounded-xl d-flex flex-column" max-height="85vh" :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

  <v-system-bar height="30">
    <v-spacer></v-spacer>
  </v-system-bar>

  <v-card-text class="pb-0">
    <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

    <v-form ref="inicioSesion" v-model="valid" lazy-validation>
      <v-text-field
        v-model="FormIS.usuario"
        :rules="emailRules"
        label="Correo"
        required
        ></v-text-field>

      <v-text-field
        v-model="FormIS.contrasena"
        :rules="contrasenaRules"
        label="Contraseña"
        required>
      </v-text-field>
    </v-form>
  </v-card-text>

  <v-row align="center" justify="center">
    <v-card-actions>
      <v-btn
        depressed
        elevation="2"
        color="primary"
        width="140"
        :disabled="!valid"
        @click="iniciandoSesion"></v-btn>
    </v-card-actions>
  </v-row>

  <v-row align="center" justify="space-between">
    <v-col cols="6">
      <div class="text-caption grey--text text--lighten-1 text-center">
        Olvidaste la contraseña?
      </div>
    </v-col>
    <v-col cols="6">
      <v-btn
        text
        @click="paraRegistro">
        <div class="text-caption grey--text text--lighten-1 text-center">
          Deseas Registrarte?
        </div>
      </v-btn>
    </v-col>
  </v-row>

</v-card>
</template>

<script>
import PanelHerramientas from '@/components/Panel-Herramientas'

export default {
  name: 'InicioSesion',
  props: {

  },
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
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  computed: {

  },
  methods: {
    paraRegistro(){
      this.$store.dispatch('REGISTRANDOSE',true);
    },
    iniciandoSesion(){
       if(this.$refs.inicioSesion.validate()){
         console.log("iniciandoSesion...");
         this.$store.dispatch('inicioSesionUsuario',this.FormIS)
         .then((result)=> {
           console.log("vue iniciandoSesion en éxito...");
           console.dir(result);
           this.$store.dispatch('activandoInicioSesion', false);
           this.$router.push('Dashboard');
         })
         .catch((error) => {
           console.log("vue iniciandoSesion en error...");
           console.dir(error);
         });
       }
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
