<template>
    <router-link tag = 'div' :to = '"/show/" + id' class = 'card box'>
        <div class = 'card__title'>
            <h4 class = 'font-normal'><i v-if = 'image' class="far fa-image"></i> {{title}}</h4>
        </div>

        <div class = 'card__info'>
        
          
                 <p>{{author}}<p> <span class = 'space-right'></span> <p>{{moment}}</p> <span class = 'space-right'></span> <p><i class="far fa-arrow-alt-circle-up"></i> {{voteCount}}</p> <span class="space-right"></span><p><i class="far fa-eye"></i> {{views}}</p>
           

           
                
            

        </div>
        
        
        <!-- <div class = 'card__vote'>
            <div>
                
                <p>{{voteCount}}</p>
            </div>
        </div> -->
    </router-link>
</template>

<script>
    import moment from 'moment';
    export default {
        
        props: [
            'title',
            'date',
            'id',
            'author',
            'author_id',
            'voteCount',
            'image',
            'views'
        ],
        
        computed: {
            moment() {
                return moment(this.date).fromNow()
            }
        },
    }
</script>