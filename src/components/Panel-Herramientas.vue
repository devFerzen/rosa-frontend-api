<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 rounded-xl d-flex flex-column"
    height="85%"
    elevation="2"
    outlined>

    <v-system-bar
      height="30">
      <v-spacer></v-spacer>
      <span class="material-icons">minimize</span>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum dolor</h6>

      <v-text-field
        label="Lorem ipsum"
        placeholder="Lorem ipsum"
        outlined></v-text-field>

      <v-row no-gutters>
        <v-col
          cols="6"
          class="mr-1 mb-0">
          <v-select
            :items="estados"
            label="Estados"
            outlined
            class="mb-0"></v-select>
        </v-col>
        <v-col
          cols>
          <v-select
            :items="ciudades"
            label="Ciudades"
            outlined></v-select>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center">
      <v-slide-group
        v-model="panelCategoria"
        mandatory
        show-arrows
        center-active>
        <v-slide-item
          v-for="n in 5"
          :key="n"
          v-slot="{active, toggle}">
          <v-card
            class="ma-2"
            height="50"
            width="100"
            :color="active ? 'primary' : 'grey lighten-1'"
            @click="toggle">
            <v-card-text>
              <div class="text-body-1">
                Lorem {{n}}
              </div>
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>

    <v-row align="center" justify="center">
      <v-card-actions>
        <v-btn
          depressed
          elevation="2"
          color="primary"
          width="140"></v-btn>
        <v-btn
          depressed
          outlined
          color="primary"
          width="140"></v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'Panel-Herramientas',
    data: () => ({
      herramientasLoader: false,
      panelCategoria: 2,
      ciudades: [],
      estados: []
    }),
  }
</script>

<style lang="scss">

</style>
