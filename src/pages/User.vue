<template>
    <div v-if = 'loading' class = 'container-content-centered'>
        <v-progress-circular
        :size="70"
        :width="4"
        color="rgb(255, 255, 255)"
        indeterminate
        ></v-progress-circular>
    </div>
    
    <div class = 'container-1200' v-else-if = 'userProfileError'>
        <v-alert type = 'error' color = 'rgba(239, 100, 97, 1)' :value = 'userProfileError' transition = 'fade-transition' >{{userProfileError}}</v-alert>
    </div>
        
    <div class = 'container-1200 ' v-else>
            <div class = 'user'>
                <div class = 'user__avatar'>
                    <i class="fas fa-user-alt"></i>
                </div>
                <h1 class = 'display-1 center'>{{userProfile.user.username}} 
                </h1>
                <br />
                <br />
                <p class = 'center'>Member since {{moment}}</p>
                <p class = 'center'>Has posted {{userProfile.posts.length}} times </p>
            </div> 
            
            <div>
                <h2>Recent Posts</h2>
                <div>
                  <card 
                    v-for       = 'blog in userProfile.posts'
                    :key        = 'blog._id'
                    :title      = 'blog.title'
                    :date       = 'blog.date'
                    :id         = 'blog._id'
                    :author     = 'blog.author'
                    :author_id  = 'blog.author_id'
                    :image      = 'blog.image || null'
                    :voteCount  = 'blog.voteCount'
                ></card>
                </div>
                <p v-if = 'userProfile.posts.length === 0'>No recent posts</p>
            </div>
    </div>        
</template>

<script>
    import moment from 'moment';
    import Card from '../components/Card.vue';
    import { mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        components: {
          'card': Card
        },
        computed: {
            ...mapGetters(['userProfile', 'loading', 'user', 'userProfileError']),
            moment() {
              return new moment(this.userProfile.createdAt).format('MM/DD/YYYY')  
            },
            isUser() {
                if (this.user) {
                    if(this.user._id === this.userProfile.user._id) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {
                    return false
                }
            }
        },
        methods: {
            ...mapActions(['fetchUserProfile', 'updateUserSummary']),
            ...mapMutations(['clearUserProfileData']),
        },
        destroyed() {
            this.clearUserProfileData()
        }
    }
</script>