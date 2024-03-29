import { gql } from 'apollo-boost';

// Mutate ***
export const REGISTRO_MUTATE = gql `
    mutation registroUsuario ($input: UsuarioInput!){
        registroUsuario(input: $input)
    }
`;

export const INICIANDO_SESION_MUTATE = gql `
    mutation inicioSesion($correo: String!, $contrasena: String!){
        inicioSesion(correo: $correo, contrasena: $contrasena)
    }
`;

export const CERRAR_SESION_MUTATE = gql `
    mutation cerrarSesion($input: String){
        cerrarSesion(input: $input)
    }
`;

export const ME_ENCANTA_MUTATE = gql `
    mutation anunciolike($idAnuncio: String!){
        anunciolike(idAnuncio: $idAnuncio)
    }
`;

export const VER_MUTATE = gql `
    mutation anuncioVista($idAnuncio: String!){
        anuncioVista(idAnuncio: $idAnuncio)
    }
`;

export const VERIFICACIONUSUARIO_COMPARAR_MUTATE = gql `
    mutation compararVerificacionUsuario ($input: String, $usuario: String!, $clean: Boolean!){
        compararVerificacionUsuario(input: $input, usuario: $usuario, clean: $clean)
    }
`;

export const SOLICITAR_RESTABLECER_CONTRASENA = gql `
    mutation solicitarRestablecerContrasena ($usuario: String!){
        solicitarRestablecerContrasena(usuario: $usuario)
    }
`;

export const RESTABLECER_CONTRASENA = gql `
    mutation restablecerContrasena ($input: String, $usuario: String!, $contrasena: String!){
        restablecerContrasena(input: $input, usuario: $usuario, contrasena: $contrasena)
    }
`;

export const NUEVO_CORREO_CONTACTANOS = gql `
    mutation nuevoContactoCliente($input: ContactanosInput!){
        nuevoContactoCliente(input: $input)
    }
`;

export const EDICION_DEFAULT_CONTACTOS = gql `
    mutation actualizacionDefaultContactos($input: [SecContactoInput]!){
        actualizacionDefaultContactos(input: $input)
    }
`;

// Query ***
export const DDL_BYCATEGORIA_QUERY = gql `
    query queryddlsByCategoria($categorias: [String]!){
        queryddlsByCategoria(categorias: $categorias){
            no_id
            descripcion
            icono_icono
            icono_categoria
            categoria
            no_estado
        }
    }
`;

export const ANUNCIO_BYID_QUERY = gql `
    query queryAnunciosById($ids: [String]){
        queryAnunciosById(ids: $ids){
            id
            categorias
            permisos
            no_corazones
            no_vistas            
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
            Estado{
                vivo
            }
            verificado       
        }
    } 
`;

export const ANUNCIOS_QUERY = gql `
    query queryAnuncios($query: QueryAnuncioInput!, $limit: Int, $skip: Int){
        queryAnuncios(query: $query, limit: $limit, skip: $skip){
            id
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
            Estado{
                vivo
            }
            permisos
            no_corazones
            no_vistas
            verificado
        }
    } 
`;