import { gql } from 'apollo-boost';

export const VERIFICACIONCELULAR_CREACION = gql `
    mutation {
        solicitarVerificacionCelular
    }
`;

export const SOLICITAR_VERIFICACION_ANUNCIO = gql `
    mutation solicitarVerificacionAnuncio($id_anuncio: String!, $foto_anuncio: String!){
        solicitarVerificacionAnuncio(id_anuncio: $id_anuncio, foto_anuncio: $foto_anuncio)
    }
`;

export const NUEVO_ANUNCIO_MUTATE = gql `
    mutation anuncioCreacion($input: AnuncioInput!){
        anuncioCreacion(input: $input){
            id
            categorias
            permisos
            Sec_Descripcion{
                titulo
                estado
                ciudad
                descripcion
                sexo
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
            Estado{
                vivo
            }
            no_corazones
            no_vistas
            verificado
        }
    }
`;

export const EDICION_ANUNCIO_MUTATE = gql `
    mutation anuncioActualizacion($input: AnuncioInput!){
        anuncioActualizacion(input: $input)
    }
`;

export const DELETE_ANUNCIO_MUTATE = gql `
    mutation anuncioEliminacion($id_anuncio: String!){
        anuncioEliminacion(id_anuncio: $id_anuncio)
    }
`;

export const DELETE_IMAGEN_MUTATE = gql `
    mutation imagenEliminacion($input: String!){
        imagenEliminacion(input: $input)
    }
`;