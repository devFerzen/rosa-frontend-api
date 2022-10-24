import { gql } from 'apollo-boost';

// Mutate ***
export const ACTUALIZAR_CONTRASENA_MUTATE = gql `
    mutation actualizacionContrasena ($contrasenaVieja: String!, $contrasenaNueva: String!){
        actualizacionContrasena(contrasenaVieja: $contrasenaVieja, contrasenaNueva: $contrasenaNueva)
    }
`;

export const VERIFICACIONCELULAR_COMPARAR_MUTATE = gql `
    mutation compararVerificacionCelular ($input: String!){
        compararVerificacionCelular(input: $input)
    }
`;

// Query ***
export const USUARIO_QUERY = gql `
    query queryUsuario($input: String!){
        queryUsuario(input: $input){
            id,
            usuario,
            numero_telefonico
            numero_telefonico_verificado
            Default_Contactos{
                Tipo{
                    categoria
                    icono
                }
                contacto
            }
            anuncios_usuario{
                Sec_Descripcion{
                    titulo
                    estado
                    ciudad
                    descripcion
                    sexo
                    edad
                }
                Sec_Contacto{
                    contacto
                    Tipo{
                        categoria
                        icono
                    }
                }
                Sec_Tarifas{
                    nombre
                    precio
                    descripcion
                }
                Sec_Imagenes{
                    nombre
                    posicion
                    url
                }
                permisos
                no_corazones
                no_vistas
                verificado
            }
            terminos_condiciones
            estado
        }
    }
`;