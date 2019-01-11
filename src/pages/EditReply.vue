<template>
    
    <div class = 'container-content-centered' v-if = 'edit_reply_loading'>
        <loader></loader>
    </div>
    
    <div class = 'container-content-centered p-a-1' v-else>
        <div class = 'container-600'>
            <form @submit.prevent = 'submitEdit' class = 'form'>
                <h3 class = 'text-center p-b-2 font-normal'>Edit Reply</h3>
                <label>Reply</label>
                <textarea class = 'input-block' v-model = 'body'></textarea>
                <button class = 'button-small button-orange'><i class="far fa-save"></i> Update</button>
                <button @click = 'cancelEdit' class = 'button-small button-orange'><i class="far fa-times-circle"></i> Cancel</button>
                <button @click = 'deleteEditReply({comment_id: edit_reply._id, reply_id: edit_reply.replies[0]._id, token: token})'class = 'button-small button-red'><i class="far fa-trash-alt"></i> Delete</button>
            </form>
        </div>
    </div> 
   
    
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Loader from '../components/Loader';
    
    export default {
        
        components: {
            'loader': Loader  
        },
        
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
            submitEdit(){
                if(this.body) {
                    this.updateEditReply({comment_id: this.edit_reply._id, reply_id: this.edit_reply.replies[0]._id, body: this.body, token: this.token})
                }
                
                else {
                    alert('Cannot submit empty reply, you can delete it altogether if you wish.')
                }
                
            }
        },
        
        updated() {
            console.log(this.edit_reply)
            if(!this.hasLoaded && !this.body) {
                this.body = this.edit_reply.replies[0].body
                this.hasLoaded = true
            }
        } 
    }
</script>