import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,

    },
    mutations: {
        updateUserMutation(state, data) {
            state.user = { ...state.user, ...data };
        }
    },
    actions: {
        updateUserAction({ commit }, data) {
            commit('updateUserMutation', data)
        }
    },

});
