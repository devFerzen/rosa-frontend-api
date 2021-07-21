<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 rounded-xl d-flex flex-column"
    max-height="85vh"
    :height="panelCSS.panelCardHeight"
    min-height="20vh"
    elevation="2"
    outlined>

    <v-system-bar height="30">
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

      <v-form ref="registro" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormR.email"
          :rules="emailRules"
          label="Correo"
          required
          ></v-text-field>

        <v-text-field
          v-model="FormR.contrasena"
          :rules="contrasenaRules"
          label="Contraseña"
          required>
        </v-text-field>

        <v-text-field
          v-model="FormR.celular"
          :rules="celularRules"
          label="Celular"
          required>
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-row align="left" justify="center">
        <v-col cols="12">
          <div class="text-caption grey--text text--lighten-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          @click="registrandoUsuario"></v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import PanelHerramientas from '@/components/Panel-Herramientas'

  export default {
    name: 'Registro',
    props:{

    },
    components: {
      PanelHerramientas,
    },
    data() {
      return{
        herramientasLoader: false,
        valid: true,
        FormR: {
          email: '',
          contrasena: '',
          celular: ''
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
    computed:{

    },
    methods: {
      registrandoUsuario(){
         this.$refs.registro.validate()
      }
    }
  }
</script>
<style>

</style>
