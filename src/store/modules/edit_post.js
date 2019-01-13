import axios from 'axios';
import {router} from '../../main.js';

const state = {
   edit_post: null,
   edit_loading: false
}
 
const getters = {
    edit_post: (state) => {
        return state.edit_post
        
    },
    edit_loading: (state) => {
        return state.edit_loading
    }
}

const mutations = {
    load_edit_post: (state, data) => {
        state.edit_post = data 
    },
    init_edit_loading: (state) => {
        state.edit_loading = true
    },
    finish_edit_loading: (state) => {
        state.edit_loading = false
    }
}

const actions = { 
    
    fetchEditPost(context, post_id) {
        context.commit('init_edit_loading');
        axios.get('https://ob-forum-client.herokuapp.com/posts/' + post_id)
        .then(response => {
            console.log(response.data)
            context.commit('load_edit_post', response.data)
            context.commit('finish_edit_loading')
        })
        .catch(err => {
            context.commit('finish_edit_loading')
            console.log(err)
        })
    },
    updateEditPost(context, data) {
        context.commit('init_edit_loading')
        axios.put('https://ob-forum-client.herokuapp.com/posts/' + data.post_id, data)
        .then(response => {
            router.history.push('/show/' + data.post_id)
            context.commit('finish_edit_loading')
        })
        .catch( err => {
            if (err.response) {
                if (err.response.status === 403) {
                    context.commit('finish_edit_loading')
                    context.dispatch('logOut')
                    context.dispatch('verificationErrorHandler')
                }
            }
        })
    },
    deletePost(context, data) {
        context.commit('loading')
        axios.delete('https://ob-forum-client.herokuapp.com/posts/' + data.post_id)
        .then(response => {
            context.commit('deletePostFromState', data.post_id)
            router.history.push('/home');
        })
        .catch(err => {
            if (err.response) {
                    if (err.response.status === 403) {
                        context.commit('finish_edit_loading')
                        context.dispatch('logOut')
                        context.dispatch('verificationErrorHandler')
                    }
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