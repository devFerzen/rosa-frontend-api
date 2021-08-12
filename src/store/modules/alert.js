export const state = {
  alert: {
    type: 'success',
    isActive: false,
    message: 'bla bla bla',
  }
}

export const mutations = {
  MODIFICATION_ALERT(state, payload){
    state.alert.type = payload.type;
    state.alert.message = payload.message;
  },
  ACTIVATION_ALERT(state, payload){
    state.alert.isActive = payload;
  }
}

export const actions = {
  async activationAlert({commit},payload){
    commit('MODIFICATION_ALERT', payload);
    commit('ACTIVATION_ALERT', true);
    await retrasoDe(3500);
    commit('ACTIVATION_ALERT', false);
  }
}

function retrasoDe(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}
