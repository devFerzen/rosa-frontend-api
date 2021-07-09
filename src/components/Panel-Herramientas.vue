<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 rounded-xl d-flex flex-column"
    max-height="85vh"
    min-height="85vh"
    elevation="2"
    outlined>

    <v-system-bar
      height="30">
      <v-spacer></v-spacer>
      <v-btn text icon @click="panelCSS.isMax = !panelCSS.isMax">
        <span class="material-icons">{{ panelCSS.isMax ? 'maximize': 'minimize'}}</span>
      </v-btn>
    </v-system-bar>

    <v-card-text class="pb-0">
      <h6 class="text-h4 text-lg-h4 text-center my-8" :class="cardClasses" >Lorem ipsum dolor</h6>
      <v-row no-gutters>
        <v-col :lg="cols[0]" :md="cols[0]" :sm="cols[0]" :xs="cols[0]">
          <v-text-field
            label="Lorem ipsum"
            placeholder="Lorem ipsum"
            outlined></v-text-field>
        </v-col>

        <v-col order="1" cols="1">
          <v-btn text icon>
            <span class="material-icons">maximize</span>
          </v-btn>
        </v-col>

        <v-col cols="6" class="mr-1 mb-0" :order="panelCSS.colOrder.estados">
          <v-select
            :items="estados"
            label="Estados"
            outlined
            class="mb-0"></v-select>
        </v-col>
        <v-col :order="panelCSS.colOrder.ciudades">
          <v-select
            :items="ciudades"
            label="Ciudades"
            outlined></v-select>
        </v-col>

        <v-col :sm="cols[1]" :md="cols[1]" :order="panelCSS.colOrder.categorias">
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
                class="mx-2"
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
        </v-col>
      </v-row>
    </v-card-text>

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
      estados: [],
      panelCSS: {
        colOrder: {
          categorias: 1,
          ciudades: 4,
          estados: 3
        },
        headerClass: 'hidden',
        isMax: false
      },
    }),
    computed: {
      cols () {
        const { lg, sm, md, xs } = this.$vuetify.breakpoint
        console.log(`lg: ${lg}, sm: ${sm}, md: ${md}, xs: ${xs}`);
        console.log(`${lg ? [3, 9] : sm ? [4, 6] : [10, 12]}`);
        return lg ? [12, 6] : md ? [6, 5] : sm ? [4, 6] : [11, 12];
      },
      cardClasses() {
        const { md } = this.$vuetify.breakpoint
        return md ? this.panelCSS.headerClass : '';
      }
    },
  }
</script>

<style lang="scss">
.hidden{
  display: none;
}
</style>
