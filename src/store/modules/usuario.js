//import { apolloClient } from 'apollo-boost';
//import ApolloClient from 'apollo-client' //AFSS: Creo que esta importación es la unica que puede

import apolloProvider from '../../utilities/apollo';
import * as GraphQLUserCalls from '../../graphql/usuario-mutations';
import Cookies from 'js-cookie'

export const state = {
    usuario: {
        "usuario": '',
        "numero_telefonico_verificado": false,
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
        state.usuario = '';
        state.anuncios_usuario = new Array();
    },
    CORREO_SET(state, payload) {
        state.usuario.usuario = payload;
    },
    USUARIO_RESET(state){
        state.usuario = {
            "usuario": '',
            "numero_telefonico_verificado": false,
            "verificacionUsuario": "",
            "anuncios_usuario": new Array()
        }
    },
    CODIGO_VERIFICACION_SET(state, payload) {
        state.usuario.verificacionUsuario = payload;
    },
    VERIFICACION_USUARIO_SET(state, payload) {
        state.usuario.verificacionUsuario = payload;
    },
    CARGA_ANUNCIOS_USUARIO(state, payload = []) {
        state.usuario.anuncios_usuario = payload;
    },
    CARGA_CONTACTOS_USUARIO(state, payload) {
        state.usuario.Default_Contactos = payload;
    },
    CARGA_NUEVO_ANUNCIO(state, payload) {
        state.usuario.anuncios_usuario.splice(0,1,payload);
    },
    ELIMINAR_NUEVO_ANUNCIOVACIO(state, payload) {
        state.usuario.anuncios_usuario.shift();
    },
    CARGA_NUEVO_ANUNCIOVACIO(state, payload) {
        payload = {
            categorias: [],
            permisos: ["Descripcion", "Contacto", "Tarifas"],
            Sec_Descripcion: {
                titulo: '',
                estado: '',
                ciudad: '',
                descripcion: '',
                sexo: 0
            },
            Sec_Imagenes: [],
            Sec_Contacto: [],
            Sec_Tarifas: [],
            _anuncioEdicionInputsView: true
        };

        state.usuario.anuncios_usuario.unshift(payload);
    },
    NUMERO_TELEFONO_VERIFICADO(state) {
        state.usuario.numero_telefonico_verificado = true;
    }
}

export const actions = {
    eliminarEnAnunciosUsuario({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            let newArray = state.usuario.anuncios_usuario.filter((value, index) => {
                if (value._id !== payload) {
                    return value;
                }
            });

            commit('CARGA_ANUNCIOS_USUARIO', newArray);
            resolve();
        });
    },
    agregarEnAnunciosUsuario({ commit, state }, payload) {
        commit('CARGA_NUEVO_ANUNCIO', payload);
    },
    anuncioEditado({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            console.log("anuncioEditado");
            console.dir(payload);
            console.dir(state.usuario.anuncios_usuario);
            let newArray = state.usuario.anuncios_usuario.map(function(value) {
                if (value._id === payload.id) {
                    payload._id = payload.id;
                    return payload;
                }
                return value;
            });

            commit('CARGA_ANUNCIOS_USUARIO', newArray);
            resolve();
        });
    },
    contactoDefaultEditado({commit, state}, payload){
        console.log(`payload`);
        console.dir(payload);
        commit('CARGA_CONTACTOS_USUARIO', payload);
    },
    anuncioUsuarioById({state}, payload){
        return state.usuario.anuncios_usuario.filter(function(Anuncio){
            let _compareAnuncioId;
            if(Anuncio.hasOwnProperty("_id")){
                _compareAnuncioId = Anuncio._id;
            } else{
                _compareAnuncioId = Anuncio.id;
            }

            if(_compareAnuncioId === payload){
                return Anuncio;
            }
        })
    },
    numerotelefonicoUsuario({ commit, state }, payload) {
        commit('NUMERO_TELEFONO_VERIFICADO', payload);
    },
    cerrarSesion({commit, state}, payload){
        commit('USUARIO_OFFSET', {});
    },
    validandoUsuario({commit}, payload){
        const token = Cookies.get('auth-token');
        if (!token) {
            return false;
        }

        return token;
    },
    async usuarioIdentificacion({ commit, state }, payload) {
        let AccionResult;

        const token = Cookies.get('refresh-token');
        if (!token) {
            //commit y pasar nulo a usuario
            console.log("si hay usuario pero no token");
            await commit('USUARIO_RESET');
            return;
        }

        /*
            Aqui se debe de dar el token para que lo busque... se debe de cambiar la posicion de la llamada
        */
        //Hacer en mixin mejor y que lo llame en created y eso llame a los vuex.
        try {
            /*if(true){
                return state.usuario.usuario;
            }*/

            AccionResult = await apolloProvider.defaultClient.query({
                query: GraphQLUserCalls.USUARIO_QUERY,
                variables: {
                    input: ''
                }
            });
        } catch (error) {
            console.table(error);
            return;
        }

        //Seteo de usuario y anuncios usuario
        console.log("seteando usuario");
        await commit('USUARIO_SET', AccionResult.data.queryUsuario);
    }
}

export const getters = {
    anunciosUsuario: state => {
        return state.usuario.anuncios_usuario;
    },
    usuarioLoggeado: state => {
        return !!state.usuario.usuario;
    },
    Usuario: state => {
        return state.usuario;
    }
}