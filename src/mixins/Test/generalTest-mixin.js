import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  headers:{
        'Access-Control-Allow-Origin': '/',//'...host:3080/',
        'Accept': 'application/json'
    }
});

export const mixinDdlGeneral = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;

        try {
            Result = await instance.get('/ddlGeneral', {
                params: {
                    categorias: [payload]
                }
            });
        } catch (error) {
            console.log(`con error axios`);
            console.dir(error);

            return reject(JSON.stringify(error.response.data));
        }
        
        return resolve(JSON.stringify({data: {
            queryddlsByCategoria: Result.data
        }}));
    })
};

export const mixinInicioSesion = async (Payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;
        try {
            Result = await instance.post('/loggear',{
                usuario: Payload.usuario,
                contrasena: Payload.contrasena
            });
        } catch (error) {
            console.log(`con error axios`);
            console.dir(error);
            return reject(JSON.stringify(error.response.data));
        }
        
        console.dir(Result.data.usuario);
        let usuario = Result.data.usuario;
    
        return resolve(JSON.stringify({ 
            pagina: 'dashboard', 
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Bienvenido!' }, 
                setSesion: usuario, 
                panelHerramientasBusqueda: true 
            } 
        }));
    })
};

export const mixinRegistro = async (Payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;

        Result = await instance.post('/register',{
            usuario: Payload.usuario,
            contrasena: Payload.contrasena,
            numero_telefonico: Payload.numero_telefonico,
            estatus: true
        });
        let usuario = Result.data.usuario;
        
        return resolve(JSON.stringify({ 
            pagina: 'dashboard', 
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Bienvenido!' },
                setSesion: usuario, 
            } 
        }));
    })
};

export const mixinCerrarSesion = async (Payload) => {
    return new Promise(async(resolve, reject) => {
        return resolve(JSON.stringify({ 
            pagina: 'home', 
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Sesion cerrada, hasta pronto!.' },
                panelHerramientasBusqueda: true
            } 
        }));
    })
};

export const mixinBusqueda = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;
        try {
            Result = await instance.get('/busqueda');
        } catch (error) {
            console.log(`con error axios`);
            console.dir(error);

            return reject(JSON.stringify(error.response.data));
        }
        
        return resolve(JSON.stringify(Result.data.anuncios));
    })
}

export const mixinSolicitarRestablecerContrasena = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;

        return resolve(JSON.stringify({ 
            pagina: 'home',
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Favor de ingresar el código de verificación que se le fue enviado a su correo.!' },
                setSesion: payload,
                data: '123',
                panelHerramientasVerificacion: true, 
                setTipoVerificacion: 'verificacionUsuarioContrasena', 
                setCorreo: usuario
            } 
        }));
    })
};

export const mixinNuevoCorreoContactanos = async (payload) => {
    return new Promise(async(resolve, reject) => {
        return resolve(JSON.stringify({ 
            pagina: 'home',
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Correo enviado con éxito.!' },
                panelHerramientasBusqueda: true
            } 
        }));
    })
}

export const mixinVerificacionCelularCreacion = async (payload) => {
    return new Promise(async(resolve, reject) => {
        return resolve(JSON.stringify({ 
            pagina: 'home',
            componenteInterno: { 
                activationAlert: { type: "success", message: `Favor de ingresar el código de verificación que se le fue enviado a su correo.!` },
                panelHerramientasVerificacion: true, setTipoVerificacion: 'verificacionCelular'
            } 
        }));
    })
}

export const mixinVerificacionUsuarioComparacion = async (payload) => {
    return new Promise(async(resolve, reject) => {
        console.log(`mixinVerificacionUsuarioComparacion: ${payload}`);

        if (payload.input !== '123') {
            return reject(JSON.stringify({ 
                componenteInterno: { 
                    activationAlert: { type: "error", message: `Código de verificación incorrecto! Te restan ${3} intentos.!` }
                }
            }));
        }

        return resolve(JSON.stringify({ 
            componenteInterno: { 
                activationAlert: { type: "success", message: `Verificación de usuario con Éxito!` },
                 panelHerramientasCambioContrasena: true, setVerificacionUsuario: input
            } 
        }));
    })
}

export const mixinVerificacionCelularComparacion = async (payload) => {
    return new Promise(async(resolve, reject) => {
        console.log(`mixinVerificacionCelularComparacion:`);
        console.dir(payload);

        if (payload.input !== '123') {
            return reject(JSON.stringify({ 
                componenteInterno: { 
                    activationAlert: { type: "error", message: `Código de verificación incorrecto! Te restan ${3} intentos.!` }
                }
            }));
        }

        return resolve(JSON.stringify({ 
            pagina: 'dashboard',
            componenteInterno: { 
                activationAlert: { type: "success", message: `Verificación de celular con Éxito!` },
                numerotelefonicoUsuario: true
            } 
        }));
    })
}

export const mixinMeEncantaPlus = async (payload) => {
    return new Promise(async(resolve, reject) => {
        return resolve(JSON.stringify({ 
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Me encata enviado.!' }
            } 
        }));
    })
}

export const mixinVer = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;
        try {
            Result = await instance.get('/ver',{
                params:{
                    ids: [payload]
                }
            });
        } catch (error) {
            console.log(`con error axios`);
            console.dir(error);

            return reject(JSON.stringify(error.response.data));
        }
        
        console.dir(Result);

        return resolve(JSON.stringify(Result.data));
    })
}



