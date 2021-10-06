/**
 * Descripción: Mixins exclusivas para un usuario registrado
 */

import * as GraphqlUserCalls from '../graphql/usuario-mutations';

export default {
    methods: {

        /**
         * mixinContrasenaActualizar
         * @param {*} payload Objecto que representa contraseña vieja y nueva
         * @returns 
         */
        async mixinContrasenaActualizar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
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
                    console.log('Server error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    //Historial de Errores encontrados 
                    //${error.networkError.name == "ServerError"}
                    return reject({ mensaje: `sin éxito!` });
                }
                console.log("MutateResult");
                console.dir(MutateResult);
                resolve(MutateResult);
            });
        },


        /** Refactorizar a que el backend sepa el id del usuario
         * mixinVerificacionCelularComparar
         * @param {*} payload Objecto que representa input a comprar y el id del usuario
         * @returns 
         */
        async mixinVerificacionCelularComparar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("compararVerificacionCelular...");
                try {
                    MutateResult = await this.$apollo.mutate({
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
                resolve(MutateResult);
            });
        },

    }
}