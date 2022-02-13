<template>
  <v-card width="750">
    <v-container fluid class="py-0 pl-0">
      <v-row align="start" justify="center" class="fill-height" no-gutters>
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
                  @click="revealDesc = true"
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
                  @click="revealDesc = false"
                  class="ml-2"
                  small
                  :class="{ 'suave-pink-font': !revealDesc }"
                  width="100"
                >
                  tarifas
                </v-btn>
              </v-row>
            </v-card-text>
            <!--acciones de tabs-->

            <v-expand-x-transition>
              <v-card-text
                v-if="!revealDesc"
                class="full-anuncio-seccion d-flex justify-center pb-1 pt-0"
                :class="fullAnuncioSeccionWeb"
              >
                <v-sheet
                  fluid
                  elevation="6"
                  class="rounded-xl mb-2"
                  width="650"
                  height="fit-content"
                >
                  <div
                    v-for="(tarifa, i) in anuncioUsuario.Sec_Tarifas"
                    :key="i"
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
                    <v-row no-gutters>
                      <v-col> </v-col>
                      <v-col cols="7" md="10" align="start">
                        <div class="body-2 text-center">
                          {{ tarifa.descripcion }}
                        </div>
                      </v-col>
                      <v-col> </v-col>
                    </v-row>
                    <v-row justify="center" class="mb-2">
                      <v-col cols="8">
                        <v-divider
                          color="pink"
                          style="border-width: revert;"
                        ></v-divider>
                      </v-col>
                    </v-row>
                  </div>
                </v-sheet>
              </v-card-text>
              <!--Tarifas-->

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

            <!--crear el speed-dial-->
            <v-btn
                fab
                raised
                text
                right
                bottom
                color="pink"
                >
                <font-awesome-icon
                  :icon="['fas', 'pencil-alt']"
                  class="fa-2x"
                  color="green"
                ></font-awesome-icon>
              </v-btn>
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
      selectedContactItem: "",
      revealDesc: true,
      tab: 0,
    };
  },
  computed: {
    tarjetaWH() {
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md
        ? { carrusel: "660px", cuerpoAnuncio: "auto" }
        : { carrusel: "62vh", cuerpoAnuncio: "62vh" };
    },
    categoriaSeleccionada() {
      return 1;
    },
    fullAnuncioSeccionWeb() {
      let { xs, sm } = this.$vuetify.breakpoint;

      return xs || sm ? "" : "full-anuncio-seccion-web";
    },
    imagenesAnuncio() {
      return this.anuncioUsuario.Sec_Imagenes.map(function(infoImagen) {
        return {
          url: "http://localhost:3000/uploads/" + infoImagen.nombre,
          options: { type: "remote" },
        };
      });
    },
    activeTab: {
      get() {
        return this.tab;
      },
      set(newValue) {
        if (newValue == 3) {
          this.tab = 0; // ya no se usan tabs y este no funciona, ver el diseño para agregar los cambios
        } else {
          this.tab = newValue;
        }
      },
    },
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
    abrirEdicion() {
      console.log("vue: abrirEdicion para el anuncio", this.anuncioUsuario.id);
      this.$emit("activandoEdicion", { id: this.anuncioUsuario.id });
    },
  },
  mounted() {},
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
  height: 200px;
  max-height: 230px;
}
</style>
