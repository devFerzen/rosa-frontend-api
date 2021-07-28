<template>
  <v-card
    :height="bodyWH['vMainContenth']"
    :width="bodyWH['vMainContentw']">
    HI
  </v-card>
</template>

<script>
export default {
  name: 'Espacio-Publicitario',
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
        'vMainContentw': '58vw',
        'vMainContenth': 'auto'
      } : {
        'vMainContentw': '72vw',
        'vMainContenth': '85vh'
      };
    }
  },
  methods: {

  }
}
</script>

<style>
.tw-redes-icons {
  color: blue;
}
</style>
