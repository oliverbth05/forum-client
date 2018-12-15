<template>
    <div v-if = 'create_loading' class = 'container-content-centered'>
        <v-progress-circular
        :size="70"
        :width="4"
        color="rgb(239, 134, 35)"
        indeterminate
        ></v-progress-circular>
    </div> 
     
    <div v-else class = 'container-1200'>
        <br />
        <alert :message = 'create_error' :show = 'create_error' />
        <form @submit.prevent = 'post({
            token: token,
            title: title,
            body: body,
            image: image,
            author: user.username,
            author_id: user._id,
        })' 
        class = 'form'>
            <h1 class = 'center'>New Post: {{title}}</h1>
            <label class = 'label'>Title</label>
            <input v-model = 'title' required class = 'input' color="rgba(78, 205, 196, 1)" />
            <br />
            <br />
            <label class = 'label'>Body</label>
            <textarea v-model = 'body' class = 'textarea-large'/>
            <br />
            <br />
            <label class = 'label'>Image Link</label>
            <input class = 'input' v-model = 'image'/>
            <br />
            <br />
            <button class = 'button-block btn-orange' type = 'submit'>Create</button>
        </form>
    </div>
</template>
  
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import Alert from '../components/Alert';
    export default {
        
        components: {
          'alert' : Alert  
        },
        
        data: function(){
            return {
                title: '',
                body: '',
                image: ''
            } 
        },
        
        computed: {
            ...mapGetters(['create_loading', 'user', 'token', 'create_error'])
        },
        
        methods: { 
            ...mapMutations(['createErrorReset']),
            ...mapActions(['post']),
        },
        
        created() {
            this.createErrorReset()
        }
    }
</script> 