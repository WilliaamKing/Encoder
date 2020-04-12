import Vue from 'vue';
import Vuex from 'vuex';
import {SET_CURRENT_USER, SET_ERROR, ADD_USER, DELETE_CURRENT_USER} from './mutation-types';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        error: {
            status: false
        },
        currentUser: {
            name: '',
            password: ''
        },
        users: []
    },
    mutations: {
        [SET_CURRENT_USER](state, authenticationUser) {
            state.currentUser = authenticationUser;
        },
        [SET_ERROR](state, error) {
            state.error = error;
        },
        [ADD_USER]({users}, user) {
            users.push(user);
        },
        [DELETE_CURRENT_USER]({users}, currentUserIndex) {   
            users.splice(currentUserIndex, 1); 
        }
    },
    actions: {
        setCurrentUser({commit}, user){
           const {name, password} = user;

           if (name && password){
                commit(SET_CURRENT_USER, {name, password});
            }
        },
        setError ({commit}, error){
            const {status} = error;

            if (status !== undefined) {
                commit (SET_ERROR, {status});
            }
        },
        addUser({commit}, {name, password}){ 
            if (name && password){
                commit(ADD_USER, {name, password,  historyOfCoding: []});
            }
        },
        resetCurrentUser ({commit}){
            const name = '';
            const password = '';
            commit(SET_CURRENT_USER, {name, password});
        },
        deleteCurrentUser ({commit, dispatch, state: {currentUser, users}}){
            const currentUserIndex = users.findIndex((el) => el.name === currentUser.name);

            if (currentUserIndex !== -1){
                commit(DELETE_CURRENT_USER, currentUserIndex); 
                dispatch('resetCurrentUser');   
            }
        }
    }
});