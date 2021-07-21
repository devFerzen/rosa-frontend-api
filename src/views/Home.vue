<template>
  <v-row align="start">
    <v-col
      cols="12"
      :lg="widthComponents.herramientasWidth"
      class="panel-herramientas-mb">
          <panel-herramientas v-if="!iniciandoSesion && !registrandose"/>
          <inicio-sesion v-else-if="iniciandoSesion"/>
          <registro v-else-if="registrandose"/>
    </v-col>
    <v-col
      cols="12"
      :lg="widthComponents.sistemaWidth">
      <sistema-tarjetas :fullAnuncioEstado="hayAnuncio"/>
    </v-col>
  </v-row>
</template>

<script>
import PanelHerramientas from '@/components/Panel-Herramientas'
import SistemaTarjetas from '@/components/Sistema-Tarjetas'
import InicioSesion from '@/components/Inicio-Sesion'
import Registro from '@/components/Registro'

  export default {
    name: 'Home',
    props:{
      id:{
        default: ''
      }
    },
    components: {
      PanelHerramientas,
      SistemaTarjetas,
      InicioSesion,
      Registro
    },
    data() {
      return{
        widthComponents: {
          herramientasWidth: 3,
          sistemaWidth: 9,
          _herramientasWidth: 3,
          _sistemaWidth: 9
        },
        iniciandoSesion: false, //Quizás debería de estar en state
        registrandose: true
      }
    },
    computed:{
      hayAnuncio(){
        if(this.id == ''){
          return false;
        }
        return true;
      }
    },
    methods: {
      ampliandoHerramientas(){
        this.widthComponents.herramientasWidth = this.widthComponents.herramientasWidth !== 12 ? 12 : this.widthComponents._herramientasWidth;
        this.widthComponents.sistemaWidth = this.widthComponents.sistemaWidth !== 12 ? 12 : this.widthComponents._sistemaWidth;
      },
    }
  }
</script>
<style>

  .panel-herramientas-mb{
    position: sticky;
      height: 28vh;
      top: 9vh;
      max-height: calc(28vh - 9vh);
      transform: translateX(0%);
      z-index: 1;
  }

  .panel-herramientas{
    position: sticky;
    height:100vh;
    top:9vh;
    max-height: calc(100% - 9vh);
    transform: translateX(0%);
  }
</style>
