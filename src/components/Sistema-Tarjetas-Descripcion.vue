<template>
  <div class="">
    <v-row>
      <v-col :cols="gridColCard['cardCols']" v-for="(anuncio, key, i) in anunciosBusqueda" :key="i">
        <v-hover v-slot:default="{ hover }">
          <v-card class="rounded-xl" style="
              height: 459px;
              max-height: 459px;
              overflow:hidden;">
            <v-container>
              <v-expand-transition>
                <div v-if="hover">
                  <div class="text-h5 d-inline-block text-truncate"
                    style="z-index: 1; position: absolute; top:20px; left: 20px; width:auto; max-width:280px;">
                    {{anuncio.Sec_Descripcion.titulo}}
                  </div>
                  <!--Titulo-->
                  <div v-if="hover"
                    style="z-index: 1; position: absolute; top:50px; right:0px; width:70px; height:150px;">
                    <v-container>
                      <v-row justify="space-around" align="center">
                        <v-col cols="auto">
                          <v-row no-gutters>
                            <v-col cols="auto" class="pa-0" @click="accionCorazon(anuncio.id)" style="cursor:pointer;">
                              <font-awesome-icon :icon="['fas','heart']" class="fa-2x"></font-awesome-icon>
                            </v-col>
                            <v-col cols="auto" class="pa-0">
                              150
                            </v-col>
                          </v-row>
                        </v-col>
                        <!--heartCounter-->

                        <v-col cols="auto">
                          <v-row no-gutters>
                            <v-col cols="auto" class="pa-0" @click="accionVer(anuncio.id)" style="cursor:pointer;">
                              <font-awesome-icon :icon="['fas','eye']" class="fa-2x"></font-awesome-icon>
                            </v-col>
                            <v-col cols="auto" class="pa-0">
                              150
                            </v-col>
                          </v-row>
                        </v-col>
                        <!--eyeCounter-->
                      </v-row>
                    </v-container>
                  </div>
                  <!--Like and vistas-->
                  <div v-if="hover"
                    style="z-index: 1; position: absolute; bottom:38px; left:0px; width:100%; height:100px;">
                    <mini-tarifas :tarifas="anuncio.Sec_Tarifas"></mini-tarifas>
                  </div>
                  <!--mini tarifas-->
                </div>
              </v-expand-transition>
              <!--transición de objetos carrusel-->

              <v-row class="fill-height">
                <v-carousel :height="tarjetaWH['carrusel']">
                  <v-carousel-item v-for="(imagen,i) in anuncio.Sec_Imagenes" :key="i" :src="imagen.url"
                    max-height="100%"></v-carousel-item>
                </v-carousel>
              </v-row>
              <!--carrusel-->
            </v-container>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!--grid de tarjetas-->

    <v-dialog v-model="fullAnuncioEstado" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card height="90vh">
        <v-container fluid>
          <v-row align="center" justify="center" class="fill-height" no-gutters>
            <v-col cols="12" md="4" style="min-height: 95vh">
              <v-carousel height="90vh" class="my-4">
                <v-carousel-item v-for="(imagen, i) in anuncioView.Sec_Imagenes" :key="i" :src="imagen.url"
                  reverse-transition="fade-transition" transition="fade-transition" height="600px"></v-carousel-item>
              </v-carousel>
            </v-col>
            <!--Carrusel-->

            <v-col cols="12" md="8" style="min-height: 95vh; max-height: auto"
              class="d-flex flex-column justify-center align-center">
              <v-card class="pa-4 pa-lg-2" outlined style="background-color: lightgrey" tile
                :height="fullAnuncioBodyWH['vMainContenth']" :width="fullAnuncioBodyWH['vMainContentw']">
                <v-tabs class="d-flex flex-column-reverse">
                  <v-tab-item v-if="anuncioView.Sec_Descripcion">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Descripción</div>
                        </v-col>
                      </v-row>
                      <!--Título-->
                      <v-row no-gutters>
                        <v-col cols="6" md="3">
                          <div class="text-h7 text-xl-h6 mb-4">Lorem Ipsum</div>
                        </v-col>
                        <v-col cols="6" md="3">
                          <div class="text-h7 text-xl-h6">Lorem Ipsum</div>
                        </v-col>
                      </v-row>
                      <!--EstadoCiudad-->
                      <v-row no-gutters style="overflow: hidden">
                        <v-col>
                          <v-card :height="fullAnuncioBodyWH['vTextContent']" flat class="mb-2">
                            <template v-for="line in anuncioView.Sec_Descripcion.descripcion.split('\n')">{{line}}</br></template>
                          </v-card>
                        </v-col>
                      </v-row>
                      <!--Descripcion-->
                    </v-container>
                  </v-tab-item>
                  <!--tab descripcion-->

                  <v-tab-item v-if="anuncioView.Sec_Contacto">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Contacto</div>
                        </v-col>
                      </v-row>
                      <!--Título-->
                      
                      <v-row no-gutters>
                        <v-col>
                          <v-list shaped dense>
                            <v-list-item-group color="primary" v-model="selectedItem">
                              <v-list-item v-for="(contacto, i) in anuncioView.Sec_Contacto" :key="i" class="my-3">
                                <v-list-item-icon>
                                  <font-awesome-icon :icon="[contacto.Tipo.categoria,contacto.Tipo.icono]"
                                    class="tw-redes-icons fa-2x" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                  <v-list-item-title class="text-body-1">
                                    {{ contacto.contacto }}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-col>
                      </v-row>
                      <!--ContactosList-->
                    </v-container>
                  </v-tab-item>
                  <!--tab contactos-->

                  <v-tab-item v-if="anuncioView.Sec_Tarifas">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Tarifas</div>
                        </v-col>
                      </v-row>
                      <!--Titulo-->
                      <v-container>
                        <v-row align="center" justify="space-around">
                          <v-col :cols="fullAnuncioBodyWH['CardTarifaCol']"
                            v-for="(tarifa, i) in anuncioView.Sec_Tarifas" :key="i">
                            <v-card>
                              <v-card-text>
                                <v-row align="center" class="mx-0 mb-2">
                                  <v-card-title>{{ tarifa.nombre }}</v-card-title>
                                  <font-awesome-icon icon="dollar-sign" class="tw-redes-icons" />
                                  <div class="grey--text ml-2">
                                    {{ tarifa.precio }}
                                  </div>
                                </v-row>
                                <div>{{ tarifa.descripcion }}</div>
                              </v-card-text>

                              <v-divider class="mx-4"></v-divider>

                              <v-card-text>
                                <v-chip-group active-class="deep-purple accent-4 white--text" column>
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
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-container>
                  </v-tab-item>
                  <!--tab tarifas-->

                  <v-tab v-for="(anuncio, key, i) in anuncioView.permisos" :key="i">
                    {{
                    anuncio
                    }}
                  </v-tab>
                  <!--nombre tabs-->
                </v-tabs>
                <v-btn class="mx-2" fab dark small color="primary" style="float:right" @click="fullAnuncioEstado=false">
                  <font-awesome-icon :icon="['fas','times']" class="fa-2x"></font-awesome-icon>
                </v-btn>
              </v-card>
            </v-col>
            <!--Cuepo-->
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!--Venta Anuncio Completa-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MiniTarifas from '@/components/Mini-Tarifas';
  import GeneralMixins from '../mixins/general-mixins.js';


  export default {
    name: "sistema-tarjetas-descripcion",
    mixins: [GeneralMixins],
    components: {
      MiniTarifas
    },
    props: {
      fullAnuncioEstado: { type: Boolean, default: false },
    },
    data() {
      return {
        anunciosBusqueda: [],
        selectedItem: "",
        model: 0,
        categorias: [
          {
            name: "Lorem ipsum",
            total: 1,
          },
          {
            name: "Lorem ipsum",
            total: 2,
          },
          {
            name: "Lorem ipsum",
            total: 1,
          },
        ],
        estadosList: [
          {
            id: 1,
            nombre: "NL",
          },
          {
            id: 2,
            nombre: "COAH",
          },
          {
            id: 3,
            nombre: "Q. ROO",
          },
          {
            id: 4,
            nombre: "JAL",
          },
        ],
        ciudadesList: [
          {
            id: 1,
            nombre: "MTY",
          },
          {
            id: 2,
            nombre: "SAL",
          },
          {
            id: 3,
            nombre: "MON",
          },
          {
            id: 4,
            nombre: "CHI",
          },
        ],
        anuncioView: {
          categorias: ['Escorts', 'Masajes Eróticos'],
          permisos: ['Descripcion', 'Contacto', 'Tarifas'],
          Sec_Descripcion: {
            titulo: "Lorem ipsum dolor",
            estado: "1",
            ciudad: "1",
            descripcion: `Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

          Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.catch fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
          },
          Sec_Contacto: [
            {
              contacto: "811-000-0000",
              Tipo: {
                categoria: "fab",
                icono: "whatsapp",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              Tipo: {
                categoria: "fab",
                icono: "twitter",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              Tipo: {
                categoria: "fab",
                icono: "instagram",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              Tipo: {
                categoria: "fa",
                icono: "phone-alt",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              Tipo: {
                categoria: "fa",
                icono: "globe",
              }
            }
          ],
          Sec_Tarifas: [
            {
              nombre: "Lorem 1",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 2",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 3",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
          ],
          Sec_Imagen: [
            {
              nombre: "",
              url: "https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api",
            },
            {
              nombre: "",
              url: "https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api",
            },
            {
              nombre: "",
              url: "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api",
            },
          ],
        }
      };
    },
    computed: {
      tarjetaWH() {
        const { sm, xs } = this.$vuetify.breakpoint;
        return xs || sm ? { carrusel: '459' } : { carrusel: '459' };
      },
      tabContainerClass() {
        const { sm, xs } = this.$vuetify.breakpoint;
        return xs || sm ? { tabContainer: 'tabContainerMB' } : { tabContainer: 'tabContainerWEB' };
      },
      gridColCard() {
        const { sm, xs, md } = this.$vuetify.breakpoint;

        return xs || sm ? { cardCols: 12 } : { cardCols: 4 };
      },
      fullAnuncioBodyWH() {
        const { sm, xs, md } = this.$vuetify.breakpoint;

        return sm || xs || md
          ? {
            vMainContentw: "85vw",
            vMainContenth: "auto",
            vTextContent: "auto",
            CardTarifaCol: 12,
          }
          : {
            vMainContentw: "58vw",
            vMainContenth: "70vh",
            vTextContent: "40vh",
            CardTarifaCol: 4,
          };
      },
    },
    methods: {
      fullAnuncio_Display(payload) {
        this.fullAnuncioEstado = payload;
      },

      /*
        accionVer muestra a un usuario un anuncio seleccionado
      */
      async accionVer(idAnuncio) {
        let queryResult;
        try {
          queryResult = await this.mixinVer(idAnuncio);
          this.fullAnuncio_Display(true); //Si esta abajo no aparece, si esta arriba si... why
        } catch (error) {
          console.log("vue accionVer en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `Error al dar like al anuncio, favor de intentarlo más tarde!` });
          return;
        }
        this.$store.dispatch('activationAlert', { type: 'success', message: `Lorem Ipsum *.*...${idAnuncio}!` });
        this.anuncioView = queryResult.data.queryAnunciosById[0]; //Checar bien los nombres porque no abre
      },

      /*
        accionCorazon acciona un like para usuario hacia un anuncio
      */
      async accionCorazon(idAnuncio) {
        let queryResult;
        try {
          queryResult = await this.mixinMeEncantaPlus(idAnuncio);
        } catch (error) {
          console.log("vue accionCorazon en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `Error al dar like al anuncio, favor de intentarlo más tarde!` });
          return;
        }
        this.$store.dispatch('activationAlert', { type: 'success', message: `Lorem Ipsum <3...${idAnuncio}!` });
      }

    },
    async created() {
      let queryResult;
      try {
        queryResult = await this.mixinBusqueda()
      } catch (error) {
        console.log("vue queryResult(anunciosBusqueda) en error...");
        console.dir(error);
        this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error anunciosBusqueda...>>>>${error.mensaje}` });
        return;
      }
      //Seteamos en VUEX la información
      this.anunciosBusqueda = queryResult.data.queryAnuncios;
    }
  };
</script>

<style>
  .tw-redes-icons {
    color: blue;
  }

  .tabContainerMB {
    height: auto;
    min-height: 61vh;
  }

  .tabContainerWEB {
    height: 61vh;
  }
</style>