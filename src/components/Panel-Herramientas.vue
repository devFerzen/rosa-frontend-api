<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 rounded-xl herramientas-card"
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
          class="mr-1">
          <v-select
            :items="estados"
            label="Estados"
            outlined></v-select>
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
          <v-card-text
            >
            <div class="text-body-1">
              Lorem {{n}}
            </div>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-card-actions class="mb-0 acciones-herramientas-card">
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
  </v-card>
</template>

<script>
  export default {
    name: 'Panel-Herramientas',
    data: () => ({
      herramientasLoader: false,
      panelCategoria: 3
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

  .herramientas-card {
    position: relative;
  }

  .acciones-herramientas-card{
    position: absolute;
    bottom: 0;
  }
</style>
