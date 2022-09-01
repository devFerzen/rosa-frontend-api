/**
 * Descripción: Mixins exclusivas para un usuario registrado
 */

import * as GraphqlUserCalls from "../graphql/usuario-mutations";
import * as GraphqlAnuncioCalls from "../graphql/anuncio-mutations";
import Result from "../utilities/Result";
import * as GeneralTestMixin from "./Test/generalTest-mixin";

export default {
  methods: {
    /**
     * mixinContrasenaActualizar
     * @param {*} payload Objecto que representa contraseña vieja y nueva
     * @returns
     */
    mixinContrasenaActualizar(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;

        console.log("mixinContrasenaActualizar...");
        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlUserCalls.ACTUALIZAR_CONTRASENA_MUTATE,
            variables: {
              contrasenaVieja: payload.contrasenaVieja,
              contrasenaNueva: payload.contrasenaNueva,
            },
          });
        } catch (error) {
          console.log("mixinContrasenaActualizar... en error");
          console.dir(error); 
          return reject(new Result(error));
        }
        console.log("MutateResult");
        console.dir(MutateResult);

        resolve(JSON.parse(MutateResult.data.compararVerificacionCelular));
      });
    },

    /**
     * mixinVerificacionCelularComparacion: En cualquier error la vista solo imprime el mensaje
     * @param {*} payload Objecto que representa input a comprar y el id del usuario
     * @returns
     */
    mixinVerificacionCelularComparacion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, MixinResult;
        console.log("mixinVerificacionCelularComparacion...");

        try {
      
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlUserCalls.VERIFICACIONCELULAR_COMPARAR_MUTATE,
            variables: {
              input: payload.input,
            },
          });
        } catch (error) {
          console.log("mixinVerificacionCelularComparacion...");
          console.dir(error);

          MixinResult = {
            ...new Respuesta(error),
          };
          return reject(MixinResult);
        }

        MixinResult = {
          ...new Result(MutateResult.data, "compararVerificacionCelular"),
        };
        resolve(MixinResult);
      });
    },

    mixinVerificacionCelularCreacion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, MixinResult;

        try {
          /*if(true){
                        MutateResult = await GeneralTestMixin.mixinVerificacionCelularCreacion(payload);
                        return resolve(JSON.parse(MutateResult));
                    }*/

          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlAnuncioCalls.VERIFICACIONCELULAR_CREACION,
          });
        } catch (error) {
          console.log("Mutation call error...");
          console.dir(error);

          if (error.hasOwnProperty("graphQLErrors")) {
            if (error.graphQLErrors.length > 0) {
              MixinResult = new Result(
                JSON.parse(error.graphQLErrors[0].message)
              );
            }
          } else {
            if (typeof error === "string") {
              MixinResult = new Result(JSON.parse(error));
            } else {
              MixinResult = new Result(error);
            }
          }

          return reject(MixinResult);
        }

        resolve(JSON.parse(MutateResult.data.solicitarVerificacionCelular));
      });
    }
  },
};
