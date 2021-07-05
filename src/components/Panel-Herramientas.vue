<template>
  <v-card
    :loading="herramientasLoader"
    class="ml-2 ml-md-6 mt-2"
    height="85%"
    >
    <v-card-title> Lorem ipsum dolor sit amet</v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: 'Panel-Herramientas',
    data: () => ({
      herramientasLoader: false,
    }),
  }
</script>

<style lang="scss">
  .loginClass {
    background-color: red;
  }

  .herramientasHigh {
    height: 100%;
  }
</style>
