<template>
    <div class = 'comment__container'>

        <div class = 'comment__author'>
            <router-link
            :to = '/user/ + author_id' 
            >{{author_username}}</router-link>
            <span class = 'space-right'></span>
            <p>{{moment}}</p>
        </div>

        <div class = 'comment'>
            <p>{{body}}</p>

            <div class = 'comment__vote'>
                <p>{{votes.length}}</p>
                <i 
                v-if = '!userHasVoted && user'
                class   = "fas fa-arrow-circle-up comment-not-voted"
                @click = 'voteComment({
                post_id: post_id,
                voter_id: user._id,
                comment_id: comment_id,
                author_id: author_id
                })'></i>
                <i v-if = 'userHasVoted' class = 'fas fa-arrow-circle-up comment-voted'></i>
                <i v-if = '!user' class = 'fas fa-arrow-circle-up'></i>
            </div>
        </div>

        <div class = 'comment__options'>
            <a v-if = '!showingReplies && replies.length > 0' @click = 'showReplies'>View Replies ({{replies.length}})</a>
            <span v-if = '!showingReplies && replies.length > 0' class = 'space-right'></span>
            <a v-if = 'showingReplies' @click = 'hideReplies'>Hide Replies</a>
            <span v-if = 'showingReplies' class = 'space-right'></span>
            <a v-if = 'user' @click = 'showReplyForm'>Reply</a>
            <span class = 'space-right'></span>
            <a v-if = 'userOwned' @click = 'deleteComment({comment_id: comment_id, post_id: post_id, index: comment_index})'> Delete </a>
            <span class = 'space-right'></span>
            <router-link :to = "'/edit/comment/' + comment_id" v-if = 'userOwned'  >Edit</router-link>
        </div>

           <form  class = 'p-t-1 m-t-1 p-b-1 fadeIn comment__form' v-if = 'user && showingReplyForm' @submit.prevent = 'validateReply({
                body: replyBody,
                author: user.username,
                author_id: user._id,
                comment_id: comment_id,
                post_id: post_id,
                token: token
                })'>
                <textarea class = 'input-block m-b-s' v-model = 'replyBody'/>
                <button class = 'button-small button-orange' type = 'submit'>Post</button>
                <button class = 'button-small button-orange' @click = 'hideReplyForm'>Cancel</button>
        </form>

         <div v-if = 'showingReplies' class = 'comment__replies m-t-1'>
            <reply v-for = '(reply, index) in replies' :reply_id = 'reply._id' :reply_index = 'index' :comment_index = 'comment_index' :comment_id = 'comment_id' :body = 'reply.body' :date = 'reply.date' :author = 'reply.author' :author_id = 'reply.author_id' :author_profileImage = 'reply.author_profileImage'></reply>
        </div>

    </div>
    

    <!-- <div class = 'comment-container'>
        <div class = 'comment'>
            <div class = 'comment__info'>
                <div class = 'comment__avatar'>
                    <i class="fas fa-user-alt"></i>
                </div>

                

                
            </div> 
           

            <div class = 'comment__content'>
                <p class = 'comment__body'>{{body}}</p>

                
            </div>

            <div class = 'comment__options'>
                   
                   
                </div>
            </div>

    
        </div>

     
       
    </div> -->
</template>

<script>
    import Reply from './Reply';
    import moment from 'moment';
    import Alert from './Alert';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        
        components: {
            'reply': Reply
        },
        
        props: [
            'body',
            'author_id',
            'author_username',
            'date',
            'post_id',
            'comment_id',
            'votes',
            'date',
            'replies',
            'comment_index',
            'profileImage'
        ],
        
        data() {
            return {
                showingReplies: false,
                showingReplyForm: false,
                replyBody: '',
                replyError: false
            }
        },
        
        computed: {
            ...mapGetters(['user', 'token']),
            moment() {
                return moment(this.date).fromNow()
            },
            userOwned() {                               //Checks to see if the comment is owned by the logged in user
                if (this.user !== null) {
                    if (this.user._id === this.author_id) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {
                    return false
                }
            },
            userHasVoted() {
                if(!this.user) {
                    return false
                }
                else {
                    var filtered = this.votes.filter(item => {
                        if (item._id === this.user._id) {
                            return true
                        }
                    })
                    return filtered.length > 0; 
                }
            },
        },
        
        methods: {
          ...mapActions(['deleteComment', 'voteComment', 'postReply']),
            validateReply(data) {
                if (this.replyBody !== '') {
                    this.postReply(data)
                }
                else {
                    this.replyError = true
                }
            },
            showReplies() {
                this.showingReplies = true
            },
            hideReplies() {
                this.showingReplies = false
            },
            showReplyForm() {
                this.showingReplyForm = true  
            },
            hideReplyForm(e) {
                e.preventDefault()
                this.showingReplyForm = false  
                this.replyError = false
            }
        }
    }
</script>

