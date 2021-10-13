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


export default {
    data() {
        return {
            MixinResult: {
                pagina: null,
                componenteInterno: null,
                mensaje: '',
                data: null,
                Props: {}
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
                let mutateResult;

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.INICIANDO_SESION_MUTATE,
                        variables: {
                            correo: payload.usuario,
                            contrasena: payload.contrasena
                        }
                    });
                } catch (error) {
                    console.log('Sesion call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados -- ${error.networkError.name == "ServerError"}
                    //afss duda, todo graphqlError es así, siempre sale uno???
                    this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    return reject(this.MixinResult);
                }
                seteandoToken(mutateResult.data.inicioSesion.token);
                this.MixinResult.pagina = 'dashboard';
                this.MixinResult.mensaje = 'Bienvenido...!';
                this.MixinResult.data = mutateResult.data.inicioSesion;

                resolve(this.MixinResult);
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
                let mutateResult;
                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.REGISTRO_MUTATE,
                        variables: {
                            input: payload
                        }
                    });
                } catch (error) {
                    console.log('Sesion call error...')
                    this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    return reject(this.MixinResult);
                }
                console.dir(mutateResult);

                seteandoToken(mutateResult.data.registroUsuario.token);
                this.MixinResult.pagina = 'dashboard';
                this.MixinResult.mensaje = 'Bienvenido...!';
                this.MixinResult.data = mutateResult.data.registroUsuario;
                resolve(this.MixinResult);
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

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.SOLICITAR_RESTABLECER_CONTRASENA,
                        variables: {
                            usuario: payload
                        }
                    });
                } catch (error) {
                    console.log('Sesion verPlus call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    return reject(this.MixinResult);
                }
                console.dir(MutateResult);

                this.MixinResult.pagina = 'home';
                this.MixinResult.componenteInterno = 'panelHerramientasVerificacion';
                this.MixinResult.mensaje = MutateResult.data.solicitarRestablecerContrasena;
                this.$store.dispatch('setTipoVerificacion', 'verificacionUsuario');
                resolve(this.MixinResult);
            });
        },
        /**
         * compararVerificacionUsuario; Comprar el codigo de verificacion de usuario
         * @param {*} payload Objecto que representa input a comprar y el correo del usuario
         * @returns 
         */
        async mixinCompararVerificacionUsuario(payload) {
            return new Promise(async(resolve, reject) => {
                let mutateResult;
                console.log("compararVerificacionUsuario...");
                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.VERIFICACIONUSUARIO_COMPARAR_MUTATE,
                        variables: {
                            input: payload.input,
                            usuario: payload.usuario
                        }
                    })
                } catch (error) {
                    console.log('Sesion call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    return reject(this.MixinResult);
                }

                this.MixinResult.pagina = 'home';
                this.MixinResult.componenteInterno = 'panelHerramientasCambioContraseña';
                this.MixinResult.mensaje = mutateResult.data.compararVerificacionUsuario;
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
                    console.log('Sesion call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
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
                    console.log('Sesion verPlus call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
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
                let mutateResult;

                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.RESTABLECER_CONTRASENA,
                        variables: {
                            input: payload.input,
                            usuario: payload.usuario,
                            contrasena: payload.contrasena
                        }
                    });
                } catch (error) {
                    console.log('Sesion mixinRestablecerContrasena call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
                }
                console.dir(mutateResult);
                resolve(mutateResult);
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
                        query: GraphqlCalls.VER_QUERY,
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
        mixinBusqueda(payload) {
            return new Promise(async(resolve, reject) => {
                console.log("mixinBusqueda...");
                let queryResult;

                try {
                    queryResult = await this.$apollo.query({
                        query: GraphqlCalls.BUSQUEDA_QUERY,
                        variables: {
                            query: {}
                        }
                    });
                } catch (error) {
                    console.log('Sesion call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    return reject({ mensaje: `sin éxito!` });
                }
                console.dir(queryResult);
                resolve(queryResult);
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

            //mandar a una pagina en especial y si ya esta ahí, hacerlo sin pasar error
            if (payload.componenteInterno != undefined) {
                valorPayload = payload.componenteInterno === "editAnuncioDisplay" ? '000' : true;
                this.$store.dispatch(payload.componenteInterno, valorPayload);
            }

            this.$router.push({ name: payload.pagina }).catch(error => {});
        }
    }
}