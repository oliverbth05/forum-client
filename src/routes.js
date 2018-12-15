import Home from './pages/Home.vue';
import New from './pages/New.vue';
import Show from './pages/Show.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import User from './pages/User.vue';
import EditPost from './pages/EditPost.vue';
import EditComment from './pages/EditComment';
import EditReply from './pages/EditReply';
import About from './pages/About';

import { store } from './store/store';

export const routes = [
    { 
        path: '/home',
        component: Home,
        beforeEnter: (to, from, next) => {
            store.commit('closeDrawer');
            if(store.state.home.firstLoad) {
                store.dispatch('fetchHomePosts', {sort: store.state.home.homePostsSort, page:1});
                store.commit('firstLoadOccurred')
                next();
            }
            else {
                next();
            }
        }
    },
    {
      path: '/',
      component: About
    },
    { 
        path: '/new',
        component: New,
        beforeEnter: (to, from, next) => {
            store.commit('closeDrawer');
            next();
        }
    },
    {
        path: '/edit/post/:id',
        component: EditPost,
        beforeEnter : (to, from, next) => {
            store.dispatch('fetchEditPost', to.params.id);
            next();
        }
        
    },
    {
        path: '/edit/comment/:id',
        component: EditComment,
        beforeEnter : (to, from, next) => {
            store.dispatch('fetchEditComment', to.params.id);
            next();
        }
    },
    {
      path: '/edit/comment/:comment_id/reply/:reply_id',
      component: EditReply,
      beforeEnter : (to, from, next) => {
          console.log('reached')
          store.dispatch('fetchEditReply', {reply_id: to.params.reply_id, comment_id: to.params.comment_id});
          next();
      }
    },
    { 
        path: '/show/:id', 
        component: Show,
        beforeEnter: (to, from ,next) => {
            store.commit('closeDrawer');
            store.dispatch('fetchPost', to.params.id)
            store.dispatch('fetchComments', to.params.id)
            next();
        }
    },
    { 
        path: '/login', 
        component: Login,
        beforeEnter: (to , from, next) => {
            store.commit('closeDrawer');
            next();
        }
        
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: (to, from, next) => {
            store.commit('closeDrawer')
            next();
        } 
        
    },
    { 
        path: '/user/:id', 
        component: User,
        beforeEnter: (to, from, next) => {
            store.commit('closeDrawer');
            store.dispatch('fetchUserProfile', to.params.id)
            next();
        }
    }
]


