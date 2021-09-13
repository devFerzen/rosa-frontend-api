import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import * as usuario from '@/store/modules/usuario'
import * as anuncio from '@/store/modules/anuncio'
import * as alert from '@/store/modules/alert'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuario,
    anuncio,
    alert
  },
  state: {
    iniciandoSesion: false,
    registrandose: false,
    contactandose: false,
    //Aqui se definen los default de anuncio busqueda
    anunciosBusqueda: [
      {
            "id": 1,
            "Sec_Descripcion": {
                "titulo": "Lorem ipsum 1",
                "estado": "1",
                "ciudad": "1",
                "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
            },
            "Sec_Contacto": [
              {
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
            "Sec_Tarifas": [
              {
                    "nombre": "Lorem 1",
                    "precio": 1500,
                    "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                },
                {
                    "nombre": "Lorem 2",
                    "precio": 1400,
                    "descripcion": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating."
                },
                {
                    "nombre": "Lorem 3",
                    "precio": 1300,
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
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 3,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 4,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 5,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 6,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 7,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 8,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 9,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 10,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
          "id": 11,
          "Sec_Descripcion": {
              "titulo": "Lorem ipsum 2",
              "estado": "1",
              "ciudad": "1",
              "descripcion": "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          },
          "Sec_Contacto": [
            {
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
          "Sec_Tarifas": [
            {
                  "nombre": "Lorem 1",
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
          "Sec_Imagen": [
            {
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
  mutations: {
    REGISTRANDOSE(state,payload) {
      state.registrandose = payload;
      state.iniciandoSesion = false;
      state.contactandose= false
    },
    INICIANDO_SESION(state,payload) {
      state.registrandose = false;
      state.iniciandoSesion = payload;
      state.contactandose= false
    },
    CONTACTANDOSE(state, payload) {
      state.iniciandoSesion = false;
      state.registrandose = false;
      state.contactandose= payload;
    }
  },
  actions: {
    enviandoCorreo({commit}, payload) {
        return new Promise((resolve, reject) =>{
            resolve({
                mensaje: 'Correo enviado correctamente!'
            });
        })
    },
    registro({commit}, payload) {
        return new Promise((resolve, reject) => {
            console.log("registro action...");
            apiClient.post('/register', payload)
            .then((result) => {
                console.log("result>>>");
                console.log(result);
                if(result.data){
                commit('TOKEN_SET',result.data.token, { root: true });
                commit('USUARIO_SET',result.data.usuario, { root: true });
                return resolve(result);
                }
                // Mandar notificacion de éxito
            })
            .catch((error) => {
                // Mandar notificacion de error
                console.log("error axios registro");
                console.dir(error);
                return reject({error, mensaje: 'Error al crear el usuario!, Favor de intentar más tarde'});
            });
        });
    },
    inicioSesion({commit, rootState}, payload) {
        console.log("inicioSesionUsuario action...");
        commit('TOKEN_SET', jwt.sign( rootState.usuario.usuario, 'the_secret_key'), { root: true });
        commit('USUARIO_SET',rootState.usuario, { root: true });
        return "yes...";
        /*return new Promise((resolve, reject) => {
        apiClient.post('/loggear', payload)
        .then((result) => {
            if(result.data){
            commit('TOKEN_SET',result.data.token);
            commit('USUARIO_SET',result.data.usuario);
            return resolve(result);
            }
        })
        .catch((e) => {
            console.log("e axios inicioSesionUsuario");
            console.dir(e);
            return reject({e, mensaje: `${e}, Favor de intentar más tarde`});
        });
        });*/
        //Llamada al api para pasar la setear un usuario
    },
    cerrandoSesion({state, commit}, payload){
        commit('USUARIO_OFFSET', payload, { root: true });
    }
  },
  getters: {
    anunciosBusqueda: state => {
      return state.anunciosBusqueda;
    }
  }
});
