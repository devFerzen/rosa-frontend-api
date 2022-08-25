import { gql } from "apollo-boost";

// Mutate ***
export const CREACION_PAQUETE_MUTATE = gql `
  mutation creacionPaquete($input: PaqueteInput!) {
    creacionPaquete(input: $input)
  }
`;

export const PAQUETES_QUERY = gql `
    query {
        queryPaquetes
    }
`;
