export const state = {
}

export const mutations = {
  NUEVO_ANUNCIO(rootState, payload) {
    rootState.usuario.usuario.anunciosUsuario = payload;
  }
}

export const actions = {
  creandoAnuncio({commit, rootState}, payload) {
    return new Promise((resolve, reject) => {
      console.log("creandoAnuncio... payload");
      console.dir(payload);

      if(rootState.usuario.token){

        if(payload == null){
          return resolve({
            mensaje: 'Dirigirlo a dashboard con la ventana de edición abierta!',
            sendTo: 'dashboard'
          });
        }

        console.log(`payload creandoAnuncio: ${payload}`);
        commit('NUEVO_ANUNCIO',payload);
        resolve();
      }
      // Falta Asegurarse que este en home
      commit('REGISTRANDOSE', true);
      return reject({
        mensaje: 'Usuario debe que estar logeado',
        sendTo: 'registro'
      });
    });
  }
}

export const getters = {};
