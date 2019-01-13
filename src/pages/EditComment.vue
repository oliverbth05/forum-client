<template>
    <div class = 'container-content-centered' v-if = 'edit_comment_loading'>
        <loader>
            
        </loader>
    </div>
    
    <div class = 'container-content-centered fadeIn' v-else>
        <div class = 'container-600 p-a-1'>
            <form @submit.prevent = 'submitUpdate'>
                <h3 class = 'text-center font-normal p-b-2'>Edit Comment</h3>
                <alert :show = 'validationError' :message = '"Comment cannot be empty."'></alert>
                <label class = 'label'>Comment</label>
                <textarea class = 'input-block m-b-s' v-model = 'body'></textarea>
                <button class = 'button-small button-orange' type = 'submit'><i class="far fa-save"></i> Update</button>
                <a class = 'button-small button-orange' @click = 'cancelEdit' ><i class="far fa-times-circle"></i> Cancel</a>
                <a class = 'button-small button-red' @click = 'deleteComment'><i class="far fa-trash-alt"></i> Delete</a>
            </form>
        </div>
       
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import Alert from '../components/Alert.vue';
    import Loader from '../components/Loader.vue';
    
    export default {
        
        components: {
          'alert': Alert  ,
          'loader' : Loader
        },
        
        data() {
            return {
                body: null,
                hasLoaded: false,
                validationError: false
            }
        }, 
        
        computed: {
            ...mapGetters(['edit_comment', 'edit_comment_loading', 'token'])
        },
        
        methods: {
          ...mapActions(['updateEditComment', 'deleteEditComment']),  
            submitUpdate() {
                if (!this.body) {
                    this.validationError = true
                }
                else {
                    this.validationError = false
                    this.updateEditComment({
                        body: this.body,
                        comment_id: this.edit_comment._id,
                        post_id: this.edit_comment.post_id,
                        token: this.token
                    })
                }
            },
            deleteComment() {
                this.deleteEditComment({post_id: this.edit_comment.post_id, comment_id: this.edit_comment._id})
            },
            cancelEdit() {
                this.$router.history.push({path: '/show/' + this.edit_comment.post_id})
            }
        },
        
        updated(){
            if(!this.hasLoaded && !this.body) {
                this.body = this.edit_comment.body
                this.hasLoaded = true
            }
        }
    }
</script>