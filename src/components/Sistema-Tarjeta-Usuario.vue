<template>
  <v-card width="750">
    <v-container fluid class="pa-0">
      <v-row class="" no-gutters>
        <v-col cols="12" md="6" v-if="edicionView">
          <v-card flat class="pa-0" style="height: 460px; overflow-y: hidden">
            <file-pond
              ref="pond"
              name="filePondImages"
              @init="handleFilePondInit"
              :files="imagenesAnuncioFilePond"
              @processfile="imagenesAnuncioOnProcess"
              @removefile="imagenesAnuncioOnDelete"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" v-else>
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

        <v-col cols="12" md="6">
          <v-card class="pa-1" flat :height="tarjetaWH['cuerpoAnuncioH']">
            <v-card-title class="pt-0" :class="{ 'pa-0': edicionView }">
              <v-expand-x-transition>
                <v-container class="pa-0" v-show="edicionView">
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
                    <v-row no-gutters style="position: relative; top: -13px;">
                      <v-col cols="7" class="mr-2">
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
                              >{{ item.descripcion.slice(0, 9) }}...</span
                            >
                            <span v-else>item.descripcion</span>
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
                            <span v-if="item.descripcion.length"
                              >{{ item.descripcion.slice(0, 3) }}...</span
                            >
                            <span v-else>item.descripcion</span>
                          </template>
                        </v-select>
                        <!--input municipios-->
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-expand-x-transition>
              <!--Input Form AnuncioView-->

              <v-container class="pa-0" v-show="!edicionView">
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

            <v-card-text class="pa-0" v-show="!edicionView">
              <v-row align="center" justify="center" no-gutters>
                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealDesc')"
                  :class="{ 'suave-pink-font': revealDesc }"
                  small
                  width="100"
                >
                  descripción
                </v-btn>
                <!--Btn Descripción-->

                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealTarifa')"
                  class="ml-2 mb-1"
                  small
                  :class="{ 'suave-pink-font': revealTarifa }"
                  width="100"
                >
                  tarifas
                </v-btn>
                <!--Btn Tarifas-->

                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealContacto')"
                  class="ml-2"
                  small
                  :class="{ 'suave-pink-font': revealContact }"
                  width="100"
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
                :class="fullAnuncioSeccionWeb"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2"
                  width="350"
                  height="fit-content"
                >
                  <div
                    v-if="
                      anuncioUsuario.Sec_Tarifas.length == 0 || nuevaTarifaView
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
                        <v-hover v-slot="{ hover }">
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
                            <v-expand-x-transition>
                              <div v-show="hover">Guardar</div>
                            </v-expand-x-transition>
                          </v-btn>
                        </v-hover>
                        <!--guardar tarifa-->

                        <v-hover v-slot="{ hover }">
                          <v-btn
                            color="primary"
                            class="mx-2 rounded-lg"
                            @click="cancelarSalvado('revealTarifa')"
                            depressed
                            outlined
                            tile
                            rounded
                            v-if="anuncioUsuario.Sec_Tarifas.length > 0"
                          >
                            <font-awesome-icon
                              :icon="['fas', 'times']"
                              class="fa-2x mr-1"
                            ></font-awesome-icon>
                            <v-expand-x-transition>
                              <div v-show="hover">Cancelar</div>
                            </v-expand-x-transition>
                          </v-btn>
                        </v-hover>
                        <!--cancelar tarifa-->
                      </v-card-actions>
                      <!--Nueva Tarifa Acciones-->
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

                      <div style="position: absolute; bottom: 10px; right: 15%">
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
                      </div>
                      <div
                        style="position: absolute; bottom: 10px; right: 15px"
                      >
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
              <!--Tarifas-->

              <v-card-text
                v-if="revealContact"
                class="full-anuncio-seccion d-flex justify-center pb-1 pt-0"
                :class="fullAnuncioSeccionWeb"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2"
                  width="350"
                  height="fit-content"
                >
                  <div
                    v-if="
                      Usuario.Default_Contactos.length == 0 || nuevoContactoView
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
                              item-text="icono"
                              item-value="icono"
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
                        <v-hover v-slot="{ hover }">
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
                            <v-expand-x-transition>
                              <div v-show="hover">Guardar</div>
                            </v-expand-x-transition>
                          </v-btn>
                        </v-hover>

                        <v-hover v-slot="{ hover }">
                          <v-btn
                            color="primary"
                            class="mx-2 rounded-lg"
                            @click="cancelarSalvado('revealContacto')"
                            depressed
                            outlined
                            tile
                            rounded
                            v-if="contactosUsuario.length > 0"
                          >
                            <font-awesome-icon
                              :icon="['fas', 'times']"
                              class="fa-2x mr-1"
                            ></font-awesome-icon>
                            <v-expand-x-transition>
                              <div v-show="hover">Cancelar</div>
                            </v-expand-x-transition>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                      <!--acciones nuevo contacto-->
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
                            <v-hover v-slot="{ hover }">
                              <v-sheet
                                :style="{
                                  'background-color': !hover ? 'white' : 'pink',
                                }"
                                shaped
                                :elevation="!hover ? 0 : 4"
                                class="mb-2"
                              >
                                <v-list
                                  color="transparent"
                                  :dense="hover ? false : true"
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

                                    <v-list-item-action class="mx-0">
                                      <v-switch
                                        v-model="contactosSeleccionados"
                                        color="primary"
                                        :value="i"
                                      ></v-switch>
                                    </v-list-item-action>

                                    <v-list-item-content class="ml-2">
                                      <v-list-item-title
                                        :style="{
                                          color: hover ? 'white' : 'black',
                                        }"
                                      >
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
                                </div>
                                <div
                                  style="
                                    position: absolute;
                                    bottom: 0;
                                    right: 0;
                                  "
                                >
                                  <v-btn
                                    fab
                                    icon
                                    small
                                    depressed
                                    color="blue"
                                    @click="editarContacto(i)"
                                  >
                                    <font-awesome-icon
                                      :icon="['fas', 'pencil-alt']"
                                    ></font-awesome-icon>
                                  </v-btn>
                                </div>
                                <!--Acciones Listado contactos-->
                              </v-sheet>
                            </v-hover>
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
                class="px-0 px-md-2"
                :class="{ edicionCSS: edicionView }"
              >
                <v-expand-x-transition>
                  <v-sheet
                    fluid
                    elevation="6"
                    class="rounded-xl my-2 full-anuncio-seccion"
                    width="auto"
                    :class="fullAnuncioSeccionWeb"
                    v-show="edicionView"
                  >
                    <v-container
                      class="d-flex flex-column"
                      style="height: 286px"
                    >
                      <v-form ref="descripcionEdit">
                        <v-row no-gutters class="align-start">
                          <v-col cols="5">
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
                            <!--input sexo-->
                          </v-col>
                          <!--sexo input-->

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
                        <v-row no-gutters>
                          <v-col>
                            <v-textarea
                              :value="
                                anuncioUsuario.Sec_Descripcion.descripcion
                              "
                              outlined
                              label="Descripción"
                              rows="4"
                            >
                            </v-textarea>
                          </v-col>
                        </v-row>
                        <!--Input descripcion-->
                      </v-form>

                      <v-row no-gutters class="align-end">
                        <v-col
                          class="d-flex justify-center"
                          style="height: 60px"
                        >
                          <v-hover v-slot="{ hover }">
                            <v-btn
                              color="green"
                              class="ml-4 mr-2 mb-3 rounded-lg"
                              @click="salvadoDeDescripcion('editando')"
                              tile
                              outlined
                              raised
                              rounded
                            >
                              <font-awesome-icon
                                :icon="['fas', 'save']"
                                class="fa-2x mr-1"
                              ></font-awesome-icon>
                              <v-expand-x-transition>
                                <div v-show="hover">Guardar</div>
                              </v-expand-x-transition>
                            </v-btn>
                          </v-hover>
                          <!--guardar descripcion-->
                        </v-col>
                        <!--guardar descripcion-->

                        <v-col
                          class="d-flex justify-center"
                          style="height: 60px"
                        >
                          <v-hover v-slot="{ hover }">
                            <v-btn
                              color="primary"
                              class="mx-2 mb-3 rounded-lg"
                              @click="cancelarSalvado('revealDesc')"
                              depressed
                              outlined
                              tile
                              rounded
                            >
                              <font-awesome-icon
                                :icon="['fas', 'times']"
                                class="fa-2x mr-1"
                              ></font-awesome-icon>
                              <v-expand-x-transition>
                                <div v-show="hover">Cancelar</div>
                              </v-expand-x-transition>
                            </v-btn>
                          </v-hover>
                          <!--cancelar descripcion-->
                        </v-col>
                      </v-row>
                      <!--botones-->
                    </v-container>
                  </v-sheet>
                </v-expand-x-transition>
                <!--Form descripcion-->

                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl my-2 pa-3 full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  width="auto"
                  height="90%"
                  v-show="!edicionView"
                >
                  {{ anuncioUsuario.Sec_Descripcion.descripcion }}
                </v-sheet>
              </v-card-text>
              <!--v-card Descripción-->
            </v-expand-x-transition>
            <!--Cuerpo Anuncio (descripcion y tarifas)-->

            <div
              style="position: -webkit-sticky; position: sticky; bottom: 0"
              class="d-flex flex-row-reverse"
            >
              <v-speed-dial
                v-model="anuncioConfigViewBtns"
                transition="slide-y-reverse-transition"
              >
                <template v-slot:activator>
                  <v-btn
                    v-model="anuncioConfigViewBtns"
                    fab
                    text
                    raised
                    depressed
                    plain
                  >
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="fa-2x"
                      color="pink"
                      v-if="anuncioConfigViewBtns"
                    ></font-awesome-icon>
                    <font-awesome-icon
                      :icon="['fas', 'bars']"
                      class="fa-2x"
                      style="color: #9fe676"
                      v-else
                    ></font-awesome-icon>
                  </v-btn>
                </template>
                <!--Main btn anuncio setup-->

                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    small
                    plain
                    color="green"
                    @click="habilitarEdicionesAnuncio"
                  >
                    <div class="d-flex flex-column align-center">
                      <font-awesome-icon
                        :icon="['fas', 'pencil-alt']"
                        class="fa-2x"
                      ></font-awesome-icon>
                      <v-expand-transition>
                        <span class="mt-2" v-show="hover">editar</span>
                      </v-expand-transition>
                    </div>
                  </v-btn>
                </v-hover>

                <v-hover v-slot="{ hover }">
                  <v-btn fab small plain color="green">
                    <div class="d-flex flex-column align-center">
                      <font-awesome-icon
                        :icon="['fas', 'shopping-bag']"
                        class="fa-2x"
                      ></font-awesome-icon>
                      <v-expand-transition>
                        <span class="mt-2" v-show="hover">compras</span>
                      </v-expand-transition>
                    </div>
                  </v-btn>
                </v-hover>

                <v-hover v-slot="{ hover }">
                  <v-btn fab small plain color="green" @click="borrarAnuncio()">
                    <div class="d-flex flex-column align-center">
                      <font-awesome-icon
                        :icon="['fas', 'trash-alt']"
                        class="fa-2x"
                      ></font-awesome-icon>
                      <span class="mt-2" v-show="hover">borrar</span>
                    </div>
                  </v-btn>
                </v-hover>
              </v-speed-dial>
              <!--crear el speed-dial-->
            </div>
            <!--Anuncio Settings-->
          </v-card>
        </v-col>
        <!--Cuepo-->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";

import DashboardCompras from "@/components/Dashboard-Compras";
import AnuncioMixins from "../mixins/anuncio-mixins.js";
import { mapGetters } from "vuex";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileMetadata
);
setOptions({
  maxFiles: 6,
  credits: false,
  allowReorder: true,
  allowMultiple: true,
  imagePreviewMaxHeight: 80,
  imagePreviewHeight: 80,
  maxFileSize: "7MB",
  itemInsertLocation: "antes",
  labelFileLoading: "Cargando...",
  labelFileLoadError: "Error durante carga",
  labelFileProcessing: "Cargando...",
  labelFileProcessingComplete: "Carga completada",
  labelFileProcessingAborted: "Carga cancelada",
  labelFileProcessingError: "Error durante carga",
  labelTapToCancel: "Tap para cancelar",
  labelTapToRetry: "Tap para reintentar",
  labelTapToUndo: "Tap para deshacer",
  labelFileSizeNotAvailable: "Tamaño no reconocido",
  labelFileWaitingForSize: "Verificando",
  labelInvalidField: "Archivo no valido",
  labelIdle:
    'Arrastar y colocar tus imágenes aquí ó <span class="filepond--label-action"> Browse </span>',
  server: {
    url: "http://localhost:3000/",
    process: {
      url: "upload",
    },
    load: "uploads/",
    fetch: "uploads/",
    revert: "delete/",
  },
});

export default {
  name: "tarjeta-anuncio-usuario",
  mixins: [AnuncioMixins],
  components: {
    DashboardCompras,
    FilePond,
  },
  props: {
    anuncioUsuario: { type: Object, default: {} },
  },
  data() {
    return {
      revealDesc: true,
      revealContact: false,
      revealTarifa: false,
      anuncioConfigViewBtns: false,
      anuncioEdicionInputsView: false,
      anuncioTarifaInputsView: false,
      anuncioContactoInputsView: false,
      tiposCategoriasAnuncio: [""],
      tiposContacto: [
        { categoria: "fab", icono: "whatsapp", color: "green" },
        { categoria: "fab", icono: "twitter", color: "light-blue" },
        { categoria: "fab", icono: "instagram", color: "red" },
        { categoria: "fa", icono: "phone-alt", color: "amber" },
        { categoria: "fa", icono: "globe", color: "blue" },
      ],
      nuevoContacto: {
        accion: "creacion",
        idPosicion: 0,
        Tipo: "",
        contacto: "",
      },
      active: false,
      contactosSeleccionados: [],
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
      "FormAE"
    ]),
    tarjetaWH() {
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md
        ? { carruselH: "500px", cuerpoAnuncioH: "auto" }
        : { carruselH: "500px", cuerpoAnuncioH: "500px" };
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
    imagenesAnuncioFilePond() {
      //verificar los created del template anuncio edit display
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen) {
        if(!!infoImagen.nombre){
          return {
            source: infoImagen.nombre,
            options: { type: "local" },
          }
        }
      });
    },
    tarifasAnuncio() {
      return this.anuncioUsuario.Sec_Tarifas;
    },
    contactosUsuario() {
      return this.Usuario.Default_Contactos;
    },
    edicionView() {
      return this.anuncioEdicionInputsView;
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

      this.editarAnuncio().then((success)=>{
        this.$store.dispatch('activationAlert', { type: 'success', message: `${success.mensaje}` });
      })
      .catch((error)=>{
        console.dir("error porque pasas por aqui");
        console.dir(error);
        this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
      });

      this.cancelarSalvado('revealTarifa');
    },
    limpiarTarifaForm() {
      this.$refs.tarifaEdit.reset();

      this.nuevaTarifa.idPosicion = 0;
      this.nuevaTarifa.nombre = "";
      this.nuevaTarifa.precio = "";
      this.nuevaTarifa.descripcion = "";
      this.nuevaTarifa.accion = "creacion";
    },
    prepararEditTarifa(idPosicion) {
      this.nuevaTarifa.idPosicion = idPosicion;
      this.nuevaTarifa.nombre = this.anuncioUsuario.Sec_Tarifas[
        idPosicion
      ].nombre;
      this.nuevaTarifa.precio = this.anuncioUsuario.Sec_Tarifas[
        idPosicion
      ].precio;
      this.nuevaTarifa.descripcion = this.anuncioUsuario.Sec_Tarifas[
        idPosicion
      ].descripcion;
      this.nuevaTarifa.accion = "actualizacion";
    },
    eliminarTarifa(idPosicion) {
      let MutateResult;
      this.anuncioUsuario.Sec_Tarifas.splice(idPosicion, 1);
      
      this.editarAnuncio().then((success)=>{
        this.$store.dispatch('activationAlert', { type: 'success', message: `${success.mensaje}` });
      })
      .catch((error)=>{
        this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
      });
    },

    //-----Crud Contactos
    salvadoDeContacto() {
      let contacto = {};

      //validacion
      if (this.contactosUsuario.length >= 5) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `No puedes tener más de 5 contactos !!!`,
        });
        return;
      }

      contacto.Tipo = this.nuevoContacto.nuevoContacto;
      contacto.contacto = this.nuevoContacto.contacto;

      if (this.nuevoContacto.accion == "creacion") {
        //Crear un action vuex para agregar un nuevo contacto
        this.anuncioUsuario.Sec_Tarifas.push(contacto);
      } else {
        //Crear un action vuex para agregar un editar un contacto
        this.anuncioUsuario.Sec_Tarifas.splice(
          this.nuevaTarifa.idPosicion,
          1,
          contacto
        );
      }

      this.editarAnuncio().then((success)=>{
        this.$store.dispatch('activationAlert', { type: 'success', message: `${success.mensaje}` });
      })
      .catch((error)=>{
        this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
      });

      this.cancelarSalvado('revealContacto');
    },
    limpiarContactoForm() {
      this.$refs.contactoEdit.reset();

      this.nuevoContacto.idPosicion = 0;
      this.nuevoContacto.accion = "creacion";
      this.nuevoContacto.Tipo = {
        categoria: "",
        icono: "",
      };
      this.nuevoContacto.contacto = "";
    },
    editarContacto(idPosicion) {
      let MutateResult;

      this.nuevoContacto.idPosicion = idPosicion;
      this.nuevoContacto.Tipo = this.contactosUsuario[idPosicion].Tipo;
      this.nuevoContacto.contacto = this.contactosUsuario[idPosicion].contacto;
      this.nuevoContacto.accion = "actualizacion";
      this.anuncioContactoInputsView = true;

      MutateResult = this.editarAnuncio().then((success)=>{
        this.$store.dispatch('activationAlert', { type: 'success', message: `${success.mensaje}` });
      })
      .catch((error)=>{
        this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
      });
      
      this.cancelarSalvado('revealContacto');
    },
    eliminarContacto(idPosicion) {
      let MutateResult;
      
      this.anuncioUsuario.Sec_Tarifas.splice(idPosicion, 1);
      MutateResult = this.editarAnuncio().then((success)=>{
        this.$store.dispatch('activationAlert', { type: 'success', message: `${success.mensaje}` });
      })
      .catch((error)=>{
        this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
      });
    },

    //-----Crud Descripcion
    async salvadoDeDescripcion(tipoSalvado){
      let MutateResult;
      console.log(`vue salvadoDeDescripcion... ${tipoSalvado}`);

      try {
        /*for (let [i, e] of this.imagenesAnuncio.entries()) {
          console.log("this.imagenesAnuncio.entries()");
          this.FormAE.Sec_Imagenes.push({ posicion: this.imagenesAnuncioFilePond.length + i, nombre: e.nombre });
        }*/
  
        if (tipoSalvado === "nuevo") {
            MutateResult = await this.mixinAnuncioCrear(this.FormAE);
        }
  
        if (tipoSalvado === "editando") {
            MutateResult = await this.mixinAnuncioEditar(this.FormAE);
        }
      } catch (error) {
          console.log("Error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al registrar...>>>>${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          throw error;
      }

      //Actualizar Vuex
      if (tipoSalvado === "nuevo") {
          //Funcion de back end para guardar nuevo
          await this.$store.dispatch("anuncioAgregarNuevo", MutateResult.data);
      }

      if (tipoSalvado === "editando") {
          //Funcion de backend para guardar
          await this.$store.dispatch("anuncioEditado", this.FormAE);
      }

      
      this.$store.dispatch("activationAlert", { type: "success", message: MutateResult.mensaje });
      this.cancelarSalvado();
    },

    //------Acciones Anuncio

    cancelarSalvado(seccion) {
      switch (seccion) {
        case "revealTarifa":
          this.anuncioTarifaInputsView = false;
          this.limpiarTarifaForm();
          break;
        case "revealContacto":
          this.anuncioContactoInputsView = false;
          this.limpiarContactoForm();
          break;
        default:
          this.anuncioEdicionInputsView = false;
          break;
      }

      this.$store.dispatch('anuncioEditSet');
      this.anuncioEdicionInputsView = false;
    },
    
    //Habilita la apertura del anuncio y manda a salvar a al objeto FormAE responsable de los CRUDS del anuncio.
    async habilitarEdicionesAnuncio() {
      this.activacionesSecciones("revelDesc");
      console.log(`idAnuncio: ${this.anuncioUsuario._id}, anuncioEdicionInputsViewAction ${true}`)
      
      try {
        await this.mixinAnuncioSetFormAE({ id: this.anuncioUsuario._id });
      } catch (error) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `${error.mensaje}`,
        });
      }
      this.anuncioEdicionInputsView = true;
    },
    
    activacionesSecciones(seccion = "revealDesc") {
      switch (seccion) {
        case "revealDesc":
          this.revealDesc = true;
          this.revealTarifa = false;
          this.revealContact = false;
          break;
        case "revealTarifa":
          this.revealDesc = false;
          this.revealTarifa = true;
          this.revealContact = false;
          break;
        case "revealContacto":
          this.revealDesc = false;
          this.revealTarifa = false;
          this.revealContact = true;
          break;
        default:
          break;
      }
    },
    
    async borrarAnuncio() {
      let MutateResult;
      try {
        MutateResult = await this.mixinAnuncioEliminar(this.anuncioUsuario.id);
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
      this.$store.dispatch("anuncioEliminar", idAnuncio);
      this.$store.dispatch('anuncioEditSet');
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: `Anuncio # ${idAnuncio} eliminado exitosamente!`,
      });
    },

    editarAnuncio(){
      return new Promise(async(resolve, reject) => {
        let MutateResult;
  
        try {
          MutateResult = await this.mixinAnuncioEditar(this.FormAE);
        } catch (error) {
          console.log("Error editarAnuncio...");
          this.mixinLlamadaRouter(error);
          return reject(error);
        }

        console.dir(MutateResult);
        return resolve(MutateResult);
      });
    },
    //FilePondMethods
    handleFilePondInit() {
      console.log("handleFilePondInit");
    },
    async imagenesAnuncioOnDelete(error, file) {
      let MutateResult;

      console.log("imagenesAnuncioOnDelete... file");
      console.dir(file);

      if (error) {
        console.log("error onProcess", error);
        console.log("file in error", file.file);
        return;
      }

      let objetoImagen = {
        //AFSS: Esto no se porqué pero salva de que no se borré la imagen...
        nombre: file.filename,
      };

      try {
        MutateResult = await this.mixinImagenDelete(objetoImagen.nombre);
      } catch (error) {
        console.dir(error);
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `>>>Error al registrar...>>>>${error.mensaje}`,
        });
        this.mixinLlamadaRouter(error);
        throw error;
      }

      // AFSS: Desarrollo futuro, remover el valor de su arreglo vuex usuario
      this.imagenesAnuncio = this.imagenesAnuncio.filter((imagen) => {
        if (imagen.nombre !== objetoImagen.nombre) {
          return imagen;
        }
      });

      /*this.FormAE.Sec_Imagenes = this.FormAE.Sec_Imagenes.filter((imagen) => {
        console.log("formAE sec imagenes igual a ", objetoImagen.nombre);
        console.dir(imagen);
        if (imagen.nombre !== objetoImagen.nombre) {
          return imagen;
        }
      });

      if (this.imagenesAnuncioFilePond.length > 0) {
        this.imagenesAnuncioFilePond = this.imagenesAnuncioFilePond.filter(
          (imagen) => {
            if (imagen.source !== file.filename) {
              return imagen;
            }
          }
        );
      }

      console.dir(MutateResult);
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: MutateResult.mensaje,
      });*/
    },
    imagenesAnuncioOnProcess(error, file) {
      console.log("imagenesAnuncioOnProcess...");
      if (error) {
        console.log("error onProcess", error);
        console.log("file in error", file.file);
        //Aqui se pone la llamada del error
        return;
      }

      console.log("file");
      console.dir(file);
      let objetoImagen = {
        nombre: JSON.parse(file.serverId)[0],
        posicion: this.imagenesAnuncio.length || 0, //Continuación o Seguimiento inicial
      };

      //checar este variable hay que hacer push pero a lo que esta dentro de esa variable
      this.imagenesAnuncio.push(objetoImagen);
    },
  },
  created() {
    if (this.imagenesAnuncio.length > 0) {
      console.log("this.imagenesAnuncio");
      console.dir(this.imagenesAnuncio);

      //si funciona y ya añade, pero hay problemas al limpiar, cuando haces un clear, este actualiza y manda a eliminar, se pasa a renderizar con :key el componente
      for (let Anuncio of this.imagenesAnuncio) {
        if(!!Anuncio.nombre){
          this.imagenesAnuncioFilePond.push({
            source: Anuncio.nombre,
            options: { type: "local" },
          });
        }
      }
    } else {
      this.imagenesAnuncioFilePond = [];
    }
  },
};
</script>

<style lang="scss" scoped>
.full-anuncio-seccion {
  height: auto;
  min-height: 270px !important;
  overflow-y: auto;
  line-height: 18px;
}

.full-anuncio-seccion-web {
  height: 270px !important;
}

.v-textarea textarea {
  line-height: 1.35rem !important;
}

.edicionCSS {
  position: relative;
  top: -30px;
  padding-top: 0px;
}
</style>
