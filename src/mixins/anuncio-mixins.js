import * as GraphqlCalls from '../graphql/general-mutations';
import * as GraphqlAnuncioCalls from '../graphql/anuncio-mutations';

export default {
    data(){
        return{
            MixinResult:{
                pagina: null,
                componenteInterno: null,
                mensaje: '',
                data: null
            }
        }
    },
    methods:{
        mixinAnuncioCrear(payload){
            return new Promise( async(resolve, reject) => {
                let MutateResult;
                    console.log("mixinCrear...");
                    console.dir(payload);

                if(payload.usuario != undefined){
                    console.log("No hay usuario iniciado sesion");
                    this.MixinResult.pagina = 'Home';
                    this.MixinResult.componenteInterno = 'Inicio Sesion';
                    this.MixinResult.mensaje = 'Favor de iniciar sesión primero!';
                    //Regresarlo con apertura de registro
                    reject(this.MixinResult);
                    console.log("no debe que pasar por aquí cuando pase");
                }
        
                if(payload.usuarioVerificado != undefined){
                    //llamada para mandar a crear el codigo de verificacion de usuario por celular
                    MutateResult = await this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.VERIFICACIONCELULAR_CREACION,
                        variables:{
                            input: payload
                        }
                    });
                    this.MixinResult.pagina = 'Home';
                    this.MixinResult.componenteInterno = 'Verificacion';
                    this.MixinResult.propTipoVerificacion = 'Celular';
                    this.MixinResult.mensaje = MutateResult.data.anuncioSolicitarVerificacion;
                    // en éxito mensaje de disptatch (informativo)
                    // en error favor de validar su correo e intentarlo de nuevo
                        //de lo contrario contactar a servicio al cliente (error)
                    reject(this.MixinResult);
                    //Regresarlo a apartado de token
                }

                //llamada para mutate para crear el anuncio
                this.MixinResult.mensaje = "Anunció creado con éxito!";
                //Dispatch para agregarlo en la lista de anuncios del usuario
                resolve(this.MixinResult);
                //Regresarlo a Dashboard y aperturarle el modal
            });
        },
        mixinAnuncioEditar(payload){

        }
    }
}