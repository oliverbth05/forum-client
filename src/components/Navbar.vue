<template>
    <nav>
        <div :class = '{"nav nav-hide" : hide,  "nav nav-show" : !hide}'>
            
            
            <div class = 'nav__container'>
                
                <router-link
                to = '/home'
                class = 'nav__title'
                active-class = 'title-active'
                >Forum</router-link>
                
                <div class = 'nav__links'>
    
                    <router-link 
                    exact
                    class           = 'nav__link'
                    active-class = 'nav-active'
                    to              = '/'
                    ><i class="fas fa-info-circle"></i> About</router-link>
                        
                    <router-link 
                    v-if = 'user'
                    class           = 'nav__link'
                    active-class = 'nav-active'
                    to              = '/new'
                    ><i class="fas fa-pen"></i> New Post</router-link>
                        
                    <router-link
                    v-if = 'user'
                    class = 'nav__link'
                    active-class = 'nav-active'
                    :to = '/user/ + user._id'
                    ><i class="fas fa-user"></i> {{user.username}}</router-link>
                        
                    <a
                    v-if = 'user'
                    class = 'nav__link nav-auth' 
                    @click = 'logOut'
                    ><i class="fas fa-sign-out-alt"></i> Log Out</a>
                        
                    <router-link 
                    v-if = '!user' 
                    class = 'nav__link nav-auth'
                    to = '/login'
                    active-class = 'nav-active'
                    ><i class="fas fa-sign-in-alt"></i>  Log In</router-link>
                    
                    <router-link 
                    v-if = '!user' 
                    class = 'nav__link nav-auth'
                    to = '/register'
                    active-class = 'nav-active'
                    ><i class="fas fa-user-plus"></i>  Register</router-link>
                
                </div>
        </div>
                
            </div>
            
            
            
            
    
            <transition name = 'slide'>
                <div class = 'nav__drawer' v-if = 'drawer'>
                    
                    <div class = 'nav__drawer-links'>
                        <router-link
                        @click = 'toggleDrawer'
                        class = 'nav__drawer-link'
                        active-class = 'mobile-active'
                        to = '/home'
                        >
                            <i class="fas fa-home"></i>
                            <p>Home</p>
                        </router-link>
            
                    <div v-if = 'user'>
                
                        <router-link
                        @click = 'toggleDrawer'
                        class = 'nav__drawer-link'
                        active-class = 'mobile-active'
                        :to = '/user/ + user._id'
                        >
                            <i class="fas fa-user"></i> 
                            <p>{{user.username}}</p>
                        </router-link>
                    
                        <router-link 
                        v-if = 'user'
                        class           = 'nav__drawer-link'
                        active-class = 'mobile-active'
                        to              = '/new'
                        >
                            <i class="fas fa-pen"></i>
                            <p>New Post</p>
                        </router-link>
                    
                        
                        
                        <a
                        @click = 'logOut'
                        class = 'nav__drawer-link'>
                        <i class="fas fa-sign-out-alt"></i>
                        <p>Log Out</p>
                        </a>
                    
                    </div>
            
                    <router-link 
                    v-if = '!user'
                    class = 'nav__drawer-link'
                    active-class = 'mobile-active'
                    to = '/login'
                    >
                        <i class="fas fa-sign-in-alt"></i>
                        <p>Log In</p>
                    </router-link>
                    
                    <router-link 
                    v-if = '!user'
                    class = 'nav__drawer-link'
                    active-class = 'mobile-active'
                    to = '/register'
                    >
                    <i class="fas fa-user-plus"></i>
                    <p>Register</p>
                    </router-link>
                    </div>
                    
                    <router-link 
                        class           = 'nav__drawer-link'
                        exact
                        active-class = 'mobile-active'
                        @click = 'toggleDrawer'
                        to              = '/'>
                            <i class="fas fa-info-circle"></i>
                            <p>About</p>
                        </router-link>
                </div>
                    
            </transition>
            
            <transition name = 'fade'>
                <div @click = 'toggleDrawer' class = 'nav__backdrop' v-if = 'drawer'>
                
                </div>
            </transition>
            
            <i @click = 'toggleDrawer' v-if = '!hide' class = 'fas fa-bars mobile-btn'></i>
    </nav>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        
        data() {
            return {
                offset: 0,
                hide: false
            }
        },
        
        computed: {
            ...mapGetters(['user', 'drawer'])
        },
        
        methods: {
            ...mapActions(['logOut']),
            ...mapMutations(['toggleDrawer', 'closeDrawer', 'resetToken']),
            scroll() {
                this.closeDrawer();
                if (window.pageYOffset > this.offset) {
                        this.hide = true;
                        this.offset = window.pageYOffset
                }
                else if (window.pageYOffset < this.offset) {
                        this.hide = false;
                        this.offset = window.pageYOffset;
                        this.offset = window.pageYOffset;
                } 
            }
        },
        
        created() {
            window.addEventListener('scroll', this.scroll);
        }
    }
</script>
