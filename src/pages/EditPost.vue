<template>
    <div  v-if = 'edit_loading' class = 'container-content-centered'>
        <v-progress-circular
        :size="70" 
        :width="4"
        color="rgb(239, 134, 35)"
        indeterminate
        ></v-progress-circular>
    </div> 
    
    <div v-else class = 'container-1200'>
        <form class = 'form'
        @submit.prevent = 'updateEditPost({
        title: post_data.title,
        body: post_data.body,
        image: post_data.image,
        post_id: post_data._id,
        token: token
        })' 
        > 
            <h1 class = 'center'>Edit Post</h1>
            <label class = 'label'>Title</label>
            <input v-model = 'post_data.title' class = 'input' required/>
            <br />
            <br />
            <label class = 'label'>Body</label>
            <textarea class = 'textarea-large' v-model = 'post_data.body' />
            <br />
            <br />
            <label class = 'label'>Image URL</label>
            <br />
            <input class= 'input' v-model = 'post_data.image' type = 'text'>
            <br />
            <br />
            <button class = 'button-inline btn-orange' type = 'submit' ><i class="far fa-save"></i> Update</button>
            <button @click = 'cancelEdit' class = 'button-inline btn-orange'><i class="far fa-times-circle"></i> Cancel</button>
            <button @click = 'deletePost({post_id: post_data._id, token: token})' class = 'button-inline btn-red'><i class="far fa-trash-alt"></i> Delete Post</button>
        </form>
        <br />
    </div>
</template>

<script> 
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                post_data: null, // Contains the updated data
                hasLoaded: false
            }
        },
        
        computed: {
            ...mapGetters(['edit_loading', 'user', 'edit_post', 'token']),
        },
        
        methods: {
           ...mapActions(['updateEditPost', 'deletePost']),
            cancelEdit() {
                this.$router.go(-1);
            },
        },
        
        updated() {
            if (!this.edit_title && !this.edit_body && !this.edit_image && !this.hasLoaded) { //Populates the forms with fetched data
                this.post_data = this.edit_post;
                this.hasLoaded = true
            }
        }
    }
</script>