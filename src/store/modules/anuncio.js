export const state = {
    dashboardEditAnuncioDisplay: '000',
    //Renombrar AnuncioInfo por AnuncioEditInfo
    AnuncioInfo: {
        categorias: ["Escorts", "Masajes Eróticos"],
        permisos: ["Descripcion", "Contacto", "Tarifas"],
        Sec_Descripcion: {
            titulo: '',
            estado: '',
            ciudad: '',
            descripcion: '',
            sexo: ''
        },
        Sec_Imagenes: [],
        Sec_Contacto: [],
        Sec_Tarifas: [],
    },
    idAnuncioReportado: ''
}

export const mutations = {
    EDIT_ANUNCIO_DISPLAY(state, payload) {
        state.dashboardEditAnuncioDisplay = payload;
    },    
    ANUNCIO_EDITINFO_SET(state, payload){

        if ('Sec_Descripcion' in payload) {
          state.AnuncioInfo.Sec_Descripcion = payload.Sec_Descripcion;
        }

        if ('Sec_Imagenes' in payload) {
          state.AnuncioInfo.Sec_Imagenes = payload.Sec_Imagenes;
        }

        if ('Sec_Contacto' in payload) {
          state.AnuncioInfo.Sec_Contacto = payload.Sec_Contacto;
        }

        if ('Sec_Tarifas' in payload) {
          state.AnuncioInfo.Sec_Tarifas = payload.Sec_Tarifas;
        }

        if ('categorias' in payload) {
          state.AnuncioInfo.categorias = payload.categorias;
        }

        if ('categorias' in payload) {
          state.AnuncioInfo.categorias = payload.categorias;
        }

        if ('id' in payload) {
          state.AnuncioInfo.id = payload.id;
        }
    },
    ANUNCIO_EDITINFO_OFFSET(state, payload){
        state.AnuncioInfo = {
            categorias: ["Escorts", "Masajes Eróticos"],
            permisos: ["Descripcion", "Contacto", "Tarifas"],
            Sec_Descripcion: {
                titulo: '',
                estado: '',
                ciudad: '',
                descripcion: '',
                sexo: ''
            },
            Sec_Imagenes: [],
            Sec_Contacto: [],
            Sec_Tarifas: [],
        };
    },
    ID_ANUNCIOREPORTADO_SET(state, payload){
        state.idAnuncioReportado = payload;
    }
}

export const actions = {
    //Este falta renombar parece la llamada para abrir el modal de edicion...
    crearAnuncioDisplay({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("action crearAnuncioDisplay...");
            console.dir(payload);

            //Veriricar si hay usuario disponible
            if (!rootState.usuario.usuario.usuario) {
                reject({ pagina: "home", componenteInterno: "panelHerramientasInicioSesion", mensaje: "Favor de Iniciar sesion o pasar a Registrarse!" });
                return;
            }

            if (!rootState.usuario.usuario.numero_telefonico_verificado) {
                //Indicar el tipo de veritifacion y enviarlo ahí como no son estay alive si vuelve picarle a anunciate este vuelve a solicitar un codigo de verificación
                commit('TIPO_VERIFICACION_SET', 'verificacionCelular')
                return reject({ pagina: "home", componenteInterno: "panelHerramientasVerificacion", mensaje: "Favor de verificar el número de celular de la cuenta!" });
            }

            //Apertura de nuevo anuncio
            resolve({ pagina: "dashboard", componenteInterno: "editAnuncioDisplay", mensaje: "" });
        });
    },
    editAnuncioDisplay({ commit, state }, payload) {
        commit('EDIT_ANUNCIO_DISPLAY', payload);
    },
    anuncioEditSet({ commit, state }, payload) {
        console.log("anuncioEditSet payload");
        console.dir(payload);
        
        if (payload != undefined || payload !== null) {
            console.log("anuncio edit set");
            commit('ANUNCIO_EDITINFO_SET', payload);
        } else{
            console.log("anuncio edit offset");
            commit('ANUNCIO_EDITINFO_OFFSET', null);
        }
    },
    anuncioReportado({ commit, state}, payload){
        commit('ID_ANUNCIOREPORTADO_SET', payload);
    }
}

export const getters = {
    anuncioDisplayState: state => {
        return state.dashboardEditAnuncioDisplay;
    },
    FormAE: state => {
        return state.AnuncioInfo;
    },
    getIdAnuncioReportado: state => {
        return state.idAnuncioReportado;
    }
};