<template>
    <div v-if = 'create_loading' class = 'container-content-centered'>
        <loader></loader>
    </div> 
     
    <div v-else class = 'container-content-centered'>
        <div class = 'container-600 p-a-1'>
            <alert :message = 'create_error' :show = 'create_error' />
            <form @submit.prevent = 'post({
                token: token,
                title: title,
                body: body,
                image: image,
                author: user.username,
                author_id: user._id,
            })' 
            class = 'p-a-1'>
                <h3 class = 'text-center font-normal p-b-2 p-t-3' >New Post: {{title}}</h3>
                <label>Title</label>
                <input v-model = 'title' required class = 'input-block m-b-s' />
                <label>Body</label>
                <textarea v-model = 'body' class = 'input-block  m-b-s'/>
                <label>Image Link (Optional)</label>
                <input class = 'input-block m-b-s' v-model = 'image'/>
                <button class = 'button-block button-orange' type = 'submit'>Create</button>
            </form>
        </div>
       
    </div>
</template>
  
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import Alert from '../components/Alert';
    import Loader from '../components/Loader';
    
    export default {
        
        components: {
          'alert' : Alert  ,
          'loader': Loader
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