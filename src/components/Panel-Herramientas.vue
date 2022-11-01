<template>
  <v-card
    :loading="herramientasLoader"
    class="mt-2 d-flex flex-column"
    :height="panelCSS.panelCardHeight"
    max-height="panelCSS.panelCardMaxHeight"
    min-height="13vh"
    color="pink"
    flat
    style="border-radius: 19px !important"
  >
    <v-system-bar height="30" color="pink" class="rounded-xl">
      <v-spacer></v-spacer>
      <v-btn text icon @click="barActionBtn">
        <span class="material-icons">{{
          panelCSS.isMin ? "maximize" : "minimize"
        }}</span>
      </v-btn>
    </v-system-bar>

    <v-card-text class="pb-0">
      <v-form ref="busqueda" v-model="valid" lazy-validation>
        <v-row>
          <v-col order="1" cols="10" style="height: 50px">
            <v-text-field
              v-model="busquedaBuscarPor"
              placeholder="Búsqueda..."
              class="error609TextField"
              color="pink"
              dense
              outlined
              solo
            >
            </v-text-field>
          </v-col>
          <!--Busqueda-->

          <v-col cols="2" order="2">
            <div class="d-flex align-center justify-center">
              <v-btn
                text
                icon
                depressed
                plain
                tile
                @click="showingExtraFiltros"
                color="white"
                class="panel-herramientas-masFiltros"
              >
                <font-awesome-icon
                  :icon="['fas', 'filter']"
                  class="fa-2x"
                ></font-awesome-icon>
              </v-btn>
            </div>
          </v-col>
          <!--Btn Input Extras-->

          <v-col
            cols="6"
            class="pr-1"
            :order="panelCSS.colOrder.estados"
            style="height: 50px"
            v-show="extraInputView"
          >
            <v-select
              v-model="busquedaEstado"
              :items="ddlEstados"
              :item-text="'descripcion'"
              :item-value="'descripcion'"
              label="Estado"
              placeholder="Estado"
              :menu-props="{ maxHeight: 150, offsetY: true }"
              single-line
              solo
              dense
              outlined
              class="error609TextField mb-0 select609"
              @change="getMunicipios(busquedaEstado)"
            >
            </v-select>
          </v-col>
          <!--Estados-->

          <v-col
            cols="6"
            class="pl-1"
            :order="panelCSS.colOrder.municipios"
            style="height: 50px"
            v-show="extraInputView"
          >
            <v-select
              v-model="busquedaCiudad"
              :items="ddlMunicipios"
              :item-text="'descripcion'"
              :item-value="'descripcion'"
              label="Municipio"
              placeholder="Municipio"
              :menu-props="{ maxHeight: 150, offsetY: true }"
              single-line
              solo
              dense
              outlined
              class="error609TextField mb-0 select609"
            >
            </v-select>
          </v-col>
          <!--Municipios-->

          <v-col
            cols="12"
            :order="columnOrders['formCategorias']"
            style="height: 65px; padding-left: 0; padding-right: 0"
            v-show="extraInputView"
          >
            <v-slide-group
              v-model="busquedaCategorias"
              mandatory
              show-arrows
              center-active
            >
              <v-slide-item
                v-for="categoria in getDdlCategoriasCorrection"
                :value="categoria.descripcion"
                :key="categoria.no_id"
                v-slot="{ active, toggle }"
              >
                <v-card
                  class="
                    mx-1
                    d-flex
                    align-center
                    justify-center
                    rounded-xl
                    my-1
                  "
                  elevation="1"
                  height="30"
                  width="90"
                  :class="
                    active
                      ? 'input-categoria-active'
                      : 'input-categoria-inactive'
                  "
                  @click="toggle"
                >
                  <div
                    class="text-caption text-center"
                    style="line-height: 1rem"
                  >
                    {{ categoria.descripcion }}
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
          <!--Categorías-->

          <v-col
            cols="5"
            :lg="4"
            :order="panelCSS.colOrder.sexo"
            style="height: 50px"
            v-show="extraInputView"
          >
            <v-row class="ml-1">
              <v-select
                v-model="busquedaSexo"
                :menu-props="{ top: false, offsetY: true }"
                :items="getDdlSexo"
                :item-text="'descripcion'"
                :item-value="'descripcion'"
                label="Sexo"
                placeholder="Sexo"
                solo
                dense
                outlined
                class="error609TextField select609"
              >
              </v-select>
            </v-row>
          </v-col>
          <!--sexo-->
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-row justify="center" style="position: relative">
        <v-btn
          depressed
          outlined
          rounded
          color="white"
          class="panel-herramientas-btnBuscar rounded-xl btn-menu-pcview errorBoxShadow"
          :class="btnBuscarMinMaxClass"
          width="120"
          @click="buscar"
        >
          Buscar
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import GeneralMixins from "../mixins/general-mixins.js";
import * as GraphqlCalls from "../graphql/general-mutations";

export default {
  name: "panel-herramientas",
  mixins: [GeneralMixins],
  data: () => ({
    herramientasLoader: false,
    valid: true,
    busquedaBuscarPor: "",
    busquedaEstado: "",
    busquedaCiudad: "",
    busquedaSexo: "",
    busquedaVerificado: false,
    busquedaCategorias: "Escorts",
    panelCSS: {
      colOrder: {
        estados: 3,
        municipios: 4,
        sexo: 5,
      },
      headerClass: "hidden",
      isMin: false,
      categorizacion: true,
      panelCardHeight: "auto",
      panelCardMaxHeight: "45vh",
    },
    scrollLimitOpened: 100,
    scrollLimitClosed: 800,
    extraInputView: true,
    extraInputViewUserActivation: ""
  }),
  computed: {
    ...mapGetters([
      "getDdlCategorias",
      "getDdlSexo",
    ]),
    ddlMunicipios(){
      return this.DdlMunicipios
    },
    ddlEstados(){
      return this.DdlEstados
    },
    getDdlCategoriasCorrection() {
      this.busquedaCategorias = "Escrots";
      return this.getDdlCategorias;
    },
    colSize() {
      return {
        formSearchField: 10,
        formBtnInputExtra: 2,
        formCategoriasField: 12,
        formEstadosField: 6,
        formMunicipiosField: 6,
      };
    },
    btnAnunciateMinMaxClass() {
      const isMin = this.panelCSS.isMin;
      return isMin ? "panel-herramientas-btnAnunciateMin" : "";
    },
    btnBuscarMinMaxClass() {
      const isMin = this.panelCSS.isMin;
      return isMin ? "panel-herramientas-btnBuscarMin" : "";
    },
    columnOrders() {
      const { sm, md, xs } = this.$vuetify.breakpoint;
      return xs ? { formCategorias: 5 } : { formCategorias: 5 };
    },
  },
  methods: {    
    panelHerramientasRegistro(value) {
      this.$store.dispatch("panelHerramientasRegistro", value);
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
        //
        DispatchResult = await this.$store.dispatch("anunciateSet", null);
      } catch (error) {
        console.log("vue anunciate... dispatch en error");
        console.dir(error);
        this.mixinLlamadaRouter(error);
        return;
      }
      console.log("vue anunciate... result");
      console.dir(DispatchResult);
      this.mixinLlamadaRouter(DispatchResult);
    },

    onScroll() {
      const { sm, md, xs } = this.$vuetify.breakpoint;

      if (this.extraInputViewUserActivation !== "") {
        return;
      }

      this.extraInputView =
        window.pageYOffset > this.scrollLimitClosed
          ? false
          : window.pageYOffset < this.scrollLimitClosed &&
            window.pageYOffset < this.scrollLimitOpened
          ? true
          : false;

      /*if( window.pageYOffset > this.scrollLimitClosed ){
          this.extraInputViewUserActivation = false;//!this.extraInputView ? false : true;
        }*/
    },
    showingExtraFiltros() {
      const { sm, md, xs } = this.$vuetify.breakpoint;

      this.extraInputView = !this.extraInputView;
      this.extraInputViewUserActivation = !this.extraInputView ? false : true;
      //accion para acomodr los bts de accion
    },
    barActionBtn() {
      console.log(
        `vue PanelHerramientas: barActionBtn... isMin ${this.panelCSS.isMin}`
      );

      //Resultados para dar a una vista mb
      if (!this.panelCSS.isMin) {
        console.log(`minimizeHerramientas`);
        this.$emit("activandoGrid", {
          herramientasWidth: { lg: 5, md: 6, sm: 8 },
          sistemaWidth: { lg: 12 },
          colUsuarioDesc: 3,
        });
        this.$emit("panelMinClass", {
          panelHerramientasClass: "panel-herramientas-mbview",
        });

        this.minimizeHerramientas();
        return;
      }

      //Resultados para dar a una vista pc
      console.log(`maximizeHerramientas`);
      this.$emit("activandoGrid", {
        herramientasWidth: { lg: 3, md: 6, sm: 8 },
        sistemaWidth: { lg: 9 },
        colUsuarioDesc: 4,
      });
      this.$emit("panelMinClass", {
        panelHerramientasClass: "panel-herramientas-pcview",
      });
      this.maximizeHerramientas();
    },
    minimizeHerramientas() {
      const { sm, md, xs } = this.$vuetify.breakpoint;

      this.panelCSS.isMin = true;
      this.colSize["formSearchField"] = 10;
      this.colSize["formCategoriasField"] = 12;
      this.colSize["formCategorias"] = 5;
      //this.$emit('panelMinClass', { panelHerramientasClass: 'panel-herramientas-mbview' });
      this.panelCSS.panelCardMaxHeight = "45vh";
    },
    maximizeHerramientas() {
      const { xs, sm } = this.$vuetify.breakpoint;
      let alturaCajaPanelMax = "45vh";

      if (sm) {
        alturaCajaPanelMax = "71vh";
      }

      this.panelCSS.isMin = false;
      this.colSize["formSearchField"] = 10;
      this.colSize["formCategoriasField"] = 12;
      this.colSize["formCategorias"] = 5;
      //xs||sm? this.$emit('panelMinClass', { panelHerramientasClass: 'panel-herramientas-mbview' }) : this.$emit('panelMinClass', { panelHerramientasClass: 'panel-herramientas-pcview' });
      this.panelCSS.panelCardMaxHeight = alturaCajaPanelMax;
    },
  },
  async mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", this.onScroll);
  },
  async created(){
    //Guardando estados
    let _MixinResult;

    if (this.DdlEstados.length == 0) {
      _MixinResult = await this.mixinDdlGeneral("ddlEstado");
      
      this.$store.dispatch("ddls", {
        categoria: "ddlEstado",
        categorias: _MixinResult.data
      });
      await this.mixinSetDdlEstados(_MixinResult.data);
    }

    //Guardando municipios
    if (this.DdlMunicipios.length == 0) {
      _MixinResult = await this.mixinDdlGeneral("ddlMunicipios");

      await this.$store.dispatch("ddls", {
        categoria: "ddlMunicipios",
        categorias: _MixinResult.data
      });
    }
  }
};
</script>

<style lang="scss">
.hidden {
  display: none;
}

.panel-herramientas-masFiltros {
  box-shadow: none !important;
}

.panel-herramientas-btnBuscar {
  border: 3px solid white !important;
  background-color: #e0409a;
  top: 13px;
}

.panel-herramientas-btnBuscarMin {
  left: 38px;
  top: 19px;
}

.panel-herramientas-btnAnunciate {
  background-color: #9fe676;
  border: 3px solid white !important;
  top: 13px;
  right: 8px;
}

.panel-herramientas-btnAnunciateMin {
  right: 32px;
  top: 19px;
}

.input-categoria-active {
  color: white !important;
  background-color: #e0409a !important;
}

.input-categoria-inactive {
  color: #7d7e80 !important;
  background-color: white;
}

.v-slide-group__prev > .v-icon,
.v-slide-group__next > .v-icon {
  font-size: 1.8rem !important;
  color: white;
  background-color: #e0409a;
  border-radius: 18px;
}

.v-slide-group__prev > .v-icon--disabled,
.v-slide-group__next > .v-icon--disabled {
  font-size: 1.2rem !important;
  background-color: #e47ab6;
}
</style>
