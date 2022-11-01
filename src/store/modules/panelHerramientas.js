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
    }
}