<template>
    <div >
        <div v-if = '!loading' class = 'loader-button button-orange' @click = 'fetchMoreHomePosts({sort: homePostsSort, page: currentPage })'>
            <div></div>
            <p>Show More Posts</p>
            <loader-small v-if = 'loading' />
            <div v-else></div>
        </div>

        <div class = 'loader-button button-orange' v-else>
                <div></div>
                <p>Show More Posts</p>
                <loader-small v-if = 'loading' />
            <div v-else></div>
        </div>
      
    </div>
</template>

<script>
import LoaderSmall from './LoaderSmall';
import {mapActions, mapGetters} from 'vuex';
export default {
    props: [
        'loading'
    ],
    components: {
        'loader-small': LoaderSmall
    },
    computed: {
        ...mapGetters([ 
                'postsLoading',
                'firstLoad',
                'posts',
                'user',
                'homeError',
                'homePostsSort',
                'currentPage',
                'morePostsLoading',
                'endOfList'
            ])
    },
    methods: {
        ...mapActions(['fetchMoreHomePosts'])
    }
}
</script>
