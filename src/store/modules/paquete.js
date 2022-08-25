export const state = {
    paquetes: [{
        "clave": "",
        "tipo": "",
        "nombre": "",
        "descripcion": "",
        "precio": 0,
        "descuento": 0,
        "periodo_por": 0,
        "estado": false
    }]
}

export const mutations = {
    PAQUETES_SET(state, payload){
        state.paquetes = payload
    }
}

export const actions = {
    paquetesDisponibles({commit}, payload){
        commit("PAQUETES_SET", payload);
    }
}
