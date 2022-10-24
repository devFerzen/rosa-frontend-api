export const state = {
  dashboardEditAnuncioDisplay: "000",
  //Renombrar AnuncioInfo por AnuncioEditInfo
  AnuncioInfo: {
    id: "",
    categorias: [],
    permisos: ["Descripcion", "Contacto", "Tarifas"],
    Sec_Descripcion: {
      titulo: "",
      estado: "",
      ciudad: "",
      descripcion: "",
      sexo: 0,
      edad: 21
    },
    Sec_Imagenes: [],
    Sec_Contacto: [],
    Sec_Tarifas: [],
  }
};

export const mutations = {
         EDIT_ANUNCIO_DISPLAY(state, payload) {
           state.dashboardEditAnuncioDisplay = payload;
         },
         ANUNCIO_NEWINFO_OFFSET(state, payload) {
           state.AnuncioInfo._anuncioEdicionInputsView = false;
         },
         ANUNCIO_NEWINFO_SET(state, payload) {
           state.AnuncioInfo.permisos = ["Descripcion", "Contacto", "Tarifas"];
           (state.AnuncioInfo.categorias = []),
             (state.AnuncioInfo.Sec_Descripcion = {
               titulo: "",
               estado: "",
               ciudad: "",
               descripcion: "",
               sexo: 0,
               edad:21
             });
           state.AnuncioInfo.Sec_Imagenes = [];
           state.AnuncioInfo.Sec_Contacto = [];
           state.AnuncioInfo.Sec_Tarifas = [];
           state.AnuncioInfo.Sec_Tarifas = [];
           state.AnuncioInfo._anuncioEdicionInputsView = true;
         },
         ANUNCIO_EDITINFO_SET(state, payload) {
           if ("Sec_Descripcion" in payload) {
             state.AnuncioInfo.Sec_Descripcion = payload.Sec_Descripcion;
           }

           if ("Sec_Imagenes" in payload) {
             state.AnuncioInfo.Sec_Imagenes = payload.Sec_Imagenes;
           }

           if ("Sec_Contacto" in payload) {
             state.AnuncioInfo.Sec_Contacto = payload.Sec_Contacto;
           }

           if ("Sec_Tarifas" in payload) {
             state.AnuncioInfo.Sec_Tarifas = payload.Sec_Tarifas;
           }

           if ("categorias" in payload) {
             state.AnuncioInfo.categorias = payload.categorias;
           }

           if ("categorias" in payload) {
             state.AnuncioInfo.categorias = payload.categorias;
           }

           if (payload.hasOwnProperty("_id") || payload.hasOwnProperty("id")) {
             state.AnuncioInfo.id = payload.hasOwnProperty("_id")
               ? payload._id
               : payload.id;
           }
           console.log("ANUNCIO_EDITINFO_SET...");
           console.dir(state.AnuncioInfo);
         },
         ANUNCIO_EDITSEC_CONTACTO_SET(state, payload) {
           state.AnuncioInfo.Sec_Contacto = payload;
         },
         ANUNCIO_EDITSEC_TARIFA_SET(state, payload) {
           state.AnuncioInfo.Sec_Tarifas = payload;
         },
         ANUNCIO_EDITSEC_DESCRIPCION_SET(state, payload) {
           state.AnuncioInfo.Sec_Descripcion = payload;
         },
         ANUNCIO_EDITSEC_CATEGORIAS_SET(state, payload) {
           state.AnuncioInfo.categorias = payload;
         },
         ANUNCIO_EDITSEC_PERMISOS_SET(state, payload) {
           state.AnuncioInfo.permisos = payload;
         },
         ANUNCIO_EDITID_SET(state, payload) {
           state.AnuncioInfo.id = payload;
         },
         IMAGENES_EDITSEC_IMAGENES_SET(state, payload) {
           state.AnuncioInfo.Sec_Imagenes = payload;
         },
         ANUNCIO_EDITINFO_OFFSET(state, payload) {
           state.AnuncioInfo = {
             categorias: [],
             permisos: ["Descripcion", "Contacto", "Tarifas"],
             Sec_Descripcion: {
               titulo: "",
               estado: "",
               ciudad: "",
               descripcion: "",
               sexo: 0,
               edad: 21
             },
             Sec_Imagenes: [],
             Sec_Contacto: [],
             Sec_Tarifas: [],
           };
         },
       };

export const actions = {
         //Este falta renombar parece la llamada para abrir el modal de edicion...
         anunciateSet({ commit, rootState }, payload) {
           return new Promise((resolve, reject) => {
             console.log("action anunciateSet...");
             console.dir(payload);

             //Veriricar si hay usuario disponible
             if (!rootState.usuario.usuario.usuario) {
               return reject({
                 pagina: "home",
                 componenteInterno: {
                   panelHerramientasInicioSesion: true,
                   activationAlert: {
                     type: `error`,
                     message: "Favor de Iniciar sesion o pasar a Registrarse!",
                   },
                 },
               });
             }

             if (!rootState.usuario.usuario.numero_telefonico_verificado) {
               return reject({
                 pagina: "home",
                 componenteInterno: {
                   setTipoVerificacion: "verificacionCelular",
                   activationAlert: {
                     type: `error`,
                     message:
                       "Favor de verificar el número de celular de la cuenta!",
                   },
                   panelHerramientasVerificacion: true,
                 },
               });
             }

             //Apertura de nuevo anuncio
             resolve({
               pagina: "dashboard",
               componenteInterno: { newAnuncioSet: true },
             });
           });
         },
         newAnuncioSet({ commit, state }, payload) {
           commit("CARGA_NUEVO_ANUNCIOVACIO"); // Lo carga en array de listado de anuncios de Usuario
           commit("ANUNCIO_NEWINFO_SET"); // Carga un anuncio vacío en el Form de edición (FormAE)
         },
         newAnuncioOffSet({ commit, state }, payload) {
           commit("ELIMINAR_NUEVO_ANUNCIOVACIO");
           commit("ANUNCIO_NEWINFO_OFFSET");
         },
         editAnuncioDisplay({ commit, state }, payload) {
           commit("EDIT_ANUNCIO_DISPLAY", payload);
         },
         anuncioEditContactoSet({ commit }, payload) {
           commit("ANUNCIO_EDITSEC_CONTACTO_SET", payload);
         },
         anuncioEditTarifaSet({ commit }, payload) {
           commit("ANUNCIO_EDITSEC_TARIFA_SET", payload);
         },
         anuncioDescripcionSet({ commit }, payload) {
           commit("ANUNCIO_EDITSEC_DESCRIPCION_SET", payload);
         },
         anuncioCategoriasSet({ commit }, payload) {
           commit("ANUNCIO_EDITSEC_CATEGORIAS_SET", payload);
         },
         anuncioPermisosSet({ commit }, payload) {
           commit("ANUNCIO_EDITSEC_PERMISOS_SET", payload);
         },
         anuncioIdSet({ commit }, payload) {
           commit("ANUNCIO_EDITID_SET", payload);
         },
         anuncioSetImagenes({ commit }, payload) {
           return new Promise((resolve, reject) => {
             console.log(">>>>anuncioSetImagenes");
             console.dir(payload);
             commit("IMAGENES_EDITSEC_IMAGENES_SET", payload);
             resolve();
           });
         },
         anuncioEditSet({ commit, state }, payload) {
           console.log("anuncioEditSet payload");
           console.dir(payload);

           if (payload != undefined) {
             console.log("anuncio edit set");
             commit("ANUNCIO_EDITINFO_SET", payload);
           } else {
             console.log("anuncio edit offset");
             commit("ANUNCIO_EDITINFO_OFFSET", null);
           }
         }
       };

export const getters = {
  anuncioPreView: (state) => {
    return state.dashboardEditAnuncioDisplay;
  },
  FormAE: (state) => {
    return state.AnuncioInfo;
  },
};
