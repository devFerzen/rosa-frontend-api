<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 rounded-xl d-flex flex-column"
    max-height="85vh"
    :height="panelCSS.panelCardHeight"
    min-height="20vh"
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
      <h6 class="text-h4 text-lg-h4 text-center my-8" :class="cardClasses">Lorem ipsum dolor</h6>
      <v-row no-gutters>
        <v-col order="1" :cols="cols['searchField']">
          <v-text-field
            label="Lorem ipsum"
            placeholder="Lorem ipsum"
            outlined></v-text-field>
        </v-col> <!--Busqueda-->

        <v-col :order="columnOrders['masFiltros']" cols="1" :class="filterInputClass">
          <v-btn text icon @click="showingMasFiltros">
            <span class="material-icons">maximize</span>
          </v-btn>
        </v-col> <!--Icono más filtros-->

        <v-col cols="6" class="mr-1 mb-0" :order="panelCSS.colOrder.estados" v-show="panelCSS.masFiltros">
          <v-select
            :items="estados"
            label="Estados"
            outlined
            class="mb-0"></v-select>
        </v-col> <!--Estados-->

        <v-col :order="panelCSS.colOrder.ciudades" v-show="panelCSS.masFiltros">
          <v-select
            :items="ciudades"
            label="Ciudades"
            outlined></v-select>
        </v-col> <!--Ciudades-->

        <v-col :cols="cols['categoriasField']" :order="columnOrders['categorias']" class="mb-4" v-show="panelCSS.categorizacion">
          <v-slide-group
            v-model="categoriaSeleccionada"
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
        </v-col> <!--Categorías-->
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center" v-show="panelCSS.masFiltros">
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
      categoriaSeleccionada: 2,
      ciudades: [],
      estados: [],
      panelCSS: {
        colOrder: {
          categorias: 2,
          ciudades: 5,
          estados: 4
        },
        headerClass: 'hidden',
        isMax: false,
        masFiltros: false,
        categorizacion: true,
        panelCardHeight: '85vh'
      },
    }),
    computed: {
      cols () {
        const { lg, sm, md, xs } = this.$vuetify.breakpoint
        console.log(`lg: ${lg}, sm: ${sm}, md: ${md}, xs: ${xs}`);
        console.log(`${lg ? [3, 9] : sm ? [4, 6] : [10, 12]}`);
        return lg ? {searchField: 12, categoriasField: 12} : md ? {searchField: 5, categoriasField: 6} : sm ? {searchField: 5, categoriasField: 6} : {searchField: 11, categoriasField: 12};
      },
      cardClasses() {
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return sm || md || xs ? this.panelCSS.headerClass : '';
      },
      filterInputClass() {
        const { lg, xl } = this.$vuetify.breakpoint;
        return lg || xl ? this.panelCSS.headerClass : '';
      },
      columnOrders(){
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return xs ? { masFiltros: 2, categorias: 3 } : { masFiltros: 3, categorias: 2 };
      }

    },
    methods: {
      showingMasFiltros () {
        this.panelCSS.masFiltros = !this.panelCSS.masFiltros;
        this.panelCSS.categorizacion = window.innerWidth < 601 ? !this.panelCSS.categorizacion : true;

        if(this.panelCSS.masFiltros && window.innerWidth < 1263){
          this.panelCardHeight = '50vh';
        } else {
          this.panelCardHeight = 'auto';
        }
      },
      onResizeMasFiltros () {
        if(window.innerWidth < 1263){
          this.panelCSS.masFiltros = false;
          this.panelCSS.panelCardHeight = 'auto';
        }

        if(window.innerWidth > 1263){
          this.panelCSS.masFiltros = true;
          this.panelCSS.panelCardHeight = '85vh';
        }

        if(window.innerWidth < 600){
          this.panelCSS.categorizacion = false;
        }

        if(window.innerWidth >= 600){
          this.panelCSS.categorizacion = true;
        }
      },
    },
    mounted () {
      this.onResizeMasFiltros()
      window.addEventListener('resize', this.onResizeMasFiltros, { passive: true })
    },
    beforeDestroy () {
      if (typeof window === 'undefined') return
      window.removeEventListener('resize', this.onResizeMasFiltros, { passive: true })
    },
  }
</script>

<style lang="scss">
  .hidden{
    display: none;
  }
</style>
