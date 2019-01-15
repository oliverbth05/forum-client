<template>
    <div  v-if = 'edit_loading' class = 'container-content-centered'>
        <loader></loader>
    </div> 
    
    <div v-else class = 'container-content-centered fadeIn'>
        <div class = 'container-600'>
            <form
            @submit.prevent = 'updateEditPost({
            title: post_data.title,
            body: post_data.body,
            image: post_data.image,
            post_id: post_data._id,
            token: token
            })' 
            > 
                <h3 class = 'text-center font-normal m-b-2'>Edit Post</h3>
                <label>Title</label>
                <input v-model = 'post_data.title' class = 'input-block m-b-1' required/>
                <label>Body</label>
                <textarea class = 'text-area m-b-1' v-model = 'post_data.body' />
                <label>Image URL</label>
                <input class= 'input-block m-b-1' v-model = 'post_data.image' type = 'text'>
                <button class = 'button-small button-orange' type = 'submit' ><i class="far fa-save"></i> Update</button>
                <button @click = 'cancelEdit' class = 'button-small button-orange'><i class="far fa-times-circle"></i> Cancel</button>
                <button @click = 'deletePost({post_id: post_data._id, token: token})' class = 'button-small button-red'><i class="far fa-trash-alt"></i> Delete Post</button>
            </form>
        </div>

    </div>
</template>

<script> 
    import { mapGetters, mapActions } from 'vuex';
    import Loader from '../components/Loader';
    export default {
        components: {
            'loader': Loader
        },
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