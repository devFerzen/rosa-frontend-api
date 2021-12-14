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
import { seteandoToken } from '../utilities/generalUse';
import ErrorResult from '../utilities/ErrorResult';
import { mapGetters } from 'vuex';


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
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.INICIANDO_SESION_MUTATE,
                        variables: {
                            correo: payload.usuario,
                            contrasena: payload.contrasena
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);
                seteandoToken();
                resolve(MutateResult.data.inicioSesion);
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
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.REGISTRO_MUTATE,
                        variables: {
                            input: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.mensaje;
                        this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);

                seteandoToken();
                resolve(MutateResult.data.registroUsuario);
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
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.SOLICITAR_RESTABLECER_CONTRASENA,
                        variables: {
                            usuario: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.mensaje;
                        this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);
                resolve(MutateResult.data.solicitarRestablecerContrasena);
            });
        },












        /**
         * mixinVerificacionUsuarioComparacion; Comprar el codigo de verificacion de usuario
         * @param {*} payload Objecto que representa input a comprar y el correo del usuario
         * @returns 
         */
        mixinVerificacionUsuarioComparacion(payload) {
            return new Promise(async(resolve, reject) => {
                let mutateResult;
                this.cleanMixinResult();

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.VERIFICACIONUSUARIO_COMPARAR_MUTATE,
                        variables: {
                            input: payload.input,
                            usuario: payload.usuario,
                            clean: payload.clean
                        }
                    })
                } catch (error) {
                    console.log('Mutation call error...');
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }

                this.MixinResult.pagina = 'home';
                this.MixinResult.mensaje = mutateResult.data.compararVerificacionUsuario;
                resolve(this.MixinResult);
            });
        },
        /**
         * mixinNuevoCorreoContactanos; Guarda los comentarios dados por el usuario
         * @param {*} payload Objecto que representa input...
         * @returns 
         */
        mixinNuevoCorreoContactanos(payload) {
            return new Promise(async(resolve, reject) => {
                let mutateResult;
                this.cleanMixinResult();
                console.log("mixinNuevoCorreoContactanos...");

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.NUEVO_CORREO_CONTACTANOS,
                        variables: {
                            input: payload
                        }
                    })
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }

                this.MixinResult.pagina = 'home';
                this.MixinResult.componenteInterno = 'panelHerramientasBusqueda';
                this.MixinResult.mensaje = mutateResult.data.nuevoContactoCliente;
                resolve(this.MixinResult);
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
                let mutateResult;

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.ME_ENCANTA_MUTATE,
                        variables: {
                            idAnuncio: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }
                console.dir(mutateResult);
                resolve(mutateResult);
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
                let mutateResult;

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.VER_MUTATE,
                        variables: {
                            idAnuncio: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }
                console.dir(mutateResult);

                resolve(mutateResult);
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
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }

                this.MixinResult.pagina = 'home';
                this.MixinResult.componenteInterno = 'panelHerramientasInicioSesion';
                this.MixinResult.mensaje = MutateResult.data.restablecerContrasena;
                resolve(this.MixinResult);
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
                let queryResult;

                try {
                    queryResult = await this.$apollo.query({
                        query: GraphqlCalls.ANUNCIO_BYID_QUERY,
                        variables: {
                            ids: payload
                        }
                    });
                } catch (error) {
                    console.log('Sesion ver call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
                }
                console.dir(queryResult);
                this.mixinVerPlus(payload);
                resolve(queryResult);

            });
        },

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
                //console.dir(QueryResult);
                resolve(QueryResult);
            });
        },

        mixinDdlGeneral(categoriasDdls) {
            return new Promise(async(resolve, reject) => {
                //console.log("mixinDdlGeneral... ",categoriasDdls);

                let QueryResult;

                try {
                    QueryResult = await this.$apollo.query({
                        query: GraphqlCalls.GET_DDL_BYCATEGORIA,
                        variables: {
                            categorias: [categoriasDdls]
                        }
                    })
                } catch (error) {
                    return reject();
                }

                //console.dir(QueryResult);
                resolve(QueryResult);
            });
        },

        /**
         * mixinLlamadaRouter: Manda a otra ruta agrega props en caso de haber y hace dispatch para componentes internos .
         * @param {*} payload Es el Objeto MixinResult 
         * @returns 
         */
        mixinLlamadaRouter(payload) {

            console.log("mixinLlamadaRouter");
            console.dir(payload);
            let valorPayload;
            let params = {};
            let componentesInternos;

            //Crear arreglo de objetos

            if (payload.componenteInterno) {
                for(let componenteInterno in payload.componenteInterno){
                    this.$store.dispatch(componenteInterno, payload.componenteInterno[componenteInterno]);
                    break;
                }                 
            }

            if (!payload.pagina) {
                return;
            }

            this.$router.push({ name: payload.pagina }).catch(error => {
                //this.$router.push({ name: 'no-encontrado' });
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