<template>
  <v-card :loading="herramientasLoader" class="mt-2 rounded-xl d-flex flex-column" max-height="85vh"
    :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

    <v-system-bar height="30">
      <v-spacer></v-spacer>
      <v-btn text icon @click="barAction">
        <span class="material-icons">{{ panelCSS.isMin ? 'maximize': 'minimize'}}</span>
      </v-btn>
    </v-system-bar>

    <v-card-text class="pb-0">
      <div class="text-h4 text-lg-h4 text-center my-8" :class="cardClasses['class']">Lorem ipsum</div>
      <v-row no-gutters>
        <v-col order="1" :cols="cols['formSearchField']">
          <v-text-field v-model="busquedaBuscarPor" label="Buscar por" placeholder="Buscar por" outlined></v-text-field>
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

        <v-col cols="6" class="pr-1" :order="panelCSS.colOrder.estados" v-show="panelCSS.masFiltros">
          <v-select v-model="busquedaEstado" :items="getDdlEstados" :item-text="'descripcion'"
            :item-value="'descripcion'" label="Estados" outlined class="mb-0"></v-select>
        </v-col>
        <!--Estados-->

        <v-col cols="6" class="pl-1" :order="panelCSS.colOrder.municipios" v-show="panelCSS.masFiltros">
          <v-select v-model="busquedaCiudad" :items="getDdlMunicipios" :item-text="'descripcion'"
            :item-value="'descripcion'" label="Municipios" outlined>
          </v-select>
        </v-col>
        <!--Municipios-->

        <v-col :cols="cols['formCategoriasField']" :order="columnOrders['formCategorias']" class="mb-4"
          v-show="panelCSS.categorizacion">
          <v-slide-group v-model="busquedaCategorias" mandatory show-arrows center-active>
            <v-slide-item v-for="categoria in getDdlCategorias" :value="categoria.descripcion" :key="categoria.no_id"
              v-slot="{active}">
              <v-card class="mx-2" height="50" width="100" :color="active ? 'primary' : 'grey lighten-1'"
                @click="onCategoriaClick(categoria.descripcion)">
                <v-card-text>
                  <div class="text-body-1">
                    {{categoria.descripcion}}
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>

        <v-col :cols="6" order="6" class="mb-4" v-show="panelCSS.categorizacion">
          <v-select v-model="busquedaSexo" :items="getDdlSexo" :item-text="'descripcion'" :item-value="'descripcion'"
            label="Sexo" outlined>
          </v-select>
        </v-col>
        <v-col :cols="6" order="7" class="mb-4" v-show="panelCSS.categorizacion">
        </v-col>
        <!--Categorías-->
      </v-row>
    </v-card-text>

    <v-row align="center" justify="center" v-show="panelCSS.masFiltros" class="mb-2">
      <v-card-actions>
        <v-btn depressed elevation="2" color="primary" width="120" @click="buscar"> Buscar</v-btn>
        <v-btn depressed outlined color="primary" width="120" @click="anunciate"> Anunciate</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import GeneralMixins from '../mixins/general-mixins.js';
  import * as GraphqlCalls from '../graphql/general-mutations';

  export default {
    name: 'panel-herramientas',
    mixins: [GeneralMixins],
    data: () => ({
      herramientasLoader: false,
      busquedaBuscarPor: '',
      busquedaEstado: '',
      busquedaCiudad: '',
      busquedaSexo: '',
      busquedaVerificado: false,
      busquedaCategorias: "Escorts",
      panelCSS: {
        colOrder: {
          categorias: 2,
          municipios: 5,
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
      ...mapGetters(["getDdlEstados", "getDdlMunicipios", "getDdlCategorias", "getDdlSexo"]),
      cols() {
        const { lg, sm, md, xs } = this.$vuetify.breakpoint
        //console.log(`vista: lg: ${lg}, sm: ${sm}, md: ${md}, xs: ${xs}`);
        return lg ? { formSearchField: 12, formCategoriasField: 12 } : md ? { formSearchField: 5, formCategoriasField: 6 } : sm ? { formSearchField: 5, formCategoriasField: 6 } : { formSearchField: 10, formCategoriasField: 12 };
      },
      cardClasses() {
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return sm || md || xs ? { class: this.panelCSS.headerClass } : { class: '' };
      },
      filterInputClass() {
        const { lg, xl } = this.$vuetify.breakpoint;
        return lg || xl ? { class: this.panelCSS.headerClass } : { class: '' };
      },
      columnOrders() {
        const { sm, md, xs } = this.$vuetify.breakpoint;
        return xs ? { formMasFiltros: 2, formCategorias: 3 } : { formMasFiltros: 3, formCategorias: 2 };
      }

    },
    methods: {
      onCategoriaClick(nuevaDescripcion) {
        this.busquedaCategorias = nuevaDescripcion;
      },
      panelHerramientasRegistro(value) {
        this.$store.dispatch('panelHerramientasRegistro', value);
      },
      async buscar() {
        let Query = {};
        console.log("vue buscar... ");

        if (this.busquedaBuscarPor.trim() != "") {
          Query.busquedaBuscarPor = this.busquedaBuscarPor.trim();
        }

        if (this.busquedaEstado != "") {
          Query.busquedaEstado = this.busquedaEstado.trim();
        }

        if (this.busquedaCiudad.trim() != "") {
          Query.busquedaCiudad = this.busquedaCiudad.trim();
        }

        if (this.busquedaSexo != "") {
          Query.busquedaSexo = this.busquedaSexo;
        }

        if (this.busquedaVerificado) {
          Query.busquedaVerificado = this.busquedaVerificado;
        }

        if (this.busquedaCategorias) {
          Query.busquedaCategorias = [this.busquedaCategorias];
        }

        this.$store.dispatch("querySet", Query);

      },
      async anunciate() {
        let DispatchResult;
        console.log("vue anunciate...");

        try {
          DispatchResult = await this.$store.dispatch('crearAnuncioDisplay', null);
        } catch (error) {
          console.log("vue anunciate... en error");
          console.dir(error);
          this.$store.dispatch('activationAlert', { type: 'error', message: `${error.mensaje}` });
          this.mixinLlamadaRouter(error);
          return;
        }
        console.log("vue anunciate...");
        console.dir(DispatchResult);
        this.mixinLlamadaRouter(DispatchResult);
      },
      showingMasFiltros() {
        this.panelCSS.masFiltros = !this.panelCSS.masFiltros;
        this.panelCSS.categorizacion = window.innerWidth < 601 ? !this.panelCSS.categorizacion : true;

        if (this.panelCSS.masFiltros && window.innerWidth < 1263) {
          this.panelCardHeight = '50vh';
        } else {
          this.panelCardHeight = 'auto';
        }
      },
      onResizeMasFiltros() {
        if (window.innerWidth < 1263) {
          this.panelCSS.masFiltros = false;
          this.panelCSS.panelCardHeight = 'auto';
        }

        if (window.innerWidth > 1263) {
          this.panelCSS.masFiltros = true;
          this.panelCSS.panelCardHeight = '85vh';
        }

        if (window.innerWidth < 600) {
          this.panelCSS.categorizacion = false;
        }

        if (window.innerWidth >= 600) {
          this.panelCSS.categorizacion = true;
        }
      },
      barAction() {
        console.log(`vue PanelHerramientas: barAction... isMin ${this.panelCSS.isMin}`);
        let _busquedaCategorias = this.busquedaCategorias;
        if (!this.panelCSS.isMin) {
          console.log(`minimizeHerramientas`);
          this.$emit('activandoGrid', { herramientasWidth: 8, sistemaWidth: 12 });
          this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' });
          this.minimizeHerramientas();
          this.busquedaCategorias = _busquedaCategorias;
          return;
        }
        console.log(`maximizeHerramientas`);
        this.$emit('activandoGrid', { herramientasWidth: 3, sistemaWidth: 9 });
        this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-pcview' });
        this.maximizeHerramientas();
        this.busquedaCategorias = _busquedaCategorias;
      },
      minimizeHerramientas() {
        const { xs, sm } = this.$vuetify.breakpoint;

        this.panelCSS.isMin = true;
        this.busquedaCategorias = 0;
        this.cols['formSearchField'] = xs || sm ? 10 : 4;
        this.cols['formCategoriasField'] = 6;
        this.cols['formMasFiltros'] = xs || sm ? 3 : 2;
        this.cols['formCategorias'] = 3;
        this.filterInputClass['class'] = '';
        this.cardClasses['class'] = this.panelCSS.headerClass;
        //this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' });
        this.panelCSS.masFiltros = false;
        this.panelCSS.panelCardHeight = 'auto';
      },
      maximizeHerramientas() {
        const { xs, sm } = this.$vuetify.breakpoint;

        this.panelCSS.isMin = false;
        this.busquedaCategorias = 0;
        this.cols['formSearchField'] = xs || sm ? 10 : 12;
        this.cols['formCategoriasField'] = 12;
        this.cols['formMasFiltros'] = xs || sm ? 2 : 3;
        this.cols['formCategorias'] = 2;
        this.filterInputClass['class'] = this.panelCSS.headerClass;
        this.cardClasses['class'] = '';
        //xs||sm? this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-mbview' }) : this.$emit('panelMinimizeH', { panelHerramientasClass: 'panel-herramientas-pcview' });
        this.panelCSS.masFiltros = true;
        this.panelCSS.panelCardHeight = '85vh';
      }
    },
    async mounted() {
      this.onResizeMasFiltros()
      window.addEventListener('resize', this.onResizeMasFiltros, { passive: true });
    },
    beforeDestroy() {
      if (typeof window === 'undefined') return
      window.removeEventListener('resize', this.onResizeMasFiltros, { passive: true })
    },
  }
</script>

<style lang="scss">
  .hidden {
    display: none;
  }
</style>