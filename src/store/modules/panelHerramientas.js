export const state = {
    anunciosBusqueda: []
}

export const mutations = {
    ANUNCIOS_BUSQUEDA_SET(state, payload) {
        state.anunciosBusqueda = payload;
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
    panelHerramientasCambioContraseña({ commit }, payload) {
        commit('ACTUALIZANDO_CONTRASENA', payload, { root: true });
    }
}