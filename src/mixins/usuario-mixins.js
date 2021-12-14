/**
 * Descripción: Mixins exclusivas para un usuario registrado
 */

import * as GraphqlUserCalls from '../graphql/usuario-mutations';
import * as GraphqlAnuncioCalls from '../graphql/anuncio-mutations';
import ErrorResult from '../utilities/ErrorResult';


export default {
    methods: {

        /**
         * mixinContrasenaActualizar
         * @param {*} payload Objecto que representa contraseña vieja y nueva
         * @returns 
         */
        mixinContrasenaActualizar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                this.cleanMixinResult();

                console.log("mixinContrasenaActualizar...");
                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlUserCalls.ACTUALIZAR_CONTRASENA_MUTATE,
                        variables: {
                            contrasenaVieja: payload.contrasenaVieja,
                            contrasenaNueva: payload.contrasenaNueva,
                        }
                    })
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
                console.log("MutateResult");
                console.dir(MutateResult);

                resolve(MutateResult.data.compararVerificacionCelular);
            });
        },

        /**
         * mixinVerificacionCelularComparacion: En cualquier error la vista solo imprime el mensaje
         * @param {*} payload Objecto que representa input a comprar y el id del usuario
         * @returns 
         */
        mixinVerificacionCelularComparacion(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinVerificacionCelularComparacion...");
                this.cleanMixinResult();

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlUserCalls.VERIFICACIONCELULAR_COMPARAR_MUTATE,
                        variables: {
                            input: payload.input
                        }
                    })
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

                resolve(MutateResult.data.compararVerificacionCelular);
            });
        },

        mixinVerificacionCelularCreacion(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                this.cleanMixinResult();

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.VERIFICACIONCELULAR_CREACION
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

                resolve(JSON.parse(MutateResult.data.solicitarVerificacionCelular));
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