<template>
  <v-card width="tarjetaWH['cuerpoAnuncioW']">
    <v-container fluid class="pa-0">
      <v-row class="" no-gutters>
        <v-col cols="12" md="3" v-if="edicionView">
          <file-pond-Imagenes-Anuncio
            :imagenes="imagenesAnuncioFilePond"
            @imageOnDelete="imageOnDelete"
            @imageOnProcess="imageOnProcess"
          ></file-pond-Imagenes-Anuncio>
        </v-col>
        <v-col
          cols="12"
          :md="edicionView ? 9 : 6"
          style="position: relative;"
          v-else
          v-show="!anuncioComprasView"
        >
          <div
            style="position: absolute; top: 17px; right: 0; width:38px"
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
              <div class="d-flex flex-column align-center" @click="habilitarComprasAnuncio">
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

        <v-col cols="12" :md="edicionView ? 9 : !anuncioComprasView ? 6 : 12">
          <v-card class="pa-1" flat :height="tarjetaWH['cuerpoAnuncioH']">
            <v-card-title class="pt-0" v-show="!edicionView">
              <v-container class="pa-0">
                <v-row no-gutters class="align-end">
                  <v-col>
                    <div class="text-h4 text-md-h6 text-truncate">
                      {{ anuncioUsuario.Sec_Descripcion.titulo }}
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
              <!--Descripcion-->
            </v-card-title>

            <v-card-text class="pa-0 mt-4" v-show="!anuncioComprasView">
              <v-row align="space-between" justify="center" no-gutters>
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

            <v-expand-x-transition style="position: absolute; bottom: 0px;">
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
                  style="position: relative;"
                >
                  <div v-if="nuevaTarifaView">
                    <v-form ref="tarifaEdit">
                      <v-card-text class="px-0 py-0">
                        <v-row class="pt-6 pt-md-2" no-gutters>
                          <v-col cols="8" class="pr-4">
                            <div
                              class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                            >
                              nombre
                            </div>
                            <v-row no-gutters>
                              <v-text-field
                                v-model="nuevaTarifa.nombre"
                                class="error609TextField"
                                color="pink"
                                dense
                                outlined
                                solo
                                label="teclea aquí"
                              >
                              </v-text-field>
                            </v-row>
                          </v-col>
                          <v-col cols="4">
                            <div
                              class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                            >
                              precio
                            </div>
                            <v-row no-gutters>
                              <v-text-field
                                v-model="nuevaTarifa.precio"
                                prefix="$"
                                dense
                                outlined
                                solo
                                label="0.00"
                              >
                              </v-text-field>
                            </v-row>
                          </v-col>
                        </v-row>
                        <!--nombre y precio tarifa-->

                        <v-row no-gutters>
                          <v-col cols="12">
                            <div
                              class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                            >
                              descripción
                            </div>
                            <v-row no-gutters>
                              <v-textarea
                                counter
                                rows="5"
                                dense
                                outlined
                                solo
                                label="teclea aquí"
                                v-model="nuevaTarifa.descripcion"
                                id="nuevaTarifa-descripcion"
                              >
                              </v-textarea>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <!--Nueva Tarifa Inputs-->
                      <v-card-actions
                        style="position: absolute; bottom:12px; left: 26%;"
                      >
                        <v-btn
                          @click="setSalvadoNuevaTarifa"
                          color="primary"
                          class="mx-2 rounded-xl btn-menu-pcview errorBoxShadow"
                          tile
                          raised
                        >
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
                      <v-row class="pt-2" align="space-around" no-gutters>
                        <v-col align="left" class="pl-2">
                          <div class="text-subtitle-1 font-weight-bold">
                            {{ tarifa.nombre }}
                          </div>
                        </v-col>
                        <v-col cols="5" align="center" class="pr-2">
                          <div class="subtitle-1 pink-font text-weight-black">
                            <font-awesome-icon icon="dollar-sign" />
                            {{ tarifa.precio }}
                          </div>
                        </v-col>
                      </v-row>
                      <!--Nombre Precio-->

                      <v-row no-gutters align="center" justify="center" class="mt-2">
                        <v-col cols="12">
                          <div
                            class="body-2 text-center"
                            style="min-height: 42px; line-height: 1rem; white-space: pre-line;"
                          >
                            {{ tarifa.descripcion }}
                          </div>
                        </v-col>
                      </v-row>
                      <!--Descripcion-->

                      <v-row justify="center">
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
                  style="position: relative;"
                >
                  <div v-if="nuevoContactoView">
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
                          <v-col cols="3">
                            <div
                              class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                            >
                              red
                            </div>
                            <v-row no-gutters>
                              <v-select
                                v-model="nuevoContacto.Tipo"
                                :menu-props="{ top: false, offsetY: true }"
                                :items="tiposContacto"
                                item-text="categoria"
                                item-value="icono"
                                return-object
                                solo
                                dense
                                outlined
                                class="error609TextField"
                              >
                                <template v-slot:selection="data">
                                  <font-awesome-icon
                                    :icon="[
                                      data.item.categoria,
                                      data.item.icono,
                                    ]"
                                  >
                                  </font-awesome-icon>
                                </template>
                                <template v-slot:item="data">
                                  <font-awesome-icon
                                    :icon="[
                                      data.item.categoria,
                                      data.item.icono,
                                    ]"
                                  >
                                  </font-awesome-icon>
                                </template>
                              </v-select>
                            </v-row>
                          </v-col>

                          <v-col cols="9" class="pl-4">
                            <div
                              class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                            >
                              url
                            </div>
                            <v-row no-gutters>
                              <v-text-field
                                v-model="nuevoContacto.contacto"
                                class="error609TextField"
                                color="pink"
                                dense
                                outlined
                                solo
                                label="teclea aquí"
                              >
                              </v-text-field>
                            </v-row>
                          </v-col>
                        </v-row>
                        <!-- Input nuevo contacto-->
                      </v-card-text>
                      <!--Cuerpo form nuevo contacto-->

                      <v-card-actions
                        style="position: absolute; bottom:12px; left: 26%;"
                      >
                        <v-btn
                          @click="salvadoDeContacto"
                          color="primary"
                          class="mx-2 rounded-xl btn-menu-pcview errorBoxShadow"
                          tile
                          raised
                        >
                          Guardar
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                    <!--Form nuevo contacto-->
                  </div>
                  <!--Nueva creacion contacto-->

                  <div v-else>
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
                            shaped
                            class="mb-2"
                          >
                            <v-list
                              color="transparent"
                              dense
                              :disable="
                                contactosSeleccionados.includes(i)
                                  ? false
                                  : true
                              "
                            >
                              <v-list-item style="padding: 0;">
                                <v-list-item-content>
                                  <v-card
                                    elevation="2"
                                    rounded-xl
                                    style="border-radius: 20px;"
                                    :elevation="
                                      !contactosSeleccionados.includes(i)
                                        ? 0
                                        : 4
                                    "
                                  >
                                    <v-row
                                      align="space-between"
                                      no-gutters
                                      style="height: 34px;"
                                    >
                                      <v-col
                                        v-show="edicionView"
                                        cols="3"
                                        align="center"
                                      >
                                        <v-switch
                                          v-model="contactosSeleccionados"
                                          color="primary"
                                          :value="i"
                                          style="margin: 0; padding-left: .7rem;"
                                        ></v-switch>
                                      </v-col>
                                      <v-col
                                        align="left"
                                        style="padding-top: 6%; padding-left: 17px; font-weight: 500;"
                                      >
                                        {{ contacto.contacto }}
                                      </v-col>
                                    </v-row>
                                  </v-card>
                                </v-list-item-content>
                                <v-list-item-avatar
                                  class="ml-4"
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
                                    style="font-size:1.4em;"
                                    color="white"
                                  />
                                </v-list-item-avatar>
                              </v-list-item>
                            </v-list>
                            <!--cuerpo contacto -->

                            <div
                              style="
                                position: absolute;
                                bottom: -2px;
                                right: 16%;
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

              <v-card-text class="d-flex justify-center pb-1 pt-0">
                <v-sheet
                  fluid
                  elevation="0"
                  class="full-anuncio-seccion"
                  :class="fullAnuncioSeccionWeb"
                  v-show="nuevaDescripcionView"
                  >
                  <v-form ref="descripcionEdit" style="margin-top: 16px;">
                    <v-row no-gutters>
                      <v-col cols="12" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          título
                        </div>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-text-field
                              v-model="anuncioUsuario.Sec_Descripcion.titulo"
                              class="error609TextField"
                              color="pink"
                              dense
                              outlined
                              solo
                              label="teclea aquí"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!--input titulo-->
                    </v-row>
                    <!--row titulo y edad-->

                    <v-row no-gutters>
                      <v-col cols="11" md="6" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          estados
                        </div>
                        <v-row no-gutters>
                          <v-select
                            v-model="anuncioUsuario.Sec_Descripcion.estado"
                            :menu-props="{ top: false, offsetY: true }"
                            :items="ddlEstados"
                            :item-text="'descripcion'"
                            :item-value="'descripcion'"
                            class="error609TextField"
                            label="Estados"
                            filled
                            outlined
                            solo
                            dense
                            @change="getMunicipios(anuncioUsuario.Sec_Descripcion.estado)"
                          >
                            <template v-slot:selection="{ item }">
                              <span v-if="item.descripcion.length">{{
                                item.descripcion.slice(
                                  0,
                                  item.descripcion.length
                                )
                              }}</span>
                              <span v-else>{{ item.descripcion }}</span>
                            </template>
                          </v-select>
                        </v-row>
                        <!--input estados-->
                      </v-col>

                      <v-col cols="11" md="6" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          municipios
                        </div>
                        <v-row no-gutters>
                          <v-select
                            v-model="anuncioUsuario.Sec_Descripcion.ciudad"
                            :menu-props="{ top: false, offsetY: true }"
                            :items="ddlMunicipios"
                            :item-text="'descripcion'"
                            :item-value="'descripcion'"
                            class="error609TextField"
                            label="Municipios"
                            filled
                            outlined
                            solo
                            dense
                          >
                            <template v-slot:selection="{ item }">
                              <span>{{ item.descripcion }}</span>
                            </template>
                          </v-select>
                        </v-row>
                      </v-col>
                      <!--input municipios-->
                    </v-row>
                    <!--row estado y municipio-->

                    <v-row no-gutters class="align-start">
                      <v-col cols="5" md="4" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          edad
                        </div>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-text-field
                              color="pink"
                              dense
                              outlined
                              solo
                              label="edad"
                              type="number"
                              min="21"
                              class="error609TextField"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!--input edad-->

                      <v-col cols="6" md="4" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          sexo
                        </div>
                        <v-row no-gutters>
                          <v-select
                            v-model="anuncioUsuario.Sec_Descripcion.sexo"
                            :menu-props="{ top: false, offsetY: true }"
                            :items="getDdlSexo"
                            :item-text="'descripcion'"
                            :item-value="'descripcion'"
                            filled
                            dense
                            class="error609TextField"
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
                        </v-row>
                      </v-col>
                      <!--input sexo-->

                      <v-col cols="7" md="4" class="pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          categorias
                        </div>
                        <v-row no-gutters>
                          <v-select
                            v-model="anuncioUsuario.categorias"
                            :menu-props="{ top: false, offsetY: true }"
                            :items="getDdlCategorias"
                            :item-text="'descripcion'"
                            :item-value="'descripcion'"
                            filled
                            outlined
                            label="Categorias"
                            class="error609TextField"
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
                        </v-row>
                      </v-col>
                      <!--input categorias-->
                    </v-row>
                    <!--row edad, sexo y categorias-->

                    <v-row no-gutters>
                      <v-col class="mx-auto pr-4">
                        <div
                          class="pink--text font-weight-black text-subtitle-1 ml-6 text-capitalize"
                        >
                          descripción
                        </div>
                        <v-textarea
                          v-model="anuncioUsuario.Sec_Descripcion.descripcion"
                          outlined
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
                  v-show="!nuevaDescripcionView && !anuncioComprasView"
                  style="white-space: pre-line;"
                >
                  {{ anuncioUsuario.Sec_Descripcion.descripcion }}
                </v-sheet>

                <v-sheet
                  fluid
                  elevation="0"
                  v-show="anuncioComprasView"
                  class="full-anuncio-seccion"
                  style="overflow-y: hidden; width: 100%;"
                >
                  <dashboard-compras></dashboard-compras>                  
                </v-sheet>
              </v-card-text>
              <!--v-card Descripción-->
            </v-expand-x-transition>
            <!--Cuerpo Anuncio (descripcion, contacto y tarifas)-->

            <v-card-action v-show="edicionView">
              <v-container>
                <v-row align="space-around">
                  <v-col v-show="!nuevaTarifaView && !nuevoContactoView"
                    align="center"
                  >
                    <v-btn
                      @click="salvarFormAnuncio"
                      color="primary"
                      class="mx-2 rounded-xl btn-menu-pcview errorBoxShadow"
                      tile
                      raised
                    >
                      <span style="color: white;">Guardar</span>
                    </v-btn>
                    <!--guardar descripcion-->
                  </v-col>
                  <!--BotonGuardar-->

                  <v-col v-show="tabSeleccionado != 'revealDesc'"
                    align="center"
                  >
                    <v-btn
                      color="green"
                      class="mx-2 rounded-xl btn-menu-pcview errorBoxShadow"
                      @click="abrirFormAnuncio(true)"
                      raised
                    >
                      <span style="color: white;">Nuevo</span>
                    </v-btn>
                  </v-col>
                  <!--BotonNuevoContacto/Tarifa-->

                  <v-col align="center">
                    <v-dialog
                      transition="dialog-bottom-transition"
                      max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="black"
                          class="mx-2 rounded-xl btn-menu-pcview errorBoxShadow"
                          style="border: none!important;"
                          outlined
                          v-on="on"
                          v-bind="attrs"
                        >
                          Cancelar
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary" dark>
                            Error 609...
                          </v-toolbar>
                          <v-card-text>
                            <div class="text-h5">
                              Quieres salir sin guardar...?
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-row no-gutters>
                              <v-col align="center">
                                <v-btn text @click="dialog.value = false"
                                  >No</v-btn
                                >
                              </v-col>
                              <v-col align="center">
                                <v-btn
                                  text
                                  @click="
                                    cancelarFormAnuncio();
                                    dialog.value = false;
                                  "
                                  >Si</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                  <!--BotonCancelar-->
                </v-row>
              </v-container>
            </v-card-action>
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
import PaqueteMixins from "../mixins/paquete-mixins.js";
import { mapGetters } from "vuex";

export default {
  name: "tarjeta-anuncio-usuario",
  mixins: [AnuncioMixins, GeneralMixins],
  components: {
    DashboardCompras,
    FilePondImagenesAnuncio,
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
      anuncioComprasInputView: false,
      anuncioTarifaInputsView: false,
      anuncioContactoInputsView: false,
      tiposCategoriasAnuncio: [""],
      newDefaultContactos: [],
      nuevasImagenes: [],
      edadRules: (v) => /.+@.+\..+/.test(v) || "Solo dígitos",
      tiposContacto: [
        { categoria: "fab", icono: "whatsapp", color: "green" },
        { categoria: "fab", icono: "twitter", color: "light-blue" },
        { categoria: "fab", icono: "instagram", color: "red" },
        { categoria: "fa", icono: "phone-alt", color: "amber" },
        { categoria: "fa", icono: "globe", color: "blue" },
      ],
      contactosSeleccionados: [],
      oldContacto: {
        contacto: "",
      },
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
      DdlMunicipios: [],
      DdlEstados: []
    };
  },
  computed: {
    ...mapGetters([
      "Usuario",
      "getDdlCategorias",
      "getDdlSexo",
      "FormAE",
    ]),
    ddlEstados(){
      return this.DdlEstados;
    },
    ddlMunicipios(){
      return this.DdlMunicipios
    },
    tarjetaWH() {
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md
        ? { carruselH: "500px", cuerpoAnuncioH: "auto", cuerpoAnuncioW: "auto" }
        : {
            carruselH: "500px",
            cuerpoAnuncioH: "500px",
            cuerpoAnuncioW: "auto",
          };
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
          url: "http://localhost:3080/uploads/" + infoImagen.nombre,
          //url: "/api/uploads/" + infoImagen.nombre,
          options: { type: "remote" },
        };
      });
    },
    imagenesActuales() {
      let vueltaAnuncio = -1;
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen) {
        vueltaAnuncio++;
        if (!!infoImagen) {
          return {
            nombre: infoImagen.nombre,
            posicion: vueltaAnuncio,
          };
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
    edicionView() {
      return (
        this.nuevaDescripcionView ||
        this.nuevaTarifaView ||
        this.nuevoContactoView
      );
    },
    anuncioComprasView(){
      return this.anuncioComprasInputView;
    },
    nuevaDescripcionView() {
      return (
        this.anuncioEdicionInputsView ||
        this.anuncioUsuario.hasOwnProperty("_anuncioEdicionInputsView")
      );
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
    abrirFormAnuncio(isNew = false) {
      if (isNew) {
        if (this.tabSeleccionado === "revealContacto") {
          this.anuncioContactoInputsView = true;
        }
        if (this.tabSeleccionado === "revealTarifa") {
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

    async salvarFormAnuncio() {
      console.log(`vue salvarFormAnuncio...`);
      let MixinResult;
      //Cambiar Activacion de Imagenes
      //this.cancelarFormAnuncio(false);

      //Activar una especia de loading (no importante aun)

      try {
        MixinResult = await this.savingAnuncio(); //Llamada de creacion/modificacion anuncio
      } catch (error) {
        console.log("vue salvarFormAnuncio... en error");
        console.dir(error);

        this.mixinLlamadaRouter(error);
        return;
      }

      await this.cancelarFormAnuncio();
      this.mixinLlamadaRouter(MixinResult);
    },

    //------Acciones Anuncio
    cancelarFormAnuncio(limpia = true) {
      return new Promise(async (resolve, rejected) => {
        if (limpia) {
          this.limpiarContactoForm();
          this.limpiarTarifaForm();

          if (this.FormAE.hasOwnProperty("_anuncioEdicionInputsView")) {
            if (this.FormAE._anuncioEdicionInputsView) {
              await this.$store.dispatch("newAnuncioOffSet"); //Quita el anuncio que se iba a crear y limpa la base vuex de FormAE
            }
          }
          await this.$store.dispatch("anuncioEditSet"); //Limpia la base de vuex de FormAE
        }

        this.anuncioEdicionInputsView = false;
        this.anuncioContactoInputsView = false;
        this.anuncioTarifaInputsView = false;
        resolve();
      });
    },

    setSalvadoNuevaTarifa() {
      let tarifa = {};
      console.log("setSalvadoNuevaTarifa");

      //validacion
      if (this.anuncioUsuario.Sec_Tarifas.length >= 3) {
        this.$store.dispatch("activationAlert", {
          type: "error",
          message: `No puedes tener más de 3 tarifas por Anuncio!.`,
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

      this.abrirFormAnuncio();
    },
    eliminarTarifa(idPosicion) {
      this.anuncioUsuario.Sec_Tarifas.splice(idPosicion, 1);
    },

    //Descripción: Solo guarda en las propiedades que usa el salvado de Anuncio, Solo cuando se de el guardado general este, manda guardar a todo lo demás
    async salvadoDeContacto() {
      console.log(`salvadoDeContacto`);

      let contacto = {};
      let esContactoSeleccionado = -1;
      let _Default_Contactos = this.Usuario.Default_Contactos;

      // Analizar validacion
      if (this.contactosUsuario.length >= 5) {
        this.$store.dispatch("activationAlert", {
          type: "warning",
          message: `No puedes tener más de 5 contactos !.`,
        });
        return;
      }

      //Setear valores
      esContactoSeleccionado = this.anuncioUsuario.Sec_Contacto.findIndex(
        (Contacto) => Contacto.contacto == this.oldContacto.contacto
      );
      console.log(`esContactoSeleccionado: ${esContactoSeleccionado}`);

      //Crear Objeto
      contacto.Tipo = {
        categoria: this.nuevoContacto.Tipo.categoria,
        icono: this.nuevoContacto.Tipo.icono,
      };
      contacto.contacto = this.nuevoContacto.contacto;
      console.dir(contacto);

      if (this.nuevoContacto.accion == "creacion") {
        //Se autoSelecciona dentro del anuncio creado
        this.anuncioUsuario.Sec_Contacto.push(contacto);

        //Preparar array para actualizado de Defaul_Contactos
        this.newDefaultContactos = this.contactosUsuario;
        this.newDefaultContactos.push(contacto);

        await this.$store.dispatch(
          "anuncioEditContactoSet",
          this.anuncioUsuario.Sec_Contacto
        ); //Actualizacion vuex base de FormaAE
      } else {

        _Default_Contactos.splice(this.nuevoContacto.idPosicion, 1, {
          contacto: contacto.contacto,
          Tipo: contacto.Tipo,
        });

        console.log(`this.newDefaultContactos`);
        console.dir(_Default_Contactos);
        this.newDefaultContactos = _Default_Contactos; //Variable analizar

        //Editar el contacto existente
        if (esContactoSeleccionado >= 0) {
          this.anuncioUsuario.Sec_Contacto.splice(
            this.nuevoContacto.idPosicion,
            1,
            { contacto: contacto.contacto, Tipo: contacto.Tipo }
          );

          await this.$store.dispatch(
            "anuncioEditContactoSet",
            this.anuncioUsuario.Sec_Contacto
          ); //Actualizacion vuex base de FormaAE
        }
      }

      this.anuncioContactoInputsView = false;
    },

    //----- Sets de secciones
    setSalvadoEdicionImagenes() {
      return new Promise(async (resolve, reject) => {
        if (this.nuevasImagenes.length > 0) {
          await this.$store.dispatch("anuncioSetImagenes", this.nuevasImagenes); //Actualizacion vuex base de FormaAE
        } else {
          await this.$store.dispatch(
            "anuncioSetImagenes",
            this.anuncioUsuario.Sec_Imagenes
          );
        }
        resolve();
      });
    },
    setSalvadoEdicionDescripcion() {
      return new Promise(async (resolve, reject) => {
        await this.$store.dispatch(
          "anuncioDescripcionSet",
          this.anuncioUsuario.Sec_Descripcion
        );
        await this.$store.dispatch(
          "anuncioCategoriasSet",
          this.anuncioUsuario.categorias
        );
        await this.$store.dispatch(
          "anuncioPermisosSet",
          this.anuncioUsuario.permisos
        );
        resolve();
      });
    },
    setSalvadoEdicionTarifas() {
      return new Promise(async (resolve, reject) => {
        await this.$store.dispatch(
          "anuncioEditTarifaSet",
          this.anuncioUsuario.Sec_Tarifas
        );
        resolve();
      });
    },
    setSalvadoEdicionContacto() {
      return new Promise((resolve, reject) => {
        let newArrayContactoAnuncio = [];

        //Añadiendo solamente la propiedad contacto en Vuex anuncioUsuario en lo que este en contactosSeleccionados
        for (
          let contactoSeleccionadosLoop = 0;
          contactoSeleccionadosLoop < this.contactosSeleccionados.length -1;
          contactoSeleccionadosLoop++
        ) {
          newArrayContactoAnuncio.push({
            contacto: this.contactosUsuario[
              this.contactosSeleccionados[contactoSeleccionadosLoop]
            ].contacto,
            Tipo: this.contactosUsuario[
              this.contactosSeleccionados[contactoSeleccionadosLoop]
            ].Tipo,
          });
        }

        console.log(`setSalvadoEdicionContacto...`);
        console.dir(newArrayContactoAnuncio);

        this.anuncioUsuario.Sec_Contacto = newArrayContactoAnuncio;
        this.$store.dispatch("anuncioEditContactoSet", newArrayContactoAnuncio); //Actualizacion vuex base de FormaAE
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
      this.oldContacto.contacto = this.contactosUsuario[idPosicion].contacto;
      this.nuevoContacto.idPosicion = idPosicion;
      this.nuevoContacto.Tipo = this.contactosUsuario[idPosicion].Tipo;
      this.nuevoContacto.contacto = this.contactosUsuario[idPosicion].contacto;
      this.nuevoContacto.accion = "actualizacion";
      this.anuncioContactoInputsView = true;

      this.abrirFormAnuncio();
    },

    //Prepara los Vuex para el guardado de Default Contactos o Anuncio Contactos
    async eliminarContacto(idPosicion) {
      let MutateResult;

      console.log(`${typeof idPosicion}`);
      if (idPosicion === "undefined") {
        //Analizar algun error para enviar
        console.log("se regresa");
        return;
      }

      console.log(`eliminarContacto ${idPosicion}`);

      if (this.contactosUsuario.length > 0) {
        this.Usuario.Default_Contactos.splice(idPosicion, 1);
        this.newDefaultContactos = this.Usuario.Default_Contactos;
      } // Asignacion de nuevos defaultContactos

      console.log(
        `this.anuncioUsuario.Sec_Contacto.length ${this.anuncioUsuario.Sec_Contacto.length}`
      );
      console.log(
        `this.contactosUsuario.length ${this.contactosUsuario.length}`
      );

      console.dir(this.contactosUsuario[idPosicion]);

      for (
        let anuncioContactosLoop = 0;
        anuncioContactosLoop <= this.anuncioUsuario.Sec_Contacto.length;
        anuncioContactosLoop++
      ) {
        if (
          this.contactosUsuario[idPosicion].contacto ==
          this.anuncioUsuario.Sec_Contacto[anuncioContactosLoop].contacto
        ) {

          console.log("es un contacto seleccionado");
          console.dir(this.anuncioUsuario.Sec_Contacto[anuncioContactosLoop]);

          this.anuncioUsuario.Sec_Contacto.splice(anuncioContactosLoop, 1);
          break;
        }
      } //El anuncio tiene como seleccion el contacto que se quiere eliminar y lo quita tmb del array de seleccionados
    },

    habilitarComprasAnuncio(){
      let _idAnuncio;

      if (this.anuncioUsuario.hasOwnProperty("_id")) {
        _idAnuncio = this.anuncioUsuario._id;
      } else if (this.anuncioUsuario.hasOwnProperty("id")) {
        _idAnuncio = this.anuncioUsuario.id;
      }

      if(!!_idAnuncio){
        this.anuncioComprasInputView = true;
        return;
      }
      
      this.anuncioComprasInputView = false;
      this.$store.dispatch("activationAlert", {
        type: "error",
        message: `Otro Anuncio tiene habilitado la sección de Compras.`,
      });
    },

    //Habilita la apertura de edición del anuncio y manda a setea a al objeto FormAE responsable de los CRUDS del anuncio.
    async habilitarEdicionesAnuncio() {
      let _idAnuncio, MixinResult;

      if (this.anuncioUsuario.hasOwnProperty("_id")) {
        _idAnuncio = this.anuncioUsuario._id;
      } else if (this.anuncioUsuario.hasOwnProperty("id")) {
        _idAnuncio = this.anuncioUsuario.id;
      }

      if (_idAnuncio === this.FormAE.id || !this.FormAE.id) {
        this.activacionesSecciones(this.tabSeleccionado);
        this.anuncioEdicionInputsView = true;

        try {
          MixinResult = await this.mixinAnuncioSetFormAE({
            id: _idAnuncio,
          });
        } catch (error) {
          this.$store.dispatch("activationAlert", {
            type: "error",
            message: `${error.mensaje}`,
          });
          return;
        }

        console.log("anuncioEditSet... ");
        console.dir(MixinResult);

        this.$store.dispatch("anuncioEditSet", MixinResult);
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
      let _idAnuncio;
      console.log("vue borrarAnuncio...");

      try {
        if (this.anuncioUsuario.hasOwnProperty("_id")) {
          _idAnuncio = this.anuncioUsuario._id;
        } else {
          _idAnuncio = this.anuncioUsuario.id;
        }

        console.log(`_idAnuncio ${_idAnuncio}`);
        MutateResult = await this.mixinAnuncioEliminar(_idAnuncio);
      } catch (error) {
        console.log("vue borrarAnuncio... en error");
        console.dir(error);

        this.mixinLlamadaRouter(error);
        throw error;
      }

      console.dir(MutateResult);
      this.mixinLlamadaRouter(MutateResult);
    },

    //Esta funcion, no es una funcion directa, asi que no hace la llamadas al dispatch de acciones finales
    savingAnuncio() {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        let _idAnuncio;

        if (this.anuncioUsuario.hasOwnProperty("_id")) {
          _idAnuncio = this.anuncioUsuario._id;
        } else if (this.anuncioUsuario.hasOwnProperty("id")) {
          _idAnuncio = this.anuncioUsuario.id;
        }

        try {
          //Añadir aqui la validacion de infor de la seccion Descripcion
          //Añade los vuex de FormAE
          await this.setSalvadoEdicionContacto(); //Actualizando los contactos seleccionados del anuncio en la base Vuex de FormAE
          await this.setSalvadoEdicionImagenes(); //Actualizando las imagenes que haya hecho trigger el filePond a la base Vuex de FormAE
          await this.setSalvadoEdicionDescripcion(); //Actualizando seccion de descripncipn en la base Vuex de FormAE
          await this.setSalvadoEdicionTarifas(); //Actualizando el listado de tarifas en la base Vuex de FormAE

          console.dir(this.FormAE);

          if (!!_idAnuncio) {
            console.log(`Editando seleccionado... ${_idAnuncio}`);
            await this.$store.dispatch("anuncioIdSet", _idAnuncio);

            MutateResult = await this.mixinAnuncioEditar(this.FormAE);
          } else {
            console.log("Guardando nuevo...");

            MutateResult = await this.mixinAnuncioSetCrear(this.FormAE);
          }

          //Solo cuando haya sido alterado newDefaultContactos este manda a salvar DefaultCOntactosBackend
          if (this.newDefaultContactos.length > 0) {
            this.$store.dispatch("contactoDefaultEditado", this.newDefaultContactos); //Actualizacion vuex Usuario.DefaultContacto con los cambios
            console.log("this.newDefaultContactos... ");
            console.dir(this.newDefaultContactos);

            await this.mixinActualizarDefaultContactos(
              this.newDefaultContactos
            );
          }
        } catch (error) {
          console.log("savingAnuncio... en error")
          console.dir(error);
          return reject(error);
        }

        return resolve(MutateResult);
      });
    },

    async imageOnDelete(Image) {
      console.log("imageOnDelete...");
      console.dir(Image);
      let newArrayImagenes = [];
      let imagenesAnuncioLoop = 0;
      let comparingArray =
        this.nuevasImagenes.length == 0
          ? this.imagenesActuales
          : this.nuevasImagenes;

      for (let loop = 0; loop < comparingArray.length; loop++) {
        let imageName = this.imagenesActuales[loop].nombre;

        if (imageName !== Image.imageToDelete) {
          console.log(
            `imageName ${Image.imageToDelete}, ${this.imagenesActuales[loop].nombre}`
          );
          newArrayImagenes.push({
            nombre: imageName,
            posicion: imagenesAnuncioLoop,
          });
          imagenesAnuncioLoop++;
        }
      }

      this.nuevasImagenes = newArrayImagenes;
      await this.setSalvadoEdicionImagenes(); //Actualizando la base Vuex de FormAE
    },
    imageOnProcess(ObjetoImagen) {
      console.log(`imageOnProcess...${typeof ObjetoImagen}`);
      console.log(
        `nuevasImagenes...${typeof this.nuevasImagenes} ${this.nuevasImagenes}`
      );
      console.dir(ObjetoImagen);
      let newArrayImagenes = this.imagenesActuales;
      newArrayImagenes.push(ObjetoImagen);
      this.nuevasImagenes = newArrayImagenes;
      console.dir(this.nuevasImagenes);
    },
    contactosSeleccionadosSet(clean = false) {
      if (clean) {
        this.contactosSeleccionados = [];
        return;
      }
      for (
        let defaulContactLoop = 0;
        defaulContactLoop < this.contactosUsuario.length;
        defaulContactLoop++
      ) {
        let anuncioContactoLoop = 0;
        let ContactosAnuncio = this.anuncioUsuario.Sec_Contacto;
        let ContactosUsuario = this.contactosUsuario;

        for (
          anuncioContactoLoop;
          anuncioContactoLoop < ContactosAnuncio.length;
          anuncioContactoLoop++
        ) {
          if (
            ContactosAnuncio[anuncioContactoLoop].contacto ==
            ContactosUsuario[defaulContactLoop].contacto
          ) {
            this.contactosSeleccionados.push(defaulContactLoop);
          }
        }
      }
    },
  },
  created() {
    //activando edicion descripcion
    console.log(
      `_anuncioEdicionInputsView: ${this.anuncioUsuario.hasOwnProperty(
        "_anuncioEdicionInputsView"
      )}`
    );
    if (this.anuncioUsuario.hasOwnProperty("_anuncioEdicionInputsView")) {
      this.anuncioEdicionInputsView = true;
    } else {
      this.anuncioEdicionInputsView = false;
    }

    //Marcando contactoSeleccionados
    this.contactosSeleccionadosSet();

    const _DdlEstados = this.$store.state.panelHerramientas.ddls.filter(
        (Ddls) => {
          return Ddls.categoria === "ddlEstado"
        }
      )
    console.log("_ddlEstados...");
    this.DdlEstados = _DdlEstados;

    if(_DdlEstados.length <= 0){
      let _MixinResult;

      console.log("mixinDdlGeneral(ddlEstado)...");
      _MixinResult = this.mixinDdlGeneral("ddlEstado");
      console.dir(_MixinResult);
      this.$store.dispatch("ddls", {
        categoria: "ddlEstado",
        categorias: _MixinResult.data
      });
      
      this.DdlEstados = _MixinResult.data;
    }
    
  },
};
</script>

<style lang="scss" scoped>
.full-anuncio-seccion {
  height: auto;
  min-height: 356px !important;
  overflow-y: auto;
  line-height: 18px;
}

.full-anuncio-seccion-web {
  max-height: 357px !important;
}

.v-textarea textarea {
  line-height: 1.35rem !important;
}

.v-text-field--outlined.v-input--dense .v-label {
  top: 12px !important;
}

.glassy {
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

.suave-pink-font {
  background-color: #e47ab6 !important;
  color: white !important;
}

.green-font {
  color: #9fe676 !important;
}

.pink-font {
  color: #e0409a !important;
}

.anuncioHover {
  border: 6px solid #e0409a !important;
}

.btn-menu-mbview {
  width: auto;
}

.errorBoxShadow {
  box-shadow: 0px 7px 9px -4px rgb(0 0 0 / 5%),
    0px 14px 21px 2px rgb(0 0 0 / 8%), 0px 5px 26px 4px rgb(0 0 0 / 8%) !important;
}
</style>
