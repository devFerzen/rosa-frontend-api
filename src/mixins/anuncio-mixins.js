import * as GraphqlCalls from '../graphql/general-mutations';
import * as GraphqlAnuncioCalls from '../graphql/anuncio-mutations';
import ErrorResult from '../utilities/ErrorResult';

export default {
    data() {
        return {
            MixinResult: {
                pagina: null,
                componenteInterno: null,
                mensaje: '',
                data: null
            }
        }
    },
    methods: {
        
        mixinAnuncioSetFormAE(Params){
            return new Promise(async(resolve, reject) => {
                console.log("mixinAnuncioSetFormAE", Params.id);

                let Resultado;
                if(!Params.id){
                    console.log(`Sin id`);
                    this.MixinResult.mensaje = 'No se detecto Anuncio. Favor de Iniciar Sesion nuevamente y intentarlo de nuevo, o comunicarse con servicio al cliente.';
                    return reject(this.MixinResult);
                }

                Resultado = await this.$store.dispatch('anuncioUsuarioById', Params.id);
                if(Resultado.length === 0){
                    //Aqui debe de agregar que cierre sesion
                    console.log(`Sin Anuncio Asignado`);
                    return reject({mensaje: "Anuncio no encontrado. Favor de Iniciar Sesion nuevamente y intentarlo de nuevo, o comunicarse con servicio al cliente."});
                }

                await this.$store.dispatch('anuncioEditSet', Resultado[0]);
                return resolve({});
            });
        },
        mixinBuscarAnuncioId(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinBuscarAnuncioId...");
                this.cleanMixinResult();

                if (payload.AnuncioDashboard) {
                    if (!this.$store.state.usuario.usuario.usuario) {
                        console.log("No hay usuario iniciado sesion");
                        this.MixinResult.pagina = 'home';
                        this.MixinResult.componenteInterno = 'panelHerramientasInicioSesion';
                        this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                        return reject(this.MixinResult);
                    }
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.ANUNCIO_BYID_QUERY,
                        variables: {
                            ids: [payload.id]
                        }
                    });
                } catch (error) {
                    console.log('mixinBuscarAnuncioId Mutation error...');
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }

                this.MixinResult.data = MutateResult.data.queryAnunciosById[0];
                resolve(this.MixinResult);
            });
        },
        mixinAnuncioCrear(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinAnuncioCrear...");
                this.cleanMixinResult();

                if (!this.$store.state.usuario.usuario.usuario) {
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = { panelHerramientasInicioSesion: true };
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    //Regresarlo con apertura de registro
                    console.log("no debe que pasar por aquí cuando pase");
                    return reject(this.MixinResult);
                }

                //Esto es para doble check porque en si el botón aunciate verifica esto
                if (!this.$store.state.usuario.usuario.numero_telefonico_verificado) {
                    console.log("Usuario no verificado");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.mensaje = 'Celular registrado aún no esta verificado, Favor de validar el código verificación de celular';
                    this.MixinResult.componenteInterno = { panelHerramientasVerificacion: true };
                    this.$store.dispatch('setTipoVerificacion', 'verificacionCelular');
                    return reject(this.MixinResult);
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.NUEVO_ANUNCIO_MUTATE,
                        variables: {
                            input: payload
                        }
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

                resolve(JSON.parse(MutateResult.data.anuncioCreacion));
            });
        },
        mixinAnuncioEditar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinAnuncioEditar...");

                if (!this.$store.state.usuario.usuario.usuario) {
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = { panelHerramientasInicioSesion: true };
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    return reject(this.MixinResult);
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.EDICION_ANUNCIO_MUTATE,
                        variables: {
                            input: payload
                        }
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

                this.cleanMixinResult();
                resolve(JSON.parse(MutateResult.data.anuncioActualizacion));
            });
        },
        mixinAnuncioEliminar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinAnuncioEliminar...");

                if (!this.$store.state.usuario.usuario.usuario) {
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = { panelHerramientasInicioSesion: true };
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    return reject(this.MixinResult);
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.DELETE_ANUNCIO_MUTATE,
                        variables: {
                            id_anuncio: payload
                        }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error);

                    if (error.graphQLErrors.length > 0) {
                        this.MixinResult = new ErrorResult(JSON.parse(error.graphQLErrors[0].message));
                    } else {
                        this.MixinResult = new ErrorResult(error)
                    }

                    return reject(this.MixinResult.anuncioEliminacion);
                }

                this.cleanMixinResult();
                resolve(JSON.parse(MutateResult.data.anuncioEliminacion));
            });
        },
        mixinActualizarDefaultContactos(payload = []){
            //En error que mande mensaje de favor de iniciar sesion nuevamente
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinActualizarDefaultContactos...");

                try {
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlCalls.EDICION_DEFAULT_CONTACTOS,
                        variables: {
                            input: payload
                        }
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

                resolve(JSON.parse(MutateResult.data.actualizacionDefaultContactos));

            });    
        },
        mixinImagenDelete(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinImagenDelete...");

                if (!this.$store.state.usuario.usuario.usuario) {
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = { panelHerramientasInicioSesion: true };
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    return reject(this.MixinResult);
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.DELETE_IMAGEN_MUTATE,
                        variables: {
                            input: payload
                        }
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

                resolve(JSON.parse(MutateResult.data.imagenEliminacion));
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