import axios from 'axios';
import {router} from '../../main.js';

var state = {
    edit_comment: null,
    edit_comment_loading: null,
    
    edit_reply: null,
    edit_reply_loading: null
}

var getters = {
    edit_comment(state){
        return state.edit_comment
    },
    edit_comment_loading(state) {
        return state.edit_comment_loading
    },
    
    edit_reply(state) {
        return state.edit_reply
    },
    edit_reply_loading(state) {
        return state.edit_reply_loading
    }
}

var mutations = {
    load_edit_comment: (state, data) => {
        state.edit_comment = data
    },
    init_edit_comment_loading: (state) => {
        state.edit_comment_loading = true
    },
    finish_edit_comment_loading: (state) => {
        state.edit_comment_loading = false
    },
    
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

var actions = {
    fetchEditComment(context, comment_id){
        context.commit('init_edit_comment_loading')
        axios.get('https://frontend-templates-oliverbth05.c9users.io:8081/comment/' + comment_id )
        .then(response => {
            context.commit('load_edit_comment', response.data[0])
            context.commit('finish_edit_comment_loading')
        })
    },
    updateEditComment(context, data){
        context.commit('init_edit_comment_loading')
        axios.put('https://frontend-templates-oliverbth05.c9users.io:8081/comment', data)
        .then(response => {
            router.history.push('/show/' + data.post_id)
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
    deleteEditComment(){
        
    },
    
    fetchEditReply(context, data) {
        context.commit('init_edit_reply_loading');
        axios.get('https://frontend-templates-oliverbth05.c9users.io:8081/comment/' + data.comment_id + '/replies/' + data.reply_id)
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
        axios.put('https://frontend-templates-oliverbth05.c9users.io:8081/comment/reply', data)
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
        axios.delete('https://frontend-templates-oliverbth05.c9users.io:8081/comment/' + data.comment_id + '/reply/' + data.reply_id + '/' + data.token)
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
    deleteReply(context, data) {
        console.log(data)
        context.commit('init_edit_reply_loading');
        axios.delete('https://frontend-templates-oliverbth05.c9users.io:8081/comment/' + data.comment_id + '/reply/' + data.reply_id + '/' + data.token)
        .then(response => {
            context.commit('delete_reply')
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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}