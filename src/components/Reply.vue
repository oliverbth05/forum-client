<template>
    <div class = 'reply p-a-1'>
        <div class = 'comment__avatar'>
                <i class="fas fa-user-alt"></i>
            </div>
        <div class = 'comment__content'>
            <router-link :to = "'/user/' + author_id" class = 'comment__author'>{{author}}</router-link>
            <p class = 'comment__date'>{{moment}}</p>
            <p class = 'comment__body'>{{body}}</p>
            <div v-if = 'canEdit' class = 'comment__options'>
                <a @click = 'deleteReply({token: token, reply_id: reply_id, comment_id: comment_id, comment_index: comment_index, reply_index: reply_index})'>Delete </a>
                <router-link :to = "'/edit/comment/' + comment_id + '/reply/' + reply_id">Edit</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: [
            'body',
            'date',
            'author',
            'author_id',
            'author_profileImage',
            'reply_id',
            'comment_id',
            'comment_index',
            'reply_index'
        ],
        computed : {
            ...mapGetters(['user', 'token']),
            moment() {
                return moment(this.date).fromNow()
            },
            canEdit() {
                if (this.user) {
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
            }
        },
        methods: {
            ...mapActions(['deleteReply'])
        }
    }
</script>