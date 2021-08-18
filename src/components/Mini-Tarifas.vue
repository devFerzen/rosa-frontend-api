<template lang="html">
  <v-card
    flat
    tile
    style="border:1px solid red;">
    <v-window
      v-model="tarifaSelected"
      vertical>
      <v-window-item
        v-for="(tarifa, i) in tarifas"
        :key="`card-${i}`">
        <v-card
          color="grey"
          height="100">
          <v-row
            class="fill-height"
            align="center"
            justify="center">
            <div class="text-h4 font-weight-regular">
              {{ tarifa.nombre }}
            </div>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions style="position:absolute; top:0;">
      <v-btn
        text
        @click="prev">
        next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['tarifas'],
  data() {
    return {
      tarifaSelected: 0,
      length: 3
    }
  },
  methods: {
    next () {
      this.tarifaSelected = this.tarifaSelected + 1 === this.length
        ? 0
        : this.tarifaSelected + 1
    },
    prev () {
      this.tarifaSelected = this.tarifaSelected - 1 < 0
        ? this.length - 1
        : this.tarifaSelected - 1
    },
  }
}
</script>

<style lang="css" scoped>

</style>
