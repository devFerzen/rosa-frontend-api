export const state = {
    dashboardEditAnuncioDisplay: '000',
    //Renombrar AnuncioInfo por AnuncioEditInfo
    AnuncioInfo: {
        categorias: [],
        permisos: ["Descripcion", "Contacto", "Tarifas"],
        Sec_Descripcion: {
            titulo: '',
            estado: '',
            ciudad: '',
            descripcion: '',
            sexo: 0
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
    ANUNCIO_NEWINFO_OFFSET(state, payload){
        state.AnuncioInfo._anuncioEdicionInputsView = false;
    },
    ANUNCIO_NEWINFO_SET(state, payload){
        state.AnuncioInfo.permisos = ["Descripcion", "Contacto", "Tarifas"];
        state.AnuncioInfo.categorias = [],
        state.AnuncioInfo.Sec_Descripcion = {
            titulo: '',
            estado: '',
            ciudad: '',
            descripcion: '',
            sexo: 0
        };
        state.AnuncioInfo.Sec_Imagenes = [];
        state.AnuncioInfo.Sec_Contacto = [];
        state.AnuncioInfo.Sec_Tarifas = [];
        state.AnuncioInfo.Sec_Tarifas = [];            
        state.AnuncioInfo._anuncioEdicionInputsView = true;
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

        if ('_id' in payload) {
          state.AnuncioInfo.id = payload._id;
        }
    },
    ANUNCIO_EDITSEC_CONTACTO_SET(state, payload){
        state.AnuncioInfo.Sec_Contacto = payload;
    },
    ANUNCIO_EDITSEC_TARIFA_SET(state, payload){
        state.AnuncioInfo.Sec_Tarifas = payload;
    },
    IMAGENES_EDITSEC_IMAGENES_SET(state, payload){
        state.AnuncioInfo.Sec_Imagenes = payload;
    },
    IMAGENES_EDITSEC_IMAGENES_NEW(state, payload){
        state.AnuncioInfo.Sec_Imagenes.push(payload);
    },
    ANUNCIO_EDITINFO_OFFSET(state, payload){
        state.AnuncioInfo = {
            categorias: [],
            permisos: ["Descripcion", "Contacto", "Tarifas"],
            Sec_Descripcion: {
                titulo: '',
                estado: '',
                ciudad: '',
                descripcion: '',
                sexo: 0
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
    anunciateSet({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("action anunciateSet...");
            console.dir(payload);

            //Veriricar si hay usuario disponible
            if (!rootState.usuario.usuario.usuario) {
                reject({ pagina: "home", componenteInterno: {panelHerramientasInicioSesion: true}, mensaje: "Favor de Iniciar sesion o pasar a Registrarse!" });
                return;
            }

            if (!rootState.usuario.usuario.numero_telefonico_verificado) {
                //Indicar el tipo de veritifacion y enviarlo ahí como no son estay alive si vuelve picarle a anunciate este vuelve a solicitar un codigo de verificación
                commit('TIPO_VERIFICACION_SET', 'verificacionCelular')
                return reject({ pagina: "home", componenteInterno: {panelHerramientasVerificacion: true}, mensaje: "Favor de verificar el número de celular de la cuenta!" });
            }

            //Apertura de nuevo anuncio
            resolve({ pagina: "dashboard", componenteInterno: { newAnuncioSet: true}, mensaje: "" });
        });
    },
    newAnuncioSet({commit, state }, payload){
        commit('CARGA_NUEVO_ANUNCIOVACIO');
        commit('ANUNCIO_NEWINFO_SET');
    },
    newAnuncioOffSet({commit, state}, payload){
        commit('ELIMINAR_NUEVO_ANUNCIOVACIO');
        commit('ANUNCIO_NEWINFO_OFFSET');
    },
    editAnuncioDisplay({ commit, state }, payload) {
        commit('EDIT_ANUNCIO_DISPLAY', payload);
    },
    anuncioEditContactoSet({ commit }, payload){
        commit('ANUNCIO_EDITSEC_CONTACTO_SET',payload);
    },
    anuncioEditTarifaSet({ commit }, payload){
        commit('ANUNCIO_EDITSEC_TARIFA_SET',payload);
    },
    anuncioNewImagenesSet({ commit }, payload){
        return new Promise((resolve, reject) => {
            console.log(">>>>anuncioNewImagenesSet");
            console.dir(payload);
            commit('IMAGENES_EDITSEC_IMAGENES_NEW',payload);
            resolve();
        });
    },
    anuncioSetImagenes({ commit }, payload){
        return new Promise((resolve, reject) => {
            console.log(">>>>anuncioSetImagenes");
            console.dir(payload);
            commit('IMAGENES_EDITSEC_IMAGENES_SET',payload);
            resolve();
        });
    },
    anuncioEditSet({ commit, state }, payload) {
        console.log("anuncioEditSet payload");
        console.dir(payload);
        
        if (payload != undefined) {
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
    anuncioPreView: state => {
        return state.dashboardEditAnuncioDisplay;
    },
    FormAE: state => {
        return state.AnuncioInfo;
    },
    getIdAnuncioReportado: state => {
        return state.idAnuncioReportado;
    }
};