import { gql } from 'apollo-boost';

// Mutate ***
export const ACTUALIZAR_CONTRASENA_MUTATE = gql `
    mutation actualizacionContrasena ($contrasenaVieja: String!, $contrasenaNueva: String!){
        actualizacionContrasena(contrasenaVieja: $contrasenaVieja, contrasenaNueva: $contrasenaNueva)
    }
`;

export const COMPRAR_VERIFICACIONCELULAR_MUTATE = gql `
    mutation compararVerificacionCelular ($input: String!, $id_usuario: String!){
        compararVerificacionCelular(input: $input, id_usuario: $id_usuario)
    }
`;




// Query ***