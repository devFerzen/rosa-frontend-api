import Vue from 'vue'
import Vuex from 'vuex'
import * as usuario from '@/store/modules/usuario'
import * as anuncio from '@/store/modules/anuncio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuario,
    anuncio
  },
  state: {
    iniciandoSesion: false,
    registrandose: false
  },
  mutations: {
    REGISTRANDOSE(state,payload) {
      state.registrandose = payload;
      state.iniciandoSesion = false;
    },
    INICIANDO_SESION(state,payload) {
      state.iniciandoSesion = payload;
      state.registrandose = false;
    }
  },
  actions: {
    activandoRegistro({commit}, payload) {
      commit('REGISTRANDOSE',payload);
    },
    activandoInicioSesion({commit}, payload) {
      commit('INICIANDO_SESION',payload);
    }
  },
  getters: {}
});
