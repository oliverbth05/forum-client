<template>
    <div>
        <div class = 'full-section bg-1'>
            
            <div>
                <h1 class = 'header-massive'>Forum</h1>
                <p class = 'text fade-interval-2'>Forum is a project that tries to emulate online forums and blogs such as Reddit and Medium. It is a work in progress, and as such, minor bugs are likely to be encountered. Create an account to begin creating content and engaging with other content. Do not feel obligated to use your real e-mail address. Without a registered account, users are limited to browsing.</p>
                <router-link class = 'call2action fade-interval-4' to = '/register'>Create an Account</router-link>
            </div>
            
        </div>
        
        <div class = 'full-section bg-2'>
            <div>
                <h1 class = 'header-massive'>Features</h1>
                
                <div class = 'features'>
                    <div @click = 'changeActiveFeature(1)' :class = "{'feature-active' : activeFeature === 1, 'feature' : activeFeature !== 1}">
                        <i class="fas fa-pen"></i>
                        <p>Content Creation</p>
                    </div>
                    <div @click = 'changeActiveFeature(2)' :class = "{'feature-active' : activeFeature === 2, 'feature' : activeFeature !== 2}">
                        <i class="fas fa-user-lock"></i>
                        <p>User Authentication</p>
                    </div>
                    
                    <div @click = 'changeActiveFeature(3)' :class = "{'feature-active' : activeFeature === 3, 'feature' : activeFeature !== 3}">
                        <i class="fas fa-comments"></i>
                        <p>Feedback</p>
                    </div>
                </div>
                
                <div class = 'feature-description'>
                    <p v-if = 'activeFeature === 1'>Create and post written content on any topic and in any form of your choosing.</p>
                    <p v-if = 'activeFeature === 2'>Register with a secure account to create and interact with content.</p>
                    <p v-if = 'activeFeature === 3'>Receive feedback on your content in the form of comments and votes.</p>
                </div>
            </div>
        </div>
        
        <div class = 'full-section bg-3'>
            <div class = 'section-1200'>
                <h1 class = 'header-massive'><i class="fas fa-tools"></i> Built With</h1>
        
                <div class = 'primary-tools'>
                    <div :class = "{'primary-tools__el fade-interval-3' : showAnimation, 'primary-tools__el hide' : !showAnimation}"><i class="fab fa-node-js"></i>Node</div>
                    <div :class = "{'primary-tools__el fade-interval-3' : showAnimation, 'primary-tools__el hide' : !showAnimation}"><i class="fab fa-vuejs"></i>Vue</div>
                    <div :class = "{'primary-tools__el fade-interval-3' : showAnimation, 'primary-tools__el hide' : !showAnimation}"><i class="fas fa-database"></i>Mongodb</div>
                    <div :class = "{'primary-tools__el fade-interval-3' : showAnimation, 'primary-tools__el hide' : !showAnimation}"><i class="fab fa-sass"></i>Sass</div>
                </div>
        
                <div class = 'secondary-tools'>
                    <div :class = "{'fade-interval-4' : showAnimation, 'hide' : !showAnimation}" >Webpack</div>
                    <div :class = "{'fade-interval-5' : showAnimation, 'hide' : !showAnimation}" >Vue Cli</div>
                    <div :class = "{'fade-interval-6' : showAnimation, 'hide' : !showAnimation}" >Vuex</div>
                    <div :class = "{'fade-interval-7' : showAnimation, 'hide' : !showAnimation}" >Vue-Router</div>
                    <div :class = "{'fade-interval-8' : showAnimation, 'hide' : !showAnimation}" >Vuetify</div>
                    <div :class = "{'fade-interval-9' : showAnimation, 'hide' : !showAnimation}" >Express</div>
                    <div :class = "{'fade-interval-10' : showAnimation, 'hide' : !showAnimation}" >Mongoose</div>
                    <div :class = "{'fade-interval-11' : showAnimation, 'hide' : !showAnimation}" >JsonWebTokens</div>
                </div>
            </div>
        </div>
        
        <div class = 'full-section bg-4'>
            <h1 class = 'header-massive'>Github</h1>
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
                 console.log(window.pageYOffset)
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