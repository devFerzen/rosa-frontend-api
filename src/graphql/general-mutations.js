import { gql } from 'apollo-boost';

// Mutate ***
export const REGISTRO_MUTATE = gql `
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
            anuncios_usuario{
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

export const INICIANDO_SESION_MUTATE = gql `
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
            anuncios_usuario{
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
    mutation compararVerificacionUsuario ($input: String!, $usuario: String!){
        compararVerificacionUsuario(input: $input, usuario: $usuario)
    }
`;

export const SOLICITAR_RESTABLECER_CONTRASENA = gql `
    mutation solicitarRestablecerContrasena ($usuario: String!){
        solicitarRestablecerContrasena(usuario: $usuario)
    }
`;

export const RESTABLECER_CONTRASENA = gql `
    mutation restablecerContrasena ($input: String!, $usuario: String!, $contrasena: String!){
        restablecerContrasena(input: $input, usuario: $usuario, contrasena: $contrasena)
    }
`;

export const NUEVO_CORREO_CONTACTANOS = gql `
    mutation nuevoContacto($input: ContactanosInput!){
        nuevoContacto(input: $input)
    }
`;

// Query ***
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