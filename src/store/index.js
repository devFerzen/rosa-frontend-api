import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios' //quitar axios

import * as usuario from '@/store/modules/usuario'
import * as anuncio from '@/store/modules/anuncio'
import * as alert from '@/store/modules/alert'
import * as panelHerramientas from '@/store/modules/panelHerramientas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuario,
    anuncio,
    alert,
    panelHerramientas
  },
  state: {
    inicioSesionView: false,
    registrandose: false,
    contactandose: false    
  },
  mutations: {
    REGISTRANDOSE(state,payload) {
      state.registrandose = payload;
      state.inicioSesionView = false;
      state.contactandose= false
    },
    INICIANDO_SESION(state,payload) {
      state.registrandose = false;
      state.inicioSesionView = payload;
      state.contactandose= false
    },
    CONTACTANDOSE(state, payload) {
      state.inicioSesionView = false;
      state.registrandose = false;
      state.contactandose= payload;
    }
  },
  actions: {
    enviandoCorreo({commit}, payload) {
        return new Promise((resolve, reject) =>{
            resolve({
                mensaje: 'Correo enviado correctamente!'
            });
        })
    },
    registro({commit}, payload) {
        commit('USUARIO_SET', payload, { root: true });
    },
    /**
     * Setea en el vuex la información del usuario.
     * @param {*} commit 
     * @param {*} payload Es el state de usuario. 
     */
    inicioSesion({commit}, payload) {
        commit('USUARIO_SET', payload, { root: true });
    },
    cerrandoSesion({state, commit}, payload){
        commit('USUARIO_OFFSET', payload, { root: true });
    }
  },
  getters: {
    anunciosBusqueda: state => {
      return state.anunciosBusqueda;
    }
  }
});
