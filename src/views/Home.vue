<template>
  <v-row>
    <v-col
      cols="12"
      :lg="herramientasWidth"
      style="position: sticky; height:100vh; top:9vh; max-height: calc(100% - 9vh); transform: translateX(0%);">
      <panel-herramientas />
    </v-col>
    <v-col
      cols="12"
      :lg="sistemaWidth">
      <sistema-tarjetas />
    </v-col>
  </v-row>
</template>

<script>
import PanelHerramientas from '@/components/Panel-Herramientas'
import SistemaTarjetas from '@/components/Sistema-Tarjetas'

  export default {
    name: 'Home',
    components: {
      PanelHerramientas,
      SistemaTarjetas
    },
    data() {
      return{
        herramientasWidth: 3,
        sistemaWidth: 9,
        _herramientasWidth: 3,
        _sistemaWidth: 9,
      }
    },
    methods: {
      ampliandoHerramientas(){
        this.herramientasWidth = herramientasWidth !== 12 ? 12 : this._herramientasWidth;
        this.sistemaWidth = sistemaWidth !== 12 ? 12 : this._sistemaWidth;
      }
    }
  }
</script>
