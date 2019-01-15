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
                tags: tags,
                author: user.username,
                author_id: user._id,
            })' 
            class = 'p-a-1'>
                <h3 class = 'text-center font-normal p-b-2 p-t-3' >New Post: {{title}}</h3>
                
                <label>Title</label>
                <input v-model = 'title' required class = 'input-block m-b-2' />
                
                <label>Body</label>
                <textarea v-model = 'body' class = 'text-area  m-b-2'/>
                
                <label>Tags (Optional)</label>
                <input class = 'input-block' v-model = 'tag_field' @keydown.enter = 'addTag' />
                <tags :tags = 'tags' :removeTag = 'removeTag' />
                <a class = 'button-small button-orange m-b-2' @click = 'addTag'>Add Tag</a>
                
                <label>Image Link (Optional)</label>
                <input class = 'input-block m-b-2' v-model = 'image'/>
                
                
                <button class = 'button-block button-orange' type = 'submit'>Create</button>
            </form>
        </div>
       
    </div>
</template>
  
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import Alert from '../components/Alert';
    import Loader from '../components/Loader';
    import Tags from '../components/Tags';
    
    export default {
        
        components: {
          'alert' : Alert  ,
          'loader': Loader,
          'tags' : Tags
        },
        
        data: function(){
            return {
                title: '',
                body: '',
                image: '',
                tag_field: '',
                tags: []
            } 
        },
        
        computed: {
            ...mapGetters(['create_loading', 'user', 'token', 'create_error'])
        },
        
        methods: { 
            ...mapMutations(['createErrorReset']),
            ...mapActions(['post']),
            addTag(e) {
                e.preventDefault()
                if (this.tag_field) {
                    this.tags.push(this.tag_field)
                    this.tag_field = ''
                }
            },
            removeTag(index) {
                this.tags.splice(index, 1)
            }
        },
        
        created() {
            this.createErrorReset()
        }
    }
</script> 