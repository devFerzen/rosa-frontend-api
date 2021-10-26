export const state = {
    usuario: {
        "usuario": "",
        "numero_telefonico_verificado": false,
        "token": "",
        "verificacionUsuario": "",
        "anuncios_usuario": []
    },
}

export const mutations = {
    USUARIO_SET(state, payload) {
        //Verificar si aquí saber su ip? y así agregarlo por default
        state.usuario = payload;
    },
    USUARIO_OFFSET(state) {
        state.usuario = null;
    },
    CORREO_SET(state, payload) {
        state.usuario.usuario = payload;
    },
    CODIGO_VERIFICACION_SET(state,payload){
        state.usuario.verificacionUsuario = payload;
    },
    VERIFICACION_USUARIO_SET(state, payload) {
        state.usuario.verificacionUsuario = payload;
    },
    CARGA_ANUNCIOS_USUARIO(state, payload) {
        state.usuario.anuncios_usuario = payload;
    },
    CARGA_NUEVO_ANUNCIO(state, payload){
        state.usuario.anuncios_usuario.push(payload);
    }
}

export const actions = {
    anuncioEliminar({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            let newArray = state.usuario.anuncios_usuario.filter((value, index) => {
                if (value.id !== payload) {
                    return value;
                }
            });
            commit('CARGA_ANUNCIOS_USUARIO', newArray);
            resolve();
        });
    },
    anuncioAgregarNuevo({ commit, state}, payload){
        commit('CARGA_NUEVO_ANUNCIO', payload);
    }
}

export const getters = {
    anunciosUsuario: state => {
        return state.usuario.anuncios_usuario;
    },
    idUsuario: state => {
        return state.usuario.id;
    }
}