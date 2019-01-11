import axios from 'axios';
import {router} from '../../main.js';

var state = {
    edit_comment: null,
    edit_comment_loading: null,
    
    
}

var getters = {
    edit_comment(state){
        return state.edit_comment
    },
    edit_comment_loading(state) {
        return state.edit_comment_loading
    },
    
    
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
    
    

    

}

var actions = {
    fetchEditComment(context, comment_id){
        context.commit('init_edit_comment_loading')
        axios.get('https://ob-forum-api.herokuapp.com/comment/' + comment_id )
        .then(response => {
            context.commit('load_edit_comment', response.data[0])
            context.commit('finish_edit_comment_loading')
        })
    },
    updateEditComment(context, data){
        context.commit('init_edit_comment_loading')
        axios.put('https://ob-forum-api.herokuapp.com/comment', data)
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
    deleteEditComment(context, data){
        context.commit('init_edit_comment_loading');
        axios.delete('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/comments/' + data.comment_id)
        .then(response => {
            context.commit('finish_edit_comment_loading')
            router.history.push({path: '/show/' + data.post_id})
        })
        .catch(err => {
            console.log(err)
            
        })
    },
    
    
}

export default {
    state,
    getters,
    mutations,
    actions
}