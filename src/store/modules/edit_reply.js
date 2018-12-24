import axios from 'axios';
import {router} from '../../main.js';

const state = {
    edit_reply: null,
    edit_reply_loading: null
    
}

const getters = {
    edit_reply(state) {
        return state.edit_reply
    },
    edit_reply_loading(state) {
        return state.edit_reply_loading
    }
}

const mutations = {
    load_edit_reply: (state, data) => {
        state.edit_reply = data
    },
    init_edit_reply_loading: (state) => {
        state.edit_reply_loading = true
    },
    finish_edit_reply_loading: (state) => {
        state.edit_reply_loading = false
    }
}

const actions = {
    fetchEditReply(context, data) {
        context.commit('init_edit_reply_loading');
        axios.get('https://ob-forum-api.herokuapp.com/comment/' + data.comment_id + '/replies/' + data.reply_id)
        .then(response => {
            console.log(response.data, 'Response')
            context.commit('finish_edit_reply_loading');
            context.commit('load_edit_reply', response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateEditReply(context, data) { 
        context.commit('init_edit_reply_loading');
        axios.put('https://ob-forum-api.herokuapp.com/comment/reply', data)
        .then(response => {
            context.commit('finish_edit_reply_loading')
            router.history.go(-1)
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 403) {
                    context.commit('finish_edit_comment_loading')
                    context.dispatch('logOut')
                    context.dispatch('verificationErrorHandler')
                }
            }
        })
    },
    deleteEditReply(context, data) {
        console.log(data)
        context.commit('init_edit_reply_loading');
        axios.delete('https://ob-forum-api.herokuapp.com/comment/' + data.comment_id + '/reply/' + data.reply_id + '/' + data.token)
        .then(response => {
            router.history.go(-1)
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 403) {
                    context.commit('finish_edit_comment_loading')
                    context.dispatch('logOut')
                    context.dispatch('verificationErrorHandler')
                }
            }
        })
    },
    
}

export default {
    state,
    getters,
    mutations,
    actions
}