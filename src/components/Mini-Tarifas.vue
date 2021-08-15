<template lang="html">
  <v-card
    flat
    tile>
    <v-window
      v-model="tarifaSelected"
      vertical>
      <v-window-item
        v-for="(tarifa, i) in tarifas"
        :key="`card-${i}`">
        <v-card
          color="grey"
          height="112"
          >
          <v-row
            class="fill-height"
            align="center"
            justify="center">
            <h1
              style="font-size: 2rem;"
              class="white--text">
              Tarifa {{ tarifa.nombre }}
            </h1>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions>
      <v-btn
        text
        @click="prev"
        style="position:absolute; top:0; left:0;">
        prev
      </v-btn>
      <v-btn
        text
        @click="next"
        style="position:absolute; top:0; right:0;">
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
