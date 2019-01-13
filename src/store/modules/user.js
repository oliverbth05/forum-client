import axios from 'axios';
import {router} from '../../main';

const state = {
    userProfile: null,
    userProfileError: null,
    editError: null,
    edit_username: null,
    edit_summary: null,
    edit_profileImage: null,
} 

const getters = {
    
    
    userProfile: (state) => {
        return state.userProfile
    },
    userProfileError: (state) => {
        return state.userProfileError
    }
    
}

const mutations = {



    loadUserProfile(state, data) {
        state.userProfile = data
    },
    clearUserProfileData(state) {
        state.userProfile = null
    },
    userProfile_errorHasOccurred(state, error) {
        state.userProfileError = error
    },
    userProfile_loadSuccess(state) {
        state.userProfileError = null
    }
    
}

const actions = {
    fetchUserProfile(context, author_id) {
        
        var data = {};
        
        context.commit('loading');
        
        axios.get('https://ob-forum-client.herokuapp.com/user/' + author_id + '/data/profile')
        .then(response => {
            data.user = response.data;
            return axios.get('https://ob-forum-client.herokuapp.com/user/' + author_id + '/data/posts')
        })
        
        .then(response => {
            data.posts = response.data
            context.commit('userProfile_loadSuccess')
            context.commit('loadUserProfile', data);
            context.commit('nLoading');
        })
        
        .catch(err => {
            context.commit('nLoading')
            context.commit('userProfile_errorHasOccurred', err.message);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}