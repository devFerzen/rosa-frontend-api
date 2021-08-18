<template>
    <v-card
    height="87vh"
    width="99vw"
    style="border:1px solid red"
    class="mt-2">
   <v-container>
      <v-row align="end" style="height:42vh;">
        <v-col>
          <div class="text-h2 text-md-h1 text-center font-weight-light">
            Página no encontrada
          </div>
        </v-col>
      </v-row>
      <v-row align="center" style="height:24vh;">
        <v-col>
          <div class="text-h2 text-md-h1 text-center font-weight-black">
            404
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'error-404',
  data() {
    return {

    }
  },
  computed: {
    bodyWH() {
      const {
        sm,
        xs,
        md
      } = this.$vuetify.breakpoint;
      return sm || xs || md ? {
        'vMainContentw': '99vw',
        'vMainContenth': 'auto'
      } : {
        'vMainContentw': '99vw',
        'vMainContenth': '85vh'
      };
    }
  }
}
</script>

<style>

</style>
