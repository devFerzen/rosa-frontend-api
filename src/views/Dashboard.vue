<template>
  <v-container fluid fill-height class="white">
    <v-row>
      <v-col :cols="colsTarjetaUsuario['colsTarjeta']" v-for="(anuncio, key, i) in anunciosUsuario" :key="i">
        <tarjeta-anuncio-usuario @activandoEdicion="abriendoEditAnuncioDisplay" v-bind:anuncioUsuario="anuncio">
        </tarjeta-anuncio-usuario>
      </v-col>
    </v-row>

    <anuncio-edit-display :displayState="anuncioDisplayState" :AnuncioInfo="AnuncioInfo" :key="anuncioDisplayState" />
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

        //Form de un anuncio nuevo
        AnuncioInfo: {
          categorias: ["Escorts", "Masajes Eróticos"],
          permisos: ["Descripcion", "Contacto", "Tarifas"],
          Sec_Descripcion: {
            titulo: 'titulo test 1',
            estado: 'N.L.',
            ciudad: 'MTY.',
            descripcion: 'una desciprcion',
            sexo: 'm'
          },
          Sec_Imagenes: [],
          Sec_Contacto: [],
          Sec_Tarifas: [],
        }

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

        console.dir(MutateResult);

        //Algo pasa en esta funcion que no deja abrir el modal
        this.anuncioInfoSet(MutateResult.data);
        this.$store.dispatch('editAnuncioDisplay', InfoAnuncio.id);
      },
      //Esta función fue para borrar el __typename pero se implemeto otra mejora en el InMemoryCache en mainjs -> esto quiza es una limpia para que no actualice los corazones o otra información
      anuncioInfoSet(Anuncio) {

        if ('Sec_Descripcion' in Anuncio) {
          this.AnuncioInfo.Sec_Descripcion = Anuncio.Sec_Descripcion;
        }

        if ('Sec_Imagenes' in Anuncio) {
          //Se seteará con add file
          for (let Anuncio of Anuncio.Sec_Imagenes) {                     
            
          }
          this.AnuncioInfo.Sec_Imagenes = Anuncio.Sec_Imagenes;
        }

        if ('Sec_Contacto' in Anuncio) {
          this.AnuncioInfo.Sec_Contacto = Anuncio.Sec_Contacto;
        }

        
        if ('Sec_Tarifas' in Anuncio) {
          if(Anuncio.Sec_Tarifas == null){
              console.log("hahahaha...");
              this.AnuncioInfo.Sec_Tarifas = [];
          } else {
            this.AnuncioInfo.Sec_Tarifas = Anuncio.Sec_Tarifas;
          }
        } else {
          this.AnuncioInfo.Sec_Tarifas = []
        }

        if ('categorias' in Anuncio) {
          this.AnuncioInfo.categorias = Anuncio.categorias;
        }

        if ('categorias' in Anuncio) {
          this.AnuncioInfo.categorias = Anuncio.categorias;
        }

        if ('id' in Anuncio) {
          this.AnuncioInfo.id = Anuncio.id;
        }

      },
      
    }
  };
</script>