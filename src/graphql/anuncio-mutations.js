import { gql } from 'apollo-boost';

export const VERIFICACIONCELULAR_CREACION = gql `
    mutation anuncioSolicitarVerificacion($input: VerificacionInput!){
        anuncioSolicitarVerificacion(input: $input)
    }
`;
