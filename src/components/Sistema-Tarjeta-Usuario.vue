<template>
  <v-card width="tarjetaWH['cuerpoAnuncioW']">
    <v-container fluid class="pa-0">
      <v-row class="" no-gutters>
        <v-col cols="12" md="3" v-if="edicionView">
            <file-pond-Imagenes-Anuncio
              :imagenes="imagenesAnuncioFilePond"
              @iAOnDelete="iAOnDelete"
              @iAOnProcess="iAOnProcess"
            ></file-pond-Imagenes-Anuncio>
        </v-col>
        <v-col cols="12" :md="edicionView ? 9 : 6" v-else>
          <v-carousel
            :height="tarjetaWH['carruselH']"
            style="border-radius: 8px;"
          >
            <v-carousel-item
              v-for="(imagen, i) in imagenesAnuncio"
              :key="i"
              :src="imagen.url"
              max-height="100%"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <!--Carrusel-->

        <v-col cols="12" :md="edicionView ? 9 : 6">
          <v-card class="pa-1" flat :height="tarjetaWH['cuerpoAnuncioH']">
            <v-card-title class="pt-0">
              <v-container class="pa-0">
                <v-row no-gutters class="align-end">
                  <v-col cols="10">
                    <div class="text-h4 text-md-h6 text-truncate">
                      {{ anuncioUsuario.Sec_Descripcion.titulo }}
                    </div>
                  </v-col>
                  <v-col cols="2" align="center">
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
                </v-row>
                <!--Nombre Anuncio y corzones-->

                <v-row no-gutters>
                  <v-col>
                    <div class="body-2 pl-6">
                      {{ anuncioUsuario.Sec_Descripcion.ciudad }},
                      {{ anuncioUsuario.Sec_Descripcion.estado }}
                    </div>
                  </v-col>
                </v-row>
                <!--Ciudad y estado-->
              </v-container>
              <!--Normal View-->
            </v-card-title>
            <!--Titulo principal-->

            <v-card-text class="pa-0">
              <v-row align="center" justify="center" no-gutters>
                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealDesc')"
                  :class="{ 'suave-pink-font': revealDesc }"
                  small
                  width="90"
                >
                  descripción
                </v-btn>
                <!--Btn Descripción-->

                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealTarifa')"
                  class="ml-1 mb-1"
                  small
                  :class="{ 'suave-pink-font': revealTarifa }"
                  width="90"
                >
                  <span>tarifas</span>
                </v-btn>
                <!--Btn Tarifas-->

                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealContacto')"
                  class="ml-2"
                  small
                  :class="{ 'suave-pink-font': revealContacto }"
                  width="90"
                >
                  contacto
                </v-btn>
                <!--Btn Contacto-->
              </v-row>
            </v-card-text>
            <!--acciones de tabs-->

            <v-expand-x-transition>
              <v-card-text
                v-if="revealTarifa"
                class="full-anuncio-seccion d-flex justify-center pb-1 pt-0"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2 pa-3 full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  width="300"
                  height="fit-content"
                >
                  <div
                    v-if="nuevaTarifaView"
                  >
                    <div
                      class="
                        text-h6
                        green-font
                        text-weight-black text-center
                        py-1
                      "
                    >
                      {{
                        `${
                          nuevaTarifa.accion == "creacion"
                            ? "Nueva"
                            : "Actualizando"
                        } Tarifa`
                      }}
                    </div>
                    <!--titulo-->

                    <v-form ref="tarifaEdit">
                      <v-card-text class="px-0 py-0">
                        <v-row
                          align="center"
                          justify="center"
                          class="pt-6 pt-md-2"
                          no-gutters
                        >
                          <v-col cols> </v-col>
                          <v-col cols="7" align="center" class="mr-3">
                            <v-text-field
                              label="Nombre"
                              v-model="nuevaTarifa.nombre"
                              style="
                                margin: 0 !important;
                                padding: 0 !important;
                              "
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="3" align="center">
                            <v-text-field
                              label="Precio"
                              v-model="nuevaTarifa.precio"
                              prefix="$"
                              placeholder="0.00"
                              style="
                                margin: 0 !important;
                                padding: 0 !important;
                              "
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols> </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols> </v-col>
                          <v-col cols="10" class="mr-3">
                            <v-textarea
                              counter
                              label="Descripción"
                              rows="3"
                              style="
                                margin: 0 !important;
                                padding: 0 !important;
                              "
                              v-model="nuevaTarifa.descripcion"
                            >
                            </v-textarea>
                          </v-col>
                          <v-col cols></v-col>
                        </v-row>
                      </v-card-text>
                      <!--Nueva Tarifa Inputs-->
                      <v-card-actions>
                          <v-btn
                            color="green"
                            class="mx-2 rounded-lg"
                            @click="salvadoDeTarifa"
                            tile
                            outlined
                            raised
                            rounded
                          >
                            <font-awesome-icon
                              :icon="['fas', 'save']"
                              class="fa-2x mr-1"
                            ></font-awesome-icon>
                              Guardar
                          </v-btn>
                        <!--guardar tarifa-->
                      </v-card-actions>
                    </v-form>
                  </div>
                  <!--Nueva creacion tarifa-->

                  <div v-else>
                    <div
                      v-for="(tarifa, i) in tarifasAnuncio"
                      :key="i"
                      style="position: relative"
                    >
                      <v-row
                        align="center"
                        justify="center"
                        class="pt-6 pt-md-2"
                        no-gutters
                      >
                        <v-col cols></v-col>
                        <v-col cols="5" :md="7" align="center">
                          <div class="text-h6 font-weight-bold">
                            {{ tarifa.nombre }}
                          </div>
                        </v-col>
                        <v-col cols="3" align="center">
                          <div class="subtitle-1 green-font text-weight-black">
                            <font-awesome-icon icon="dollar-sign" />
                            {{ tarifa.precio }}
                          </div>
                        </v-col>
                        <v-col cols></v-col>
                      </v-row>
                      <!--Nombre Precio-->

                      <v-row no-gutters>
                        <v-col> </v-col>
                        <v-col cols="7" md="9" align="start">
                          <div
                            class="body-2 text-center"
                            style="min-height: 42px"
                          >
                            {{ tarifa.descripcion }}
                          </div>
                        </v-col>
                        <v-col> </v-col>
                      </v-row>
                      <!--Descripcion-->

                      <v-row justify="center" class="mb-2">
                        <v-col cols="8">
                          <v-divider
                            color="pink"
                            style="border-width: revert"
                          ></v-divider>
                        </v-col>
                      </v-row>
                      <!--Divider-->

                      <div
                        style="position: absolute; bottom: 10px; right: 15%"
                        v-show="edicionView"
                      >
                        <v-btn
                          fab
                          icon
                          small
                          depressed
                          color="error"
                          @click="eliminarTarifa(i)"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'trash-alt']"
                          ></font-awesome-icon>
                        </v-btn>

                        <v-btn
                          fab
                          icon
                          small
                          depressed
                          color="blue"
                          @click="prepararEditTarifa(i)"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'pencil-alt']"
                          ></font-awesome-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <!--Tarifas list-->
                </v-sheet>
              </v-card-text>
              <!--v-card Tarifas-->

              <v-card-text
                v-if="revealContacto"
                class="full-anuncio-seccion d-flex justify-center pb-1 pt-0"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2 pa-3 full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  width="300"
                  height="fit-content"
                >
                  <div
                    v-if=" nuevoContactoView
                    "
                  >
                    <div
                      class="
                        text-h6
                        green-font
                        text-weight-black text-center
                        py-1
                      "
                    >
                      {{
                        `${
                          nuevoContacto.accion == "creacion"
                            ? "Nuevo"
                            : "Actualizando"
                        } Contacto`
                      }}
                    </div>
                    <!--titulo-->

                    <v-form ref="contactoEdit">
                      <v-card-text class="px-0 py-0">
                        <v-row class="pt-6 pt-md-2" no-gutters>
                          <v-col cols="2" class="mx-1">
                            <v-select
                              v-model="nuevoContacto.Tipo"
                              :menu-props="{ top: false, offsetY: true }"
                              :items="tiposContacto"
                              item-text="categoria"
                              item-value="icono"
                              return-object
                            >
                              <template v-slot:selection="data">
                                <font-awesome-icon
                                  :icon="[data.item.categoria, data.item.icono]"
                                >
                                </font-awesome-icon>
                              </template>
                              <template v-slot:item="data">
                                <font-awesome-icon
                                  :icon="[data.item.categoria, data.item.icono]"
                                >
                                </font-awesome-icon>
                              </template>
                            </v-select>
                          </v-col>

                          <v-col cols="9">
                            <v-text-field
                              label="url..."
                              v-model="nuevoContacto.contacto"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <!-- Input nuevo contacto-->
                      </v-card-text>
                      <!--Cuerpo form nuevo contacto-->

                      <v-card-actions>
                          <v-btn
                            color="green"
                            class="mx-2 rounded-lg"
                            @click="salvadoDeContacto"
                            tile
                            outlined
                            raised
                            rounded
                          >
                            <font-awesome-icon
                              :icon="['fas', 'save']"
                              class="fa-2x mr-1"
                            ></font-awesome-icon>
                              Guardar
                          </v-btn>
                      </v-card-actions>
                    </v-form>
                    <!--Form nuevo contacto-->

                  </div>
                  <!--Nueva creacion contacto-->

                  <div v-else>
                    <div
                      class="
                        text-h6
                        green-font
                        text-weight-black text-center
                        py-1
                      "
                    >
                      Contactos Disponibles
                    </div>
                    <!--titulo-->

                    <v-row
                      align="start"
                      justify="center"
                      no-gutters
                      style="height: 220px; max-height: auto"
                    >
                      <v-col>
                        <div class="d-flex flex-column">
                          <v-card
                            v-for="(contacto, i) in contactosUsuario"
                            :key="i"
                            flat
                          >
                          <v-sheet
                            :style="{
                              'background-color': !contactosSeleccionados.includes(i) ? 'white' : 'pink',
                            }"
                            shaped
                            :elevation=" !contactosSeleccionados.includes(i) ? 0 : 4"
                            class="mb-2"
                          >
                            <v-list
                              color="transparent"
                              dense
                              :disable="contactosSeleccionados.includes(i) ? false : true"
                            >
                              <v-list-item>
                                <v-list-item-avatar
                                  :color="
                                    tiposContacto.find(
                                      (tipoContacto) =>
                                        tipoContacto.icono ==
                                        contacto.Tipo.icono
                                    )['color']
                                  "
                                >
                                  <font-awesome-icon
                                    :icon="[
                                      contacto.Tipo.categoria,
                                      contacto.Tipo.icono,
                                    ]"
                                    class="fa-2x"
                                    color="white"
                                  />
                                </v-list-item-avatar>

                                <v-list-item-action class="mx-0" v-show="edicionView">
                                  <v-switch
                                    v-model="contactosSeleccionados"
                                    color="primary"
                                    :value="i"
                                  ></v-switch>
                                </v-list-item-action>

                                <v-list-item-content class="ml-2">
                                  <v-list-item-title>
                                    {{ contacto.contacto }}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                            <!--cuerpo contacto -->

                            <div
                              style="
                                position: absolute;
                                bottom: 0;
                                right: 10%;
                              "
                              v-show="edicionView"
                            >
                              <v-btn
                                fab
                                icon
                                small
                                depressed
                                color="error"
                                @click="eliminarContacto(i)"
                              >
                                <font-awesome-icon
                                  :icon="['fas', 'trash-alt']"
                                ></font-awesome-icon>
                              </v-btn>

                              <v-btn
                                fab
                                icon
                                small
                                depressed
                                color="blue"
                                @click="prepararEditContacto(i)"
                              >
                                <font-awesome-icon
                                  :icon="['fas', 'pencil-alt']"
                                ></font-awesome-icon>
                              </v-btn>
                            </div>
                            <!--Acciones Listado contactos-->
                          </v-sheet>
                          </v-card>
                          <!--list contactos-->
                        </div>
                      </v-col>
                    </v-row>
                    <!--Seccion Listado Contactos-->
                  </div>
                  <!--Contactos list-->
                </v-sheet>
              </v-card-text>
              <!--v-card Contacto-->

              <v-card-text
                class="full-anuncio-seccion d-flex justify-center pb-1 pt-0"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2 pa-3 full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  width="300"
                  height="fit-content"
                  v-show="nuevaDescripcionView"
                >
                  <div
                    class="
                      text-h6
                      green-font
                      text-weight-black text-center
                      py-1
                    "
                  >
                    {{ `Descripción Anuncio` }}
                  </div>
                  <!--titulo-->
                  <v-form ref="descripcionEdit">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          v-model="anuncioUsuario.Sec_Descripcion.titulo"
                          color="pink"
                          background-color="#f8ffff"
                          label="Titulo"
                          filled
                          dense
                          rounded
                          outlined
                          single-line
                        >
                        </v-text-field>
                        <!--input titulo-->
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12" class="mr-2">
                        <v-select
                          v-model="anuncioUsuario.Sec_Descripcion.estado"
                          :menu-props="{ top: false, offsetY: true }"
                          :items="getDdlEstados"
                          :item-text="'descripcion'"
                          :item-value="'descripcion'"
                          filled
                          dense
                          rounded
                          solo
                          outlined
                          label="Estados"
                        >
                          <template v-slot:selection="{ item }">
                            <span v-if="item.descripcion.length"
                              >{{ item.descripcion.slice(0, item.descripcion.length) }}</span>
                            <span v-else>{{item.descripcion}}</span>
                          </template>
                        </v-select>
                        <!--input estados-->
                      </v-col>

                      <v-col cols>
                        <v-select
                          v-model="anuncioUsuario.Sec_Descripcion.ciudad"
                          :menu-props="{ top: false, offsetY: true }"
                          :items="getDdlMunicipios"
                          :item-text="'descripcion'"
                          :item-value="'descripcion'"
                          filled
                          label="Municipios"
                          outlined
                          solo
                          rounded
                          dense
                        >
                          <template v-slot:selection="{ item }">
                            <span>{{item.descripcion}}</span>
                          </template>
                        </v-select>
                        <!--input municipios-->
                      </v-col>
                    </v-row>

                    <v-row no-gutters class="align-start">
                      <v-col cols="6">
                        <v-select
                          v-model="anuncioUsuario.Sec_Descripcion.sexo"
                          :menu-props="{ top: false, offsetY: true }"
                          :items="getDdlSexo"
                          :item-text="'descripcion'"
                          :item-value="'descripcion'"
                          filled
                          dense
                          rounded
                          outlined
                          solo
                          label="Sexo"
                        >
                          <template v-slot:selection="{ item }">
                            <span v-if="item.descripcion === 'femenino'"
                              >femn.</span
                            >
                            <span v-else>masc.</span>
                          </template>
                        </v-select>
                      </v-col>                     
                      
                      <v-col cols class="ml-2">
                        <v-select
                        v-model="anuncioUsuario.categorias"
                        :menu-props="{ top: false, offsetY: true }"
                          :items="getDdlCategorias"
                          :item-text="'descripcion'"
                          :item-value="'descripcion'"
                          filled
                          outlined
                          label="Categorias"
                          rounded
                          dense
                          small-chips
                          solo
                          multiple
                        >
                          <template v-slot:selection="{ index }">
                            <span v-if="index === 0" class="text-caption"
                              >( +{{ anuncioUsuario.categorias.length }} )
                              ...</span
                            >
                          </template>
                        </v-select>
                        <!--input categorias-->
                      </v-col>
                    </v-row>
                    <!--sexo y categorias input-->

                    <v-row no-gutters>
                      <v-col>
                        <v-textarea
                          v-model="anuncioUsuario.Sec_Descripcion.descripcion"
                          outlined
                          label="Descripción"
                          rows="7"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                    <!--Input descripcion-->
                    
                  </v-form>
                  <!--Form Descripcion Anuncio-->
                </v-sheet>
                <!--Form descripcion-->

                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2 pa-3 full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  width="300"
                  height="fit-content"
                  v-show="!nuevaDescripcionView"
                >
                  {{ anuncioUsuario.Sec_Descripcion.descripcion }}
                </v-sheet>
              </v-card-text>
              <!--v-card Descripción-->
            </v-expand-x-transition>
            <!--Cuerpo Anuncio (descripcion y tarifas)-->

            <div
              style="position: absolute; top: 170px; right: 0; width:38px"
              class="d-flex flex-column glassy rounded-xl justify-center"
            >

              <v-btn
                fab
                small
                plain
                color="white"
                @click="habilitarEdicionesAnuncio"
              >
                <div class="d-flex flex-column align-center">
                  <font-awesome-icon
                    :icon="['fas', 'pencil-alt']"
                    class="fa-2x"
                  ></font-awesome-icon>
                </div>
              </v-btn>
            <!--editar btn-->

              <v-btn fab small plain color="white">
                <div class="d-flex flex-column align-center">
                  <font-awesome-icon
                    :icon="['fas', 'shopping-bag']"
                    class="fa-2x"
                  ></font-awesome-icon>
                </div>
              </v-btn>
            <!--compras btn-->

              <v-btn fab small plain color="white" @click="borrarAnuncio()">
                <div class="d-flex flex-column align-center">
                  <font-awesome-icon
                    :icon="['fas', 'trash-alt']"
                    class="fa-2x"
                  ></font-awesome-icon>
                </div>
              </v-btn>
            <!--eliminar btn-->
            </div>
            <!--Anuncio Settings-->

            <div style="position: absolute; bottom:15px;">
              <v-row
                style="position: -webkit-sticky; position: sticky; bottom: 0"
                no-gutters
              >
                <v-col v-show="edicionView" justify="center">
                  <v-btn
                    color="primary"
                    class="mx-2 rounded-lg"
                    @click="cancelarSalvado"
                    depressed
                    outlined
                    tile
                    rounded
                    x-small
                    width="60px"
                  >
                    Cancelar
                  </v-btn>
                </v-col>
                <!--BotonCancelar-->

                <v-col v-show="edicionView && tabSeleccionado != 'revealDesc'" justify="center">
                  <v-btn
                    color="primary"
                    class="mx-2 rounded-lg"
                    @click="abrirForm(true)"
                    depressed
                    raised
                    rounded
                    x-small
                    width="60px"
                  >
                    <span style="color: white;">Nuevo</span>
                  </v-btn>
                </v-col>
                <!--BotonNuevoContacto/Tarifa-->
                
                <v-col v-show="edicionView && (!nuevaTarifaView) && (!nuevoContactoView)" justify="center">
                  <v-btn
                    color="green"
                    class="mx-2 rounded-lg"
                    @click="salvadoDeDescripcion"
                    depressed
                    raised
                    rounded
                    x-small
                    width="60px"
                  >
                    <span style="color: white;">Guardar</span>
                  </v-btn>
                  <!--guardar descripcion-->
                </v-col>
                <!--BotonGuardar-->
              </v-row>
            </div>
            <!--Botones edicion Tarifa y Contact-->
          </v-card>
        </v-col>
        <!--Cuepo-->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DashboardCompras from "@/components/Dashboard-Compras";
import FilePondImagenesAnuncio from "@/components/File-Pond-Imagenes-Anuncio";
import AnuncioMixins from "../mixins/anuncio-mixins.js";
import GeneralMixins from "../mixins/general-mixins.js";
import { mapGetters } from "vuex";

export default {
  name: "tarjeta-anuncio-usuario",
  mixins: [AnuncioMixins,GeneralMixins],
  components: {
    DashboardCompras,
    FilePondImagenesAnuncio
  },
  props: {
    anuncioUsuario: { type: Object, default: {} },
  },
  data() {
    return {
      revealDesc: true,
      revealContacto: false,
      revealTarifa: false,
      anuncioConfigViewBtns: false,
      anuncioEdicionInputsView: false,
      anuncioTarifaInputsView: false,
      anuncioContactoInputsView: false,
      tiposCategoriasAnuncio: [""],
      newDefaulContactos: [],
      nuevasImagenes: [],
      tiposContacto: [
        { categoria: "fab", icono: "whatsapp", color: "green" },
        { categoria: "fab", icono: "twitter", color: "light-blue" },
        { categoria: "fab", icono: "instagram", color: "red" },
        { categoria: "fa", icono: "phone-alt", color: "amber" },
        { categoria: "fa", icono: "globe", color: "blue" },
      ],
      contactosSeleccionados: [],
      nuevoContacto: {
        accion: "creacion",
        idPosicion: 0,
        Tipo: "",
        contacto: "",
      },
      active: false,
      nuevaTarifa: {
        accion: "creacion",
        idPosicion: 0,
        nombre: "",
        precio: "",
        descripcion: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "Usuario",
      "getDdlEstados",
      "getDdlMunicipios",
      "getDdlCategorias",
      "getDdlSexo",
      "FormAE",
    ]),
    tarjetaWH() {
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md
        ? { carruselH: "500px", cuerpoAnuncioH: "auto", cuerpoAnuncioW: "auto" }
        : { carruselH: "500px", cuerpoAnuncioH: "500px", cuerpoAnuncioW: "auto" };
    },
    categoriaSeleccionada() {
      return 1;
    },
    fullAnuncioSeccionWeb() {
      let { xs, sm } = this.$vuetify.breakpoint;

      return xs || sm ? "" : "full-anuncio-seccion-web";
    },
    imagenesAnuncio() {
      //verificar los created del template anuncio edit display
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen) {
        return {
          url: "http://localhost:3000/uploads/" + infoImagen.nombre,
          options: { type: "remote" },
        };
      });
    },
    imagenesActuales(){
      let vueltaAnuncio = -1;
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen){
        vueltaAnuncio++;
        if(!!infoImagen){
          return {
            nombre: infoImagen.nombre,
            posicion: vueltaAnuncio
          }
        }
      });
    },
    imagenesAnuncioFilePond() {
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen) {
        if (!!infoImagen.nombre) {
          return {
            source: infoImagen.nombre,
            options: { type: "local" },
          };
        }
      });
    },
    tabSeleccionado() {
      if (this.revealDesc) {
        return "revealDesc";
      }

      if (this.revealContacto) {
        return "revealContacto";
      }

      if (this.revealTarifa) {
        return "revealTarifa";
      }
    },
    tarifasAnuncio() {
      return this.anuncioUsuario.Sec_Tarifas;
    },
    contactosUsuario() {
      return this.Usuario.Default_Contactos;
    },
    edicionView(){
      return this.nuevaDescripcionView || this.nuevaTarifaView || this.nuevoContactoView;
    },
    nuevaDescripcionView() {
      return this.anuncioEdicionInputsView || this.anuncioUsuario.hasOwnProperty('_anuncioEdicionInputsView');
    },
    nuevaTarifaView() {
      return this.anuncioTarifaInputsView;
    },
    nuevoContactoView() {
      return this.anuncioContactoInputsView;
    },
    backgroundIconosRedes(icono) {
      let answer;
      switch (icono) {
        case "whatsapp":
          answer = "green";
          break;
        case "twitter":
          answer = "light-blue";
          break;
        case "instagram":
          answer = "red";
          break;
        case "phone-alt":
          answer = "amber";
          break;
        case "globe":
          answer = "blue";
          break;
      }
      return answer;
    },
  },
  methods: {
    //-----Crud Tarifas
    
    abrirForm(isNew = false) {
      if(isNew){
        if(this.tabSeleccionado === "revealContacto"){
          this.anuncioContactoInputsView = true;
        }
        if(this.tabSeleccionado === "revealTarifa"){
          this.anuncioTarifaInputsView = true;
        }
      }

      switch (this.tabSeleccionado) {
        case "revealDesc":
          this.anuncioEdicionInputsView = true;
          break;
        case "revealContacto":
          this.anuncioContactoInputsView = true;
          break;
        case "revealTarifa":
          this.anuncioTarifaInputsView = true;
          break;
        default:
          break;
      }
    },
    salvadoDeTarifa() {
      let tarifa = {};
      console.log("salvadoDeTarifa");

      //validacion
      if (this.anuncioUsuario.Sec_Tarifas.length >= 3) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `No puedes tener más de 3 tarifas por Anuncio!!!`,
        });
        return;
      }

      tarifa.nombre = this.nuevaTarifa.nombre;
      tarifa.precio = parseInt(this.nuevaTarifa.precio);
      tarifa.descripcion = this.nuevaTarifa.descripcion;

      if (this.nuevaTarifa.accion == "creacion") {
        //agrega la nueva tarifa
        this.anuncioUsuario.Sec_Tarifas.push(tarifa);
      } else {
        //remplaza tarifa
        this.anuncioUsuario.Sec_Tarifas.splice(
          this.nuevaTarifa.idPosicion,
          1,
          tarifa
        );
      }

      this.anuncioTarifaInputsView = false;
    },
    limpiarTarifaForm() {
      this.nuevaTarifa.idPosicion = 0;
      this.nuevaTarifa.nombre = "";
      this.nuevaTarifa.precio = "";
      this.nuevaTarifa.descripcion = "";
      this.nuevaTarifa.accion = "creacion";
    },
    prepararEditTarifa(idPosicion) {
      this.nuevaTarifa.idPosicion = idPosicion;
      this.nuevaTarifa.nombre = this.anuncioUsuario.Sec_Tarifas[idPosicion].nombre;
      this.nuevaTarifa.precio = this.anuncioUsuario.Sec_Tarifas[idPosicion].precio;
      this.nuevaTarifa.descripcion = this.anuncioUsuario.Sec_Tarifas[idPosicion].descripcion;
      this.nuevaTarifa.accion = "actualizacion";

      this.abrirForm();
    },
    eliminarTarifa(idPosicion) {
      this.anuncioUsuario.Sec_Tarifas.splice(idPosicion, 1);
    },

    //Accion de editar o crear un Contacto
    async salvadoDeContacto() {
      console.log(`salvadoDeContacto`);
      let contacto = {};
      let esContactoSeleccionado = -1;
      let _Default_Contactos = this.Usuario.Default_Contactos;

      //validacion
      if (this.contactosUsuario.length >= 5) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `No puedes tener más de 5 contactos !!!`,
        });
        return;
      }

      esContactoSeleccionado = this.anuncioUsuario.Sec_Contacto.findIndex((Contacto) => Contacto.contacto == this.nuevoContacto.idPosicion);
      console.log(`esContactoSeleccionado: ${esContactoSeleccionado}`);

      //Setear valores
      contacto.Tipo = {
        categoria: this.nuevoContacto.Tipo.categoria,
        icono: this.nuevoContacto.Tipo.icono
      };
      contacto.contacto = this.nuevoContacto.contacto;
      console.dir(contacto);

      if (this.nuevoContacto.accion == "creacion") {
        this.anuncioUsuario.Sec_Contacto.push({contacto: contacto.contacto, Tipo: contacto.Tipo});

        //Preparar array para actualizado de Defaul_Contactos
        this.newDefaulContactos = this.contactosUsuario;
        this.newDefaulContactos.push(contacto);
        await this.$store.dispatch("anuncioEditContactoSet", this.anuncioUsuario.Sec_Contacto); //Actualizacion vuex base de FormaAE
        
      } else {       

        _Default_Contactos.splice(
          this.nuevoContacto.idPosicion,
          1,
          {contacto: contacto.contacto, Tipo: contacto.Tipo}
        );

        console.log(`this.newDefaulContactos`);
        console.dir(_Default_Contactos);
        this.newDefaulContactos = _Default_Contactos;

        //Editar el contacto existente
        if(esContactoSeleccionado >= 0){
          this.anuncioUsuario.Sec_Contacto.splice(
            this.nuevoContacto.idPosicion,
            1,
            {contacto: contacto.contacto, Tipo: contacto.Tipo}
          );
          await this.$store.dispatch("anuncioEditContactoSet", this.anuncioUsuario.Sec_Contacto); //Actualizacion vuex base de FormaAE
        }
      }
      
      this.anuncioContactoInputsView = true;
    },
    salvandoEdicionImagenes(){
      return new Promise(async (resolve, reject)=>{
        if(this.nuevasImagenes.length > 0){
          await this.$store.dispatch('anuncioSetImagenes', this.nuevasImagenes); //Actualizacion vuex base de FormaAE 
        }
        resolve();
      });
    },
    salvandoEdicionDescripcion(){
      return new Promise(async (resolve, reject)=> {
        await this.$store.dispatch('anuncioDescripcionSet', this.anuncioUsuario.Sec_Descripcion);
        await this.$store.dispatch('anuncioCategoriasSet', this.anuncioUsuario.categorias);
        await this.$store.dispatch('anuncioPermisosSet', this.anuncioUsuario.permisos);
        resolve();
      });
    },
    salvandoEdicionTarifas(){
      return new Promise(async (resolve, reject)=> {
        await this.$store.dispatch('anuncioEditTarifaSet', this.anuncioUsuario.Sec_Tarifas);
        resolve();
      });
    },
    salvandoEdicionContacto(){
      return new Promise((resolve, reject)=>{
        let newArrayContactoAnuncio = [];
  
        //Añadiendo solamente la propiedad contacto en Vuex anuncioUsuario en lo que este en contactosSeleccionados
        for (let contactoSeleccionadosLoop = 0; contactoSeleccionadosLoop < this.contactosSeleccionados.length; contactoSeleccionadosLoop++) {
          newArrayContactoAnuncio.push({ 
            contacto: this.contactosUsuario[this.contactosSeleccionados[contactoSeleccionadosLoop]].contacto,
            Tipo: this.contactosUsuario[this.contactosSeleccionados[contactoSeleccionadosLoop]].Tipo
           })
        }
        
        this.anuncioUsuario.Sec_Contacto = newArrayContactoAnuncio;
        this.$store.dispatch('anuncioEditContactoSet', newArrayContactoAnuncio); //Actualizacion vuex base de FormaAE 
        resolve();
      });
    },
    limpiarContactoForm() {
      this.nuevoContacto.idPosicion = 0;
      this.nuevoContacto.accion = "creacion";
      this.nuevoContacto.Tipo = {
        categoria: "",
        icono: "",
      };
      this.nuevoContacto.contacto = "";
    },
    //El usuario seleciona un contacto dentro de la lista
    prepararEditContacto(idPosicion) {
      this.nuevoContacto.idPosicion = idPosicion;
      this.nuevoContacto.Tipo = this.contactosUsuario[idPosicion].Tipo;
      this.nuevoContacto.contacto = this.contactosUsuario[idPosicion].contacto;
      this.nuevoContacto.accion = "actualizacion";
      this.anuncioContactoInputsView = true;

      this.abrirForm();
    },
    async eliminarContacto(idPosicion) {
      let MutateResult;
      let newDefaulContactos = [];


      console.dir(`eliminarContacto ${idPosicion}`);

      for (let contactoUsuarioLoop = 0; contactoUsuarioLoop < this.contactosUsuario.length; contactoUsuarioLoop++) {
        if(idPosicion != contactoUsuarioLoop){
          newDefaulContactos.push(this.contactosUsuario[contactoUsuarioLoop]);
        }
      }
      
      for (let anuncioContactosLoop = 0; anuncioContactosLoop < this.anuncioUsuario.Sec_Contacto.length; anuncioContactosLoop++) {
        //El anuncio tiene el contacto que se quiere eliminar
        if(this.contactosUsuario[idPosicion].contacto == this.anuncioUsuario.Sec_Contacto[anuncioContactosLoop].contacto){
          this.anuncioUsuario.Sec_Contacto.splice(anuncioContactosLoop, 1);
          console.log(anuncioContactosLoop);
          break;
        }        
      }

    },

    //-----Crud Descripcion
    async salvadoDeDescripcion() {
      let MutateResult;
      console.log(`vue salvadoDeDescripcion...`);

      //Cambiar Activacion de Imagenes
      this.cancelarSalvado(false);

      //Activar una especia de loading (no importante aun)
      
      try {
        await this.editarAnuncio(); //Llamada de creacion/modificacion anuncio
      } catch (error) {
        console.log("Error...");
        console.dir(error);
        //Activar los inputs en el tab donde este
        //habilitarEdicionesAnuncio();
        
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `>>>Error al registrar...>>>>${error.mensaje}`,
        });
        this.mixinLlamadaRouter(error);
        throw error;
      }

      this.$store.dispatch("activationAlert", {
        type: "success",
        message: MutateResult.mensaje,
      });
      this.cancelarSalvado();
    },    

    //------Acciones Anuncio
    async cancelarSalvado(limpia = true) {

      if(limpia){
        this.limpiarContactoForm();
        this.limpiarTarifaForm();
        
        if(this.FormAE.hasOwnProperty('_anuncioEdicionInputsView')){
          if(this.FormAE._anuncioEdicionInputsView){
            await this.$store.dispatch("newAnuncioOffSet"); //Quita el anuncio que se iba a crear y limpa la base vuex de FormAE
          }
        }
        await this.$store.dispatch("anuncioEditSet"); //Limpia la base de vuex de FormAE
        this.contactosSeleccionadosSet(true);
      }

      this.anuncioEdicionInputsView = false;
      this.anuncioContactoInputsView = false;
      this.anuncioTarifaInputsView = false;
    },

    //Habilita la apertura del anuncio dependiendo del tab en el que se encuentre y manda a salvar a al objeto FormAE responsable de los CRUDS del anuncio.
    async habilitarEdicionesAnuncio() {
      if ( this.anuncioUsuario._id === this.FormAE.id || this.FormAE.id == undefined ) {
        this.activacionesSecciones(this.tabSeleccionado);
        this.anuncioEdicionInputsView = true;

        try {
          await this.mixinAnuncioSetFormAE({ id: this.anuncioUsuario._id });
          this.contactosSeleccionadosSet();
        } catch (error) {
          this.$store.dispatch("activationAlert", {
            type: "error",
            message: `${error.mensaje}`,
          });
          return;
        }
        return;
      }

      this.$store.dispatch("activationAlert", {
        type: "error",
        message: `Otro Anuncio tiene habilitado la edición. Favor de Guardar los cambios primero.`,
      });
    },

    activacionesSecciones(seccion = "revealDesc") {
      console.log(`Activando Seccion ${seccion}`);
      switch (seccion) {
        case "revealDesc":
          this.revealDesc = true;
          this.revealTarifa = false;
          this.revealContacto = false;
          break;
        case "revealTarifa":
          this.revealDesc = false;
          this.revealTarifa = true;
          this.revealContacto = false;
          break;
        case "revealContacto":
          this.revealDesc = false;
          this.revealTarifa = false;
          this.revealContacto = true;
          break;
        default:
          break;
      }
    },

    async borrarAnuncio() {
      let MutateResult;
      try {
        MutateResult = await this.mixinAnuncioEliminar(this.anuncioUsuario._id);
      } catch (error) {
        console.log("vue borrarAnuncio en error...");
        console.dir(error);
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `>>>Error al eliminar anuncio...>>>>${error.mensaje}`,
        });
        return;
      }
      //Eliminar dicho anuncio del state tmb
      console.dir(MutateResult);
      this.$store.dispatch("anuncioEliminar", this.anuncioUsuario._id);

      this.$store.dispatch("anuncioEditSet");
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: `Anuncio # ${this.anuncioUsuario._id} eliminado exitosamente!`,
      });
    },

    editarAnuncio() {
      return new Promise(async (resolve, reject) => {
        let MutateResult;

        try {

          //Añadir aqui la validacion de infor de la seccion Descripcion
          await this.salvandoEdicionContacto(); //Actualizando los contactos seleccionados del anuncio en la base Vuex de FormAE
          await this.salvandoEdicionImagenes(); //Actualizando las imagenes que haya hecho trigger el filePond a la base Vuex de FormAE
          await this.salvandoEdicionDescripcion(); //Actualizando seccion de descripncipn en la base Vuex de FormAE
          await this.salvandoEdicionTarifas(); //Actualizando el listado de tarifas en la base Vuex de FormAE

          console.dir(this.FormAE);

          if (!!this.FormAE.id) {
            console.log("Editando existente...");

            MutateResult = await this.mixinAnuncioEditar(this.FormAE);
          } else {
            console.log("Guardando nuevo...");   
            
            MutateResult = await this.mixinAnuncioCrear(this.FormAE);
            await this.$store.dispatch("anuncioAgregarNuevo", MutateResult.data); //Actualizando la base vuex del state de FormAE
          }
          
          if(this.newDefaulContactos.length>0){
            this.$store.dispatch("contactoEditado", this.newDefaulContactos); //Actualizacion vuex Usuario.DefaultContacto con los cambios
            await this.mixinActualizarDefaultContactos(this.newDefaulContactos);
          }

          await this.$store.dispatch("anuncioEditado", this.FormAE); //Actualizando la base vuex del state de FormAE
        } catch (error) {          

          console.dir(error);
          //Analizar: esto causa error cuando no se tiene esa propiedad en el objeto
          if(error.componenteInterno.length >= 1){
            this.mixinLlamadaRouter(error);
          }
          return reject(error);
        }

        console.dir(MutateResult);
        this.$store.dispatch("activationAlert", {
          type: "success",
          message: MutateResult.mensaje,
        });
        return resolve(MutateResult);
      });
    },
    
    async iAOnDelete(Image) {
      console.log("iAOnDelete...");
      console.dir(Image);
      let newArrayImagenes = [];
      let imagenesAnuncioLoop = 0;
      let comparingArray = this.nuevasImagenes.length == 0 ? this.imagenesActuales : this.nuevasImagenes;

      for (let loop = 0; loop < comparingArray.length; loop++) {
        let imageName = this.imagenesActuales[loop].nombre;
        
        if(imageName !== Image.imageToDelete){
          console.log(`imageName ${Image.imageToDelete}, ${this.imagenesActuales[loop].nombre}`);
          newArrayImagenes.push({
            nombre: imageName,
            posicion: imagenesAnuncioLoop
          });
          imagenesAnuncioLoop++;
        }
      }

      this.nuevasImagenes = newArrayImagenes;
      await this.salvandoEdicionImagenes(); //Actualizando la base Vuex de FormAE
    },
    iAOnProcess(ObjetoImagen) {
      console.log(`iAOnProcess...${typeof ObjetoImagen}`);
      console.log(`nuevasImagenes...${typeof this.nuevasImagenes} ${this.nuevasImagenes}`);
      console.dir(ObjetoImagen);
      let newArrayImagenes = this.imagenesActuales;
      newArrayImagenes.push(ObjetoImagen);
      this.nuevasImagenes = newArrayImagenes;
      console.dir(this.nuevasImagenes);
    },
    contactosSeleccionadosSet(clean = false){
      if(clean){
        this.contactosSeleccionados = [];
        return
      }
      for(let defaulContactLoop = 0; defaulContactLoop < this.contactosUsuario.length; defaulContactLoop++){
        let anuncioContactoLoop = 0;
        let ContactosAnuncio = this.anuncioUsuario.Sec_Contacto;
        let ContactosUsuario = this.contactosUsuario;
        
        for(anuncioContactoLoop;  anuncioContactoLoop < ContactosAnuncio.length; anuncioContactoLoop++){
          if(ContactosAnuncio[anuncioContactoLoop].contacto == ContactosUsuario[defaulContactLoop].contacto){
            this.contactosSeleccionados.push(defaulContactLoop);
          }

        }
      }
    }
  },
  created() {

    //activando edicion descripcion
    console.log(`_anuncioEdicionInputsView: ${this.anuncioUsuario.hasOwnProperty('_anuncioEdicionInputsView')}`)
    if(this.anuncioUsuario.hasOwnProperty('_anuncioEdicionInputsView')){
      this.anuncioEdicionInputsView = true;
    }

    //Marcando contactoSeleccionados
    this.contactosSeleccionadosSet();

  },
};
</script>

<style lang="scss" scoped>
.full-anuncio-seccion {
  height: auto;
  min-height: 290px !important;
  overflow-y: auto;
  line-height: 18px;
}

.full-anuncio-seccion-web {
  height: 270px !important;
}

.v-textarea textarea {
  line-height: 1.35rem !important;
}

.glassy{
  background: rgba(199, 193, 193, 0.46);
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
