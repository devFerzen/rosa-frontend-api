import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const state = {
  usuario: {},
  token: null
}

export const mutations = {
  USUARIO_SET(state, payload) {
    payload.estatus = true;
    payload.anunciosUsuario = [];

    //Verificar si aquí saber su ip? y así agregarlo por default
    state.usuario = payload
  },
  USUARIO_OFFSET(state, payload) {
    state.usuario = null;
  },
  TOKEN_SET(state, payload){
    state.token = payload;
  },
  TOKEN_OFFSET(state, payload){
    state.token = null;
  },
  NUEVO_ANUNCIO_ADD(state, payload){
    //aqui hacer la llamada al api para crear un anuncio y luego
    //ya pusharlo al su state para no adquirirlo de nuevo
    state.usuario.anunciosUsuario.push(payload);
  }
}

export const actions = {
  registrandoUsuario({commit}, payload) {
    return new Promise((resolve, reject) => {
      console.log("registrandoUsuario action...");
      apiClient.post('/register', payload)
      .then((result) => {
        console.log("result>>>");
        console.log(result);
        if(result.data){
          commit('TOKEN_SET',result.data.token);
          commit('USUARIO_SET',result.data.usuario);
          return resolve(result);
        }
        // Mandar notificacion de éxito
      })
      .catch((error) => {
        // Mandar notificacion de error
        console.log("error axios registrandoUsuario");
        console.dir(error);
        return reject({error, mensaje: 'Error al crear el usuario!, Favor de intentar más tarde'});
      });
    });
  },
  inicioSesionUsuario({commit}, payload) {
    return new Promise((resolve, reject) => {
      console.log("inicioSesionUsuario action...");
      apiClient.post('/loggear', payload)
      .then((result) => {
        if(result.data){
          commit('TOKEN_SET',result.data.token);
          commit('USUARIO_SET',result.data.usuario);
          return resolve(result);
        }
      })
      .catch((e) => {
        console.log("e axios inicioSesionUsuario");
        console.dir(e);
        return reject({e, mensaje: `${e.error.mensaje}, Favor de intentar más tarde`});
      });
    });
    //Llamada al api para pasar la setear un usuario
    commit('USUARIO_SET', payload);
  },
  quitandoUsuario({state, commit}, payload){
    commit('USUARIO_OFFSET', payload);
  },

}
