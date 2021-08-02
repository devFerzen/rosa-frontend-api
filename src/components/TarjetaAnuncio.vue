<template>
  <v-card width="750">
    <v-container fluid class="py-0 pl-0">
      <v-row align="center" justify="center" class="fill-height" no-gutters>
        <v-col cols="12" lg="5">
          <v-carousel :height="tarjetaWH['carrusel']">
            <v-carousel-item v-for="(imagen,i) in anuncioView.Sec_Imagen" :key="i" :src="imagen.url"  max-height="100%"></v-carousel-item>
          </v-carousel>
        </v-col>
        <!--Carrusel-->
        <v-col cols="12" lg="7" class="d-flex flex-column justify-center align-center align-stretch">
          <v-sheet
            class="d-flex"
            color="grey lighten-3"
            :height="tarjetaWH['cuerpoAnuncio']">
            <v-tabs class="d-flex flex-column-reverse">
              <v-tab-item v-if="anuncioView.Sec_Descripcion" style="border: 1px solid blue;" >
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Descripción
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                  <v-row no-gutters>
                    <v-col cols="6" md="3">
                      <div class="text-h7 text-xl-h6 mb-4">
                        Lorem Ipsum
                      </div>
                    </v-col>
                    <v-col cols="6" md="3">
                      <div class="text-h7 text-xl-h6">
                        Lorem Ipsum
                      </div>
                    </v-col>
                  </v-row>
                  <!--EstadoCiudad-->
                  <v-row no-gutters style="overflow: hidden;">
                    <v-col>
                      <v-card  flat class="mb-2">
                        <template v-for="line in anuncioView.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Descripcion-->
              <v-tab-item v-if="anuncioView.Sec_Contacto">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Contacto
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                  <v-row no-gutters>
                    <v-col>
                      <v-list dense nav>
                        <v-list-item-group color="primary" v-model="selectedContactItem">
                          <v-list-item v-for="(contacto, i) in anuncioView.Sec_Contacto" :key="i">
                            <v-list-item-icon>
                              <font-awesome-icon :icon="[contacto.tipo.categoria, contacto.tipo.icono]" class=" tw-redes-icons fa-2x" />
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="text-body-1">{{contacto.contacto}}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                  </v-row>
                  <!--ContactosList-->
                </v-container>
              </v-tab-item>
              <!--contacto-->
              <v-tab-item v-if="anuncioView.Sec_Tarifas">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Tarifas
                      </div>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-slide-group
                      v-model="categoriaSeleccionada"
                      mandatory
                      show-arrows
                      center-active>
                      <v-slide-item v-for="(tarifa, i) in anuncioView.Sec_Tarifas" :key="i" v-slot="{active, toggle}">
                        <v-card
                          width="210"
                          class="ma-4"
                          :color="active ? 'primary' : 'gray lighten-1'"
                          @click="toggle">
                          <v-card-text>
                            <v-row align="center" class="mx-0 mb-2">
                              <v-card-title>{{ tarifa.nombre }}</v-card-title>
                              <font-awesome-icon icon="dollar-sign" class="tw-redes-icons" />
                              <div class="grey--text ml-2">{{ tarifa.precio }}</div>
                            </v-row>
                            <div>{{tarifa.descripcion}}</div>
                          </v-card-text>

                          <v-divider class="mx-4"></v-divider>

                          <v-card-title>Lorem Ipsum</v-card-title>

                          <v-card-text>
                            <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                              <v-chip>5:30PM</v-chip>

                              <v-chip>7:30PM</v-chip>

                            </v-chip-group>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn color="deep-purple lighten-2" text>
                              Lorem
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-slide-item>

                    </v-slide-group>
                  </v-row>
                </v-container>
              </v-tab-item>
              <!--taridas-->
              <v-tab
                v-for="(anuncio, key, i) in anuncioView"
                :key="i"
                v-if="key == 'Sec_Descripcion' || key == 'Sec_Contacto' || key == 'Sec_Tarifas'"
                style="height: 52px;">
                {{
                  key == 'Sec_Descripcion' ? 'Descripción' : key == 'Sec_Contacto' ? 'Contacto' : 'Tarifas'
                }}
              </v-tab>
            </v-tabs>

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
      selectedContactItem: '',
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
      return xs || sm || md ? {carrusel: 560, cuerpoAnuncio: 'auto'} : {carrusel: '62vh', cuerpoAnuncio: '62vh'};
    },
    categoriaSeleccionada(){
      return 1;
    }
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>

<style lang='scss' scoped>

</style>
