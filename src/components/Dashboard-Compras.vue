<template>
  <v-card>
    <v-item-group v-model="categoriaSeleccionada">
      <!--Titulo y espacio de tarjetas-->

      <v-stepper alt-labels style="width: 100%;">
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

      <v-container
        class=""
        style="overflow-y: scroll; max-height: 20rem;"
      >
        <v-row>
          <v-col v-for="(tarifa, i) in tarifasActivas" :key="i" cols="6">
            <v-item v-slot="{ active, toggle }">
              <v-card
                width="220"
                height="250"
                :color="active ? 'primary' : 'gray lighten-1'"
                @click="toggle"
                class="ma-4"
              >
                <v-card-title
                  :style="active ? tarifaCss['tituloOn'] : tarifaCss['tituloOff']"
                  >{{tarifa.nombre}}
                </v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col>
                      <div :style="active ? tarifaCss['descOn'] : tarifaCss['descOff']">{{tarifa.descripcion}}</div>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="mt-6">
                    <v-col>
                      <div :style="active ? tarifaCss['precioOn'] : tarifaCss['precioOff']">
                        <font-awesome-icon
                          icon="dollar-sign"
                        />
                        {{tarifa.precio}}
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
  </v-card>
</template>

<script>
import PaquetesMixins from "../mixins/paquete-mixins.js";

export default {
  name: "dashboard-compras",
  mixins: [PaquetesMixins],
  data() {
    return {
      stepperIndex: 1,
      tarifasActivas: [],
      tarifaCss: {
        tituloOn: {
          color: "white",
        },
        tituloOff: {
          color: "pink",
        },
        descOn: {
          color: "white",
        },
        descOff: {
          color: "black",
        },
        precioOn: {
          color: "white",
        },
        precioOff: {
          color: "black",
        },
      },
    };
  },
  computed: {
    tarifasDisponibles() {
      return this.tarifasActivas;
    },
  },
  async created() {
    //Analizar: Refactorizar para otro lugar
    console.log("dashboard compras...");
    
    if(this.$store.state.paquete.paquetes.length <= 1){
      this.tarifasActivas = await this.mixinBuscarPaquetes();
    } else {
      this.tarifasActivas = this.$store.state.paquete.paquetes;
    }

    console.dir(`${this.$store.state.paquete.paquetes}`)
    console.log(`${this.$store.state.paquete.paquetes.length}`)
  },
};
</script>

<style lang="css" scoped>

</style>
