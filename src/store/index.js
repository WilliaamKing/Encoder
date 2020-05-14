import Vue from 'vue';
import Vuex from 'vuex';
import {SET_CURRENT_USER, SET_ERROR, ADD_USER, 
        DELETE_CURRENT_USER, ADD_RECORD_TO_HISTORY} from './mutation-types';

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
        },
        [ADD_RECORD_TO_HISTORY] ({users}, {writedRecord, currentUserIndex}) {
            users[currentUserIndex].historyOfCoding.push(writedRecord);
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
        addUser({commit}, {name, password, historyOfCoding = []}){ 
            if (name && password){
                commit(ADD_USER, {name, password,  historyOfCoding});
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
        },
        addRecordToHistory ({commit, state: {currentUser, users}}, record) {
            const currentUserIndex = users.findIndex((el) => el.name === currentUser.name);
            const {operation, algorithm, encodingText, decodingText, key, date} = record;
            const addRecordConditions = getAddRecordConditions (currentUserIndex, record);
            const isAddRecord = addRecordConditions.every(el => el);
           
            if (isAddRecord) {
                const writedRecord = {operation, algorithm, encodingText, decodingText, key, date};
                commit (ADD_RECORD_TO_HISTORY, {writedRecord, currentUserIndex});
            }
        },
        getCurrentUserHistory ({state: {currentUser, users}}) {
            const currentUserIndex = users.findIndex((el) => el.name === currentUser.name);
            return users[currentUserIndex].historyOfCoding;
        }
    }
});

function getAddRecordConditions (currentUserIndex, checkedRecord) {
    const {operation, algorithm, encodingText, decodingText, date} = checkedRecord;

    return [
        currentUserIndex !== -1,
        operation,
        encodingText,
        decodingText,
        algorithm,
        date
    ];
}