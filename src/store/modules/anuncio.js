export const state = {
    dashboardEditAnuncioDisplay: null
}

export const mutations = {
    EDIT_ANUNCIO_DISPLAY(state, payload) {
        state.dashboardEditAnuncioDisplay = payload;
    }
}

export const actions = {
    //Este falta renombar parece la llamada para abrir el modal de edicion...
    crearAnuncioDisplay({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("action crearAnuncioDisplay...");
            console.dir(payload);

            //Veriricar si hay usuario disponible
            if (!rootState.usuario.usuario.usuario && !rootState.usuario.usuario.token) {
                reject({ pagina: "home", componenteInterno: "panelHerramientasInicioSesion", mensaje: "Favor de Iniciar sesion o pasar a Registrarse!" });
                return;
            }

            if (!rootState.usuario.usuario.numero_telefonico_verificado) {
              //Indicar el tipo de veritifacion y enviarlo ahí como no son estay alive si vuelve picarle a anunciate este vuelve a solicitar un codigo de verificación
              commit('TIPO_VERIFICACION_SET', 'verificacionCelular')
              return reject({ pagina: "home", componenteInterno: "panelHerramientasVerificacion", mensaje: "Favor de verificar el número de celular de la cuenta!" });
            }

            //Apertura de nuevo anuncio
            resolve({ pagina: "dashboard", componenteInterno: "editAnuncioDisplay", mensaje: "" });
        });
    },

    editAnuncioDisplay({ commit, state }, payload) {
        commit('EDIT_ANUNCIO_DISPLAY', payload);
    }
}

export const getters = {};