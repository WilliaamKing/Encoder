import Vue from 'vue';
import Vuex from 'vuex';
import {SET_CURRENT_USER, ADD_USER} from './mutation-types';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentUser: {
            name: '',
            password: ''
        },
        users: []
    },
    mutations: {
        [SET_CURRENT_USER](state, authenticationUser){
            state.currentUser = authenticationUser;
        },
        [ADD_USER]({users}, user){
            users.push(user);
        }
    },
    actions: {
        setCurrentUser({commit}, user){
           const {name, password} = user;

           if (name && password){
                commit(SET_CURRENT_USER, {name, password});
            }
        },
        addUser({commit}, user){
            const {name, password} = user;
            
            if (name && password){
                commit(ADD_USER, {user, password,  historyOfCoding: []});
            }
        },
        isUser({state: {users}}, name){
            return users.find((el) => el.name === name);
        }
    }
});