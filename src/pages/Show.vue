<template> 
    <div class = 'container-1200 '>
        <div class = 'loading-container' v-if = 'post_loading'>
            <loader></loader>
        </div>
        <alert v-if = '!post_loading && load_post_error' :show = 'load_post_error' :message = 'load_post_error'></alert>
        <div v-if = '!post_loading && !load_post_error' class = 'fadeIn box bg-white m-t-2'> 
            <div class = 'show__top-pane p-r-1 p-l-1 p-t-1 p-b-1'>
                <div class = 'show__author-info'>
                    <div class = 'user__avatar-small'>
                        <i class="fas fa-user-alt"></i>
                    </div>
                    <div>
                        <router-link :to = '"/user/" + post.author_id'>{{post.author}}</router-link>
                        <p>{{moment}}</p>
                    </div>
                </div>
                <loader-small v-if = 'post_loading_vote'></loader-small>
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
            <div class = 'show__content p-a-1 '>
                <h3 class = 'p-b-1'>{{post.title}}</h3>
                <img
                v-if  = 'post.image' 
                :src  = 'post.image'
                class = 'm-b-1'/>
                <p 
                class = 'show__body'
                v-if  = 'post.body' 
                >{{post.body}}</p>
                <router-link v-if = 'canEdit' class = 'button-small button-orange m-t-2' :to = "'/edit/post/' + post._id"><i class="far fa-edit"></i> Edit Post </router-link>
            </div>
            <div class = 'show__details p-a-1'>
                <p>{{post.views}} <i class="far fa-eye"></i></p> 
                <ul class = 'tag__container'>
                    <li v-for = 'tag in post.tags' class = 'tag-normal'>{{tag}}</li>
                </ul>
            </div>
           
                
            
        </div>
     
        
        <div class = 'loading-container' v-if = 'comments_loading'>
            <loader></loader>
        </div>
        
        <div v-if = '!comments_loading' class = 'fadeIn'>
            <div v-if = 'user && !load_comments_error' class = 'p-a-1 m-t-2 box bg-white'>
                <alert :show = 'post_comment_error' :message = 'post_comment_error'></alert>
                <form  @submit.prevent = 'submitComment' >
                    <label>Post comment</label>
                    <textarea class = 'text-area m-b-s'
                    v-model = 'commentField'
                    required />
                    <button
                    :disabled = "comments_loading ? true : false"
                    class = 'button-block button-orange'
                    type = 'submit'
                    >Post</button> 
                </form>
            </div>
            <br />
            <alert v-if = '!comments_loading && load_comments_error' :message = 'load_comments_error' :show = 'load_comments_error'></alert>
            <div v-if = 'comments' class = 'm-t-1'>
                <h4 class = 'p-b-1'><i class="fas fa-comments"></i> Comments <span class = 'comment-count'>{{comments.length}}</span></h4>
                
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
    import Loader from '../components/Loader.vue';
    import LoaderSmall from '../components/LoaderSmall.vue';
    export default {
        
        components: {
            'comment': Comment,
            'alert' : Alert,
            'loader': Loader,
            'loader-small':  LoaderSmall
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
                'editing_comment',
                'post_comment_error',
                'load_post_error',
                'load_comments_error'
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
                this.$router.go(-1);
            }
        },
        
        destroyed() {
            this.clearPostData()
        }
}
</script>