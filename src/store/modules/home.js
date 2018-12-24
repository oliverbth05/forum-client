import axios    from 'axios';

const state = {
    firstLoad: true,
    homePosts: [],
    homePostsSort: 'new',
    currentPage: 1,
    homeError: null,
    morePostsLoading: false,
    postsLoading: false,
    endOfList: false
}

const getters = {
    firstLoad: (state) => {
        return state.firstLoad
    },
    posts: (state) => {
       return state.homePosts
    }, 
    homeError: (state) => {
        return state.homeError
    },
    homePostsSort: (state) => {
        return state.homePostsSort
    },
    currentPage: (state) => {
        return state.currentPage
    },
    morePostsLoading: (state) => {
        return state.morePostsLoading
    },
    endOfList: (state) => {
        return state.endOfList
    },
    postsLoading: (state) => {
        return state.postsLoading
    }
}

const mutations = {
    loadHomePosts(state, posts) {
        state.homePosts = state.homePosts.concat(posts);
        state.currentPage ++;
    },
    changeHomeSort(state, sortBy) {
        state.scrollPos = 0
        state.homePostsSort = sortBy
        state.currentPage = 1
        state.homePosts = []
    },
    deletePostFromState(state, post_id) {
        console.log(state.homePosts)
        var updated = [ 
            ...state.homePosts.filter(item => {
                return item._id !== post_id
            })
        ]
        state.homePosts = updated
    },
    home_errorHasOccurred(state, error) {
        state.homeError = error
    },
    home_loadSuccess(state) {
        state.homeError = null
    },
    init_morePostsLoading(state) { 
        state.morePostsLoading = true
    },
    finish_morePostsLoading(state) {
        state.morePostsLoading = false
    },
    listEnded(state) {
        state.endOfList = true
    },
    resetList(state) {
        state.endOfList = false
    },
    firstLoadOccurred(state) {
        state.firstLoad = false
    },
    resetFirstLoad(state) {
        state.firstLoad = true
    },
    init_postsLoading(state) {
        state.postsLoading = true
    },
    finish_postsLoading(state) {
        state.postsLoading = false
    }
} 

const actions = {
    fetchHomePosts(context, params) {
        context.commit('changeHomeSort', params.sort)
        context.commit('init_postsLoading');
        axios.get('https://ob-forum-api.herokuapp.com/posts?sort=' + params.sort + '&page=' + params.page)
        .then(response => {
            context.commit('resetList')
            context.commit('loadHomePosts', response.data)
            context.commit('home_loadSuccess')
            context.commit('finish_postsLoading')
        })
        .catch(err => {
            console.log(err)
            context.commit('home_errorHasOccurred', err.message)
            context.commit('finish_postsLoading')
        })
    },
    fetchMoreHomePosts(context, params) {
        context.commit('init_morePostsLoading')
        axios.get('https://ob-forum-api.herokuapp.com/posts?sort=' + params.sort + '&page=' + params.page)
        .then(response => {
            if (response.data.length > 0) {
                context.commit('loadHomePosts', response.data)
                context.commit('finish_morePostsLoading')
            }
            else {
                context.commit('finish_morePostsLoading');
                context.commit('listEnded')
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