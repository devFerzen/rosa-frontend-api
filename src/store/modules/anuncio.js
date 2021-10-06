export const state = {
    dashboardEditAnuncioDisplay: null
}

export const mutations = {
    NUEVO_ANUNCIO(rootState, payload) {
        rootState.usuario.usuario.anunciosUsuario = payload;
    },
    EDITANUNCIO_DISPLAY_ACTION(state, payload) {
        state.dashboardEditAnuncioDisplay = payload;
    }
}

export const actions = {
    creandoAnuncio({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("creandoAnuncio... payload");
            console.dir(payload);

            if (rootState.usuario.usuario.token) {
                if (payload == null) {
                    return resolve({
                        mensaje: 'Dirigirlo a dashboard con la ventana de edición abierta!',
                        sendTo: 'dashboard'
                    });
                }

                console.log(`payload creandoAnuncio: ${payload}`);
                //commit('NUEVO_ANUNCIO',payload);
                resolve();
            }
            // Falta Asegurarse que este en home
            commit('REGISTRANDOSE', true);
            return reject({
                mensaje: 'Usuario debe que estar logeado',
                sendTo: 'home'
            });
        });
    },

    dashboardEditAnuncioDisplay({ commit, state }, payload) {
        commit('EDITANUNCIO_DISPLAY_ACTION', payload);
    }
}

export const getters = {};