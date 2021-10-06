import { gql } from 'apollo-boost';
export const ANUNCIO_ELIMINAR = gql `
    mutation anuncioEliminacion($id_anuncio: String!){
        anuncioEliminacion(id_anuncio: $id_anuncio)
    }
`;