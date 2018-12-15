<template>
    <router-link tag = 'div' :to = '"/show/" + id' class = 'card'>
        <div class = 'card__info'>
            <h3 class = 'title'><i v-if = 'image' class="far fa-image"></i>{{ title}}</h3>
            <p class = 'card__author'>{{author}}</p>
            <p class = 'card__date'>{{moment}}</p>
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