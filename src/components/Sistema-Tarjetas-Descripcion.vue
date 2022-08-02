<template>
  <div class="">
    <v-row align="space-around">
      <v-col
        :cols="gridColCard['cardCols']"
        v-for="(anuncio, key, i) in anunciosBusqueda"
        :key="i"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="rounded-xl"
            flat
            style="overflow: hidden"
            :class="hover ? 'anuncioHover' : ''"
            :height="tarjetaWH['carruselH']"
            :width="tarjetaWH['carruselW']"
          >
            <v-container style="padding: 0">
              <v-expand-transition>
                <div v-if="hover">
                  <div
                    style="
                      z-index: 1;
                      position: absolute;
                      top: 2px;
                      right: 0px;
                      width: 80px;
                      height: 100%;
                    "
                  >
                    <v-list two-line style="background: none !important">
                      <v-hover v-slot:default="{ hover }">
                        <v-list-item
                          class="red--text font-weight-black text-center"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              @click="accionCorazon(anuncio.id)"
                              style="cursor: pointer"
                            >
                              <font-awesome-icon
                                :icon="['fas', 'heart']"
                                class="fa-2x"
                                :color="hover ? 'red' : 'white'"
                              ></font-awesome-icon>
                            </v-list-item-title>
                            <v-list-item-subtitle
                              class="white--text font-weight-black"
                              v-text="150"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-hover>
                    </v-list>
                    <v-list two-line style="background: none !important; position: absolute; bottom:-18px">
                      <v-hover v-slot:default="{ hover }">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title
                              class="
                                font-weight-regular
                                text-center text--secondary
                                d-flex flex-row
                                justify-center align-center
                              "
                            >
                              <font-awesome-icon
                                :icon="['fas', 'eye']"
                                class="fa-1x"
                                color="white"
                              ></font-awesome-icon>
                              <span class="text-caption" style="color: white;">{{100}}k</span>
                            </v-list-item-title>                        
                          </v-list-item-content>
                        </v-list-item>  
                      </v-hover>
                    </v-list>
                  </div>
                  <!--Like and vistas-->

                  <row class="glass-infoCard d-flex align-start">
                    <v-col>
                      <v-row no-gutters>
                       <v-col cols="12">
                         <div class="d-flex flex-row"
                          >
                          <div
                            class="
                              text-h5 text-md-h6
                              font-weight-black
                              text-truncate text-capitalize
                            "
                            style="color: black; overflow: hidden; max-width: 195px;"
                          >
                            {{ 'anuncio.Sec_Descripcion.titulo' }}
                          </div>
                          <div
                            class="
                              text-h6                          
                            "
                            style="overflow: hidden"
                          >
                            ,{{ 24 }}
                          </div>
                          </div>
                       </v-col>        
                      </v-row>
                      <p
                        class="
                          text-caption text-justify
                          anuncio-textDescripcion
                        "
                        :class="anuncioTextDescMobile"
                      >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Dolorum ut iure soluta nam quia tenetur quibusdam
                        saepe et cupiditate, libero minima quiLorem ipsum dolor
                        sit, amet consectetur adipisicing elit. Dolorum ut iure
                        soluta nam quia tenetur quibusdam saepe et cupiditate,
                        libero minima officiis impedit fugiat voluptates nisi
                        consequatur inventore? Dignissimos.
                      </p>
                    </v-col>
                  </row>
                  <!--Campo descripcion-->

                  <v-btn
                    small
                    raised
                    rounded
                    color="primary"
                    style="
                      z-index: 5 !important;
                      position: absolute;
                      bottom: 8px;
                      left: 10px;
                    "
                    @click="accionVer(anuncio.id)"
                  >
                    Ver Más
                  </v-btn>
                  <!--Botón ver más-->
                </div>
                <!--vista hover contenido-->

                <div
                  style="
                    z-index: 1;
                    position: absolute;
                    top: 15px;
                    right: 0px;
                    width: 80px;
                    height: 100%;
                  "
                >
                  <v-list two-line style="background: none !important">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="
                            black--text
                            font-weight-regular
                            text-center text--secondary
                          "
                        >
                          <font-awesome-icon
                            :icon="['fas', 'heart']"
                            class="fa-2x"
                          ></font-awesome-icon>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="black--text font-weight-regular text-center"
                          v-text="150"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-list two-line style="background: none !important; position: absolute; bottom:0px">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="
                            font-weight-regular
                            text-center text--secondary
                            d-flex flex-row
                            justify-center align-center
                          "
                        >
                          <font-awesome-icon
                            :icon="['fas', 'eye']"
                            class="fa-1x"
                            color="white"
                          ></font-awesome-icon>
                          <span class="text-caption" style="color: white;">{{100}}k</span>
                        </v-list-item-title>                        
                      </v-list-item-content>
                    </v-list-item>                 
                  </v-list>
                </div>
                <!--vista corazón y ojo-->
              </v-expand-transition>
              <!--Contenido de Hover-->

              <v-row class="fill-height" no-gutters>
                <v-col style="background-color: blue">
                  <v-carousel
                    :height="tarjetaWH['carruselH']"
                    id="carouselImgAnuncio"
                    continuous="true"
                  >
                    <template v-slot:prev="{ on }">
                      <v-btn
                        fab
                        color="pink"
                        large
                        plain
                        v-on="on"
                        v-ripple="false"
                        id="idPrevNext"
                      >
                        <font-awesome-icon
                          :icon="['fa', 'caret-left']"
                          size="lg"
                        ></font-awesome-icon>
                      </v-btn>
                    </template>
                    <template v-slot:next="{ on }">
                      <v-btn
                        fab
                        color="pink"
                        large
                        plain
                        v-on="on"
                        v-ripple="false"
                        id="idPrevNext"
                      >
                        <font-awesome-icon
                          :icon="['fa', 'caret-right']"
                          size="lg"
                        ></font-awesome-icon>
                      </v-btn>
                    </template>

                    <!--:src="'/uploads/' + imagen.nombre"-->
                    <v-carousel-item
                      active-class="anuncio-imagenes-dots"
                      v-for="(imagen, i) in anuncio.Sec_Imagenes"
                      :key="i"
                      :src="'http://localhost:3080/uploads/' + imagen.nombre"
                    ></v-carousel-item>
                  </v-carousel>
                </v-col>
              </v-row>
              <!--acciones botones carrusel-->
            </v-container>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!--grid de tarjetas-->

    <v-dialog
      v-model="fullAnuncioEstado"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-sheet color="darken-2" v-if="!anuncioView.Estado.vivo">
        <v-row no-gutters>
          <v-col>
            <v-skeleton-loader
              class="mx-auto"
              width="500"
              height="50vh"
              type="image"
              light="true"
              tile
              style="background: #df6dad"
            ></v-skeleton-loader>
          </v-col>
          <v-col>
            <v-skeleton-loader
              class="mx-auto"
              width="500"
              height="50vh"
              tile
              type="list-item-avatar-three-line, list-item-three-line, list-item-two-line, divider, table-tfoot"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <v-col>
            <v-skeleton-loader
              class="mx-auto"
              width="500"
              height="50vh"
              style="background: #df6dad"
              type="image"
            ></v-skeleton-loader>
          </v-col>
          <v-col>
            <v-skeleton-loader
              class="mx-auto"
              width="500"
              type="actions"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <!--Skeletoo vacío-->
      </v-sheet>

      <v-card :height="fullAnuncioMbView" v-if="anuncioView.Estado.vivo">
        <v-container fluid class="px-0 py-0 pr-1 pr-md-0">
          <v-row
            align="center"
            justify="center"
            class="fill-height"
            no-gutters
            style="background: white"
            :style="{ 'margin-bottom': marginMbView + 'px' }"
          >
            <v-col cols="12" md="4" style="min-height: 95vh">
              <v-carousel continuous="true" height="90vh" class="my-4">
                <!--:src="'/uploads/' + imagen.nombre"-->
                <v-carousel-item
                  v-for="(imagen, i) in anuncioView.Sec_Imagenes"
                  :key="i"
                  :src="'http://localhost:3080/uploads/' + imagen.nombre"
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
                class="pa-2 pa-lg-2"
                flat
                :height="fullAnuncioBodyWH['vMainContenth']"
                :width="fullAnuncioBodyWH['vMainContentw']"
              >
                <v-card-title class="pa-0">
                  <v-container class="px-0">
                    <v-row no-gutters>
                      <v-col>
                        <v-card tile flat>
                          <v-row no-gutters>
                            <v-col cols="12" md="10">
                              <div
                                class="
                                  text-h5 text-md-h3 text-capitalize
                                  font-weight-bold
                                "
                              >
                                {{ anuncioView.Sec_Descripcion.titulo }}
                              </div>
                            </v-col>
                            <v-col
                              cols="2"
                              align="start"
                              justify="start"
                              :order="fullAnuncioheadersOrder['iconoCorazon']"
                            >
                              <div class="body-2">
                                <v-btn
                                  fab
                                  text
                                  depressed
                                  plain
                                  small
                                  @click="accionCorazon(anuncio.id)"
                                >
                                  <font-awesome-icon
                                    :icon="['fas', 'heart']"
                                    class="fa-2x"
                                    color="red"
                                  ></font-awesome-icon>
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col
                              cols="10"
                              md="12"
                              align="start"
                              class="font-weight-medium pl-6"
                              style="align-items: center"
                            >
                              {{ anuncioView.Sec_Descripcion.ciudad }},
                              {{ anuncioView.Sec_Descripcion.estado }}
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-title>

                <v-card-subtitle class="px-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident veritatis natus, nisi magni illo beatae suscipit
                  voluptatum? Adipisci voluptatibus doloremque autem mollitia.
                </v-card-subtitle>
                <!--Subtitulo anuncio-->

                <v-card-text class="pa-0">
                  <v-row align="center" justify="center" no-gutters>
                    <v-btn
                      depressed
                      rounded
                      v-ripple="false"
                      @click="revealDesc = true"
                      class="subtitle-2"
                      :class="{
                        'suave-pink-font': revealDesc,
                        'subtitle-1': revealDesc,
                      }"
                      :small="revealDesc ? false : true"
                      width="130"
                    >
                      descripción
                    </v-btn>

                    <v-btn
                      depressed
                      rounded
                      v-ripple="false"
                      @click="revealDesc = false"
                      class="ml-2 subtitle-2"
                      :class="{
                        'suave-pink-font': !revealDesc,
                        'subtitle-1': !revealDesc,
                      }"
                      :small="!revealDesc ? false : true"
                      width="130"
                      v-if="anuncioView.Sec_Tarifas.length > 0"
                    >
                      tarifas
                    </v-btn>
                  </v-row>
                </v-card-text>
                <!--Tabs secciones anuncio-->

                <v-expand-x-transition>
                  <v-card-text
                    v-if="!revealDesc"
                    class="full-anuncio-seccion d-flex justify-center"
                    :class="fullAnuncioSeccionWeb"
                  >
                    <v-sheet
                      fluid
                      elevation="6"
                      class="px-4 px-lg-8 pb-8 rounded-xl"
                      width="650"
                      height="fit-content"
                    >
                      <div
                        v-for="(tarifa, i) in anuncioView.Sec_Tarifas"
                        :key="i"
                      >
                        <v-row
                          align="center"
                          justify="center"
                          class="pt-6 mb-2"
                          no-gutters
                        >
                          <v-col cols></v-col>
                          <v-col cols="8" md="6" align="center">
                            <div class="text-h6 font-weight-bold">
                              {{ tarifa.nombre }}
                            </div>
                          </v-col>
                          <v-col cols="3" md="3" align="center">
                            <div
                              class="subtitle-1 pink-font text-weight-black"
                            >
                              <font-awesome-icon icon="dollar-sign" />
                              {{ tarifa.precio }}
                            </div>
                          </v-col>
                          <v-col cols></v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col> </v-col>
                          <v-col cols="12" md="8" align="start">
                            <div class="body-2 text-justify">
                              {{ tarifa.descripcion }}
                            </div>
                          </v-col>
                          <v-col> </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="10" md="7">
                            <v-divider
                              color="pink"
                              style="border-width: revert"
                            ></v-divider>
                          </v-col>
                        </v-row>
                      </div>
                    </v-sheet>
                  </v-card-text>
                  <!--Tarifas-->

                  <v-card-text
                    class="full-anuncio-seccion px-1 d-flex justify-center"
                    :class="fullAnuncioSeccionWeb"
                  >
                    <v-sheet
                      fluid
                      elevation="6"
                      class="px-4 px-lg-8 py-6 rounded-xl"
                      width="650"
                      height="fit-content"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti doloribus qui similique impedit. Reiciendis et
                      cumque odit, officiis atque omnis, quasi numquam
                      repudiandae id rem itaque architecto ipsam facere cum.
                    </v-sheet>
                  </v-card-text>
                  <!--Descripción-->
                </v-expand-x-transition>
                <!--Cuerpo Anuncio (descripcion y tarifas)-->

                <v-card-actions style="float: right">
                  <v-btn
                    class="mx-2"
                    small
                    text
                    plain
                    raised
                    color="primary"
                    @click="reportarAnuncio"
                  >
                    Reportar Anuncio!
                  </v-btn>

                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="fullAnuncioEstado = false"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="fa-2x"
                    ></font-awesome-icon>
                  </v-btn>
                </v-card-actions>
                <!--Acciones Anuncio-->

                <v-bottom-navigation
                  :fixed="navegacionMbView"
                  v-model="contactBottomNav"
                  color="pink"
                  style="border-radius: 30px 30px 0 0; height: 72px!important;"
                  :class="{
                    'fullAnuncio-navBottom-web': !navegacionMbView,
                  }"
                  active-class="ejemplo"
                >
                  <v-sheet
                    class="pa-0 fullAnuncio-navBottom-web"
                    style="background: transparent"
                  >
                    <v-row no-gutters>
                      <v-col style="height: 68px" class="d-flex justify-start">
                        <v-btn color="pink" rounded icon>
                          <font-awesome-icon
                            class="fa-2x"
                            :icon="['fa', 'arrow-left']"
                          >
                          </font-awesome-icon>
                        </v-btn>
                      </v-col>
                      <!--left btn-->

                      <v-col
                        v-for="(contacto, key, i) in anuncioView.Sec_Contacto"
                        :key="i"
                        v-show="anuncioView.Sec_Contacto.length > 0"
                        class="d-flex justify-center"
                        style="height: 68px; width: 62px"
                      >
                        <v-btn
                          color="green"
                          depressed
                          rounded
                          icon
                          style="min-width: 60px !important"
                        >
                          <font-awesome-icon
                            class="fa-2x"
                            :icon="[
                              anuncioView.Sec_Contacto[key].Tipo.categoria,
                              anuncioView.Sec_Contacto[key].Tipo.icono,
                            ]"
                          >
                          </font-awesome-icon>
                        </v-btn>
                      </v-col>
                      <!--list contactos cycle-->

                      <v-col
                        v-if="anuncioView.Sec_Contacto.length == 0"
                        class="d-flex align-center justify-center"
                      >
                        <v-img
                          max-width="100"
                          max-height="50"
                          contain
                          :src="require('../assets/logos/logoH_1x.png')"
                        ></v-img>
                      </v-col>
                      <!--brand image H-->

                      <v-col style="height: 68px" class="d-flex justify-end">
                        <v-btn color="pink" depressed rounded icon>
                          <font-awesome-icon
                            class="fa-2x"
                            :icon="['fa', 'arrow-right']"
                          >
                          </font-awesome-icon>
                        </v-btn>
                      </v-col>
                      <!--rigth btn-->
                    </v-row>
                  </v-sheet>
                </v-bottom-navigation>
                <!--Inferior Anuncio-->
              </v-card>
            </v-col>
            <!--Cuepo-->
          </v-row>
        </v-container>
      </v-card>
      <!--Cuerpo Anuncio-->
    </v-dialog>
    <!--Venta Anuncio Completa-->
  </div>
</template>

<script>
/*
  
    Issues:
    1.- Posible issue en traspaso de estilos hacia un futuro carrusel children.
  */
import { mapGetters } from "vuex";
import GeneralMixins from "../mixins/general-mixins.js";

export default {
  name: "sistema-tarjetas-descripcion",
  mixins: [GeneralMixins],
  props: {
    fullAnuncioEstado: { type: Boolean, default: false },
    colUsuarioDesc: { type: String, default: '4' }
  },
  data() {
    return {
      revealDesc: true,
      contactBottomNav: 0,
      limitScrollPosition: 310,
      anunciosBusqueda: [],
      selectedItem: "",
      fullAnuncioCss: {
        seccion: "",
        list: "",
      },
      anuncioView: {
        categorias: ["Escorts", "Masajes Eróticos"],
        permisos: ["Descripcion", "Contacto", "Tarifas"],
        Estado: {
          vivo: true,
        },
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
            },
          },
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
            url:
              "https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api",
          },
          {
            nombre: "",
            url:
              "https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api",
          },
          {
            nombre: "",
            url:
              "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getBusquedaQuery"]),
    tarjetaWH() {
      const { sm, xs } = this.$vuetify.breakpoint;
      return xs || sm
        ? { carruselH: "400" }
        : { carruselH: "400", carruselW: "600" };
    },
    gridColCard() {
      const { sm, xs, md } = this.$vuetify.breakpoint;

      return xs || sm ? { cardCols: 12 } : { cardCols: this.colUsuarioDesc };
    },
    fullAnuncioBodyWH() {
      const { sm, xs, md } = this.$vuetify.breakpoint;

      return sm || xs || md
        ? {
            vMainContentw: "92vw",
            vMainContenth: "auto",
            vTextContent: "auto",
            CardTarifaCol: 12,
          }
        : {
            vMainContentw: "58vw",
            vMainContenth: "90vh",
            vTextContent: "40vh",
            CardTarifaCol: 4,
          };
    },
    fullAnuncioheadersOrder() {
      let { xs } = this.$vuetify.breakpoint;
      return xs ? { iconoCorazon: 1 } : { iconoCorazon: 0 };
    },
    fullAnunciotitleWeb() {
      let { xs, sm } = this.$vuetify.breakpoint;
      return xs || sm ? "" : "full-anuncio-titlelist-web";
    },
    fullAnuncioSeccionWeb() {
      let { xs, sm } = this.$vuetify.breakpoint;

      return xs || sm ? "" : "full-anuncio-seccion-web";
    },
    anuncioTextDescMobile() {
      let { xs, sm } = this.$vuetify.breakpoint;
      return xs || sm ? "anuncio-textDescripcion-mb" : "";
    },
    navegacionMbView() {
      const { md, sm, xs } = this.$vuetify.breakpoint;

      return xs || sm;
      Math.abs(window.pageYOffset - this.limitScrollPosition) <
      this.limitScrollPosition
        ? true
        : false;
    },
    fullAnuncioMbView() {
      return !!this.navegacionMbView ? "auto" : "90vh";
    },
    marginMbView() {
      return !!this.navegacionMbView ? "50" : "0";
    },
  },
  methods: {
    fullAnuncio_Display(payload) {
      this.fullAnuncioEstado = payload;
    },

    //Analizar aplicaBusqueda
    async aplicaBusqueda() {
      let QueryResult;
      try {
        QueryResult = await this.mixinBusqueda(this.getBusquedaQuery);
      } catch (error) {
        console.log("vue aplicaBusqueda...");
        console.dir(error);

        this.mixinLlamadaRouter(error);
        return;
      }

      this.anunciosBusqueda = QueryResult;
    },

    async reportarAnuncio() {
      console.log("vue reportarAnuncio ", this.anuncioView.id);
      //Para activarlo en la página de Contacto
      //this.$store.dispatch('panelHerramientasContactanos',true);
      let MutateResult;

      try {
        MutateResult = await this.mixinNuevoCorreoContactanos({
          correo: "",
          asunto: "Reporte de Anuncio!",
          mensaje: "Reporte por usuario",
          anuncio: this.anuncioView.id,
        }, true);
      } catch (error) {
        console.log("vue reportarAnuncio...");
        console.dir(error);

        this.mixinLlamadaRouter(error);
        throw error;
      }

      //Convertir a nulo una vez que se haya puesto el reporte si esq se hace en otro modal
      //Analizar su uso
      this.$store.dispatch("anuncioReportado", this.anuncioView.id); 
      this.mixinLlamadaRouter(MutateResult);
    },

    /*
      accionVer muestra a un usuario un anuncio seleccionado
    */
    async accionVer(idAnuncio) {
      let queryResult;
      try {
        queryResult = await this.mixinVer(idAnuncio);
      } catch (error) {
        console.log("vue accionVer en error...");
        console.dir(error);

        this.mixinLlamadaRouter(error);
        return;
      }
      console.log("se esta imprimiendo en modal el sig anuncio");
      console.dir(queryResult);
      this.anuncioView = queryResult.data[0];
      this.fullAnuncio_Display(true);
      this.mixinVerPlus(payload);
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
        this.mixinLlamadaRouter(error);
        return;
      }

      this.mixinLlamadaRouter(this.MixinResult);
    },
  },

  async created() {
    const { xs, sm } = this.$vuetify.breakpoint;
    this.fullAnuncioCss.list = xs || sm ? "" : "full-anuncio-titlelist-web";
    this.fullAnuncioCss.seccion = xs || sm ? "" : "full-anuncio-seccion-web";

    this.aplicaBusqueda();
  },
  watch: {
    //Analizar el uso de watch aqui
    getBusquedaQuery: function(value) {
      console.log("getBusquedaQuery...");
      console.dir(value);
      this.aplicaBusqueda();
    },
  },
};
</script>

<style scoped>
.full-anuncio-seccion {
  height: auto;
  min-height: 270px;
  overflow-y: auto;
}

.full-anuncio-seccion-web {
  height: 50vh !important;
  max-height: 50vh !important;
}

.fullAnuncio-navBottom-web {
  width: 500px !important;
  margin-left: auto;
}

.ejemplo {
  border-bottom: 3px solid #e47ab6;
}

.full-anuncio-titlelist {
  background-color: transparent !important;
}

.full-anuncio-titlelist-web {
  width: 100vw !important;
}

.v-skeleton-loader__image {
  height: 50vh;
}



.green-font {
  color: #9fe676 !important;
}

.suave-pink-font {
  background-color: #e47ab6 !important;
  color: white !important;
}

.pink-font {
  color: #e0409a !important;
}

.anuncioHover {
  border: 6px solid #e0409a !important;
}

.anuncio-textDescripcion {
  color: white;
  max-height: 70px;
  overflow: hidden;
  margin-bottom: 45px;
  line-height: 14px !important;
}

.anuncio-textDescripcion-mb {
  max-height: 63px;
  line-height: 13px !important;
}

#carouselImgAnuncio .v-carousel__controls {
  background: none !important;
  z-index: 3 !important;  
}

.anuncio-imagenes-dots {
  color: #e0409a !important;
}

.v-window__prev, .v-window__next{
  background: none;
  margin: 0;
}

.v-window__next > .v-btn,
.v-window__next > .v-btn,
.v-window__prev > .v-btn,
.v-window__prev > .v-btn {
  font-size: 2rem;
  color: #e994c496;
}

/* From https://css.glass */
.glass-infoCard {
  background: rgba(255, 255, 255, 0.46);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 2;
  position: absolute;
  bottom: 0px;
  width: 100%;
  max-height: 160px;
  height: 160px;
}
</style>
