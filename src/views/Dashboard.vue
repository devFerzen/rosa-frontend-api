<template>
  <v-container fluid fill-height class="white">
    <v-row no-gutters>
      <v-col :cols="colsTarjetaUsuario['colsTarjeta']" v-for="(anuncio, key, i) in anunciosUsuario" :key="i" style="margin-top: 9px;">
        <!--Aqui hacer el consumo de tarjeta anuncio usuario y pasarle una nueva propiedad, esta debe que tener pordefault un valor 1/0 para no estorbar futuros consumos-->
        <tarjeta-anuncio-usuario v-bind:anuncioUsuario="anuncio">
        </tarjeta-anuncio-usuario>
      </v-col>
    </v-row>

    <!--<anuncio-edit-display :displayState="false" :key="anuncioPreView" />
    AnuncioEdit Dialog para VIEW-->

  </v-container>
</template>

<script>
  import TarjetaAnuncioUsuario from "@/components/Sistema-Tarjeta-Usuario";
  import AnuncioEditDisplay from "@/components/Anuncio-Edit-Display";

  import { mapGetters } from "vuex";

  import AnuncioMixins from '../mixins/anuncio-mixins.js';
  import GeneralMixins from '../mixins/general-mixins.js';

  export default {
    name: "dashboard",
    mixins: [AnuncioMixins, GeneralMixins],
    components: {
      TarjetaAnuncioUsuario,
      AnuncioEditDisplay
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
      console.log(`anuncios: `);
      console.table(this.anunciosUsuario);
    }
  };
</script>