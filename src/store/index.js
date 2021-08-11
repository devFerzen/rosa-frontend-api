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
    registrandose: false,
    contactandonos: false
  },
  mutations: {
    REGISTRANDOSE(state,payload) {
      state.registrandose = payload;
      state.iniciandoSesion = false;
      state.contactandonos= false
    },
    INICIANDO_SESION(state,payload) {
      state.registrandose = false;
      state.iniciandoSesion = payload;
      state.contactandonos= false
    },
    CONTACTANDONOS(state, payload) {
      state.iniciandoSesion = false;
      state.registrandose = false;
      state.contactandonos= payload;
    }
  },
  actions: {
    activandoRegistro({commit}, payload) {
      commit('REGISTRANDOSE',payload);
    },
    activandoInicioSesion({commit}, payload) {
      commit('INICIANDO_SESION',payload);
    },
    contactandonos({commit}, payload) {
      commit('CONTACTANDONOS',payload);
    }
  },
  getters: {}
});
