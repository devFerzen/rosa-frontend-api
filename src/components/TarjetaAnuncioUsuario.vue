<template>
  <v-card width="750">
    <v-container fluid class="py-0 pl-0">
      <v-row align="center" justify="center" class="fill-height" no-gutters>
        <v-col cols="12" lg="5">
          <v-carousel :height="tarjetaWH['carrusel']">
            <v-carousel-item v-for="(imagen,i) in anuncioUsuario.Sec_Imagen" :key="i" :src="imagen.url"  max-height="100%"></v-carousel-item>
          </v-carousel>
        </v-col>
        <!--Carrusel-->
        <v-col cols="12" lg="7" class="d-flex flex-column justify-center align-center align-stretch">
          <v-sheet
            class="d-flex"
            color="grey lighten-3"
            :height="tarjetaWH['cuerpoAnuncio']">
            <v-tabs class="d-flex flex-column-reverse" centered>
              <v-tab-item v-if="OpcionesAnuncio.Descripcion.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        {{anuncioUsuario.Sec_Descripcion.titulo}}
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                  <v-row no-gutters>
                    <v-col xs="6">
                      <div class="text-h7 text-xl-h6 mb-4">
                        Lorem Ipsum
                      </div>
                    </v-col>
                    <v-col xs="6">
                      <div class="text-h7 text-xl-h6">
                        Lorem Ipsum
                      </div>
                    </v-col>
                  </v-row>
                  <!--EstadoCiudad-->
                  <v-row no-gutters style="overflow: hidden;">
                    <v-col>
                      <v-card  flat class="mb-2">
                        <template v-for="line in anuncioUsuario.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Descripcion-->
              <v-tab-item v-if="OpcionesAnuncio.Actualizacion.permisos">
                <v-container style="height: 440px;" class="">
                  <dashboard-compras></dashboard-compras>
                  <!--Componente de Compra-->
                </v-container>
              </v-tab-item>
              <!--Actualizacion-->
              <v-tab-item v-if="OpcionesAnuncio.Compras.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Compras
                      </div>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-slide-group
                      v-model="categoriaSeleccionada"
                      mandatory
                      show-arrows
                      center-active>
                      <v-slide-item v-for="(tarifa, i) in anuncioUsuario.Sec_Tarifas" :key="i" v-slot="{active, toggle}">
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

                          <v-card-text>
                            <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                              <v-chip>5:30PM</v-chip>

                              <v-chip>7:30PM</v-chip>

                            </v-chip-group>
                          </v-card-text>
                        </v-card>
                      </v-slide-item>

                    </v-slide-group>
                  </v-row>
                </v-container>
              </v-tab-item>
              <!--Compras-->
              <v-tab-item v-if="OpcionesAnuncio.Edicion.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Edición
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
                        <template v-for="line in anuncioUsuario.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Edicion-->
              <v-tab-item v-if="OpcionesAnuncio.Eliminar.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Eliminar
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                </v-container>
              </v-tab-item>
              <!--Eliminar-->
              <v-tab-item v-if="OpcionesAnuncio.Preview.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        {{anuncioUsuario.Sec_Descripcion.titulo}}
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                  <v-row no-gutters>
                    <v-col xs="6">
                      <div class="text-h7 text-xl-h6 mb-4">
                        Lorem Ipsum
                      </div>
                    </v-col>
                    <v-col xs="6">
                      <div class="text-h7 text-xl-h6">
                        Lorem Ipsum
                      </div>
                    </v-col>
                  </v-row>
                  <!--EstadoCiudad-->
                  <v-row no-gutters style="overflow: hidden;">
                    <v-col>
                      <v-card  flat class="mb-2">
                        <template v-for="line in anuncioUsuario.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Preview-->

              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Descripcion.permisos">
                <font-awesome-icon :icon="['fas', 'home']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--Descripcion-->
              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Actualizacion.permisos">
                <font-awesome-icon :icon="['fas', 'sync-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--Actualizacion-->
              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Compras.permisos">
                <font-awesome-icon :icon="['fas', 'shopping-bag']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--Compras-->
              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Edicion.permisos" @click="abrirEdicion">
                <font-awesome-icon :icon="['fas', 'pencil-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--Edicion-->
              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Eliminar.permisos">
                <font-awesome-icon :icon="['fas', 'trash-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--Eliminar-->
              <v-tab style="min-width:60px!important;" v-if="OpcionesAnuncio.Preview.permisos" @click="abrirEdicion">
                <font-awesome-icon :icon="['fas', 'eye']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--PreView-->
            </v-tabs>

          </v-sheet>
        </v-col>
        <!--Cuepo-->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DashboardCompras from '@/components/Dashboard-Compras';
export default {
  name: '',
  components: {
    DashboardCompras
  },
  props: {
    anuncioUsuario: { type: Object, default: {} },
    OpcionesAnuncio: { type: Object, default: {} }
  },
  data() {
    return {
      selectedContactItem: '',
    }
  },
  computed: {
    tarjetaWH(){
      const { xs, sm, md } = this.$vuetify.breakpoint;
      return xs || sm || md ? {carrusel: '660px', cuerpoAnuncio: 'auto'} : {carrusel: '62vh', cuerpoAnuncio: '62vh'};
    },
    categoriaSeleccionada(){
      return 1;
    }
  },
  methods: {
    abrirEdicion(){
      console.log("vue: abrirEdicion");
      this.$emit('activandoEdicion', {id: this.anuncioUsuario.id });
    }
  },
  mounted() {},
}
</script>

<style lang='scss' scoped>

</style>
