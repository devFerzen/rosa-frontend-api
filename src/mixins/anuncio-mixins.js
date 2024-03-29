import * as GraphqlCalls from "../graphql/general-mutations";
import * as GraphqlAnuncioCalls from "../graphql/anuncio-mutations";
import Respuesta from "../utilities/Result";
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
  methods: {
    mixinAnuncioSetFormAE(Params) {
      return new Promise(async (resolve, reject) => {
        console.log("mixinAnuncioSetFormAE...", Params.id);

        let Resultado;
        if (!Params.id) {
          this.MixinResult.componenteInterno.activationAlert = {
            type: "error",
            message:
              "No se detecto Usuario. Favor de Iniciar Sesion nuevamente é intentarlo de nuevo.",
          };

          return reject(this.MixinResult);
        }

        Resultado = await this.$store.dispatch("anuncioUsuarioById", Params.id);
        if (Resultado.length === 0) {
          console.log(`mixinAnuncioSetFormAE... anuncio no en la lista`);
          this.MixinResult.componenteInterno.activationAlert = {
            type: "error",
            message:
              "Anuncio no encontrado. Favor de Iniciar Sesion nuevamente y intentarlo de nuevo, o comunicarse con servicio al cliente.",
          };
          return reject();
        }

        return resolve(Resultado[0]);
      });
    },

    //Funciona ya no en uso???
    mixinBuscarAnuncioId(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, MixinResult;
        console.log("mixinBuscarAnuncioId...");

        if (payload.AnuncioDashboard) {
          if (!this.$store.state.usuario.usuario.usuario) {
            console.log("No hay usuario iniciado sesion");
            MixinResult.pagina = "home";
            MixinResult.componenteInterno = "panelHerramientasInicioSesion";
            MixinResult.mensaje = "Favor de iniciar sesión primero!";
            return reject(MixinResult);
          }
        }

        try {
          console.dir(payload);
          MutateResult = await this.$apollo.query({
            query: GraphqlCalls.ANUNCIO_BYID_QUERY,
            variables: {
              ids: [payload.id],
            },
          });
        } catch (error) {
          console.log("mixinBuscarAnuncioId Mutation error...");
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          return reject(new Respuesta(error));
        }

        MixinResult.data = MutateResult.data.queryAnunciosById[0];
        resolve(MixinResult);
      });
    },

    mixinAnuncioSetCrear(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult, MixinResult;
        console.log("mixinAnuncioSetCrear...");

        delete payload._anuncioEdicionInputsView;

        //Hay usuario
        if (!this.$store.state.usuario.usuario.usuario) {
          console.log("No hay usuario iniciado sesion");
          MixinResult.pagina = "home";
          MixinResult.componenteInterno = {
            panelHerramientasInicioSesion: true,
            activationAlert: {
              type: "warning",
              message: `Sesión cerrada por inactividad, favor de iniciar sesión nuevamente!.`,
            },
          };
          //Analizar - Regresarlo con apertura de registro
          return reject(MixinResult);
        }

        //Esto es para doble check porque en si el botón aunciate verifica esto
        if (!this.$store.state.usuario.usuario.numero_telefonico_verificado) {
          console.log("Usuario no verificado");
          MixinResult.pagina = "home";
          MixinResult.componenteInterno = {
            panelHerramientasVerificacion: true,
            setTipoVerificacion: "verificacionCelular",
            activationAlert: {
              type: "warning",
              message: `Su número de contacto aún no esta verificado, Favor de validar el código verificación enviado a su celular!.`,
            },
          };
          return reject(MixinResult);
        }

        try {
          console.dir(payload);

          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlAnuncioCalls.NUEVO_ANUNCIO_MUTATE,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log("mixinAnuncioSetCrear... en error");
          console.dir(error);

          MixinResult = { ...new Respuesta(error) };
          return reject(MixinResult);
        }

        MixinResult = {
          ...new Respuesta(MutateResult.data, "anuncioCreacion"),
        };
        return resolve(MixinResult);
      });
    },

    mixinAnuncioEditar(payload) {
      return new Promise(async (resolve, reject) => {
        let MixinResult = {
          pagina: "home",
          componenteInterno: {
            panelHerramientasInicioSesion: true,
            activationAlert: {
              type: "warning",
              message: `Sesión cerrada por inactividad, favor de iniciar sesión nuevamente!.`,
            },
          },
        };
        console.log("mixinAnuncioEditar...");

        delete payload._anuncioEdicionInputsView;

        //Analizar - Aqui debe que checar tokens tmb
        if (!this.$store.state.usuario.usuario.usuario) {
          return reject(MixinResult);
        }

        try {
          console.dir(payload);

          MixinResult = await this.$apollo.mutate({
            mutation: GraphqlAnuncioCalls.EDICION_ANUNCIO_MUTATE,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log("Mutation call error...");
          console.dir(error);

          MixinResult = { ...new Respuesta(error) };
          return reject(MixinResult);
        }

        MixinResult = {
          ...new Respuesta(MixinResult.data, "anuncioActualizacion"),
        };

        if (this.tipoVerificacion === "verificacionUsuario") {
          MixinResult.componenteInterno.panelHerramientasInicioSesion = true;
        }
        resolve(MixinResult);
      });
    },

    mixinAnuncioEliminar(payload) {
      return new Promise(async (resolve, reject) => {
        let MixinResult;
        console.log("mixinAnuncioEliminar...");
        console.dir(payload);

        if (!this.$store.state.usuario.usuario.usuario) {
          console.log("No hay usuario iniciado sesion");
          MixinResult = {
            ...new Respuesta({
              pagina: "home",
              componenteInterno: {
                panelHerramientasInicioSesion: true,
                activationAlert: {
                  type: "error",
                  message: `Sesión cerrada por inactividad, favor de iniciar sesión nuevamente!.`,
                },
              },
            }),
          };
          return reject(MixinResult);
        }

        try {
          MixinResult = await this.$apollo.mutate({
            mutation: GraphqlAnuncioCalls.DELETE_ANUNCIO_MUTATE,
            variables: {
              id_anuncio: payload,
            },
          });
        } catch (error) {
          console.log("mixinAnuncioEliminar... on error");
          console.dir(error);

          MixinResult = {  ...new Respuesta(error) };
          return reject(MixinResult);
        }

        console.log("anuncioEliminacion... result MixinResult");
        console.dir(MixinResult);

        MixinResult = {
          ...new Respuesta(MixinResult.data, "anuncioEliminacion"),
        };

        console.log("anuncioEliminacion... result MixinResult");
        console.dir(MixinResult);
        resolve(MixinResult);
      });
    },

    mixinActualizarDefaultContactos(payload = []) {
      //En error que mande mensaje de favor de iniciar sesion nuevamente
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinActualizarDefaultContactos...");

        try {
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlCalls.EDICION_DEFAULT_CONTACTOS,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log("Mutation call error...");
          console.dir(error);
          return reject(new Respuesta(error));
        }

        resolve(JSON.parse(MutateResult.data.actualizacionDefaultContactos));
      });
    },
    mixinImagenDelete(payload) {
      return new Promise(async (resolve, reject) => {
        let MutateResult;
        console.log("mixinImagenDelete...");

        if (!this.$store.state.usuario.usuario.usuario) {
          console.log("No hay usuario iniciado sesion");
          this.MixinResult.pagina = "home";
          this.MixinResult.componenteInterno = {
            panelHerramientasInicioSesion: true,
          };
          this.MixinResult.mensaje = "Favor de iniciar sesión primero!";
          return reject(this.MixinResult);
        }

        try {
          console.dir(payload);
          MutateResult = await this.$apollo.mutate({
            mutation: GraphqlAnuncioCalls.DELETE_IMAGEN_MUTATE,
            variables: {
              input: payload,
            },
          });
        } catch (error) {
          console.log("Mutation call error...");
          console.dir(error);
          this.mixinLlamadaRouter(error);
          throw error;
        }

        resolve(JSON.parse(MutateResult.data.imagenEliminacion));
      });
    }
  },
};
