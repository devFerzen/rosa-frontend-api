export const state = {
    ddls: [{
        no_id: '0',
        descripcion: '-- sin descripción --',
        icono_icono: '',
        icono_categoria: '',
        categoria: '',
        estado: true,
        no_estado: ''
    }],
    busquedaQuery: {}
}

export const mutations = {
    DDLS_ESTADO_SET(state, payload) {
        state.ddls = state.ddls.concat(payload.categorias);
    },
    QUERY_SET(state, payload) {
        state.busquedaQuery = payload;
    }
}
export const actions = {
    panelHerramientasBusqueda({ commit }, payload) {
        commit('BUSQUEDA_VIEW', payload);
    },
    panelHerramientasRegistro({ commit }, payload) {
        commit('REGISTRO_VIEW', payload, { root: true });
    },
    panelHerramientasInicioSesion({ commit }, payload) {
        commit('INICIANDO_SESION_VIEW', payload, { root: true });
    },
    panelHerramientasContactanos({ commit }, payload) {
        commit('CONTACTO_VIEW', payload, { root: true });
    },
    panelHerramientasVerificacion({ commit }, payload) {
        commit('VERIFICACION_VIEW', payload, { root: true });
    },
    panelHerramientasCambioContrasena({ commit }, payload) {
        commit('ACTUALIZANDO_CONTRASENA', payload, { root: true });
    },
    ddls({ commit }, payload) {
        commit('DDLS_ESTADO_SET', payload);
    },
    querySet({ commit }, payload) {
        commit('QUERY_SET', payload);
    }
}
export const getters = {
    getBusquedaQuery: state => {
        return state.busquedaQuery;
    },
    getDdlCategorias: state => {
        //console.log("getters getDdlCategorias");

        let DdlCategorias = [];
        let Ddls = [];
        Ddls = state.ddls;

        if (Ddls.some(ddlCategoria => ddlCategoria.categoria == "ddlCategoriaAnuncio")) {
            //console.log("...YA hay un ddl con categoria 'ddlCategoriaAnuncio'.");
            DdlCategorias = Ddls.filter(ddl => ddl.categoria == "ddlCategoriaAnuncio");
            //console.dir(DdlCategorias);
            return DdlCategorias;
        }

        //console.log("...NO hay un ddl con categoria 'ddlMunicipio'.");
        DdlCategorias = Ddls;

        return [DdlCategorias.find(ddl => ddl.no_id == 0)];
    },
    getDdlSexo: state => {
        //console.log("getters getDdlSexo");

        let DdlSexo = [];
        let Ddls = [];
        Ddls = state.ddls;

        if (Ddls.some(ddlCategoria => ddlCategoria.categoria == "ddlSexo")) {
            //console.log("...YA hay un ddl con categoria 'ddlSexo'.");
            DdlSexo = Ddls.filter(ddl => ddl.categoria == "ddlSexo");
            //console.dir(DdlSexo);
            return DdlSexo;
        }

        //console.log("...NO hay un ddl con categoria 'ddlMunicipio'.");
        DdlSexo = Ddls;

        return [DdlSexo.find(ddl => ddl.no_id == 0)];
    },
    getDdlRedesSociales: state => {
        //console.log("getters getDdlRedesSociales");

        let DdlRedesSociales = [];
        let Ddls = [];
        Ddls = state.ddls;

        if (Ddls.some(ddlCategoria => ddlCategoria.categoria == "ddlRedesSociales")) {
            //console.log("...YA hay un ddl con categoria 'ddlRedesSociales'.");
            DdlRedesSociales = Ddls.filter(ddl => ddl.categoria == "ddlRedesSociales");
            //console.dir(DdlRedesSociales);
            return DdlRedesSociales;
        }

        //console.log("...NO hay un ddl con categoria 'ddlMunicipio'.");
        DdlRedesSociales = Ddls;

        return [DdlRedesSociales.find(ddl => ddl.no_id == 0)];
    }
}