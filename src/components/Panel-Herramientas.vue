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
      <v-btn text icon @click="barAction">
        <span class="material-icons">{{ panelCSS.isMin ? 'maximize': 'minimize'}}</span>
      </v-btn>
    </v-system-bar>

    <v-card-text class="pb-0">
      <div class="text-h4 text-lg-h4 text-center my-8" :class="cardClasses['class']">Lorem ipsum</div>
      <v-row no-gutters>
        <v-col order="1" :cols="cols['formSearchField']">
          <v-text-field
            label="Lorem ipsum"
            placeholder="Lorem ipsum"
            outlined></v-text-field>
        </v-col>
        <!--Busqueda-->

        <v-col cols="2" :class="filterInputClass['class']" :order="columnOrders['formMasFiltros']">
          <div class="d-flex align-center justify-center">
            <v-btn text icon @click="showingMasFiltros">
              <span class="material-icons">maximize</span>
            </v-btn>
          </div>
        </v-col>
        <!--Icono más filtros-->

        <v-col cols="6" class="mr-1 mb-0" :order="panelCSS.colOrder.estados" v-show="panelCSS.masFiltros">
          <v-select
            :items="estados"
            label="Estados"
            outlined
            class="mb-0"></v-select>
        </v-col>
        <!--Estados-->

        <v-col :order="panelCSS.colOrder.ciudades" v-show="panelCSS.masFiltros">
          <v-select
            :items="ciudades"
            label="Ciudades"
            outlined></v-select>
        </v-col>
        <!--Ciudades-->

        <v-col :cols="cols['formCategoriasField']" :order="columnOrders['formCategorias']" class="mb-4" v-show="panelCSS.categorizacion">
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
        </v-col>
        <!--Categorías-->
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center" v-show="panelCSS.masFiltros" class="mb-2">
      <v-card-actions>
        <v-btn
          depressed
          elevation="2"
          color="primary"
          width="120"> Buscar</v-btn>
        <v-btn
          depressed
          outlined
          color="primary"
          width="120"
          @click="creandoAnuncio"> Anunciate</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'panel-herramientas',
    data: () => ({
      herramientasLoader: false,
      categoriaSeleccionada: 1,
      ciudades: [],
      estados: [],
      panelCSS: {
        colOrder: {
          categorias: 2,
          ciudades: 5,
          estados: 4
        },
        headerClass: 'hidden',
        isMin: false,
        masFiltros: false,
        categorizacion: true,
        panelCardHeight: '85vh'
      },
    }),
    computed: {
      cols () {
        const { lg, sm, md, xs } = this.$vuetify.breakpoint
        console.log(`vista: lg: ${lg}, sm: ${sm}, md: ${md}, xs: ${xs}`);
        return lg ? {formSearchField: 12, formCategoriasField: 12} : md ? {formSearchField: 5, formCategoriasField: 6} : sm ? {formSearchField: 5, formCategoriasField: 6} : {formSearchField: 10, formCategoriasField: 12};
      },
      cardClasses() {
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return sm || md || xs ?{class:this.panelCSS.headerClass} : {class:''};
      },
      filterInputClass() {
        const { lg, xl } = this.$vuetify.breakpoint;
        return lg || xl ? {class: this.panelCSS.headerClass} : { class: ''};
      },
      columnOrders(){
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return xs ? { formMasFiltros: 2, formCategorias: 3 } : { formMasFiltros: 3, formCategorias: 2 };
      }

    },
    methods: {
      activandoRegistro(value){
        this.$store.dispatch('activandoRegistro', value);
      },
      creandoAnuncio () {
        this.$store.dispatch('creandoAnuncio', this.TestnewAnuncio)
        .then((result)=> {
            console.log("vista: creandoAnuncio en éxito...");
            console.log(result);
            this.$store.dispatch('activandoRegistro', false);
        })
        .catch((error)=> {
          if(!!error.activeTo && error.activeTo == 'registro'){
            this.$store.dispatch('activandoRegistro', true);
          }
          console.log("vista: creandoAnuncio en error...");
          console.log(error.mensaje);
        });
      },
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
      barAction() {
        console.log(`vue PanelHerramientas: barAction... isMin ${this.panelCSS.isMin}`);
        let _categoriaSeleccionada = this.categoriaSeleccionada;
        if(!this.panelCSS.isMin){
          console.log(`minimizeHerramientas`);
          this.$emit('activandoGrid', {herramientasWidth: 8, sistemaWidth: 12});
          this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' });
          this.minimizeHerramientas();
          this.categoriaSeleccionada = _categoriaSeleccionada;
          return;
        }
        console.log(`maximizeHerramientas`);
        this.$emit('activandoGrid', { herramientasWidth: 3, sistemaWidth: 9 });
        this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-pcview' });
        this.maximizeHerramientas();
        this.categoriaSeleccionada = _categoriaSeleccionada;
      },
      minimizeHerramientas () {
        const {xs,sm} = this.$vuetify.breakpoint;

        this.panelCSS.isMin = true;
        this.categoriaSeleccionada = 0;
        this.cols['formSearchField'] = xs||sm? 10: 4;
        this.cols['formCategoriasField'] = 6;
        this.cols['formMasFiltros'] = xs||sm? 3: 2;
        this.cols['formCategorias'] = 3;
        this.filterInputClass['class'] = '';
        this.cardClasses['class'] = this.panelCSS.headerClass;
        //this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' });
        this.panelCSS.masFiltros = false;
        this.panelCSS.panelCardHeight = 'auto';
      },
      maximizeHerramientas () {
        const {xs,sm} = this.$vuetify.breakpoint;

        this.panelCSS.isMin = false;
        this.categoriaSeleccionada = 0;
        this.cols['formSearchField'] = xs||sm? 10: 12;
        this.cols['formCategoriasField'] = 12;
        this.cols['formMasFiltros'] = xs||sm? 2 : 3;
        this.cols['formCategorias'] = 2;
        this.filterInputClass['class'] = this.panelCSS.headerClass;
        this.cardClasses['class'] = '';
        //xs||sm? this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' }) : this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-pcview' });
        this.panelCSS.masFiltros = true;
        this.panelCSS.panelCardHeight = '85vh';
      }
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
