<template>
  <v-card height="100%">
    <v-container fluid>
      <v-row align="center" justify="center" class="fill-height" no-gutters>
        <v-col cols="12" lg="4">
          <v-carousel :height="tarjetaWH['carrusel']" class="my-4">
            <v-carousel-item v-for="(imagen,i) in anuncioView.Sec_Imagen" :key="i" :src="imagen.url"  max-height="100%"></v-carousel-item>
          </v-carousel>
        </v-col>
        <!--Carrusel-->
        <v-col cols="12" lg="8" class="d-flex flex-column justify-center align-center align-stretch">
          <v-sheet
            class="d-flex"
            color="grey lighten-3"
            height="382">
            <sheet-footer>
              #1: (3r x 2c)
            </sheet-footer>
          </v-sheet>

        </v-col>
        <!--Cuepo-->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    anuncioUsuario: { type: Object, default: {} }
  },
  data() {
    return {
      anuncioView: {
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

    }
  },
  computed: {
    tarjetaWH(){
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md ? {carrusel: 560} : {carrusel: 320};
    }
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>

<style lang='scss' scoped>

</style>
