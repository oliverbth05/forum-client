<template>
    <div>
        <div class = 'full-section bg-1'>
            
            <div class = 'container-1200 p-r-3 p-l-3'>
                <h1 class = 'm-b-3 color-white font-light text-center fade-interval-1'>Forum</h1>
                <p class = 'fade-interval-2 color-white m-b-2'>Forum is a project that tries to emulate online forums and blogs such as Reddit and Medium. It is a work in progress, and as such, minor bugs are likely to be encountered. Create an account to begin creating content and engaging with other content. Do not feel obligated to use your real e-mail address. Without a registered account, users are limited to browsing.</p>
                <router-link class = 'call2action fade-interval-4' to = '/register'>Create an Account</router-link>
            </div>
            
        </div>
        
        <div class = 'full-section bg-2 p-a-2'>
            <div>
                <h1 class = 'font-light color-white text-center'>Features</h1>
                <div class = 'flex-container-responsive m-t-3'>
                    <div class = 'feature'>
                        <i class="fas fa-pen"></i>
                        <h4 class = 'font-light'>Content Creation</h4>
                    </div>
                    <div class = 'feature'>
                        <i class="fas fa-user-lock"></i>
                        <h4 class = 'font-light'>User Authentication</h4>
                    </div>
                    
                    <div class = 'feature'>
                        <i class="fas fa-comments"></i>
                        <h4 class = 'font-light'>Feedback</h4>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div class = 'full-section bg-3'>
            <div class = 'section-1200 p-a-2'>
                <h1 class = 'font-light color-white text-center'><i class="fas fa-tools"></i> Built With</h1>
        
                <div class = 'flex-container-responsive m-t-3'>
                    <div :class = "{'flex-item-large fade-interval-3' : showAnimation, 'flex-item-large hide' : !showAnimation}"><i class="fab fa-node-js"></i><h4 class = 'font-light'>Node</h4></div>
                    <div :class = "{'flex-item-large fade-interval-3' : showAnimation, 'flex-item-large hide' : !showAnimation}"><i class="fab fa-vuejs"></i><h4 class = 'font-light'>Vue</h4></div>
                    <div :class = "{'flex-item-large fade-interval-3' : showAnimation, 'flex-item-large hide' : !showAnimation}"><i class="fas fa-database"></i><h4 class = 'font-light'>Mongodb</h4></div>
                    <div :class = "{'flex-item-large fade-interval-3' : showAnimation, 'flex-item-large hide' : !showAnimation}"><i class="fab fa-sass"></i><h4 class = 'font-light'>Sass</h4></div>
                </div>
        
                <div class = 'flex-container-responsive m-t-1'>
                    <div :class = "{'flex-item-small fade-interval-4' : showAnimation, 'hide' : !showAnimation}" ><p>Webpack</p></div>
                    <div :class = "{'flex-item-small fade-interval-5' : showAnimation, 'hide' : !showAnimation}" ><p>Vue Cli</p></div>
                    <div :class = "{'flex-item-small fade-interval-6' : showAnimation, 'hide' : !showAnimation}" ><p>Vuex</p></div>
                    <div :class = "{'flex-item-small fade-interval-7' : showAnimation, 'hide' : !showAnimation}" ><p>Vue-Router</p></div>
                    <div :class = "{'flex-item-small fade-interval-8' : showAnimation, 'hide' : !showAnimation}" ><p>Vuetify</p></div>
                    <div :class = "{'flex-item-small fade-interval-9' : showAnimation, 'hide' : !showAnimation}" ><p>Express</p></div>
                    <div :class = "{'flex-item-small fade-interval-10' : showAnimation, 'hide' : !showAnimation}" ><p>Mongoose</p></div>
                    <div :class = "{'flex-item-small fade-interval-11' : showAnimation, 'hide' : !showAnimation}" ><P>JsonWebTokens</p></div>
                </div>
            </div>
        </div>
        
        <div class = 'full-section bg-4'>
            <div class = 'p-a-2'>
                <h1 class = 'font-light color-white text-center'><i class="fab fa-github"></i> GitHub</h1>
                <div class = 'm-t-3 content-centered'>
                    <a class = 'button-small button-orange' target = '_blank' href = 'https://github.com/oliverbth05/forum-api'><i class="fas fa-arrow-circle-right"></i> Forum API Repository</a>
                </div>

                <div class = 'm-t-1 content-centered'>
                    <a class = 'button-small button-orange' target = '_blank' href = 'https://github.com/oliverbth05/forum-client'><i class="fas fa-arrow-circle-right"></i> Forum Client Repository</a>
                </div>
                
            </div>
            
        
        </div>
        
    </div>
    
    
    </div>    
    
</template>

<script>
    import {Link} from 'vue-router'
    export default {
        
        data() {
            return {
                showAnimation: false,
                activeFeature: 1
            }
        },
        
        methods: {
          scroll(e){
             if (window.pageYOffset > 1600) {
                 this.showAnimation = true
             }
          },
          changeActiveFeature(num) {
              this.activeFeature = num
          }
        },
        created(){
            window.addEventListener('scroll', this.scroll)
        }
    }
    
</script>