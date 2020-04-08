import Vue from 'vue';
import Vuex from 'vuex';
import {SET_CURRENT_USER} from './mutation-types';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentUser: {
            userName: '',
            userEmail: '',
            userPassword: ''
        }
    },
    mutations: {
        [SET_CURRENT_USER](state, authenticationUser){
            state.currentUser = authenticationUser;
        }
    },
    actions: {
        setCurrentUser({commit}, authenticationUser){
            if(authenticationUser.name && authenticationUser.userEmail && authenticationUser.userPassword) {
                commit(SET_CURRENT_USER, authenticationUser);
            }
        }
    }
});