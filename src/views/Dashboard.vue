<template>
  <v-container fluid fill-height class="white">
    <v-row>
      <v-col :cols="colsTarjetaUsuario['colsTarjeta']" v-for="(anuncio, key, i) in anunciosUsuario" :key="i">
        <tarjeta-anuncio-usuario @activandoEdicion="abriendoEditAnuncioDisplay" v-bind:anuncioUsuario="anuncio">
        </tarjeta-anuncio-usuario>
      </v-col>
    </v-row>

    <anuncio-edit-display :displayState="anuncioDisplayState" :key="anuncioDisplayState" />
    <!--AnuncioEdit Dialog-->

  </v-container>
</template>

<script>
  import TarjetaAnuncioUsuario from "@/components/TarjetaAnuncioUsuario";
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
      ...mapGetters(['anunciosUsuario', 'anuncioDisplayState']),
      colsTarjetaUsuario() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { colsTarjeta: 12 } : { colsTarjeta: 6 };
      }
    },
    methods: {

      async abriendoEditAnuncioDisplay(InfoAnuncio) {
        //Activar llamada para correr un componente con el filepond

        let MutateResult;
        if (InfoAnuncio.id === '000') {
          this.$store.dispatch('editAnuncioDisplay', InfoAnuncio.id);
          return;
        }

        InfoAnuncio.AnuncioDashboard = true;

        try {
          MutateResult = await this.mixinBuscarAnuncioId(InfoAnuncio);
        } catch (error) {
          console.log("vue abriendoEditAnuncioDisplay error...");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al registrar...>>>>${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          throw error;
        }

        console.log("vue buscarAnuncio for edit");
        console.dir(MutateResult.data);
        this.$store.dispatch('anuncioEditSet', MutateResult.data);
        this.$store.dispatch('editAnuncioDisplay', InfoAnuncio.id);
      },
    }
  };
</script>