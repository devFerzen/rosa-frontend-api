/**
 * Descripción: Son funciones que retornan una promesa para tenerlas en try catch
 * quizás aquí habrá que llamar una clase Error donde por medio del nombre de error que devuelva
 * este sabra que ponerle al usuario ya que allá estará la llamada de activación de la alerta.
 * 
 * Estas llamadas no necesitarán de pedir permiso antes de llamar, checarán si el local storage
 * contiene token si no el mismo manda a cambiar de ventana
 */

import * as GraphqlCalls from '../graphql/general-mutations';
import * as GraphqlUsuarioCalls from '../graphql/usuario-mutations';
import ErrorResult from '../utilities/ErrorResult';
import { mapGetters } from 'vuex';
import * as GeneralTestMixin from './Test/generalTest-mixin';

export default {
    computed: {
        ...mapGetters["getDdlEstados"]
    },
    data() {
        return {
            MixinResult: {
                pagina: null,
                componenteInterno: {},
                mensaje: '',
                data: null
            }
        }
    },
    methods: {
        /**
         * Mixin Para poder iniciar sesion a un usuario con correo y contraseña
         * @param {*} payload Objecto que representa un correo y contraseña
         * @returns 
         */
        mixinInicioSesion(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinInicioSesion...");
                let MutateResult;
                this.cleanMixinResult();

                
                try {
                    if(true){
                        MutateResult = await GeneralTestMixin.mixinInicioSesion(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.INICIANDO_SESION_MUTATE,
                        variables: {
                            correo: payload.usuario,
                            contrasena: payload.contrasena
                        }
                    });
                } catch (error) {
                    console.log(`Mutation error... ${typeof error}`);
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if(error.graphQLErrors.length > 0){
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        }
                    } else {
                        if(typeof error === 'string'){
                            this.MixinResult = new ErrorResult(JSON.parse(error));
                        } else{
                            this.MixinResult = new ErrorResult(error);
                        }
                    }
                    return reject(this.MixinResult);
                }
                
                console.dir(MutateResult);
                resolve(JSON.parse(MutateResult.data.inicioSesion));
            });
        },

        /**
         * Mixin Para poder cerrar sesion a un usuario con correo y contraseña
         * @param {*} payload Objecto que representa un correo y contraseña
         * @returns 
         */
        mixinCerrarSesion(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log(`Mixin Cerrar Sesion`);

                try {
                    if(true){
                        MutateResult = await GeneralTestMixin.mixinCerrarSesion(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                            mutation: GraphqlCalls.CERRAR_SESION_MUTATE,
                            variables: {}
                        });
                } catch (error) {
                    console.log('Mutation call error...');
                    console.dir(error);
    
                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    } else {
                        this.MixinResult = new ErrorResult(error);
                    }
                    return reject(this.MixinResult);
                }



                console.dir(MutateResult);
                this.$store.dispatch('cerrarSesion');
                resolve(JSON.parse(MutateResult.data.cerrarSesion));
            });
        }, 

        /**
         * Mixin Para poder registrarte con tu correo, contraseña y número telefónico
         * @param {*} payload Objecto que representa un correo, contraseña y número telefónico
         * @returns 
         */
        mixinRegistro(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinRegistro...");
                let MutateResult;
                this.cleanMixinResult();

                try {

                    if(true){
                        MutateResult = await GeneralTestMixin.mixinRegistro(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.REGISTRO_MUTATE,
                        variables: {
                            input: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            //Error global de Graphql
                            let _mensaje = JSON.parse(error.graphQLErrors[0].message);
                            this.MixinResult = new ErrorResult({componenteInterno: {'activationAlert':{ type: 'error', message: `${_mensaje.mensaje}`}}});
                        } 
                    }else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);

                resolve(JSON.parse(MutateResult.data.registroUsuario));
            });
        },

        /**
         * mixinSolicitarRestablecerContrasena: Solicita codigo de verificación de usuario en el cuál este será enviado al correo del usuario
         * @param {*} payload correo usuario registrado
         * @returns 
         */
        mixinSolicitarRestablecerContrasena(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinSolicitarRestablecerContrasena...");
                let MutateResult;
                this.cleanMixinResult();

                try {

                    if(true){
                        MutateResult = await GeneralTestMixin.mixinSolicitarRestablecerContrasena(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.SOLICITAR_RESTABLECER_CONTRASENA,
                        variables: {
                            usuario: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult.mensaje = error.mensaje;
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    }else {
                        this.MixinResult = new ErrorResult(error);
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);
                resolve(JSON.parse(MutateResult.data.solicitarRestablecerContrasena));
            });
        },

        /**
         * mixinMeEncantaPlus aumenta 1 el conteo de likes del anuncio
         * @param {*} payload idAnuncio
         * @returns 
         */
        mixinMeEncantaPlus(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinMeEncantaPlus...");
                let MutateResult;

                try {
                    if(true){
                        MutateResult = await GeneralTestMixin.mixinMeEncantaPlus(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.ME_ENCANTA_MUTATE,
                        variables: {
                            idAnuncio: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                            
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    }else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }

                resolve(JSON.parse(MutateResult.data.anunciolike));
            });
        },

        /**
         * mixinVerPlus aumenta 1 el conteo de vistas del anuncio
         * @param {*} payload idAnuncio
         * @returns 
         */
        mixinVerPlus(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinVerPlus...");
                let MutateResult;

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.VER_MUTATE,
                        variables: {
                            idAnuncio: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);
                resolve(JSON.parse(MutateResult.data.anuncioVista));
            });
        },

        /**
         * MixinVer extrae un anuncio en particular y aumenta su conteo de vistas.
         * @param {*} payload idAnuncio
         * @returns 
         */
        mixinVer(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinVer...");
                let QueryResult;

                try {
                    if(true){
                        QueryResult = await GeneralTestMixin.mixinVer(payload);
                        return resolve(JSON.parse(QueryResult));
                    }

                    QueryResult = await this.$apollo.query({
                        query: GraphqlCalls.ANUNCIO_BYID_QUERY,
                        variables: {
                            ids: payload
                        }
                    });
                } catch (error) {
                    console.log('Sesion ver call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    return reject({ mensaje: `sin éxito!` });
                }

                console.dir(QueryResult);
                this.mixinVerPlus(payload);
                resolve(QueryResult.data.queryAnunciosById);
            });
        },

        /**
         * mixinVerificacionUsuarioComparacion; Comprar el codigo de verificacion de usuario
         * @param {*} payload Objecto que representa input a comprar y el correo del usuario
         * @returns 
         */
        mixinVerificacionUsuarioComparacion(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult, validandoUsuarioTKN;
                this.cleanMixinResult();

                //No lo creaba
                validandoUsuarioTKN = await this.$store.dispatch('validandoUsuario');
                console.log(`payload input  ${payload.input}`);

                try {
                    if(true){
                        MutateResult = await GeneralTestMixin.mixinVerificacionUsuarioComparacion(payload);
                        return resolve(JSON.parse(MutateResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.VERIFICACIONUSUARIO_COMPARAR_MUTATE,
                        variables: {
                            input: payload.input,
                            usuario: payload.usuario,
                            clean: payload.clean
                        }
                    })
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }

                // Ocupa enviarlo a home pagina = 'home';
                resolve(JSON.parse(MutateResult.data.compararVerificacionUsuario));
            });
        },

        /**
         * mixinNuevoCorreoContactanos; Guarda los comentarios dados por el usuario
         * @param {*} payload Objecto que representa input...
         * @returns 
         */
        mixinNuevoCorreoContactanos(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                this.cleanMixinResult();
                console.log("mixinNuevoCorreoContactanos...");

                try {
                    if(true){
                        QueryResult = await GeneralTestMixin.mixinNuevoCorreoContactanos(categoriasDdls);
                        return resolve(JSON.parse(QueryResult));
                    }

                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.NUEVO_CORREO_CONTACTANOS,
                        variables: {
                            input: payload
                        }
                    })
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    }else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }

                resolve(JSON.parse(MutateResult.data.nuevoContactoCliente));
            });
        },

        /**
         * mixinRestablecerContrasena
         * @param {*} payload correo usuario registrado
         * @returns 
         */
        mixinRestablecerContrasena(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinRestablecerContrasena...");
                console.dir(payload);
                let MutateResult;
                this.cleanMixinResult();

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.RESTABLECER_CONTRASENA,
                        variables: {
                            input: payload.input,
                            usuario: payload.usuario,
                            contrasena: payload.contrasena
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.hasOwnProperty('graphQLErrors')) {
                        if (error.graphQLErrors.length > 0) {
                            this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                        } 
                    }else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }

                resolve(JSON.parse(MutateResult.data.restablecerContrasena));
            });
        },

        //Sin Limpia los de abajo

        /**
         * mixinBusqueda extrae un número de anuncios bajo algún query en especial.
         * @param {*} payload idAnuncio
         * @returns 
         */
        mixinBusqueda(payload = {}) {
            return new Promise(async(resolve, reject) => {
                //console.log("mixinBusqueda...");
                let QueryResult;

                try {

                    if(true){
                        QueryResult = await GeneralTestMixin.mixinBusqueda(payload);
                        const _QueryResult = JSON.parse(QueryResult);

                        return resolve(_QueryResult);
                    }

                    QueryResult = await this.$apollo.query({
                        query: GraphqlCalls.ANUNCIOS_QUERY,
                        variables: {
                            query: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
                }
                resolve(QueryResult.data.queryAnuncios);
            });
        },

        mixinDdlGeneral(categoriasDdls) {
            return new Promise(async(resolve, reject) => {
                console.log(`mixinDdlGeneral... ${typeof categoriasDdls}`);

                let QueryResult;

                try {
                    if(true){
                        QueryResult = await GeneralTestMixin.mixinDdlGeneral(categoriasDdls);
                        return resolve(JSON.parse(QueryResult));
                    }

                    QueryResult = await this.$apollo.query({
                        query: GraphqlCalls.DDL_BYCATEGORIA_QUERY,
                        variables: {
                            categorias: [categoriasDdls]
                        }
                    })
                } catch (error) {
                    console.dir(error);
                    return reject();
                }

                resolve(QueryResult);
            });
        },

        /**
         * mixinLlamadaRouter: Manda a otra ruta agrega props en caso de haber y hace dispatch para componentes internos .
         * @param {*} payload Es el Objeto MixinResult 
         * @returns 
         */
        mixinLlamadaRouter(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinLlamadaRouter");

                if ('pagina' in payload) {
                    console.log(`Haciendo push a ${payload.pagina}`);
                    this.$router.push({ name: payload.pagina }).catch(error => {
                        //this.$router.push({ name: 'no-encontrado' });
                    });
                }

                //Crear arreglo de objetos
                if (payload.componenteInterno) {
                    for (let componenteInterno in payload.componenteInterno) {
                        console.log(`Haciendo dispatch a ${componenteInterno} con ${payload.componenteInterno[componenteInterno]}`);
                        await this.$store.dispatch(componenteInterno, payload.componenteInterno[componenteInterno]);
                    }
                }                
            });
        },

        cleanMixinResult() {
            this.MixinResult.pagina = null;
            this.MixinResult.componenteInterno = null;
            this.MixinResult.mensaje = '';
            this.MixinResult.data = null;
        }
    }
}