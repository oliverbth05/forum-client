import axios from 'axios';
import {router} from '../../main.js';

const state = {
    create_error: null,
    create_loading: false
}

const getters = {
    create_error (state) {
        return state.create_error
    },
    create_loading (state) {
        return state.create_loading
    }
} 

const mutations = {
     createErrorDidOccur (state, error) {
         state.create_error = error
     },
     createErrorReset (state) {
         state.create_error = null
     },
     init_create_loading (state) {
         state.create_loading = true
     },
     finish_create_loading (state) {
         state.create_loading = false
     }
     
} 

const actions = { 
    post(context, data) {
        
        context.commit('init_create_loading');
        
        axios.post('https://ob-forum-api.herokuapp.com/posts', data)
        .then(response => {
            context.commit('createErrorReset')
            context.commit('finish_create_loading')
            context.commit('resetFirstLoad')
            router.history.push({path: '/home'})
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 403) {
                    context.commit('finish_create_loading')
                    context.dispatch('logOut')
                    context.dispatch('verificationErrorHandler')
                }
            }
            else { 
                context.commit('finish_create_loading')
                context.commit('createErrorDidOccur', err.message)
            }
         })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}