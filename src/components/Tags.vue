<template>
    <ul class = 'tag__container'>
        <li class = 'tag' v-if = 'tags.length !== 0' @click = 'removeTag(index)' v-for = '(tag, index) in tags'>
            
            <div class = 'tag__content'>
                <p>{{tag}}</p>
            </div>
            
            <div class = 'tag__delete'>
                <i class="fas fa-times"></i>
            </div>
           
            
        </li>
    </ul>
</template>

<script>
    export default {
        
        props: [
            'tags',
            'removeTag'
        ],
        
        data() {
            return {
                
            }
        }
    }
</script>