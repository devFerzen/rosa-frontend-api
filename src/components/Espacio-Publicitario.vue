<template>
  <v-card
    :height="bodyWH['vMainContenth']"
    :width="bodyWH['vMainContentw']"
    class="mt-2 px-2">     
    <v-img
      contain
      aspect-ratio="1.7"
      :src="require('../assets/publicity/backgroundPublicity.png')"
    >
    </v-img>
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
      return sm || xs ? {
        'vMainContentw': '58vw',
        'vMainContenth': 'auto'
      } : {
        'vMainContentw': '67vw',
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
