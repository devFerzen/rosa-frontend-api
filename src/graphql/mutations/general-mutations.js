import { gql } from 'apollo-boost';

// Mutate ***
export const REGISTRO_MUTATE = gql`
    mutation registroUsuario ($input: UsuarioInput!){
        registroUsuario(input: $input){
            token,
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
            anuncios_usuario
            terminos_condiciones
            estado
        }
    }
`;

export const INICIANDO_SESION_MUTATE = gql`
    mutation inicioSesion($correo: String!, $contrasena: String!){
        inicioSesion(correo: $correo, contrasena: $contrasena){
            token,
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
            anuncios_usuario
            terminos_condiciones
            estado
        }
    }
`;

export const ME_ENCANTA_MUTATE = gql`
    mutation anunciolike($idAnuncio: String!){
        anunciolike(idAnuncio: $idAnuncio)
    }
`;

export const VER_MUTATE = gql`
    mutation anuncioVista($idAnuncio: String!){
        anuncioVista(idAnuncio: $idAnuncio)
    }
`;

// Query ***
export const VER_QUERY = gql`
    query queryAnunciosById($ids: [String]){
        queryAnunciosById(ids: $ids){
            id
            categorias
            permisos
            no_corazones
            no_vistas
            verificado
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
                url
            }            
        }
    } 
`;

export const BUSQUEDA_QUERY = gql`
    query queryAnuncios($query: QueryAnuncioInput!){
        queryAnuncios(query: $query){
            id
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
                url
            }
            permisos
            no_corazones
            no_vistas
            verificado
        }
    } 
`;