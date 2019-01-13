<template>
    <div class = 'container-1200'>
        <br />
        <div class = 'sort-buttons'>
            <button :class = 'homePostsSort === "new" ? "sort-button-active" : "sort-button-inactive"' @click = 'fetchHomePosts({sort: "new", page: 1})'>Recent <i class = 'fas fa-clock'></i></button>
            <button :class = 'homePostsSort === "hot" ? "sort-button-active" : "sort-button-inactive"' @click = 'fetchHomePosts({sort: "hot", page: 1})'>Trending <i class = 'fas fa-fire'></i></button>
            <button :class = 'homePostsSort === "top" ? "sort-button-active" : "sort-button-inactive"' @click = 'fetchHomePosts({sort: "top", page: 1})'>Most Voted <i class = 'fas fa-arrow-circle-up'></i></button>
        </div>
        <br />
        <div v-if = 'postsLoading' class = 'container-content-centered'>
           <loader></loader>
        </div>
        <alert :show = 'homeError' :message = 'homeError'></alert>
            <div v-if = '!postsLoading' class = 'fadeIn'>
                <card 
                    v-for       = 'blog in posts'
                    :key        = 'blog._id'
                    :title      = 'blog.title'
                    :date       = 'blog.date'
                    :id         = 'blog._id'
                    :author     = 'blog.author'
                    :author_id  = 'blog.author_id'
                    :image      = 'blog.image'
                    :voteCount  = 'blog.voteCount'
                ></card>
            </div>
            <loader-button v-if = '!endOfList && !homeError && !postsLoading' :loading = 'morePostsLoading ? true : false'></loader-button>
        <!-- <button class = 'button-block button-orange' >Show More Posts</button>       -->
        <p class = 'end-of-list' v-if = 'endOfList'>End of list.</p>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import Loader from '../components/Loader.vue';
    import LoaderButton from '../components/LoaderButton.vue';
    import Card from '../components/Card.vue';
    import Alert from '../components/Alert.vue';
    export default {
        
        components: {
            'card' : Card,
            'alert' : Alert,
            'loader' : Loader,
            'loader-button': LoaderButton
        },
        
        computed:  {
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
            ...mapMutations(['firstLoadOccurred']),
            ...mapActions(['fetchHomePosts', 'fetchMoreHomePosts'])
        }
    }
</script>