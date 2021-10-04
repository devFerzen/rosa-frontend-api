/**
 * Descripción: Mixins exclusivas para un usuario registrado
 */

import * as GraphqlUserCalls from '../graphql/usuario-mutations';

export default {
    methods: {

        /**
         * mixinActualizarContrasena
         * @param {*} payload Objecto que representa contraseña vieja y nueva
         * @returns 
         */
        async mixinActualizarContrasena(payload) {
            return new Promise(async(resolve, reject) => {
                let mutateResult;
                console.log("mixinActualizarContrasena...");
                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlUserCalls.ACTUALIZAR_CONTRASENA_MUTATE,
                        variables: {
                            contrasenaVieja: payload.contrasenaVieja,
                            contrasenaNueva: payload.contrasenaNueva,
                        }
                    })
                } catch (error) {
                    console.log('Server error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    //${error.networkError.name == "ServerError"}
                    return reject({ mensaje: `sin éxito!` });
                }
                console.log("mutateResult");
                console.dir(mutateResult);
                resolve(mutateResult);
            });
        },


        /** Refactorizar a que el backend sepa el id del usuario
         * compararVerificacionCelular
         * @param {*} payload Objecto que representa input a comprar y el id del usuario
         * @returns 
         */
        async compararVerificacionCelular(payload) {
            return new Promise(async(resolve, reject) => {
                let mutateResult;
                console.log("compararVerificacionCelular...");
                try {
                    mutateResult = await this.$apollo.mutate({
                        mutation: GraphqlUserCalls.COMPRAR_VERIFICACIONCELULAR_MUTATE,
                        variables: {
                            input: payload.input,
                            id_usuario: payload.id_usuario,
                        }
                    })
                } catch (error) {
                    console.log('Sesion call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    //${error.networkError.name == "ServerError"}
                    return reject({ mensaje: `sin éxito!` });
                }
                resolve(mutateResult);
            });
        },

    }
}