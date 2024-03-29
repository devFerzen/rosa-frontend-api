/**
 *
 * Definiciónes de mixin
 * * Es una funcion promesa todo controlado por try catch,
 * * Todo query o mutacion regresa un MixinResult
 * * No debera que hacer validaciónes
 * * No debera de hacer llamadas a MixinRouter (Analizar situaciones)
 */

import * as GraphqlCalls from "../graphql/general-mutations";
import Result from "../utilities/Result";

export default {
  data() {
    return {
      DdlMunicipios: [],
      DdlEstados: [],
    };
  },

  methods: {
    /**
     * Mixin Para poder iniciar sesion a un usuario con correo y contraseña
     * @param {correo, contraseña} payload Objecto
     * @returns {MixinResult}
     */
    mixinInicioSesion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.INICIANDO_SESION_MUTATE,
            variables: {
              correo: payload.usuario,
              contrasena: payload.contrasena,
            },
          });
        } catch (error) {
          console.log(`mixinInicioSesion... en error`);
          console.dir(error);
          MixinResult = {
            ...new Result(error),
          };
          return reject(MixinResult);
        }

        console.log(`mixinInicioSesion... result`);
        MixinResult = {
          ...new Result(MutateResult, "inicioSesion"),
        };
        console.dir(MixinResult);
        return resolve(MixinResult);
      });
    },

    /**
     * Mixin Para poder cerrar sesion a un usuario con correo y contraseña
     * @param {*} payload Objecto que representa un correo y contraseña
     * @returns
     */
    mixinCerrarSesion(payload) {
      return new Promise(async (resolve, reject) => {
        console.log(`mixinCerrarSesion...`);
        let MutateResult;
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.CERRAR_SESION_MUTATE,
            variables: {},
          });
        } catch (error) {
          console.log("mixinCerrarSesion... en error");
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }

        console.log(`mixinCerrarSesion... result`);
        MixinResult = {
          ...new Result(MutateResult, "cerrarSesion"),
        };
        console.dir(MixinResult);
        return resolve(MixinResult);
      });
    },

    /**
     * Mixin Para poder registrarte con tu correo, contraseña y número telefónico
     * @param {*} payload Objecto que representa un correo, contraseña y número telefónico
     * @returns
     */
    mixinRegistro(payload) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinRegistro...");
        let MutateResult;
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.REGISTRO_MUTATE,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log(`mixinRegistro... en error`);
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }

        console.log(`mixinRegistro... result`);
        MixinResult = {
          ...new Result(MutateResult, "registroUsuario"),
        };
        console.dir(MixinResult);
        return resolve(MixinResult);
      });
    },

    /**
     * mixinSolicitarRestablecerContrasena: Solicita codigo de verificación de usuario en el cuál este será enviado al correo del usuario
     * @param {*} payload correo usuario registrado
     * @returns
     */
    mixinSolicitarRestablecerContrasena(payload) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinSolicitarRestablecerContrasena...");
        let MutateResult;
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.SOLICITAR_RESTABLECER_CONTRASENA,
            variables: {
              usuario: payload,
            },
          });
        } catch (error) {
          console.log(`mixinSolicitarRestablecerContrasena... en error`);
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }

        console.log(`mixinSolicitarRestablecerContrasena... result`);
        MixinResult = {
          ...new Result(MutateResult.data, "solicitarRestablecerContrasena"),
        };
        console.dir(MixinResult);
        return resolve(MixinResult);
      });
    },

    /**
     * mixinMeEncantaPlus aumenta 1 el conteo de likes del anuncio
     * @param {*} payload idAnuncio
     * @returns
     */
    mixinMeEncantaPlus(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinMeEncantaPlus...");
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.ME_ENCANTA_MUTATE,
            variables: {
              idAnuncio: payload,
            },
          });
        } catch (error) {
          console.log(`mixinMeEncantaPlus... en error`);
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }

        MixinResult = {
          ...new Result(MutateResult, "anunciolike"),
        };

        console.dir(MixinResult);
        return resolve(MixinResult);
      });
    },

    /**
     * mixinVerPlus aumenta 1 el conteo de vistas del anuncio
     * @param {*} payload idAnuncio
     * @returns
     */
    mixinVerPlus(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinVerPlus...");
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.VER_MUTATE,
            variables: {
              idAnuncio: payload,
            },
          });

          this.$store.dispatch(
            'PlusOne', {
            tipo: 'corazon',
            idAnuncio: payload
          }
          );
        } catch (error) {
          console.log(`mixinVerPlus... en error`);
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }
        console.dir(MutateResult);
        return resolve();
      });
    },

    /**
     * MixinVer extrae un anuncio en particular y aumenta su conteo de vistas.
     * @param {*} payload idAnuncio
     * @returns
     */
    mixinVer(payload) {
      return new Promise(async (resolve, reject) => {
        let QueryResult;
        console.log("mixinVer...");
        let MixinResult;

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlCalls.ANUNCIO_BYID_QUERY,
            variables: {
              ids: [payload],
            },
          });
        } catch (error) {
          console.log(`mixinVer... en error`);
          console.dir(error);
          MixinResult = {
            ...new Result({
              componenteInterno: {
                activationAlert: {
                  type: "error",
                  message: `Error al tratar de abrir al anuncio, favor de intentarlo más tarde!.`,
                },
              },
            }),
          };
          return reject(MixinResult);
        }

        this.mixinVerPlus(payload);
        console.dir(QueryResult);
        MixinResult = {
          ...new Result(QueryResult.data, "queryAnunciosById", true),
        };
        return resolve(MixinResult);
      });
    },

    /**
     * mixinVerificacionUsuarioComparacion; Comprar el codigo de verificacion de usuario
     * @param {*} payload Objecto que representa input a comprar y el correo del usuario
     * @returns
     */
    mixinVerificacionUsuarioComparacion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        let MixinResult;

        //Analizar Poner correctamente - validandoUsuarioTKN = await this.$store.dispatch("validandoUsuario");
        console.log(
          `mixinVerificacionUsuarioComparacion... input  ${payload.input}`
        );

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.VERIFICACIONUSUARIO_COMPARAR_MUTATE,
            variables: {
              input: payload.input,
              usuario: payload.usuario,
              clean: payload.clean,
            },
          });
        } catch (error) {
          console.log(`mixinVerificacionUsuarioComparacion... en error`);
          console.dir(error);
          MixinResult = {
            ...new Result(error),
          };
          return reject(MixinResult);
        }

        // Analizar - Ocupa enviarlo a home pagina = 'home';
        MixinResult = {
          ...new Result(MutateResult.data, "compararVerificacionUsuario"),
        };
        return resolve(MixinResult);
      });
    },

    /**
     * mixinNuevoCorreoContactanos; Guarda los comentarios dados por el usuario
     * @param {*} payload Objecto que representa input...
     * @returns
     */
    mixinNuevoCorreoContactanos(payload, esReporte = false) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinNuevoCorreoContactanos... ");
        console.dir(payload);
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.NUEVO_CORREO_CONTACTANOS,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log(`mixinNuevoCorreoContactanos... en error`);
          console.dir(error);
          if (esReporte) {
            MixinResult = {
              ...new Result({
                componenteInterno: {
                  activationAlert: {
                    type: "error",
                    message: `Error al tratar de reportar el anuncio, Favor de actualizar e intentarlo de nuevo!.`,
                  },
                },
              }),
            };
            return reject(MixinResult);
          }

          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }

        if (esReporte) {
          MixinResult = {
            ...new Result({
              componenteInterno: {
                activationAlert: {
                  type: "success",
                  message: `Anuncio reportado!, Gracias por su cooperación!.`,
                },
              },
            }),
          };
          return resolve(MixinResult);
        }

        MixinResult = {
          ...new Result(MutateResult.data, "nuevoContactoCliente"),
        };
        return resolve(MixinResult);
      });
    },

    /**
     * mixinRestablecerContrasena
     * @param {*} payload correo usuario registrado
     * @returns
     */
    mixinRestablecerContrasena(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinRestablecerContrasena...");
        console.dir(payload);
        let MixinResult;

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.RESTABLECER_CONTRASENA,
            variables: {
              input: payload.input,
              usuario: payload.usuario,
              contrasena: payload.contrasena,
            },
          });
        } catch (error) {
          console.log(`mixinRestablecerContrasena... en error`);
          console.dir(error);
          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }
        MixinResult = {
          ...new Result(MutateResult.data, "restablecerContrasena"),
        };
        return resolve(MixinResult);
      });
    },

    //Sin Limpia los de abajo

    /**
     * mixinBusqueda extrae un número de anuncios bajo algún query en especial.
     * @param {*} payload idAnuncio
     * @returns
     */
    mixinBusqueda(payload = {}, skip = 0) {
      return new Promise(async (resolve, reject) => {
        let QueryResult;
        console.log("mixinBusqueda...");
        console.dir(payload);

        let MixinResult;

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlCalls.ANUNCIOS_QUERY,
            variables: {
              query: payload,
              skip: skip
            },
          });
        } catch (error) {
          console.log(`mixinBusqueda... en error`);
          console.dir(error);

          MixinResult = { ...new Result(error) };
          return reject(MixinResult);
        }
        return resolve(QueryResult.data.queryAnuncios);
      });
    },

    mixinDdlGeneral(categoriasDdls) {
      return new Promise(async (resolve, reject) => {
        let QueryResult;
        let MixinResult;

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlCalls.DDL_BYCATEGORIA_QUERY,
            variables: {
              categorias: [categoriasDdls],
            },
          });
        } catch (error) {
          console.log(`mixinDdlGeneral... ${categoriasDdls} en error`);
          console.dir(error);

          MixinResult = {
            ...new Result(error),
          };
          console.dir(MixinResult);
          return reject();
        }

        MixinResult = {
          ...new Result(QueryResult, "queryddlsByCategoria", true),
        };

        return resolve(MixinResult);
      });
    },

    /**
     * mixinLlamadaRouter: Manda a otra ruta agrega props en caso de haber y hace dispatch para componentes internos .
     * @param {*} payload ...
     * @returns
     */
    mixinLlamadaRouter(payload = {}) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinLlamadaRouter");

        //Crear arreglo de objetos
        if (payload.hasOwnProperty('componenteInterno')) {
          for (let componenteInterno in payload.componenteInterno) {
            await this.$store.dispatch(
              componenteInterno,
              payload.componenteInterno[componenteInterno]
            );
          }
        }
        
        if (payload.hasOwnProperty("pagina")) {
          if (payload.pagina !== undefined) {
            this.$router.push({ name: payload.pagina }).catch((error) => {
              //this.$router.push({ name: 'no-encontrado' });
            });
          }
        }

      });
    },

    //Agregar un sort
    mixinGetMunicipios(nombre_estado) {

      let Estado = this.$store.state.panelHerramientas.ddls.filter((Ddls) => {
        return (
          Ddls.categoria === "ddlEstado" && Ddls.descripcion === nombre_estado
        );
      });

      const _municipiosList = this.$store.state.panelHerramientas.ddls.filter(
        (Ddls) => {
          return (
            Ddls.categoria === "ddlMunicipios" &&
            Ddls.no_estado == Estado[0].no_id
          );
        }
      );
      this.DdlMunicipios = _municipiosList;
    },

    //Analizar
    mixinSetDdlEstados(Data) {
      console.log(`mixinSetDdlEstados...`);

      if (this.DdlEstados.length < 1) {
        this.DdlEstados = Data;
      }
    },
  },
};
