

export const state = {
  usuario: {
      "usuario": "tres@tres.com",
      "contrasena": "123",
      "numero_telefonico": "83000000",
      "estatus": true,
      "anuncios_usuario": [
        {
              "id": 1,
              "Sec_Descripcion": {
                  "titulo": "Lorem ipsum 1",
                  "estado": "1",
                  "ciudad": "1",
                  "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
              },
              "Sec_Contacto": [{
                      "contacto": "811-000-0000",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "whatsapp"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "twitter"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "instagram"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fa",
                          "icono": "phone-alt"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fa",
                          "icono": "globe"
                      }
                  }
              ],
              "Sec_Tarifas": [{
                      "nombre": "Lorem 1",
                      "precio": 1500,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  },
                  {
                      "nombre": "Lorem 2",
                      "precio": 1500,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  },
                  {
                      "nombre": "Lorem 3",
                      "precio": 1500,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  }
              ],
              "Sec_Imagen": [{
                      "nombre": "",
                      "url": "https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
                  },
                  {
                      "nombre": "",
                      "url": "https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
                  },
                  {
                      "nombre": "",
                      "url": "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
                  }
              ]

          },
          {
              "id": 2,
              "Sec_Descripcion": {
                  "titulo": "Lorem ipsum 2",
                  "estado": "1",
                  "ciudad": "1",
                  "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
              },
              "Sec_Contacto": [{
                      "contacto": "811-000-0000",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "whatsapp"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "twitter"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fab",
                          "icono": "instagram"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fa",
                          "icono": "phone-alt"
                      }
                  },
                  {
                      "contacto": "lorem.ipsum",
                      "url": "",
                      "tipo": {
                          "categoria": "fa",
                          "icono": "globe"
                      }
                  }
              ],
              "Sec_Tarifas": [{
                      "nombre": "Lorem 2",
                      "precio": 1200,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  },
                  {
                      "nombre": "Lorem 2",
                      "precio": 1500,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  },
                  {
                      "nombre": "Lorem 3",
                      "precio": 1500,
                      "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                  }
              ],
              "Sec_Imagen": [{
                      "nombre": "",
                      "url": "https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
                  },
                  {
                      "nombre": "",
                      "url": "https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
                  },
                  {
                      "nombre": "",
                      "url": "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
                  }
              ]

          }
      ]
  },
  token: null
}

export const mutations = {
  USUARIO_SET(state, payload) {
    payload.estatus = true;
    payload.anunciosUsuario = [];

    //Verificar si aquí saber su ip? y así agregarlo por default
    state.usuario = payload
  },
  USUARIO_OFFSET(state, payload) {
    state.usuario = null;
  },
  TOKEN_SET(state, payload){
    state.token = payload;
  },
  TOKEN_OFFSET(state, payload){
    state.token = payload;
  }
}

export const actions = {
  
}

export const getters = {
  anunciosUsuario: state => {
    return state.usuario.anuncios_usuario;
  },
  idUsuario: state => {
    return state.usuario.id;
  }
}

