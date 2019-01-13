<template>
    <div v-if = 'loading' class = 'container-content-centered'>
       <loader></loader>   
    </div> 

    <div class = 'container-1200 fadeIn p-a-3 m-t-3' v-else>
            <div class = 'user'>
                <div class = 'user__avatar'>
                    <i class="fas fa-user-alt"></i>
                </div>
                <h3 class = 'font-normal text-center'>{{userProfile.user.username}}</h3>
                <br />
                <br />
                <p class = 'center'>Member since {{createdMoment}}</p>
                <p class = 'center'>Has posted {{userProfile.posts.length}} times </p>
            </div> 
            
            <div class = 'm-t-3'>
                <h4 class = 'm-b-1'>Recent Posts</h4>
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
    import Loader from '../components/Loader';
    import { mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        components: {
          'card': Card,
          'loader': Loader
        },
        computed: {
            ...mapGetters(['userProfile', 'loading', 'user', 'userProfileError']),
            createdMoment() {
              return moment(this.userProfile.createdAt).format('MM/DD/YYYY')  
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