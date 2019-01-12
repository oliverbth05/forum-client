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
            showBanner: true
        }
    },

    computed: {
        ...mapGetters(['welcomeBanner', 'user'])
    },

    methods: {
        showBanner() {
            this.showBanner = true
        },
        hideBanner() {
            this.showBanner = false
        }
    },

    created() {
        this.showBanner = true;
        setTimeout(() => {
            this.hideBanner()
        }, 2000)
    }
}

</script>


//:class = "{'banner banner-show' : showBanner, 'banner banner-hide' : !showBanner}"