<template>
    <nav>
        <div :class = '{"nav nav-hide" : hide,  "nav nav-show" : !hide}'>
            
            
            <div class = 'nav__container p-a-2'>
                
                <router-link 
                to = '/home'
                class = 'nav__title color-white'
                active-class = 'title-active'
                tag = 'h3'
                ><i class="fas fa-home"></i> Forum</router-link>
                
                <div class = 'nav__links'>
    
                    <router-link 
                    exact
                    class           = 'nav__link'
                    tag = 'a'
                    active-class = 'nav-active'
                    to              = '/'
                    ><i class="fas fa-info-circle"></i> About</router-link>
                        
                    <router-link 
                    v-if = 'user'
                    class           = 'nav__link'
                    tag = 'a'
                    active-class = 'nav-active'
                    to              = '/new'
                    ><i class="fas fa-pen"></i> New Post</router-link>
                        
                    <router-link
                    v-if = 'user'
                    class = 'nav__link'
                    active-class = 'nav-active'
                    
                    tag = 'a'
                    :to = '/user/ + user._id'
                    ><i class="fas fa-user"></i> {{user.username}}</router-link>
                        
                    <a
                    v-if = 'user'
                    class = 'nav__link nav-auth' 
                    tag = 'a'
                    @click = 'logOut'
                    ><i class="fas fa-sign-out-alt"></i> Log Out</a>
                        
                    <router-link 
                    v-if = '!user' 
                    class = 'nav__link nav-auth'
                    to = '/login'
                    active-class = 'nav-active'
                    tag = 'a'
                    ><i class="fas fa-sign-in-alt"></i>  Log In</router-link>
                    
                    <router-link 
                    v-if = '!user' 
                    class = 'nav__link nav-auth'
                    tag = 'a'
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
                            
                            <p>Home</p>
                            <i class="fas fa-home"></i>
                        </router-link>
            
                    <div v-if = 'user'>
                
                        <router-link
                        @click = 'toggleDrawer'
                        class = 'nav__drawer-link'
                        active-class = 'mobile-active'
                        :to = '/user/ + user._id'
                        >
                            
                            <p>{{user.username}}</p>
                            <i class="fas fa-user"></i> 
                        </router-link>
                    
                        <router-link 
                        v-if = 'user'
                        class           = 'nav__drawer-link'
                        active-class = 'mobile-active'
                        to              = '/new'
                        >
                          
                            <p>New Post</p>
                            <i class="fas fa-pen"></i>
                        </router-link>
                    
                        
                        
                        <a
                        @click = 'logOut'
                        class = 'nav__drawer-link'>
                       
                        <p>Log Out</p>
                         <i class="fas fa-sign-out-alt"></i>
                        </a>
                    
                    </div>
            
                    <router-link 
                    v-if = '!user'
                    class = 'nav__drawer-link'
                    active-class = 'mobile-active'
                    to = '/login'
                    >
                     
                        <p>Log In</p>
                           <i class="fas fa-sign-in-alt"></i>
                    </router-link>
                    
                    <router-link 
                    v-if = '!user'
                    class = 'nav__drawer-link'
                    active-class = 'mobile-active'
                    to = '/register'
                    >
                   
                    <p>Register</p>
                     <i class="fas fa-user-plus"></i>
                    </router-link>
                    </div>
                    
                    <router-link 
                        class           = 'nav__drawer-link'
                        exact
                        active-class = 'mobile-active'
                        @click = 'toggleDrawer'
                        to              = '/'>
                            
                            <p>About</p>
                            <i class="fas fa-info-circle"></i>
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
