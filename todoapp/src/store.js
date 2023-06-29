import Vuex from 'vuex';


export default new Vuex.Store({
  state: {
    payments: [] 
  },
  mutations: {
    addPayment(state, payment) {
      state.payments.push(payment);
    }
  },
  actions: {
    performPayment({ commit }, payment) {
      commit('addPayment', payment);
    }
  }
});
