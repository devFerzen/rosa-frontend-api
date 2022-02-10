<template>
  <div class="">
    <v-row>
      <v-col :cols="gridColCard['cardCols']" v-for="(anuncio, key, i) in anunciosBusqueda" :key="i">
        <v-hover v-slot:default="{ hover }">
          <v-card class="rounded-xl" flat style="
              height: 459px;
              max-height: 459px;
              overflow:hidden;"
              :class="hover ? 'anuncioHover' : ''">
            <v-container style="padding: 0;">
              <v-expand-transition>
                <div v-if="hover">                                    

                  <div style="z-index: 2; position: absolute; top:2px; right:0px; width:70px; height:150px;">
                    <v-list two-line style="background: none!important;">
                      <v-list-item class="red--text font-weight-black text-center">
                        <v-list-item-content>
                          <v-list-item-title @click="accionCorazon(anuncio.id)" style="cursor:pointer;">
                            <font-awesome-icon :icon="['fas','heart']" class="fa-2x" color="red"></font-awesome-icon>
                          </v-list-item-title>
                          <v-list-item-subtitle class="black--text font-weight-black" v-text="150"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="black--text font-weight-black text-center">
                        <v-list-item-content>
                          <v-list-item-title @click="accionVer(anuncio.id)" style="cursor:pointer;">
                              <font-awesome-icon :icon="['fas','eye']" class="fa-2x" color="black"></font-awesome-icon>
                          </v-list-item-title>
                          <v-list-item-subtitle class="black--text font-weight-black" v-text="100"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                  <!--Like and vistas-->
                  
                  <row
                    no-gutters
                    class="glass-info-card d-flex align-start"
                    style="width:100%; max-height:160px; height:160px;">
                    <v-col>
                      <div class="text-h3 text-lg-h5 font-weight-black text-truncate text-capitalize"
                        style="color:white; overflow: hidden;">
                        {{anuncio.Sec_Descripcion.titulo}}
                      </div>
                      <p class="text-caption text-justify"  style="color:white; max-height: 80px; overflow: hidden; margin-bottom: 28px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ut iure soluta nam quia tenetur quibusdam saepe et cupiditate, libero minima quiLorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ut iure soluta nam quia tenetur quibusdam saepe et cupiditate, libero minima officiis impedit fugiat voluptates nisi consequatur inventore? Dignissimos.</p>                      
                    </v-col>
                  </row> 
                  
                  <v-btn x-small raised rounded color="primary" style="z-index:10!important; position: absolute; bottom: 8px; left:18px;"
                    @click="accionVer(anuncio.id)">
                    Ver Más
                  </v-btn>
                  <!--Campo descripcion-->
                </div>
                <!--vista hover contenido-->

                <div style="z-index: 1; position: absolute; top:15px; right:0px; width:70px; height:150px;">
                    <v-list two-line style="background: none!important;">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="black--text font-weight-regular text-center text--secondary">
                            <font-awesome-icon :icon="['fas','heart']" class="fa-2x"></font-awesome-icon>
                          </v-list-item-title>
                          <v-list-item-subtitle class="black--text font-weight-regular text-center" v-text="150"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="black--text font-weight-regular text-center text--secondary">
                              <font-awesome-icon :icon="['fas','eye']" class="fa-2x"></font-awesome-icon>
                          </v-list-item-title>
                          <v-list-item-subtitle class="black--text font-weight-regular text-center" v-text="100"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>                    
                </div>
              </v-expand-transition>
              <!--Contenido de Hover-->

              <v-row class="fill-height" no-gutters>
                <v-col style="background-color:blue;">
                  <v-carousel :height="tarjetaWH['carrusel']" id="carouselImgAnuncio">
                    <template v-slot:prev="{ on, attrs }">
                      <v-btn
                        fab
                        color="pink"
                        large
                        plain
                        v-on="on"
                        v-ripple="false"
                        id="idPrevNext">
                        <font-awesome-icon :icon="['fa','caret-left']" size="lg"></font-awesome-icon>
                      </v-btn>
                    </template>
                    <template v-slot:next="{ on, attrs }">
                      <v-btn
                        fab
                        depressed
                        plain
                        text
                        color="pink"
                        large
                        v-on="on"
                        v-ripple="false"
                        id="idPrevNext">
                        <font-awesome-icon :icon="['fa','caret-right']" size="lg"></font-awesome-icon>
                      </v-btn>
                    </template>
                    <v-carousel-item active-class="anuncio-imagenes-dots" v-for="(imagen,i) in anuncio.Sec_Imagenes" :key="i"
                      :src="'http://localhost:3000/uploads/'+imagen.nombre" max-height="100%"></v-carousel-item>
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

    <v-dialog v-model="fullAnuncioEstado" fullscreen hide-overlay transition="dialog-bottom-transition">
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
        <v-container fluid>
          <v-row align="center" justify="center" class="fill-height" no-gutters style="background: white;" :style="{ 'margin-bottom': marginMbView + 'px' }">
            <v-col cols="12" md="4" style="min-height: 95vh">
              <v-carousel height="90vh" class="my-4">
                <v-carousel-item v-for="(imagen, i) in anuncioView.Sec_Imagenes" :key="i"
                  :src="'http://localhost:3000/uploads/'+imagen.nombre" reverse-transition="fade-transition"
                  transition="fade-transition" height="600px"></v-carousel-item>
              </v-carousel>
            </v-col>
            <!--Carrusel-->

            <v-col cols="12" md="8" style="min-height: 95vh; max-height: auto;"
              class="d-flex flex-column justify-center align-center">
              <v-card class="pa-4 pa-lg-2" flat
                :height="fullAnuncioBodyWH['vMainContenth']" :width="fullAnuncioBodyWH['vMainContentw']">

                  <v-card-title>
                    <v-list class="full-anuncio-titlelist" :class="fullAnunciotitleWeb">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-h4">{{ anuncioView.Sec_Descripcion.titulo }}</v-list-item-title>
                          <v-list-item-subtitle class="subtitle-2 text--secondary">{{ anuncioView.Sec_Descripcion.ciudad }}, {{anuncioView.Sec_Descripcion.estado }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-row align="center" justify="end">
                          <v-btn fab text depressed plain small @click="accionCorazon(anuncio.id)">
                            <font-awesome-icon :icon="['fas','heart']" class="fa-2x" color="red"></font-awesome-icon>
                          </v-btn>
                        </v-row> 
                      </v-list-item>
                    </v-list>
                  </v-card-title>

                  <v-card-subtitle class="pb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veritatis natus, nisi magni illo beatae suscipit voluptatum? Adipisci voluptatibus doloremque autem mollitia.
                  </v-card-subtitle>

                  <v-card-text class="pa-0">
                    <v-row align="center" justify="center" no-gutters>
                      <v-btn text depressed plain v-ripple="false" @click="reveal = !reveal">
                        Descripción
                      </v-btn>
                     
                      <v-btn text depressed plain v-ripple="false" @click="reveal = !reveal" class="ml-2">
                        Tarifas
                      </v-btn>
                    </v-row>
                  </v-card-text>
                  <!--Header Anuncio-->
                
                  <v-expand-x-transition>
                    <v-card-text v-if="reveal" class="full-anuncio-seccion" :class="fullAnuncioSeccionWeb">
                      
                    </v-card-text>
                    <!--Tarifas-->

                    <v-card-text class="full-anuncio-seccion" :class="fullAnuncioSeccionWeb">                      
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus qui similique impedit. Reiciendis et cumque odit, officiis atque omnis, quasi numquam repudiandae id rem itaque architecto ipsam facere cum.
                    </v-card-text>
                    <!--Descripción-->
                  </v-expand-x-transition>
                  <!--Cuerpo Anuncio-->

                  <v-card-actions style="float:right">
                    <v-btn class="mx-2" small text plain raised color="primary"
                      @click="reportarAnuncio">
                      Reportar Anuncio!
                    </v-btn>

                    <v-btn class="mx-2" fab dark small color="primary" @click="fullAnuncioEstado=false">
                      <font-awesome-icon :icon="['fas','times']" class="fa-2x"></font-awesome-icon>
                    </v-btn>
                  </v-card-actions>
                  <!--Acciones Anuncio-->


                  <v-bottom-navigation
                    :fixed="navegacionMbView"
                    v-model="contactBottomNav"
                    dark grow color="pink">
                    <v-btn v-for="(contacto, key, i) in anuncioView.Sec_Contacto" :key="i" primary>
                      <span>Video</span>
                      <font-awesome-icon :icon="[anuncioView.Sec_Contacto[key].Tipo.categoria, anuncioView.Sec_Contacto[key].Tipo.icono]">
                      </font-awesome-icon>
                    </v-btn>
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
        reveal: false,
        contactBottomNav:0,
        limitScrollPosition: 310,
        anunciosBusqueda: [],
        selectedItem: "",
        fullAnuncioCss:{
          seccion: '',
          list: ''
        },
        anuncioView: {
          categorias: ['Escorts', 'Masajes Eróticos'],
          permisos: ['Descripcion', 'Contacto', 'Tarifas'],
          Estado:{
            vivo: true
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
      ...mapGetters(["getBusquedaQuery"]),
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
            vMainContenth: "90vh",
            vTextContent: "40vh",
            CardTarifaCol: 4,
          };
      },
      fullAnunciotitleWeb(){
        let { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? '' : 'full-anuncio-titlelist-web';
      },
      fullAnuncioSeccionWeb(){
        let { xs, sm } = this.$vuetify.breakpoint;

        return xs || sm ? '' : 'full-anuncio-seccion-web';
      },
      navegacionMbView(){
          const { md, sm, xs } = this.$vuetify.breakpoint;
          
          return xs || sm || md || Math.abs(window.pageYOffset - this.limitScrollPosition) < this.limitScrollPosition ? true : false;
      },
      fullAnuncioMbView(){
        return !!this.navegacionMbView ? 'auto' : '90vh';
      },
      marginMbView(){
        return !!this.navegacionMbView ? '50' : '0';
      }
    },
    methods: {
      fullAnuncio_Display(payload) {
        this.fullAnuncioEstado = payload;
      },

      async aplicaBusqueda() {
        let QueryResult;
        try {
          QueryResult = await this.mixinBusqueda(this.getBusquedaQuery);
        } catch (error) {
          console.log("vue aplicaBusqueda: QueryResult(anunciosBusqueda) en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error anunciosBusqueda...>>>>${error.mensaje}` });
          return;
        }

        this.anunciosBusqueda = QueryResult.data.queryAnuncios;
      },

      async reportarAnuncio() {
        console.log("vue reportarAnuncio ", this.anuncioView.id);
        //Para activarlo en la página de Contacto
        //this.$store.dispatch('panelHerramientasContactanos',true);
        let MutateResult;

        try {
          MutateResult = await this.mixinNuevoCorreoContactanos({ correo: '', asunto: "Reporte de Anuncio!", mensaje: "Reporte por usuario", anuncio: this.anuncioView.id });
        } catch (error) {
          console.log("vue reportarAnuncio...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error}` });
          throw error;
        }

        this.$store.dispatch('anuncioReportado', this.anuncioView.id); //Convertir a nulo una vez que se haya puesto el reporte si esq se hace en otro modal
        this.$store.dispatch('activationAlert', { type: 'success', message: `Anuncio reportado!, Gracias por su cooperación!!` });
        this.fullAnuncio_Display(false);
      },

      /*
        accionVer muestra a un usuario un anuncio seleccionado
      */
      async accionVer(idAnuncio) {
        let queryResult;
        try {
          queryResult = await this.mixinVer(idAnuncio);
          this.fullAnuncio_Display(true);
        } catch (error) {
          console.log("vue accionVer en error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `Error al tratar de abrir al anuncio, favor de intentarlo más tarde!` });
          return;
        }
        console.log("se esta imprimiendo en modal el sig anuncio");
        console.dir(queryResult[0]);
        this.anuncioView = queryResult[0];
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
        this.$store.dispatch('activationAlert', { type: 'success', message: `${queryResult.mensaje}!` });
      }

    },
    async created() {
      const { xs, sm } = this.$vuetify.breakpoint;
      this.fullAnuncioCss.list = xs || sm ? '' : 'full-anuncio-titlelist-web';
      this.fullAnuncioCss.seccion = xs || sm ? '' : 'full-anuncio-seccion-web';
      
      this.aplicaBusqueda();
    },
    watch: {
      getBusquedaQuery: function (value) {
        console.log("getBusquedaQuery...");
        console.dir(value);
        this.aplicaBusqueda();
      }
    }
  };
</script>

<style>
  .full-anuncio-seccion{
    min-height: 250px;
    height: auto;
    overflow-y: auto;
  }

  .full-anuncio-seccion-web{
    max-height: 240px;
  }

  .full-anuncio-titlelist{
    background-color: transparent!important;
  }

  .full-anuncio-titlelist-web{
    width: 60vw;
  }

  .v-skeleton-loader__image{
    height: 50vh;
  }

  .tw-redes-icons {
    color: blue;
  }

  .tabContainerMB {
    min-height: 61vh;
    height: auto;
  }

  .tabContainerWEB {
    height: 61vh;
  }

  .anuncioHover{
    border:6px solid #e0409a!important;
  }

  #carouselImgAnuncio .v-carousel__controls{
    background: none!important;
    z-index: 3!important;
  }

  .anuncio-imagenes-dots {
    color: #e0409a!important;
  }

  .v-window__prev, .v-window__next{
    background: none;
    margin:0;
  }

  .v-window__prev>.v-btn,
  .v-window__prev>.v-btn{
    font-size: 2rem;
    color: #e994c496;
  }

  .v-window__next>.v-btn,
  .v-window__next>.v-btn{
    font-size: 2rem;
    color: #e994c496;
  }

  /* From https://css.glass */
  .glass-info-card{
    background: rgba(255, 255, 255, 0.46);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 2; 
    position: absolute; 
    bottom: 0px; 
  }

</style>