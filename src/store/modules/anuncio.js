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

      if(rootState.usuario.usuario){
        if(payload == null){
          commit('REGISTRANDOSE', true);
          return reject({
            mensaje: 'Usuario dirigiendose a creación de un anuncio',
            activeTo: 'creacionAnuncio'
          });
        }
        console.log(`payload creandoAnuncio: ${payload}`);
        //LLamada de api para creacion nuevo anuncio
        commit('NUEVO_ANUNCIO',payload);
        resolve();
      }
      // Falta Asegurarse que este en home
      commit('REGISTRANDOSE', true);
      return reject({
        mensaje: 'Usuario debe que estar logeado',
        activeTo: 'registro'
      });
    });
  }
}

export const getters = {};
