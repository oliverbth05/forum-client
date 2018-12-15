import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes.js';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';

import {store} from './store/store';


Vue.use(VueRouter);
Vue.use(Vuetify);

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
