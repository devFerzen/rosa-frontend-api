import * as GraphqlCalls from '../graphql/general-mutations';
import * as GraphqlAnuncioCalls from '../graphql/anuncio-mutations';

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
        mixinAnuncioCrear(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;
                console.log("mixinAnuncioCrear...");

                if (!this.$store.state.usuario.usuario.usuario) {
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = 'panelHerramientasInicioSesion';
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    //Regresarlo con apertura de registro
                    console.log("no debe que pasar por aquí cuando pase");
                    return reject(this.MixinResult);
                }

                //Esto es para doble check porque en si el botón aunciate verifica esto
                if (!this.$store.state.usuario.usuario.numero_telefonico_verificado) {
                    console.log("Usuario no verificado");
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = 'panelHerramientasVerificacion';
                    this.$store.dispatch('setTipoVerificacion', 'verificacionCelular');
                    return reject(this.MixinResult);
                }

                try {
                    console.dir(payload);
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.NUEVA_ANUNCIO_MUTATE,
                            variables: {
                                input: payload
                            }
                    });
                } catch (error) {
                    console.log('Mutation call error...')
                    console.dir(error); // Guardarlo en un log el error.mensage o completo.
                    this.MixinResult.mensaje = error.message;
                    if(error.graphQLErrors.length > 0){
                        this.MixinResult.mensaje = error.graphQLErrors[0].message;
                    }
                    return reject(this.MixinResult);
                }

                this.MixinResult.pagina = 'dashboard';
                this.MixinResult.mensaje = "Anunció creado con éxito!";
                this.MixinResult.data = MutateResult.data.anuncioCreacion;
                resolve(this.MixinResult);
            });
        },
        mixinAnuncioEditar(payload) {
            console.log("vue mixinAnuncioEditar...");
        }
    }
}