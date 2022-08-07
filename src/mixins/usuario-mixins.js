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
        this.cleanMixinResult();

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
          console.log("Mutation call error...");
          console.dir(error);

          return reject(this.MixinResult);
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
        let MutateResult;
        console.log("mixinVerificacionCelularComparacion...");
        this.cleanMixinResult();

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

          this.MixinResult = {
            ...this.MixinResult,
            ...new Respuesta(error),
          };
          return reject(this.MixinResult);
        }

        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult.data, "compararVerificacionCelular"),
        };
        resolve(this.MixinResult);
      });
    },

    mixinVerificacionCelularCreacion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        this.cleanMixinResult();

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
              this.MixinResult = new Result(
                JSON.parse(error.graphQLErrors[0].message)
              );
            }
          } else {
            if (typeof error === "string") {
              this.MixinResult = new Result(JSON.parse(error));
            } else {
              this.MixinResult = new Result(error);
            }
          }

          return reject(this.MixinResult);
        }

        resolve(JSON.parse(MutateResult.data.solicitarVerificacionCelular));
      });
    },

    cleanMixinResult() {
      this.MixinResult.pagina = null;
      this.MixinResult.componenteInterno = null;
      this.MixinResult.mensaje = "";
      this.MixinResult.data = null;
    },
  },
};
