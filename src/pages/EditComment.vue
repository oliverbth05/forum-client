<template>
    <div class = 'container-content-centered' v-if = 'edit_comment_loading'>
        <v-progress-circular
            :size="70"
            :width="5"
            color="rgb(239, 134, 35)"
            indeterminate
        ></v-progress-circular>
    </div>
    
    <div class = 'container-1200' v-else>
        <form class = 'form' @submit.prevent = 'submitUpdate'>
            <h1 class = 'display-1 center'>Edit Comment</h1>
            <alert :show = 'validationError' :message = '"Comment cannot be empty."'></alert>
            <label class = 'label'>Comment</label>
            <textarea class = 'textarea-large' v-model = 'body'></textarea>
            
            <button class = 'button-block btn-orange' type = 'submit'>Submit</button>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import Alert from '../components/Alert.vue';
    
    export default {
        
        components: {
          'alert': Alert  
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
          ...mapActions(['updateEditComment']),  
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