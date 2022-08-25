/**
 *
 * Definiciónes de mixin
 * * Es una funcion promesa todo controlado por try catch,
 * * Todo query o mutacion regresa un MixinResult
 * * No debera que hacer validaciónes
 * * No debera de hacer llamadas a MixinRouter (Analizar situaciones)
 */

import * as GraphqlCalls from "../graphql/general-mutations";
import * as GraphqlUsuarioCalls from "../graphql/usuario-mutations";
import Result from "../utilities/Result";
import { mapGetters } from "vuex";
import * as GeneralTestMixin from "./Test/generalTest-mixin";

export default {
  data() {
    return {
      MixinResult: {
        pagina: null,
        componenteInterno: null,
        data: null,
      },
    };
  },
  computed: {
    ...mapGetters["getDdlEstados"],
  },
  methods: {
    /**
     * Mixin Para poder iniciar sesion a un usuario con correo y contraseña
     * @param {*} payload Objecto que representa un correo y contraseña
     * @returns
     */
    mixinInicioSesion(payload) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinInicioSesion...");
        let MutateResult;
        this.cleanMixinResult();

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
          this.MixinResult = {
            ...this.MixinResult,
            ...new Result(error),
          };
          return reject();
        }

        console.log(`mixinInicioSesion... result`);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult, "inicioSesion"),
        };
        console.dir(this.MixinResult);
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.CERRAR_SESION_MUTATE,
            variables: {},
          });
        } catch (error) {
          console.log("mixinCerrarSesion... en error");
          console.dir(error);
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }

        console.log(`mixinCerrarSesion... result`);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult, "cerrarSesion"),
        };
        console.dir(this.MixinResult);
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();

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
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }

        console.log(`mixinRegistro... result`);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult, "registroUsuario"),
        };
        console.dir(this.MixinResult);
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();

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
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }

        console.log(`mixinSolicitarRestablecerContrasena... result`);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult.data, "solicitarRestablecerContrasena"),
        };
        console.dir(this.MixinResult);
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();
        console.log("mixinMeEncantaPlus...");

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
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }

        console.log("mixinMeEncantaPlus... result");
        console.dir(MutateResult);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult, "anunciolike"),
        };
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();
        console.log("mixinVerPlus...");

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.VER_MUTATE,
            variables: {
              idAnuncio: payload,
            },
          });
        } catch (error) {
          console.log(`mixinVerPlus... en error`);
          console.dir(error);
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
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
        this.cleanMixinResult();
        console.log("mixinVer...");

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
          this.MixinResult = {
            ...this.MixinResult,
            ...new Result({
              componenteInterno: {
                activationAlert: {
                  type: "error",
                  message: `Error al tratar de abrir al anuncio, favor de intentarlo más tarde!.`,
                },
              },
            }),
          };
          return reject(this.MixinResult);
        }

        this.mixinVerPlus(payload);
        console.dir(QueryResult);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(QueryResult.data, "queryAnunciosById", true),
        };
        return resolve(this.MixinResult);
      });
    },

    /**
     * mixinVerificacionUsuarioComparacion; Comprar el codigo de verificacion de usuario
     * @param {*} payload Objecto que representa input a comprar y el correo del usuario
     * @returns
     */
    mixinVerificacionUsuarioComparacion(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, validandoUsuarioTKN;
        this.cleanMixinResult();

        //Poner correctamente
        //validandoUsuarioTKN = await this.$store.dispatch("validandoUsuario");
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
          this.MixinResult = {
            ...this.MixinResult,
            ...new Result(error),
          };
          return reject(this.MixinResult);
        }

        // Analizar - Ocupa enviarlo a home pagina = 'home';
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult.data, "compararVerificacionUsuario"),
        };
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();
        console.log("mixinNuevoCorreoContactanos... ");
        console.dir(payload);

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
            this.MixinResult = {
              ...this.MixinResult,
              ...new Result({
                componenteInterno: {
                  activationAlert: {
                    type: "error",
                    message: `Error al tratar de reportar el anuncio, Favor de actualizar e intentarlo de nuevo!.`,
                  },
                },
              }),
            };
            return reject(this.MixinResult);
          }

          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }

        if (esReporte) {
          this.MixinResult = {
            ...this.MixinResult,
            ...new Result({
              componenteInterno: {
                activationAlert: {
                  type: "success",
                  message: `Anuncio reportado!, Gracias por su cooperación!.`,
                },
              },
            }),
          };
          return resolve(this.MixinResult);
        }

        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult.data, "nuevoContactoCliente"),
        };
        return resolve(this.MixinResult);
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
        this.cleanMixinResult();
        console.log("mixinRestablecerContrasena...");
        console.dir(payload);

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
          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(MutateResult.data, "restablecerContrasena"),
        };
        return resolve(this.MixinResult);
      });
    },

    //Sin Limpia los de abajo

    /**
     * mixinBusqueda extrae un número de anuncios bajo algún query en especial.
     * @param {*} payload idAnuncio
     * @returns
     */
    mixinBusqueda(payload = {}) {
      return new Promise(async (resolve, reject) => {
        let QueryResult;
        this.cleanMixinResult();
        console.log("mixinBusqueda...");

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlCalls.ANUNCIOS_QUERY,
            variables: {
              query: payload,
            },
          });
        } catch (error) {
          console.log(`mixinBusqueda... en error`);
          console.dir(error);

          this.MixinResult = { ...this.MixinResult, ...new Result(error) };
          return reject(this.MixinResult);
        }
        return resolve(QueryResult.data.queryAnuncios);
      });
    },

    mixinDdlGeneral(categoriasDdls) {
      return new Promise(async (resolve, reject) => {
        this.cleanMixinResult();
        let QueryResult;
        console.log(`mixinDdlGeneral... ${categoriasDdls}`);

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlCalls.DDL_BYCATEGORIA_QUERY,
            variables: {
              categorias: [categoriasDdls],
            },
          });
        } catch (error) {
          console.log(`mixinDdlGeneral... en error`);
          console.dir(error);
          this.MixinResult = {
            ...this.MixinResult,
            ...new Result(error),
          };
          console.dir(this.MixinResult);
          return reject();
        }
        console.log("mixinDdlGeneral... result");
        console.dir(QueryResult);
        this.MixinResult = {
          ...this.MixinResult,
          ...new Result(QueryResult, "queryddlsByCategoria", true),
        };
        console.dir(this.MixinResult);
        return resolve(this.MixinResult);
      });
    },

    /**
     * mixinLlamadaRouter: Manda a otra ruta agrega props en caso de haber y hace dispatch para componentes internos .
     * @param {*} payload Es el Objeto MixinResult
     * @returns
     */
    mixinLlamadaRouter(payload) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinLlamadaRouter");

        if ("pagina" in payload && payload.pagina !== undefined) {
          this.$router.push({ name: payload.pagina }).catch((error) => {
            //this.$router.push({ name: 'no-encontrado' });
          });
        }

        //Crear arreglo de objetos
        if (payload.componenteInterno) {
          for (let componenteInterno in payload.componenteInterno) {
            console.log(
              `Haciendo dispatch a ${componenteInterno} con ${payload.componenteInterno[componenteInterno]}`
            );
            await this.$store.dispatch(
              componenteInterno,
              payload.componenteInterno[componenteInterno]
            );
          }
        }
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
