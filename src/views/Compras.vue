<template>
  <v-container fluid fill-height class="white">
    <v-row>
      <v-col
        :cols="colsTarjetaUsuario['colsTarjeta']"
        v-for="(anuncio, key, i) in anunciosUsuario"
        :key="i">
        <tarjeta-anuncio-usuario
          @activandoEdicion="abriendoEdicion"
          v-bind:anuncioUsuario="anuncio"
          v-bind:OpcionesAnuncio="opciones"
        ></tarjeta-anuncio-usuario>
      </v-col>
    </v-row>

    <v-dialog
      v-model="anuncioViewDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <v-card height="90vh">
        <v-container fluid>
          <v-row align="center" justify="center" class="fill-height" no-gutters>
            <v-col cols="12" md="4" style="min-height: 95vh">
              <v-carousel height="90vh" class="my-4">
                <v-carousel-item
                  v-for="(imagen, i) in anuncioView.Sec_Imagen"
                  :key="i"
                  :src="imagen.url"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  height="600px"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <!--Carrusel-->
            <v-col
              cols="12"
              md="8"
              style="min-height: 95vh; max-height: auto"
              class="d-flex flex-column justify-center align-center"
            >
              <v-card
                class="pa-4 pa-lg-2"
                outlined
                style="background-color: lightgrey"
                tile
                :height="fullAnuncioBodyWH['vMainContenth']"
                :width="fullAnuncioBodyWH['vMainContentw']">
                <v-tabs class="d-flex flex-column-reverse">
                  <v-tab-item v-if="anuncioView.Sec_Descripcion">
                    <v-container
                      fluid
                      class="pa-4 pa-lg-8"
                      :class="tabContainerClass['tabContainer']"
                    >
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
                          <v-card
                            :height="fullAnuncioBodyWH['vTextContent']"
                            flat
                            class="mb-2"
                          >
                            <template
                              v-for="line in anuncioView.Sec_Descripcion.descripcion.split(
                                '\n'
                              )"
                              >{{ line }}<br
                            /></template>
                          </v-card>
                        </v-col>
                      </v-row>
                      <!--Descripcion-->
                    </v-container>
                  </v-tab-item>
                  <!--Descripcion Anuncio View Dialog-->
                  <v-tab-item v-if="anuncioView.Sec_Contacto">
                    <v-container
                      fluid
                      class="pa-4 pa-lg-8"
                      :class="tabContainerClass['tabContainer']"
                    >
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Contacto</div>
                        </v-col>
                      </v-row>
                      <!--Título-->
                      <v-row no-gutters>
                        <v-col>
                          <v-list shaped>
                            <v-list-item-group
                              color="primary"
                              v-model="selectedItem"
                            >
                              <v-list-item v-for="( contacto, i ) in anuncioView.Sec_Contacto" :key="i" >
                                <v-list-item-icon>
                                  <font-awesome-icon
                                    :icon="[
                                      contacto.tipo.categoria,
                                      contacto.tipo.icono,
                                    ]"
                                    class="tw-redes-icons fa-2x"
                                  />
                                </v-list-item-icon>
                                <v-list-item-content>
                                  <v-list-item-title class="text-body-1">{{
                                    contacto.contacto
                                  }}</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-col>
                      </v-row>
                      <!--ContactosList-->
                    </v-container>
                  </v-tab-item>
                  <!--Contacto Anuncio View Dialog-->
                  <v-tab-item v-if="anuncioView.Sec_Tarifas">
                    <v-container
                      fluid
                      class="pa-4 pa-lg-8"
                      :class="tabContainerClass['tabContainer']"
                    >
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Tarifas</div>
                        </v-col>
                      </v-row>
                      <!--Titulo-->
                      <v-container>
                        <v-row align="center" justify="space-around">
                          <v-col
                            :cols="fullAnuncioBodyWH['CardTarifaCol']"
                            v-for="(tarifa, i) in anuncioView.Sec_Tarifas"
                            :key="i"
                          >
                            <v-card>
                              <v-card-text>
                                <v-row align="center" class="mx-0 mb-2">
                                  <v-card-title>{{
                                    tarifa.nombre
                                  }}</v-card-title>
                                  <font-awesome-icon
                                    icon="dollar-sign"
                                    class="tw-redes-icons"
                                  />
                                  <div class="grey--text ml-2">
                                    {{ tarifa.precio }}
                                  </div>
                                </v-row>
                                <div>{{ tarifa.descripcion }}</div>
                              </v-card-text>

                              <v-divider class="mx-4"></v-divider>

                              <v-card-title>Lorem Ipsum</v-card-title>

                              <v-card-text>
                                <v-chip-group
                                  active-class="deep-purple accent-4 white--text"
                                  column
                                >
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
                  <!--Tarifas Anuncio View Dialog-->
                  <v-tab
                    v-for="(anuncio, key, i) in anuncioView"
                    :key="i"
                    v-if="
                      key == 'Sec_Descripcion' ||
                      key == 'Sec_Contacto' ||
                      key == 'Sec_Tarifas'
                    "
                  >
                    {{
                      key == "Sec_Descripcion"
                        ? "Descripción"
                        : key == "Sec_Contacto"
                        ? "Contacto"
                        : "Tarifas"
                    }}
                  </v-tab>
                </v-tabs>
              </v-card>
            </v-col>
            <!--Cuepo-->
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!--anuncioViewDialog-->
  </v-container>
</template>

<script>
  import TarjetaAnuncioUsuario from "@/components/TarjetaAnuncioUsuario";
  import { mapGetters } from "vuex";

  export default {
    name: "Compras",
    components: {
      TarjetaAnuncioUsuario      
    },
    data() {
      return {
        anuncioViewDialog: false,
        opciones:{
          Descripcion: {
            permisos: false,
            categoria: 'fab',
            icono: 'whatsapp'
          },
          Actualizacion: {
            permisos: true,
            categoria: 'fas',
            icono: 'sync-alt'
          },
          Compras: {
            permisos: true,
            categoria: 'fas',
            icono: 'shopping-bag'
          },
          Edicion: {
            permisos: false,
            categoria: 'fas',
            icono: 'pencil-alt'
          },
          Eliminar: {
            permisos: false,
            categoria: 'fas',
            icono: 'trash-alt'
          },
          Preview: {
            permisos: true,
            categoria: 'fas',
            icono: 'eye'
          }
        },
        anuncioView: {
          Sec_Descripcion: {
            titulo: "Lorem ipsum dolor",
            estado: "1",
            ciudad: "1",
            descripcion: `Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

            Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.catch fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
          },
          Sec_Contacto: [
            {
              contacto: "811-000-0000",
              tipo: {
                categoria: "fab",
                icono: "whatsapp",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fab",
                icono: "twitter",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fab",
                icono: "instagram",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fa",
                icono: "phone-alt",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fa",
                icono: "globe",
              },
            },
          ],
          Sec_Tarifas: [
            {
              nombre: "Lorem 1",
              precio: 1500,
              descripcion: "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 2",
              precio: 1500,
              descripcion: "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 3",
              precio: 1500,
              descripcion: "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
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
        },
      };
    },
    computed: {
      ...mapGetters(["anunciosUsuario"]),
      creandoAnuncio() {
        console.log(`id: ${this.id}`);

        if(!this.id){
          return false;
        }
        return true;
      },
      tabContainerClass() {
        const { sm, xs } = this.$vuetify.breakpoint;
        return xs || sm ? { secContNew: 'secContNewMBView', secTarNew: 'secTarNewMBView', tabContainer: 'tabContainerMB'} : { secContNew: 'secContNewWEBView', secTarNew: 'secTarNewWEBView', tabContainer: 'tabContainerWEB'};
      },
      bodyWH() {
        const { sm, xs, md } = this.$vuetify.breakpoint;
        return sm || xs || md
          ? {
              vMainContentw: "85vw",
              vMainContenth: "auto",
              vTextContent: "auto",
              CardTarifaCol: 12
            }
          : {
              vMainContentw: "58vw",
              vMainContenth: "70vh",
              vTextContent: "40vh", //Con la config de tarjetas anuncioUsuario testear
              CardTarifaCol: 4
            };
      },
      colsTarjetaUsuario() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { colsTarjeta: 12 } : { colsTarjeta: 6 };
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
    created() {

    },

    methods: {
      abriendoEdicion(InfoAnuncio) {
        //Consume getter or consume its info
        this.id = InfoAnuncio.id;
        this.anuncioViewDialog = true;
      },
    },
  };
</script>

<style>
  .tw-redes-icons {
    color: blue;
  }

  .filepond--root {
    height: 45em;
    max-height: 45em;
    display: flex;
    flex-wrap: wrap;
  }

  .filepond--item {
    width: calc(45% - 0.5em);
  }

  .secContNewMBView{
    position: absolute;
    top: 1rem;
    left: 9.5rem;
  }

  .secContNewWEBView{
    position: absolute;
    top: 2rem;
    left: 10.5rem;
  }

  .secTarNewMBView{
    position: absolute;
    top: 1.5rem;
    left: 9rem;
  }

  .secTarNewWEBView{
    position: absolute;
    top: 2rem;
    left: 9rem;
  }
</style>
