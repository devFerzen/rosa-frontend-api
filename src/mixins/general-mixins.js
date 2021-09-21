/**
 * Descripción: Son funciones que retornan una promesa para tenerlas en try catch
 * quizás aquí habrá que llamar una clase Error donde por medio del nombre de error que devuelva
 * este sabra que ponerle al usuario ya que allá estará la llamada de activación de la alerta.
 * 
 * Estas llamadas no necesitarán de pedir permiso antes de llamar, checarán si el local storage
 * contiene token si no el mismo manda a cambiar de ventana
 */

import * as GraphqlCalls from '../graphql/mutations/general-mutations';

export default {
  methods: {
    /**
     * Mixin Para poder iniciar sesion a un usuario con correo y contraseña
     * @param {*} payload Objecto que representa un correo y contraseña
     * @returns 
     */
    mixinInicioSesion(payload){
      return new Promise(async (resolve, reject) =>{
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
          //Historial de Errores encontrados 
          //${error.networkError.name == "ServerError"}
          reject({mensaje: `sin éxito!`});
        }
        resolve(mutateResult);  
      });    
    },

    /**
     * Mixin Para poder registrarte con tu correo, contraseña y número telefónico
     * @param {*} payload Objecto que representa un correo, contraseña y número telefónico
     * @returns 
     */
    mixinRegistro(payload){
      return new Promise( async(resolve, reject) => {
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
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          //Historial de Errores encontrados 
          //${error.networkError.name == "ServerError"} //Query mal escrito, Mutacion mal escrita
          reject({mensaje: `sin éxito!`});
        }
        console.dir(mutateResult);
        resolve(mutateResult); 
      });
    },

    mixinMeEncantaPlus(payload){
      return new Promise( async(resolve, reject) => {
        console.log("mixinMeEncantaPlus...");
        let queryResult;

        try {
          queryResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.ME_ENCANTA_MUTATE,
            variables:{
              idAnuncio: payload
            }
          });
        } catch (error) {
          console.log('Sesion call error...')
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          //Historial de Errores encontrados 
          reject({mensaje: `sin éxito!`});
        }
        console.dir(queryResult);
        resolve(queryResult); 
      });
    },

    mixinVerPlus(payload){
      return new Promise( async(resolve, reject) => {
        console.log("mixinVerPlus...");
        let queryResult;

        try {
          queryResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.VER_MUTATE,
            variables:{
              idAnuncio: payload
            }
          });
        } catch (error) {
          console.log('Sesion verPlus call error...')
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          //Historial de Errores encontrados 
          reject({mensaje: `sin éxito!`});
        }
        console.dir(queryResult);
        resolve(queryResult); 
      });
    },

    mixinVer(payload){
      return new Promise( async(resolve, reject) => {
        console.log("mixinVer...");
        let queryResult;

        try {
          queryResult = await this.$apollo.query({
            query: GraphqlCalls.VER_QUERY,
            variables:{
              ids: payload
            }
          });
        } catch (error) {
          console.log('Sesion ver call error...')
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          //Historial de Errores encontrados 
          reject({mensaje: `sin éxito!`});
        }
        console.dir(queryResult);
        this.mixinVerPlus(payload);
        resolve(queryResult);
        
      });
    },

    mixinBusqueda(payload){
      return new Promise( async(resolve, reject) => {
        console.log("mixinBusqueda...");
        let queryResult;

        try {
          queryResult = await this.$apollo.query({
            query: GraphqlCalls.BUSQUEDA_QUERY,
            variables: {
              query: {
                "categorias": ["ESCORTS"],
                "estado": "N.L.",
              }
            }
          });
        } catch (error) {
          console.log('Sesion call error...')
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          //Historial de Errores encontrados 
          reject({mensaje: `sin éxito!`});
        }
        console.dir(queryResult);
        resolve(queryResult); 
      });
    }
  }
}