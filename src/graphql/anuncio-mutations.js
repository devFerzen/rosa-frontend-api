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
