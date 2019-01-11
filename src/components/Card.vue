<template>
    <router-link tag = 'div' :to = '"/show/" + id' class = 'card p-a-1 box'>
        <div class = 'card__info'>
            <h4 class = 'card__title font-normal'><i v-if = 'image' class="far fa-image"></i>{{ title}}</h4>
            <p>{{author}}</p>
            <p class = ''>{{moment}}</p>
        </div>
        <div class = 'card__vote'>
            <div>
                <i class="far fa-arrow-alt-circle-up"></i>
                <p>{{voteCount}}</p>
            </div>
        </div>
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
            'image'
        ],
        
        computed: {
            moment() {
                return moment(this.date).fromNow()
            }
        },
    }
</script>