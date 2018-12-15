<template>
    
    <div class = 'container-content-centered' v-if = 'edit_reply_loading'>
        <v-progress-circular
            :size="70"
            :width="5"
            color="rgb(239, 134, 35)"
            indeterminate
        ></v-progress-circular>
    </div>
    
    <div class = 'container-1200' v-else>
        <form @submit.prevent = 'updateEditReply({comment_id: edit_reply._id, reply_id: edit_reply.replies[0]._id, body: body, token: token})' class = 'form'>
            <h1 class = 'display-1 center'>Edit Reply</h1>
            <label class = 'label'>Reply</label>
            <textarea class = 'textarea-small' v-model = 'body'></textarea>
            <button class = 'button-inline btn-orange'><i class="far fa-save"></i> Update</button>
            <button @click = 'cancelEdit' class = 'button-inline btn-orange'><i class="far fa-times-circle"></i> Cancel</button>
            <button @click = 'deleteEditReply({comment_id: edit_reply._id, reply_id: edit_reply.replies[0]._id, token: token})'class = 'button-inline btn-red'><i class="far fa-trash-alt"></i> Delete</button>
        </form>
    </div>
    
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    
    export default {
        
        data() {
            return {
                body: '',
                hasLoaded: false
            }
        },
        
        computed: {
           ...mapGetters(['edit_reply_loading', 'edit_reply', 'token'])
        },
        
        methods: {
            
            ...mapActions(['updateEditReply', 'deleteEditReply']),
            cancelEdit(e) {
                e.preventDefault();
                this.$router.go(-1);
            },  
        },
        
        updated() {
            if(!this.hasLoaded && !this.body) {
                this.body = this.edit_reply.replies[0].body
                this.hasLoaded = true
            }
        } 
    }
</script>