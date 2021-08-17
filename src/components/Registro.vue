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
      <h6 class="text-h4 text-lg-h4 text-center my-8">Registro</h6>

      <v-form ref="registro" v-model="valid" lazy-validation>
        <v-text-field
          v-model="FormR.usuario"
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
          v-model="FormR.numero_telefonico"
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
            Lorem ipsum dolor sit amet. Velit esse cillum dolore. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
    name: 'registro',
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
          usuario: '',
          contrasena: '',
          numero_telefonico: ''
        },
        TestnewAnuncio: {
          Sec_Descripcion: {
            titulo: 'Lorem ipsum dolor',
            estado: '1',
            ciudad: '1',
            descripcion: `Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

            Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.catch fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`
          },
          Sec_Contacto: [{
              contacto: '811-000-0000',
              tipo: {
                categoria: 'fab',
                icono: 'whatsapp'
              }
            },
            {
              contacto: 'lorem.ipsum',
              url: '',
              tipo: {
                categoria: 'fab',
                icono: 'twitter'
              }
            },
            {
              contacto: 'lorem.ipsum',
              url: '',
              tipo: {
                categoria: 'fab',
                icono: 'instagram'
              }
            },
            {
              contacto: 'lorem.ipsum',
              url: '',
              tipo: {
                categoria: 'fa',
                icono: 'phone-alt'
              }
            },
            {
              contacto: 'lorem.ipsum',
              url: '',
              tipo: {
                categoria: 'fa',
                icono: 'globe'
              }
            }
          ],
          Sec_Tarifas: [
            {
              nombre: 'Lorem 1',
              precio: 1500,
              descripcion: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.'
            },
            {
              nombre: 'Lorem 2',
              precio: 1500,
              descripcion: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.'
            },
            {
              nombre: 'Lorem 3',
              precio: 1500,
              descripcion: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.'
            }
          ],
          Sec_Imagen: [{
              nombre: '',
              url: 'https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api'
            },
            {
              nombre: '',
              url: 'https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api'
            },
            {
              nombre: '',
              url: 'https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api'
            }
          ]
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
        if(this.$refs.registro.validate()){
          this.$store.dispatch('activationAlert', {type: 'success', message: `Usuario registrado exitosamente!`});
          /*this.$store.dispatch('registrandoUsuario',this.FormR)
          .then((result)=> {
              console.log("registrandoUsuario en éxito...");
              console.dir(result);
              this.$store.dispatch('activandoRegistro', false);
              // open dashboard
          })
          .catch((error)=> {
            if(!!error.activeTo && error.activeTo == 'registro'){
              this.$store.dispatch('activandoRegistro',true);
            }
            if(!!error.activeTo && error.activeTo == 'creacionAnuncio'){
              console.log("aqui va el push route para crear Anuncio");
            }
            //notificar el error al usuario
            console.log(`registrandoUsuario en error...`);
            console.log(error.mensaje);
          });*/
        }
      }
    }
  }
</script>
<style>

</style>
