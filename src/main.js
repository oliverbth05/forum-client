import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes.js';

import {store} from './store/store';


Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
    else {
      return { x: 0, y: 0 }
    }
  }

})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
