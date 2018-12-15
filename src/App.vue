<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar   from './components/Navbar';
  import {mapMutations, mapGetters} from 'vuex';
  export default  {
    name: 'app',
    
    components: {
      'nav-bar' : Navbar
    },
    
    computed: {
      ...mapGetters(['token', 'user', 'scrollPos'])
    },
    
    created() {
      window.addEventListener('resize', this.resize);
      var user = JSON.parse(window.localStorage.getItem('user'));
      var token = JSON.parse(window.localStorage.getItem('token'));
      if (user && token) {
        this.logIn({user, token})
      }
    },
    
    data() {
      return {
        windowWidth: 0,
        offset: 0
      }
    },
    
    methods: {
      ...mapMutations(['logIn', 'toggleDrawer', 'closeDrawer']),
      resize() {
        if(window.innerWidth > 800) {
          this.closeDrawer()
        }
      },
    },
  }
</script>

<style lang="scss">
@import './style/index.scss';
</style>