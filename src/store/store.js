import Vue      from 'vue';
import Vuex     from 'vuex';
import moment   from 'moment';
import axios    from 'axios';
import {router} from '../main';

//modules
import auth from './modules/auth';
import home from './modules/home';
import show from './modules/show';
import user  from './modules/user';
import edit_post from './modules/edit_post';
import edit_comment from './modules/edit_comment';
import edit_user from './modules/edit_user';
import _new from './modules/_new';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loading: false,
        drawer: false,
    },
    getters: {
        loading: (state) => {
            return state.loading
        },
        drawer: (state) => {
            return state.drawer
        },

    },
    mutations: {
        loading(state) {
            state.loading = true
        },
        nLoading(state) {
            state.loading = false
        },
        toggleDrawer(state) {
            state.drawer = !state.drawer
        },
        closeDrawer(state) {
            if(state.drawer) {
                state.drawer = false
            }  
        },

    },
    modules: {
        auth,
        home,
        show,
        user,
        edit_post,
        edit_comment,
        edit_user,
        _new
    }
})