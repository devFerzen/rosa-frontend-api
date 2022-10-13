import Vue from 'vue'
import Vuex from 'vuex'

import * as usuario from '@/store/modules/usuario'
import * as anuncio from '@/store/modules/anuncio'
import * as alert from '@/store/modules/alert'
import * as paquete from "@/store/modules/paquete";
import * as panelHerramientas from '@/store/modules/panelHerramientas'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    usuario,
    anuncio,
    alert,
    paquete,
    panelHerramientas,
  },
  //agregar en un objeto las vistas
  state: {
    busquedaView: true,
    registroView: false,
    inicioSesionView: false,
    contactoView: false,
    verificacionView: false,
    actualizandoContrasenaView: false,
    tipoVerificacion: "",
    Systema: {
      apiMode: "/" //"http://localhost:3080/"
    },
  },
  mutations: {
    BUSQUEDA_VIEW(state, payload) {
      state.busquedaView = payload;
      state.registroView = false;
      state.inicioSesionView = false;
      state.contactoView = false;
      state.verificacionView = false;
      state.actualizandoContrasenaView = false;
    },
    REGISTRO_VIEW(state, payload) {
      state.busquedaView = false;
      state.registroView = payload;
      state.inicioSesionView = false;
      state.contactoView = false;
      state.verificacionView = false;
      state.actualizandoContrasenaView = false;
    },
    INICIANDO_SESION_VIEW(state, payload) {
      state.busquedaView = false;
      state.registroView = false;
      state.inicioSesionView = payload;
      state.contactoView = false;
      state.verificacionView = false;
      state.actualizandoContrasenaView = false;
    },
    CONTACTO_VIEW(state, payload) {
      state.busquedaView = false;
      state.registroView = false;
      state.inicioSesionView = false;
      state.contactoView = payload;
      state.verificacionView = false;
      state.actualizandoContrasenaView = false;
    },
    VERIFICACION_VIEW(state, payload) {
      state.busquedaView = false;
      state.registroView = false;
      state.inicioSesionView = false;
      state.contactoView = false;
      state.verificacionView = payload;
      state.actualizandoContrasenaView = false;
    },
    ACTUALIZANDO_CONTRASENA(state, payload) {
      state.busquedaView = false;
      state.registroView = false;
      state.inicioSesionView = false;
      state.contactoView = false;
      state.verificacionView = false;
      state.actualizandoContrasenaView = payload;
    },
    TIPO_VERIFICACION_SET(state, payload) {
      state.tipoVerificacion = payload;
    },
    TIPO_VERIFICACION_OFFSET(state, payload) {
      state.tipoVerificacion = "";
    },
    API_UPLOADS_SET(state) {
      state.Systema.apiMode = "/api";
    },
  },
  actions: {
    registro({ commit }, payload) {
      commit("USUARIO_SET", payload, { root: true });
    },
    setSesion({ commit }, payload) {
      commit("USUARIO_SET", payload, { root: true });
    },
    cerrandoSesion({ state, commit }, payload) {
      commit("USUARIO_OFFSET", payload, { root: true });
    },
    setCorreo({ state, commit }, payload) {
      commit("CORREO_SET", payload, { root: true });
    },
    setVerificacionUsuario({ state, commit }, payload) {
      commit("VERIFICACION_USUARIO_SET", payload, { root: true });
    },
    setTipoVerificacion({ state, commit }, payload) {
      commit("TIPO_VERIFICACION_SET", payload);
    },
    offsetTipoVerificacion({ state, commit }, payload) {
      commit("TIPO_VERIFICACION_OFFSET", payload);
    },
    SystemaCreate({ state, commit }, payload) {
      console.log(`SystemaCreate en: ${process.env.NODE_ENV}`);
      if (process.env.NODE_ENV === "prod") {
        commit("API_UPLOADS_SET");
      }
    },
  },
});