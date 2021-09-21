export const state = {
    anunciosBusqueda: []
}

export const mutations = {
  ANUNCIOS_BUSQUEDA_SET(state,payload){
    state.anunciosBusqueda = payload;
  }
}
export const actions = {
    registrandoAnunciosBusqueda({commit},payload){
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
    }
}