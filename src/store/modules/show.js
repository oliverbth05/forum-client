import axios    from 'axios';

const state = {
    show_post: null,
    show_comments: null,
    
    post_loading: null,
    comments_loading: null,
    
    post_loading_vote: null,
    


}

const getters = {
    post: (state) => {
        return state.show_post
    },
    comments: (state) => {
        return state.show_comments
    },
    post_loading: (state) => {
        return state.post_loading
    },
    comments_loading: (state) => {
        return state.comments_loading
    },
    post_loading_vote: (state) => {
        return state.post_loading_vote
    },

 
}

const mutations = {
    loadPost(state, post) {
        state.show_post = post
        state.post_loading = false
    },
    loadComments(state, comments) {
        state.show_comments = comments
        state.comments_loading = false
    },
    clearPostData(state) {
        state.show_post = null,
        state.show_comments = null
    },
    init_post_loading(state) {
        state.post_loading = true
    },
    init_comments_loading(state) {
        state.comments_loading = true
    },
    finish_comments_loading(state) {
        state.comments_loading = false
    },
    init_post_loading_vote(state) {
        state.post_loading_vote = true
    },
    finish_post_loading_vote(state) {
        state.post_loading_vote = false
    },
    postComment(state, comment) {
        state.show_comments.push(comment)
    },
    votePost(state, voter_id) {
        state.show_post.votes.push({_id: voter_id});
    },
    deleteComment(state, index) {
        state.show_comments.splice(index, 1)
    },
    deleteReply(state, indices) {
        console.log(indices)
        state.show_comments[indices.comment_index].replies.splice(indices.reply_index, 1)
    }

    
}

const actions = {
    fetchPost(context, id) {
        context.commit('init_post_loading')
        axios.get('https://ob-forum-api.herokuapp.com/posts/' + id)
        .then(response => {
            context.commit('loadPost', response.data);
        })
        .catch(err => {
            console.log(err)
        })
    },
    fetchComments(context, post_id) {
        context.commit('init_comments_loading')
        axios.get('https://ob-forum-api.herokuapp.com/posts/' + post_id + '/comments')
        .then(response => {
            context.commit('loadComments', response.data)
            context.commit('nLoading')
        })
        .catch(err => {
            console.log(err)
        })
    },
    postComment(context, data) {
        context.commit('init_comments_loading')
        axios.post('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/comments', data)
        .then(response => {
            context.commit('postComment', response.data)
            context.commit('finish_comments_loading')
        })
    },
    postReply(context, data) { //******FIX
        context.commit('init_comments_loading')
        axios.post('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/comments/' + data.comment_id + '/replies', data)
        .then(response => {
            context.commit('loadComments', response.data)
        })
    },
    deleteReply(context, data) {
        console.log(data)
        context.commit('init_comments_loading');
        axios.delete('https://ob-forum-api.herokuapp.com/comment/' + data.comment_id + '/reply/' + data.reply_id + '/' + data.token)
        .then(response => {
            context.commit('finish_comments_loading');
            context.commit('deleteReply', {comment_index: data.comment_index, reply_index: data.reply_index})
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 403) {
                    context.commit('finish_comments_loading')
                    context.dispatch('logOut')
                    context.dispatch('verificationErrorHandler')
                }
            }
        })
    },
    deleteComment(context, data) {//******FIX
        context.commit('init_comments_loading');
        axios.delete('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/comments/' + data.comment_id)
        .then(response => {
            context.commit('deleteComment', data.index)
            context.commit('finish_comments_loading')
        })
        .catch(err => {
            console.log(err)
            
        })
    },
    votePost(context, data) { 
        context.commit('init_post_loading_vote')
        axios.put('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/votes', data)
        .then(response => {
            context.commit('votePost', data.voter_id);
            context.commit('finish_post_loading_vote');
        })
        .catch(err => {
            context.commit('finish_post_loading_vote')
        })
    },
    voteComment(context, data) {//******FIX
        context.commit('init_comments_loading')
        axios.put('https://ob-forum-api.herokuapp.com/posts/' + data.post_id + '/comments/' + data.comment_id + '/votes', data)
        .then(response => {
            context.commit('loadComments', response.data)
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