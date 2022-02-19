<template>
  <v-card width="750">
    <v-container fluid class="py-0 pl-0">
      <v-row class="fill-height" no-gutters>
        <v-col cols="12" lg="5">
          <v-carousel :height="tarjetaWH['carrusel']">
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

        <v-col cols="12" lg="7">
          <v-card
            class="pa-4 pa-lg-2"
            flat
            :height="tarjetaWH['cuerpoAnuncio']"
          >
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
            </v-card-title>
            <!--Titulo principal-->

            <v-card-text class="pa-0 pb-2">
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

                <v-btn
                  depressed
                  rounded
                  v-ripple="false"
                  @click="activacionesSecciones('revealTarifa')"
                  class="ml-2"
                  small
                  :class="{ 'suave-pink-font': revealTarifa }"
                  width="100"
                >
                  tarifas
                </v-btn>

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
                    v-if=" anuncioUsuario.Sec_Tarifas.length == 0 || nuevaTarifaView "
                  >
                    <div
                      class="
                        text-h6
                        green-font
                        text-weight-black text-center
                        py-1
                      "
                    >
                      Nueva Tarifa
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
                          class="mx-2"
                          dark
                          color="primary"
                          @click="salvadoDeTarifa"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'save']"
                            class="fa-2x mr-1"
                          ></font-awesome-icon>
                          Guardar
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          dark
                          color="error"
                          @click="cancelarSalvado"
                          v-if="anuncioUsuario.Sec_Tarifas.length > 0"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'times']"
                            class="fa-2x mr-1"
                          ></font-awesome-icon>
                          Cancelar
                        </v-btn>
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

                      <div style="position: absolute; top: 15%; right: 0px">
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
                      <div style="position: absolute; bottom: 10%; right: 0px">
                        <v-btn
                          fab
                          icon
                          small
                          depressed
                          color="blue"
                          @click="editarTarifa(i)"
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
                  class="rounded-xl mb-2"
                  width="400"
                  height="fit-content"
                >
                  CONTACOTS!
                </v-sheet>
              </v-card-text>
              <!--Contacto-->

              <v-card-text
                class="full-anuncio-seccion pb-1"
                :class="fullAnuncioSeccionWeb"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti doloribus qui similique
                impedit. Reiciendis et cumque odit, officiis atque omnis, quasi
                numquam repudiandae id rem itaque architecto ipsam facere cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti doloribus qui similique impedit. Reiciendis et cumque
                odit, officiis atque omnis, quasi numquam repudiandae id rem
                itaque architecto ipsam facere cum.
              </v-card-text>
              <!--Descripción-->
            </v-expand-x-transition>
            <!--Cuerpo Anuncio (descripcion y tarifas)-->

            <div
              style="position: sticky; bottom: 0"
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

                <v-btn fab small text outlined plain color="green">
                  <font-awesome-icon
                    :icon="['fas', 'pencil-alt']"
                    class="fa-2x"
                  ></font-awesome-icon>
                </v-btn>
                <v-btn fab small text outlined plain color="green">
                  <font-awesome-icon
                    :icon="['fas', 'shopping-bag']"
                    class="fa-2x"
                  ></font-awesome-icon>
                </v-btn>
                <v-btn fab small text outlined color="green">
                  <font-awesome-icon
                    :icon="['fas', 'trash-alt']"
                    @click="borrarAnuncio(anuncioUsuario.id)"
                    class="fa-2x"
                  ></font-awesome-icon>
                </v-btn>
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
import DashboardCompras from "@/components/Dashboard-Compras";
import AnuncioMixins from "../mixins/anuncio-mixins.js";

export default {
  name: "tarjeta-anuncio-usuario",
  mixins: [AnuncioMixins],
  components: {
    DashboardCompras,
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
      anuncioConfigInputsView: false,
      nuevoContacto: {
        Tipo: "",
        contacto: "",
      },
      nuevaTarifa: {
        idPosicion: 0,
        nombre: "",
        precio: "",
        descripcion: "",
      },
    };
  },
  computed: {
    tarjetaWH() {
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md
        ? { carrusel: "660px", cuerpoAnuncio: "auto" }
        : { carrusel: "500px", cuerpoAnuncio: "500px" };
    },
    categoriaSeleccionada() {
      return 1;
    },
    fullAnuncioSeccionWeb() {
      let { xs, sm } = this.$vuetify.breakpoint;

      return xs || sm ? "" : "full-anuncio-seccion-web";
    },
    imagenesAnuncio() {
      return this.anuncioUsuario.Sec_Imagenes.map(function (infoImagen) {
        return {
          url: "http://localhost:3000/uploads/" + infoImagen.nombre,
          options: { type: "remote" },
        };
      });
    },
    tarifasAnuncio() {
      return this.anuncioUsuario.Sec_Tarifas;
    },
    nuevaTarifaView(){
      return this.anuncioConfigInputsView;
    }
  },
  methods: {
    async borrarAnuncio(idAnuncio) {
      let MutateResult;
      try {
        MutateResult = await this.mixinAnuncioEliminar(idAnuncio);
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
      this.$store.dispatch("activationAlert", {
        type: "success",
        message: `Anuncio # ${idAnuncio} eliminado exitosamente!`,
      });
    },
    //abrirEdicion PASARA abrir mejor un modal con un componente de compras
    abrirEdicion() {
      console.log("vue: abrirEdicion para el anuncio", this.anuncioUsuario.id);
      this.$emit("activandoEdicion", { id: this.anuncioUsuario.id });
    },
    habilitarEdicionesAnuncio() {
      this.anuncioConfigInputsView = false;
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
    salvadoDeTarifa() {
      let tarifa = {};
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

      //console.log("salvadoDeTarifa...");
      //console.dir(tarifa);

      if (this.nuevaTarifa.idPosicion == 0) {
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

      this.anuncioConfigInputsView = false;
      this.$refs.tarifaEdit.reset();
    },
    editarTarifa(idPosicion) {
      this.anuncioConfigInputsView = true;
      
    },
    eliminarTarifa(idPosicion) {
      console.table(this.anuncioUsuario.Sec_Tarifas.splice(
          idPosicion,
          1
        ));
    },
    cancelarSalvado() {
      this.anuncioConfigInputsView = false;

    },
  },
};
</script>

<style lang="scss" scoped>
.full-anuncio-seccion {
  height: auto;
  min-height: 200px;
  overflow-y: auto;
  line-height: 18px;
}

.full-anuncio-seccion-web {
  height: 280px;
  max-height: 280px;
}

.v-textarea textarea {
  line-height: 1.35rem !important;
}
</style>
