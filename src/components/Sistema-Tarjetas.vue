<template>
  <div class="">
    <p>hi</p>
    <v-dialog
        v-model="fullAnuncioEstado"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
      <v-card>
        <p>Hi</p>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  export default {
    name: 'Sistema-tarjetas',
    data: () => ({
      fullAnuncioEstado: false
    }),
    methods: {
      fullAnuncio_Display(){
        this.fullAnuncioEstado = true;
      }
    }
  }
</script>
