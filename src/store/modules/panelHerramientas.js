export const state = {
    anunciosBusqueda: []
}

export const mutations = {
  ANUNCIOS_BUSQUEDA_SET(state,payload){
    state.anunciosBusqueda = payload;
  }
}
export const actions = {
    anunciosBusquedaSet({commit},payload){
      commit('ANUNCIOS_BUSQUEDA_SET',payload);
    },
    panelHerramientasRegistro({commit}, payload) {
      commit('REGISTRANDOSE',payload, { root: true });
    },
    panelHerramientasInicioSesion({commit}, payload) {
      commit('INICIANDO_SESION',payload, { root: true });
    },
    panelHerramientasContactanos({commit}, payload) {
      commit('CONTACTANDOSE',payload, { root: true });
    },
    panelHerramientasVerificacion({commit}, payload) {
      commit('VERIFICANDOSE',payload, { root: true });
    },
    panelHerramientasCambioContraseña({commit}, payload) {
      commit('ACTUALIZANDO_CONTRASENA',payload, { root: true });
    }
}