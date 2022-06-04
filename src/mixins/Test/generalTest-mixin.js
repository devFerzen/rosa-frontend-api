import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers:{
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
});

export const mixinInicioSesion = async (Payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;
        try {
            Result = await instance.post('http://localhost:3000/loggear',{
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

        Result = await instance.post('http://localhost:3000/register',{
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
        let Result;

        return resolve(JSON.stringify({ 
            pagina: 'home', 
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Sesion cerrada, hasta pronto!.' },
                panelHerramientasBusqueda: true
            } 
        }));
    })
};

export const mixinSolicitarRestablecerContrasena = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;

        return resolve(JSON.stringify({ 
            pagina: 'home',
            componenteInterno: { 
                activationAlert: { type: "success", message: 'Favor de ingresar el código de verificación que se le fue enviado a su correo.!' },
                setSesion: payload,
                data: codigoVerificacion,
                panelHerramientasVerificacion: true, 
                setTipoVerificacion: 'verificacionUsuarioContrasena', 
                setCorreo: usuario
            } 
        }));
    })
};

export const mixinDdlGeneral = async (payload) => {
    return new Promise(async(resolve, reject) => {
        let Result;
        try {
            Result = await instance.get('http://localhost:3000/ddlGeneral', {
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
            queryddlsByCategoria: Result
        }}));
    })
};


