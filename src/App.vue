<template>
  <div id="app">
    <nav-bar></nav-bar>
    <banner v-if = 'welcomeBanner' />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar   from './components/Navbar';
  import Banner from './components/Banner';
  import {mapMutations, mapGetters} from 'vuex';
  export default  {
    name: 'app',
    
    components: {
      'nav-bar' : Navbar,
      'banner' : Banner
    },
    
    computed: {
      ...mapGetters(['token', 'user', 'scrollPos', 'welcomeBanner'])
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