<template>
  <v-container fill-height fluid class="pa-0">
    <v-row no-gutters>
      <v-col :cols="colsTarjetaUsuario['colsTarjeta']" v-for="(anuncio, key, i) in anunciosUsuario" :key="i" style="margin-top: 9px;">
        <!--Aqui hacer el consumo de tarjeta anuncio usuario y pasarle una nueva propiedad, esta debe que tener pordefault un valor 1/0 para no estorbar futuros consumos-->
        <tarjeta-anuncio-usuario v-bind:anuncioUsuario="anuncio" class="ml-2 mr-3 mx-md-2">
        </tarjeta-anuncio-usuario>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TarjetaAnuncioUsuario from "@/components/Sistema-Tarjeta-Usuario";
  import { mapGetters } from "vuex";

  import AnuncioMixins from '../mixins/anuncio-mixins.js';
  import GeneralMixins from '../mixins/general-mixins.js';

  export default {
    name: "dashboard",
    mixins: [AnuncioMixins, GeneralMixins],
    components: {
      TarjetaAnuncioUsuario      
    },
    data() {
      return {
        categorias: [
          {
            name: "Lorem ipsum",
            total: 1,
          },
          {
            name: "Lorem ipsum",
            total: 2,
          },
          {
            name: "Lorem ipsum",
            total: 1,
          },
        ],
        estadosList: [
          {
            id: 1,
            nombre: "NL",
          },
          {
            id: 2,
            nombre: "COAH",
          },
          {
            id: 3,
            nombre: "Q. ROO",
          },
          {
            id: 4,
            nombre: "JAL",
          },
        ],
        ciudadesList: [
          {
            id: 1,
            nombre: "MTY",
          },
          {
            id: 2,
            nombre: "SAL",
          },
          {
            id: 3,
            nombre: "MON",
          },
          {
            id: 4,
            nombre: "CHI",
          },
        ],

      };
    },
    computed: {
      ...mapGetters(['anunciosUsuario', 'anuncioPreView']),
      colsTarjetaUsuario() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { colsTarjeta: 12 } : { colsTarjeta: 6 };
      }
    },
    methods: {

    },
    created(){
    }
  };
</script>

<style>
  .v-window__prev,
  .v-window__next {
    background: none;
    margin: 0;
  }

  .v-window__prev > .v-btn,
  .v-window__prev > .v-btn {
    font-size: 2rem;
    color: #e994c496;
  }

  .v-window__next > .v-btn,
  .v-window__next > .v-btn {
    font-size: 2rem;
    color: #e994c496;
  }
</style>