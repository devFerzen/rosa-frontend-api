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
                console.log("mixinCrear...");
                console.dir(payload);

                if (!!this.$store.state.usuario.usuario.usuario) {
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'Home';
                    this.MixinResult.componenteInterno = 'Inicio Sesion';
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    //Regresarlo con apertura de registro
                    console.log("no debe que pasar por aquí cuando pase");
                    reject(this.MixinResult);
                    return;
                }

                //Esto es para doble check porque en si el botón aunciate verifica esto
                if (!!this.$store.state.usuario.usuario.usuarioVerificado) {
                    this.MixinResult.pagina = 'home';
                    this.MixinResult.componenteInterno = 'verificacion';
                    this.$store.dispatch('setTipoVerificacion', 'verificacionCelular');
                    resolve(this.MixinResult);
                    return;
                }

                //llamada para mutate para crear el anuncio

                this.MixinResult.pagina = 'dashboard';
                this.MixinResult.mensaje = "Anunció creado con éxito!";
                //this.MixinResult.data = MutateResult.data.____;
                resolve(this.MixinResult);
            });
        },
        mixinAnuncioEditar(payload) {

        }
    }
}