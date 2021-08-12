<template>
<v-row align="center" justify="center">
  <v-item-group v-model="categoriaSeleccionada">
    <!--Titulo y espacio de tarjetas-->

    <v-stepper alt-labels>
      <v-stepper-header>
        <v-stepper-step step="1">
          Paquetes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Pago
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Confirmación
        </v-stepper-step>

      </v-stepper-header>
    </v-stepper>


    <v-container class="" style="overflow-y: scroll; max-height: 20rem; border: 1px solid red;">
      <v-row>
        <v-col v-for="(tarifa, i) in 6" :key="i" cols="6">

          <v-item v-slot="{active, toggle}">
            <v-card width="190" class="ma-1" :color="active ? 'primary' : 'gray lighten-1'" @click="toggle">
              <v-card-title>*{{tipo}} </v-card-title>
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
  name: 'dashboard-compras',
  props: ['tipo'],
  data() {
    return {
      stepperIndex: 1
    }
  }
}
</script>

<style lang="css" scoped>

</style>
