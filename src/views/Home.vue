<template>
  <v-container fluid fill-height class="white">
    <v-row style="min-height:100%">
      <v-col
      cols="12"
      :md="herramientasWidth">
        <panel-herramientas />
      </v-col>
      <v-col
        cols="12"
        :md="sistemaWidth">
        <sistema-tarjetas />
      </v-col>
    </v-row>
  </v-container>
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
