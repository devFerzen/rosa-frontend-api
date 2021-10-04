

export const state = {
  usuario: {
      "usuario": "",
      "numero_telefonico_verificado": false,
      "token": "",
      "verificacionUsuario": ""
  },
}

export const mutations = {
  USUARIO_SET(state, payload) {
    //Verificar si aquí saber su ip? y así agregarlo por default
    state.usuario = payload
  },
  USUARIO_OFFSET(state) {
    state.usuario = null;
  },
  CORREO_SET(state, payload){
    state.usuario.usuario = payload
  },
  CORREO_SET(state, payload){
    state.usuario.usuario = payload
  },
  VERIFICACION_USUARIO_SET(state, payload){
    state.usuario.verificacionUsuario = payload
  }
}

export const actions = {
  
}

export const getters = {
  anunciosUsuario: state => {
    return state.usuario.anuncios_usuario;
  },
  idUsuario: state => {
    return state.usuario.id;
  }
}

