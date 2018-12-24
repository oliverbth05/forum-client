<template>
    <div class = 'container-1200 bg-white'>
        <br />
        <div class = 'loading-container' v-if = 'post_loading'>
            <v-progress-circular 
            :size="70"
            :width="4"
            color="rgb(239, 134, 35)"
            indeterminate
            ></v-progress-circular>
        </div>
        <div  v-else > 
            <button @click = 'goBack' class ='button-inline btn-orange'><i class="fas fa-arrow-left"></i> Go Back</button>
            <div class = 'show__top-pane'>
                <div class = 'show__author-info'>
                    <div class = 'user__avatar-small'>
                        <i class="fas fa-user-alt"></i>
                    </div>
                    <div>
                        <router-link :to = '"/user/" + post.author_id'>{{post.author}}</router-link>
                        <p>{{moment}}</p>
                    </div>
                </div>
                <v-progress-circular v-if = 'post_loading_vote'
                :size="25"
                :width="3"
                color="rgb(239, 134, 35)"
                indeterminate
                ></v-progress-circular>
                <div class = 'show__vote' v-else>
                    <p>{{post.votes.length}}</p>
                    <i v-if = '!user' class  = "fas fa-arrow-circle-up post-no-user"></i>
                    <i 
                    v-if    = 'user && !userCanVote'
                    class   = "fas fa-arrow-circle-up post-voted" 
                    ></i>
                    <i 
                    @click  = 'votePost({
                    post_id: post._id,
                    voter_id: user._id
                    })'
                    v-if = 'userCanVote' class   = "fas fa-arrow-circle-up post-not-voted"></i>
                </div>
            </div>  
            <div class = 'show__content'>
                <h1>{{post.title}}</h1>
                <br />
                <br />
                <img
                v-if  = 'post.image' 
                :src  = 'post.image' />
                <br />
                <p 
                class = 'show__body'
                v-if  = 'post.body' 
                >{{post.body}}</p>
                <div v-if = 'canEdit'>
                    <router-link class = 'button-block btn-orange' :to = "'/edit/post/' + post._id"><i class="far fa-edit"></i> Edit Post </router-link>
                </div>
            </div>
        </div>
     
        
        <div class = 'loading-container' v-if = 'comments_loading'>
            <v-progress-circular 
                :size="70"
                :width="4"
                color="rgb(239, 134, 35)"
                indeterminate
            ></v-progress-circular>
        </div>
        <div v-if = '!comments_loading'>
            <div v-if = 'user' class = 'comment__form'>
                <form  @submit.prevent = 'submitComment' >
                    <label class = 'label'>Post comment</label>
                    <textarea class = 'textarea-small'
                    v-model = 'commentField'
                    />
                    <button
                    :disabled = "comments_loading ? true : false"
                    class = 'button-block btn-orange'
                    type = 'submit'
                    >Post</button> 
                </form>
            </div>
            <br />
            <div v-if = 'comments'>
                <h2 class = 'headline'><i class="fas fa-comments"></i> Comments <span class = 'comment-count'>{{comments.length}}</span></h2>
                <comment 
                v-for          = '(comment, index) in comments' 
                :comment_index = 'index'
                :key = 'comment._id'
                :comment_id    = 'comment._id' 
                :post_id       = 'post._id' 
                :date          = 'comment.date'  
                :author_id     = 'comment.author_id' 
                :votes         = 'comment.votes'
                :body          = 'comment.body' 
                :author_username        = 'comment.author_username'
                :replies       = 'comment.replies'
                :profileImage  = 'comment.author_profileImage'
                ></comment>
            </div>    
        </div>
    </div>
</template>

<script>
    import Comment      from '../components/Comment.vue';
    import {
        mapGetters,
        mapActions,
        mapMutations
    }                   from 'vuex';
    import moment from 'moment';
    import Alert from '../components/Alert.vue';
    export default {
        
        components: {
            'comment': Comment,
            'alert' : Alert
        },
        
        data() {
            return { 
                commentField: '',
                commentError: false,
            }
        },
        
        computed: {
            ...mapGetters([
                'post',
                'post_loading',
                'post_loading_vote',
                'comments_loading',
                'user',
                'token', 
                'comments',
                'editing_comment'
            ]),
            moment(){
                return moment(this.post.date).fromNow()
            },
            userCanVote() {
                if(!this.user) {
                    return false
                }
                else {
                    if (this.post.votes.map(item => {return item._id}).indexOf(this.user._id) === -1) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            },
            canEdit() {
                if(!this.user) {
                    return false
                }
                else {
                    if(this.user._id === this.post.author_id) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            } 
        },
        
        methods: {
            ...mapActions(['fetchComments', 'postComment', 'votePost', 'voteComment']),
            ...mapMutations(['clearPostData']),
            submitComment() {
                if (this.commentField) {
                    var comment = this.commentField;
                    this.commentField = '';
                    this.commentError = false;
                    this.postComment({
                        body: comment,
                        author_username: this.user.username,
                        author_id: this.user._id,
                        post_id: this.post._id,
                        token: this.token
                    });
                }
                else {
                    this.commentError = true;
                }
            },
            refreshComments() {
                this.fetchComments(this.$route.params.id)
            },
            goBack() {
                console.log(this.$router.history)
                this.$router.go(-1);
            }
        },
        
        destroyed() {
            this.clearPostData()
        }
}
</script>