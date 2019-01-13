<template>
    <div class = 'banner' >
        <h3>Welcome {{user.username}}</h3>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {

    data() {
        return {
            banner: true
        }
    },

    computed: {
        ...mapGetters(['welcomeBanner', 'user'])
    },

    methods: {
        showBanner() {
            this.banner = true
        },
        hideBanner() {
            this.banner = false
        }
    },

    created() {
        this.banner = true;
        setTimeout(() => {
            this.hideBanner()
        }, 2000)
    }
}

</script>


//:class = "{'banner banner-show' : showBanner, 'banner banner-hide' : !showBanner}"