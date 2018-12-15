import axios from 'axios';
import { router } from '../../main.js';

const state = {
    edit_user_loading: null,
    edit_userProfile: null
}

const getters = {
    edit_user_loading(){
        return state.edit_user_loading
    },
    edit_userProfile(){
        return state.edit_userProfile
    }
}

const mutations = {
    init_edit_user_loading(state) {
        state.edit_user_loading = true
    },
    finish_edit_user_loading(state) {
        state.edit_user_loading = false
    },
    load_edit_userProfile(state, data) {
        state.edit_userProfile = data
    }
}

const actions = {
    
    fetchEditUserProfile(context, user_id) {
        context.commit('init_edit_user_loading');
        axios.get('https://frontend-templates-oliverbth05.c9users.io:8081/user/' + user_id + '/data/profile')
        .then(response => {
            console.log(response.data)
            context.commit('load_edit_userProfile', response.data)
            context.commit('finish_edit_user_loading')
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}