<template>
<v-row align="center" justify="center">
  <v-item-group v-model="categoriaSeleccionada">
    <!--Titulo y espacio de tarjetas-->
    <v-container class="mt-3" style="overflow-y: scroll; max-height: 20rem;">
      <v-row>
        <v-col v-for="(tarifa, i) in 12" :key="i" cols="12" md="6" >

          <v-item v-slot="{active, toggle}">
            <v-card width="210" class="ma-1" :color="active ? 'primary' : 'gray lighten-1'" @click="toggle">
              <v-card-title> tarifa.nombre </v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col>
                    <div>tarifa.descripcion</div>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <div class="grey--text ml-2">
                      <font-awesome-icon icon="dollar-sign" class="tw-redes-icons" />
                      1500.00
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>

  </v-item-group>
</v-row>
</template>

<script>
export default {
  name: 'compras',
  data() {
    return {
      stepperIndex: 1
    }
  }
}
</script>

<style lang="css" scoped>

</style>
