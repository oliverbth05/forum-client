<template>
    <div class = 'comment-container'>
        <div class = 'comment'>
            <div>
                <img class = 'comment__avatar' :src = 'profileImage' />
            </div>
            <div class = 'comment__content'> 
                <router-link class = 'comment__author'
                :to = '/user/ + author_id'
                >{{author_username}}</router-link>
                <p class = 'comment__date'>{{moment}}</p>
                <p class = 'comment__body'>{{body}}</p>
                <div class = 'comment__options'>
                    <a v-if = '!showingReplies && replies.length > 0' @click = 'showReplies'>View Replies ({{replies.length}})</a>
                    <a v-if = 'showingReplies' @click = 'hideReplies'>Hide Replies</a>
                    <a v-if = 'user' @click = 'showReplyForm'>Reply</a>
                    <a v-if = 'userOwned' @click = 'deleteComment({comment_id: comment_id, post_id: post_id, index: index})'> Delete </a>
                    <router-link :to = "'/edit/comment/' + comment_id" v-if = 'userOwned'  >Edit</router-link>
                </div>
            </div> 
            <div class = 'comment__vote'>
                <p class = 'comment__vote-count'>{{votes.length}}</p>
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
        <form :class = "{'form-error reply-form' : replyError, 'reply-form' : !replyError}" v-if = 'user && showingReplyForm' @submit.prevent = 'validateReply({
                body: replyBody,
                author: user.username,
                author_id: user._id,
                comment_id: comment_id,
                post_id: post_id,
                token: token
                })'>
                <label class = 'label'>Reply</label>
                <input class = 'input' v-model = 'replyBody'/>
                <br />
                <br />
                <button class = 'button-inline btn-orange' type = 'submit'>Post</button>
                <button class = 'button-inline btn-orange' @click = 'hideReplyForm'>Cancel</button>
        </form>
        <div v-if = 'showingReplies' class = 'comment__replies'>
            <reply v-for = 'reply in replies' :reply_id = 'reply._id' :comment_id = 'comment_id' :body = 'reply.body' :date = 'reply.date' :author = 'reply.author' :author_id = 'reply.author_id' :author_profileImage = 'reply.author_profileImage'></reply>
        </div>
    </div>
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
            'index',
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

