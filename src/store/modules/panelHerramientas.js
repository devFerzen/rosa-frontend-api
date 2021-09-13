export const actions = {
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