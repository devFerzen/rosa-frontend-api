<template>
  <v-card
    :height="bodyWH['vMainContenth']"
    :width="bodyWH['vMainContentw']"
    style="border:1px solid red"
    class="mt-2">     

  </v-card>
</template>

<script>
export default {
  name: 'espacio-publicitario',
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
        'vMainContenth': '82vh'
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
