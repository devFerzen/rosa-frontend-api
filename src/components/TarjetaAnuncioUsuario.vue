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
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <dashboard-compras tipo="actualizacion"></dashboard-compras>
                  <!--Componente de Compra-->
                </v-container>
              </v-tab-item>
              <!--Actualizacion-->
              <v-tab-item v-if="OpcionesAnuncio.Compras.permisos">
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <dashboard-compras tipo="paquetes"></dashboard-compras>
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

                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="text-h8 text-center">
                        Estas Seguro de eliminar el anuncio?
                      </div>
                    </v-col>
                  </v-row>
                  <v-row no-gutters justify="center">
                    <v-col cols="4" class="mt-12">
                      <v-btn
                        depressed
                        elevation="2"
                        color="primary"
                        width="140"
                        @click="borrarAnuncio(anuncioUsuario.id)">
                        <font-awesome-icon :icon="['fas', 'trash-alt']" class="tw-redes-icons fa-2x mr-1" /> Borrar
                      </v-btn>
                    </v-col>
                  </v-row>
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
  name: 'tarjeta-anuncio-usuario',
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
    borrarAnuncio(idAnuncio){
      this.$store.dispatch('activationAlert', {type: 'info', message: `Anuncio # ${idAnuncio} eliminado exitosamente!`});
    },
    abrirEdicion(){
      console.log("vue: abrirEdicion");
      this.$emit('activandoEdicion', {id: this.anuncioUsuario.id });
    }
  },
  mounted() {

  },
}
</script>

<style lang='scss' scoped>

</style>
